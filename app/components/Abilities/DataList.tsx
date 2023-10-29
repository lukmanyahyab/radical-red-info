type Props = { data: string[]; id: string };
const DataList = ({ data, id }: Props) => {
  return (
    <datalist id={id}>
      {data.map((value, i) => (
        <option value={value} key={i}></option>
      ))}
    </datalist>
  );
};

export default DataList;
