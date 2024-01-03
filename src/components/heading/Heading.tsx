import styles from "./Heading.module.scss";

interface IHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const Heading = ({ title, subtitle, center, fontSize='3xl' }: IHeadingProps) => {
  return (
    <div className="px-4">
      <div className={center ? "text-center" : ""}>
        <div className={`text-${fontSize} font-bold`}>{title}</div>
        <div className="mt-4 text-sm">{subtitle}</div>
      </div>
    </div>
  );
};

export default Heading;
