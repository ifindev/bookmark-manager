import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button, ButtonProps } from '../base/button';

interface Props extends ButtonProps {
  href: string;
  icon?: React.ReactNode;
  text?: string;
}

export default function LinkButton({
  href,
  icon,
  text,
  ...buttonProps
}: Props) {
  return (
    <Link href={href}>
      <Button
        {...buttonProps}
        className={cn(text && 'gap-2', buttonProps.className)}
      >
        {icon}
        {text && <span>{text}</span>}
      </Button>
    </Link>
  );
}
