type Props = {
  columns: string[];
  children: React.ReactNode;
};

const Table = ({ columns, children }: Props) => {
  return (
    <table className="border-collapse bg-white text-black rounded-lg overflow-hidden m-auto">
      <thead>
        <tr>
          {columns.map((column, i) => (
            <th key={i}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
