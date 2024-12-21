import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/base/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../base/button';

type DropdownItemBase = {
  id: string;
  text: string;
  icon?: React.ReactNode;
};

type DropdownItemButton = DropdownItemBase & {
  type: 'button';
  onClick: () => void;
};

type DropdownItemLink = DropdownItemBase & {
  href: string;
  newTab?: boolean;
  type: 'link';
};

export type DropdownItem = DropdownItemButton | DropdownItemLink;

interface Props {
  items: DropdownItem[];
}

export default function DropdownActions({ items }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item) => (
          <>
            {item.type === 'link' ? (
              <DropdownMenuItem asChild={item.type === 'link'} key={item.id}>
                <DropdownMenuItem asChild>
                  {item.icon && item.icon}
                  <Link href={item.href}>Edit</Link>
                </DropdownMenuItem>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onSelect={item.onClick}>
                {item.icon && item.icon}
                <span>Delete</span>
              </DropdownMenuItem>
            )}
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
