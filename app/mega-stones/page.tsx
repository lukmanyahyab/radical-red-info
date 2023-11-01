"use client";
import { useState } from "react";
import stones from "./data/stones";
import Table from "../components/Table";

const MegaStones = () => {
  const [search, setSearch] = useState("");

  const rowsData = stones.filter((stone) => {
    const keyword = new RegExp(search, "i");
    return keyword.test(stone.name) || keyword.test(stone.location);
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
      <Table columns={["Name", "Location"]}>
        {rowsData.map((row) => (
          <tr>
            <td>{getText(row.name)}</td>
            <td>{getText(row.location)}</td>
          </tr>
        ))}
      </Table>
    </>
  );
};

export default MegaStones;
