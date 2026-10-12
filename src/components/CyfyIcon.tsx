import React from 'react';

interface CyfyIconProps {
  className?: string;
  size?: number | string;
  glow?: boolean;
  /** Visual scale of the artwork inside the box (the PNG has transparent padding). Does not affect layout. */
  scale?: number;
}

export const CyfyIcon: React.FC<CyfyIconProps> = ({
  className = '',
  size = 32 ,
  glow = true,
  scale = 1
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glow Backdrop */}
      {glow && (
        <div 
          className="absolute inset-0 rounded-full blur-md opacity-40 pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(0, 149, 175, 0.6) 0%, rgba(255, 183, 75, 0.3) 60%, transparent 80%)'
          }}
        />
      )}

      {/* Exact Attached CYFY Isometric Icon Image */}
      <img
        src={new URL('../assets/images/CYFY_Icon__Main.png', import.meta.url).href}
        alt="CYFY Icon"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_10px_rgba(0,149,175,0.45)]"
        style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
      />
    </div>
  );
};
