import Icon from "./Icon";

interface SliderArrowProps {
  className?: any;
  style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  type: "left" | "right";
}
const SliderArrow = ({ className, style, onClick, type }: SliderArrowProps) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", position: "relative" }}
      onClick={onClick}
    >
      <Icon type={type} fill />
    </div>
  );
};

export default SliderArrow;
