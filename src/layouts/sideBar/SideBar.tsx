import Link from "next/link";

type Props = {
  linkArray: Array<string>;
  activeParams?: string;
  listStr: Array<string>;
  [key: string]: any;
};

const SideBar = ({ linkArray, activeParams, listStr, ...restProps }: Props) => {
  return (
    <ul className="flex flex-col w-[257px]">
      <h2 className="mb-9 text-[32px] font-bold">MENU</h2>
      {linkArray.map((link, index) => (
        <li
          key={index}
          className={`mb-8 ${
            activeParams === link ? "font-bold" : ""
          } hover:underline`}
        >
          <Link href={link} className="whitespace-nowrap">
            {listStr[index].toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SideBar;
