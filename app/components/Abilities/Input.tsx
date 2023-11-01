type Props = {
  label: string;
  list: string;
  name: string;
  placeholder: string;
  value: string;
  required: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocusOut: (e: any) => void;
};

const Input = ({
  label,
  list,
  name,
  placeholder,
  value,
  required,
  handleChange,
  handleFocusOut,
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-1 -my-2">
      <label className="font-medium">{label}</label>
      <input
        list={list}
        name={name}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        required={required}
        onClick={(e: any) => e.target.select()}
        onBlur={handleFocusOut}
      />
    </div>
  );
};

export default Input;
