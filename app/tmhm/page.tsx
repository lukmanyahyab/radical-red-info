"use client";
import { useState } from "react";
import tmhms from "./data/thmh";

const TmHm = () => {
  const [search, setSearch] = useState("");

  const rowsData = tmhms.filter((tmhm) => {
    const keyword = new RegExp(search, "i");
    return keyword.test(tmhm.entries) || keyword.test(tmhm.name) || keyword.test(tmhm.location);
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
          placeholder="Search for TM or HM... (Shift + Enter)"
          className="w-1/3"
          id="search"
        />
      </div>
      <table className="border-collapse bg-white text-black rounded-lg overflow-hidden text-center m-auto min-w-[75%]">
        <thead>
          <tr>
            <th>Entries</th>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {rowsData.map((row) => (
            <tr>
              <td>{getText(row.entries)}</td>
              <td>{getText(row.name)}</td>
              <td>{getText(row.location)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TmHm;
