"use client";
import { useState } from "react";
import stones from "./data/stones";
import Table from "../components/Table";
import Search from "../components/Search";

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
      <Search
        search={search}
        placeholder="Search for stone or location... (Shift + Enter)"
        handleSearch={(e) => setSearch(e.target.value.replace(/[^a-z0-9\s]/gi, ""))}
      />
      <Table columns={["Stones", "From", "Locations", "Requirements"]}>
        {rowsData.map((row) => (
          <tr>
            <td>{getText(row.name)}</td>
            <td>{row.from}</td>
            <td>{getText(row.location)}</td>
            <td>{row.requirement}</td>
          </tr>
        ))}
      </Table>
    </>
  );
};

export default MegaStones;
