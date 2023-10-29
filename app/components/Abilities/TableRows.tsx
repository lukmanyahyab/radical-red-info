type FormState = {
  id: number;
  species: string;
  regular: string;
  hidden: string;
};

type Props = {
  rows: FormState[];
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

function getStyle(ability: string) {
  if (!ability || ability.match(/(None|Unknown)/i)) return "text-red-600";
  return "text-green-600";
}

const TableRows = ({ rows, handleDelete, handleEdit }: Props) => {
  return (
    <>
      {rows.map((row, i) => (
        <tr key={i}>
          <td>{++i}</td>
          <td>{row.species}</td>
          <td className={getStyle(row.regular)}>{row.regular}</td>
          <td className={getStyle(row.hidden)}>{row.hidden}</td>
          <td className="flex gap-4 justify-center border-0 [&>*]:basis-1/2 [&>*]:border-0 [&>*]:rounded-lg [&>*]:text-white [&>*]:h-6 [&>*]:transition [&>*]:duration-300">
            <button
              className="bg-blue-600 hover:bg-blue-700 scale-90"
              onClick={() => handleEdit(row.id)}
            >
              Change
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 scale-90"
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableRows;
