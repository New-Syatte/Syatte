interface IHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  fontSize?: string;
}

const Heading = ({
  title,
  subtitle,
  center,
  fontSize = "3xl",
}: IHeadingProps) => {
  return (
    <div className="px-4 sm:px-0 sm:w-full">
      <div className={center ? "text-center" : ""}>
        <div className={`text-${fontSize} font-bold`}>{title}</div>
        <div className="mt-4 text-sm">{subtitle}</div>
      </div>
    </div>
  );
};

export default Heading;
