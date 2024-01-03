import style from "./BreadCrumbs.module.scss";

interface BreadCrumbsProps {
  root: string;
  category: string;
  detailCategory?: string;
  fontSize?: string;
  [x: string]: any;
}
const BreadCrumbs = ({
  root,
  category,
  detailCategory,
  fontSize,
  ...restProps
}: BreadCrumbsProps) => {
  const fontSizeStyle = {
    fontSize: fontSize || "",
  };
  return (
    <div className={style.container} style={fontSizeStyle}>
      <p className={style.bread}>{root}</p>
      <p className={style.bread}>{category}</p>
      {detailCategory && <p className={style.bread}>{detailCategory}</p>}
    </div>
  );
};

export default BreadCrumbs;
