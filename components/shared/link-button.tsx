import Link from 'next/link';
import { Button, ButtonProps } from '../base/button';

interface Props extends ButtonProps {
  href: string;
  icon?: React.ReactNode;
  text: string;
}

export default function LinkButton({
  href,
  icon,
  text,
  ...buttonProps
}: Props) {
  return (
    <Link href={href}>
      <Button className="gap-2" {...buttonProps}>
        {icon}
        <span>{text}</span>
      </Button>
    </Link>
  );
}
