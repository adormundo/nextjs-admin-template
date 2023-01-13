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
    <li onClick={props.onClick} className={`hover:bg-gray-100 cursor-pointer`}>
      <Link
        className={`flex flex-col justify-center items-center h-20 w-20 text-gray-600 ${props.className}`}
        href={props.url ? props.url : '#'}
      >
        {props.icone} <span className="text-xs font-light">{props.texto}</span>
      </Link>
    </li>
  );
}
