import SideBar from "@/layouts/sideBar/SideBar";
import { categorys } from "@/constants/categorys";
import Image from "next/image";
import RouteComplete from "@/utils/RouteComplete";

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { category: string };
}) => {
  const linkArray = categorys.map(category => {
    return `/products/${category.value}`;
  });
  const listStr = categorys.map(category => category.title);
  const matchingCategory = categorys.find(
    category =>
      category.title.replaceAll(" ", "").toLowerCase() ===
      params.category.toLowerCase(),
  );
  return (
    <RouteComplete>
      <section className="w-full mx-auto mb-[200px] flex flex-col justify-around items-center">
        <header className="w-full h-[504px] mb-20 flex flex-col justify-start items-center relative bg-bgGray">
          <div className="w-[1280px] h-[420px] flex justify-between items-end">
            <h2 className="text-6xl font-bold text-black mb-9 whitespace-break-spaces w-[660px] z-10">
              {matchingCategory?.title}
            </h2>
            <Image
              src={`/product-banner/${params.category}.jpg`}
              alt="img"
              className="absolute -bottom-[73px] z-0"
              loading="lazy"
              fill={true}
            />
          </div>
          <div className="w-full bg-white h-[84px]" />
        </header>
        <article className="flex gap-[73px] w-[1280px]">
          <SideBar
            linkArray={linkArray}
            activeParams={params.category}
            listStr={listStr}
          />
          <div className="flex flex-col gap-[73px]">{children}</div>
        </article>
      </section>
    </RouteComplete>
  );
};

export default layout;
