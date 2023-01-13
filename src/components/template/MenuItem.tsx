import Link from 'next/link';

interface MenuItemProps {
  texto: string;
  icone: any;
  url?: string;
  className?: string;
  onClick?: (evento: any) => void;
}

export default function MenuItem(props: MenuItemProps) {
  return (
    <li
      onClick={props.onClick}
      className={`hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}
    >
      <Link
        className={`flex flex-col justify-center items-center h-20 w-20 text-gray-600 dark:text-gray-200 ${props.className}`}
        href={props.url ? props.url : '#'}
      >
        {props.icone} <span className="text-xs font-light">{props.texto}</span>
      </Link>
    </li>
  );
}
