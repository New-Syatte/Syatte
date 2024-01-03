type Props = {
  text: string;
  size?: "small" | "big";
  onClick: () => void;
};

export default function ColorButton({ text, size = "small", onClick }: Props) {
  return (
    <div
      className={`rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300
      ${size === "big" ? "p-[0.3rem]" : "p-[0.15rem]"}`}
    >
      <button
        className={`bg-white rounded-sm text-base hover:opacity-90 transition-opacity
              ${size === "big" ? "p-4 text-2xl" : "p-[0.3rem] text-base"}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
