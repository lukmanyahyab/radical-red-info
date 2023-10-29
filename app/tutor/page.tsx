import tutors from "./data/tutor";

const Tutor = () => {
  return (
    <table className="border-collapse bg-white text-black rounded-lg overflow-hidden text-center m-auto min-w-[75%]">
      <thead>
        <tr>
          <th>Location</th>
          <th>From</th>
          <th>Move</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {tutors.map((tutor) => (
          <tr>
            <td>{tutor.location}</td>
            <td>{tutor.from}</td>
            <td>{tutor.move}</td>
            <td>{tutor.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tutor;
