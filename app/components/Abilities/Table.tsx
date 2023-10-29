type Props = {
  children: React.ReactNode;
};

const Table = ({ children }: Props) => {
  return (
    <table className="border-collapse bg-white text-black rounded-lg overflow-hidden text-center m-auto">
      <thead>
        <tr>
          <th className="w-[8%]">Entries</th>
          <th className="w-[23%]">Species</th>
          <th className="w-[23%]">Regular Ability</th>
          <th className="w-[23%]">Hidden Ability</th>
          <th className="w-[23%]">Options</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
