import React from 'react';

const officialCyfyLogo = new URL('../assets/images/cyfy2.0_logo des.png', import.meta.url).href;

interface CyfyLogoProps {
  className?: string;
  iconSize?: number;
  showSubtitle?: boolean;
  /** Sizing classes for the image (e.g. responsive heights); overrides iconSize when set. */
  imgClassName?: string;
}

export const CyfyLogo: React.FC<CyfyLogoProps> = ({ 
  className = '', 
  iconSize = 42,
  showSubtitle = true,
  imgClassName
}) => {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      <img
        src={officialCyfyLogo}
        alt="CYFY, An ISO/IEC 27001:2022 Certified Company"
        style={imgClassName ? undefined : { height: iconSize, width: 'auto' }}
        className={`block shrink-0 object-contain ${imgClassName ? `${imgClassName} w-auto` : ''}`}
      />
    </div>
  );
};
