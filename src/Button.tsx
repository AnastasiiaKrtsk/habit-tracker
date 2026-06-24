import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'ghost-destructive';

type ButtonProps = {
  variant?: Variant;
} & ComponentProps<'button'>;

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      children={props.children}
      className={twMerge(
        getVariantStyles(variant),
        'hover:cursor-pointer transition-colors px-2 py-1 rounded disabled:opacity-30 disabled:cursor-not-allowed',
        className,
      )}
    />
  );
}

function getVariantStyles(variant: Variant) {
  switch (variant) {
    case 'primary':
      return 'bg-(--primary-color) hover:bg-(--primary-hover-color)';

    case 'secondary':
      return 'bg-(--secondary-color) hover:bg-(--primary-hover-color)';

    case 'ghost-destructive':
      return 'bg-(--ghost-destructive-color) text-red-800 hover:bg-(--ghost-destructive-hover-color) hover:text-(--text)';

    default:
      throw new Error(`Invalid variant: ${variant satisfies never}`);
  }
}
