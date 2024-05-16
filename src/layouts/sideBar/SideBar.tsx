import Link from "next/link";

type Props = {
  linkArray: Array<string>;
  activeParams?: string;
  listStr: Array<string>;
  [key: string]: any;
};

const SideBar = ({ linkArray, activeParams, listStr, ...restProps }: Props) => {
  return (
    <div className="w-1/6 sm:w-[90%]">
      <ul className="flex flex-col justify-center items-start gap-2 w-full h-auto border border-lightGray bg-bgWhiteSmoke p-5 rounded-md">
        {linkArray.map((link, index) => (
          <li
            key={index}
            className={`w-full cursor-pointer before:content-["•"] before:mr-4 last:border-t last:border-lightGray last:pt-2 font-bold text-lg`}
          >
            <Link href={link} className="whitespace-nowrap">
              {listStr[index].toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
