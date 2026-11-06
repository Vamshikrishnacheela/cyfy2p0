import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const videoSrc = new URL('../assets/video/cyfy-background.mp4', import.meta.url).href;
// The clip's own final frame. It shows while the video loads, when it can't play, with reduced motion,
// and for a moment at the loop point, because the clip ends on a different picture from the one it starts on.
const posterSrc = new URL('../assets/video/cyfy-background-poster.webp', import.meta.url).href;

// Fade out this many seconds before the end, so the last frame blends into the matching poster instead of cutting
const LOOP_FADE_SECONDS = 0.4;

const subscribeTheme = (notify: () => void) => {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
};
const isLightTheme = () => document.documentElement.classList.contains('light');

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const subscribeMotion = (notify: () => void) => {
  reducedMotionQuery.addEventListener('change', notify);
  return () => reducedMotionQuery.removeEventListener('change', notify);
};
const prefersReducedMotion = () => reducedMotionQuery.matches;

const saveData = () => (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

/**
 * Site-wide background. Rendered once, outside the routes, so it never restarts on navigation. Dark theme only:
 * the clip is dark, so light-theme text wouldn't read over it, and the video isn't downloaded while it isn't shown.
 */
export default function BackgroundVideo() {
  const light = useSyncExternalStore(subscribeTheme, isLightTheme);
  const reducedMotion = useSyncExternalStore(subscribeMotion, prefersReducedMotion);
  const [failed, setFailed] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playVideo = !light && !reducedMotion && !failed && !saveData();

  useEffect(() => {
    const video = videoRef.current;
    if (!playVideo || !video) return;
    setShowVideo(false);
    video.muted = true; // React doesn't reliably reflect the muted attribute, and autoplay depends on it
    const retry = () => { video.play().catch(() => { /* still blocked: the poster stays */ }); };
    video.play().catch(() => {
      // Autoplay refused (for example, low-power mode): the poster stays until the first interaction allows it
      window.addEventListener('pointerdown', retry, { once: true });
      window.addEventListener('keydown', retry, { once: true });
    });
    return () => {
      window.removeEventListener('pointerdown', retry);
      window.removeEventListener('keydown', retry);
    };
  }, [playVideo]);

  if (light) return null;

  return (
    <div className="site-bg" aria-hidden="true">
      <img src={posterSrc} alt="" className="site-bg-media" />
      {playVideo && (
        <video
          ref={videoRef}
          className="site-bg-media"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          tabIndex={-1}
          style={{ opacity: showVideo ? 1 : 0, transition: `opacity ${showVideo ? 700 : 300}ms linear` }}
          onPlaying={() => setShowVideo(true)}
          onTimeUpdate={e => {
            const { currentTime, duration } = e.currentTarget;
            setShowVideo(!duration || duration - currentTime > LOOP_FADE_SECONDS);
          }}
          onError={() => setFailed(true)}
        />
      )}
      <div className="site-bg-overlay" />
    </div>
  );
}
