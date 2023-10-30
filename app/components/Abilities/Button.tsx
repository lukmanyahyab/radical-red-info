type Props = {
  children: React.ReactNode;
  style: { bg: string; hover: string };
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ children, style, handleClick }: Props) => {
  return (
    <button
      className={`py-[0.25rem] px-3 rounded-lg border-0 text-white self-end ${style.bg} ${style.hover}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
