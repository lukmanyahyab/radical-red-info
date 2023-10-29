import tmhms from "./data/thmh";

const TmHm = () => {
  return (
    <table className="border-collapse bg-white text-black rounded-lg overflow-hidden text-center m-auto min-w-[75%]">
      <thead>
        <tr>
          <th>Entries</th>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {tmhms.map((tmhm) => (
          <tr>
            <td>{tmhm.entries}</td>
            <td>{tmhm.name}</td>
            <td>{tmhm.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TmHm;
