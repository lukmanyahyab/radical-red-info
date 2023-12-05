type Props = {
  open: boolean;
  title: string;
  children: React.ReactNode;
};

const Dialog = ({ open, title, children }: Props) => {
  return (
    <div
      className="fixed inset-0 bg-slate-900/80 flex items-center backdrop-blur-sm"
      style={{ display: open ? "flex" : "none" }}
    >
      <dialog open={open} className="mb-[10%] p-2 bg-[#cacaca] rounded-lg">
        <h2 className="mt-0 text-center font-bold text-xl">{title} Pokemon</h2>
        <hr className="my-2 bg-white h-1" />
        {children}
      </dialog>
    </div>
  );
};

export default Dialog;
