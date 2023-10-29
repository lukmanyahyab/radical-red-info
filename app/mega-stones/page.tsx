import stones from "./data/stones";

const MegaStones = () => {
  return (
    <table className="border-collapse bg-white text-black rounded-lg overflow-hidden text-center m-auto min-w-[75%]">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {stones.map((stone) => (
          <tr>
            <td>{stone.name}</td>
            <td>{stone.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MegaStones;
