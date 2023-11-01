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
  search: string;
};

function getStyle(ability: string) {
  if (!ability || ability.match(/(None|Unknown)/i)) return "text-red-600";
  return "text-green-600";
}

const TableRows = ({ rows, handleDelete, handleEdit, search }: Props) => {
  const rowsData = rows.filter((row) => {
    const keyword = new RegExp(search, "i");
    return keyword.test(row.species) || keyword.test(row.regular) || keyword.test(row.hidden);
  });

  function getText(text: string) {
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return (
      <>
        {parts.map((part, i) => {
          const isHighlight = i % 2 === 1;
          if (isHighlight)
            return (
              <span key={i} className="bg-yellow-300">
                {part}
              </span>
            );
          else return part;
        })}
      </>
    );
  }

  return (
    <>
      {rowsData.map((row, i) => (
        <tr key={i}>
          <td>{++i}</td>
          <td>{getText(row.species)}</td>
          <td className={getStyle(row.regular)}>{getText(row.regular)}</td>
          <td className={getStyle(row.hidden)}>{getText(row.hidden)}</td>
          <td className="flex gap-4 justify-center border-0 [&>*]:basis-1/2 [&>*]:border-0 [&>*]:rounded-lg [&>*]:text-white [&>*]:h-6 [&>*]:transition [&>*]:duration-300">
            <button
              className="bg-blue-600 hover:bg-blue-700 scale-90 px-2"
              onClick={() => handleEdit(row.id)}
            >
              Change
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 scale-90 px-2"
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
