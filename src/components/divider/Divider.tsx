import classNames from "classnames";
import styles from "./Divider.module.scss";

interface IDividerProps {
  space?: number;
  color?: string;
  className?: string;
  [x: string]: any;
}

const Divider = ({
  space = 22,
  color = "#ccc",
  className = "",
  ...restProps
}: IDividerProps) => {
  const style = {
    marginTop: space,
    marginBottom: space,
    background: color,
  };
  return (
    <div
      role="presentation"
      className={classNames(styles.line, className)}
      style={style}
      {...restProps}
    />
  );
};

export default Divider;
