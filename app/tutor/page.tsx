"use client";
import { useState } from "react";
import tutors from "./data/tutor";

const Tutor = () => {
  const [search, setSearch] = useState("");

  const rowsData = tutors.filter((tutor) => {
    const keyword = new RegExp(search, "i");
    return (
      keyword.test(tutor.move) ||
      keyword.test(tutor.from) ||
      keyword.test(tutor.location) ||
      keyword.test(tutor.price)
    );
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
      <div className="my-4 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value.replace(/[^a-z0-9\s]/gi, ""))}
          placeholder="Search for stone or location... (Shift + Enter)"
          className="w-1/3"
          id="search"
        />
      </div>
      <table className="border-collapse bg-white text-black rounded-lg overflow-hidden text-center m-auto min-w-[75%]">
        <thead>
          <tr>
            <th>Move</th>
            <th>From</th>
            <th>Location</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rowsData.map((row) => (
            <tr>
              <td>{getText(row.move)}</td>
              <td>{getText(row.from)}</td>
              <td>{getText(row.location)}</td>
              <td>{getText(row.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tutor;
