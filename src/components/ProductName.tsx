// "CY" lettering cropped from the official logo (cyfy2.0_logo des.png), teal only, so product names share the logo's letterforms.
const cyLettering = new URL('../assets/images/cyfy-cy-lettering.png', import.meta.url).href;

export const PRODUCT_NAMES = {
  cyshield: 'Shield Pro',
  cynapptics: 'nnapptics',
} as const;

export type ProductId = keyof typeof PRODUCT_NAMES;

export const isProductId = (id: string): id is ProductId => id in PRODUCT_NAMES;

/** Product name with the logo's "CY" lettering, sized to the cap height of the surrounding text and sat on its baseline. */
export function ProductName({ id, className = '' }: { id: ProductId; className?: string }) {
  return (
    <span className={`whitespace-nowrap ${className}`}>
      <img src={cyLettering} alt="" aria-hidden="true" draggable={false} className="inline-block h-[0.73em] w-auto align-baseline mr-[0.06em]" />
      <span className="sr-only">Cy</span>
      {PRODUCT_NAMES[id]}
    </span>
  );
}
