type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

const Form = ({ handleSubmit, children }: Props) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 w-fit m-auto mb-4 p-2 md:flex-row flex-col flex-wrap -my-2"
    >
      {children}
    </form>
  );
};

export default Form;
