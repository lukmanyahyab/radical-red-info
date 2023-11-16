"use client";
import { useState } from "react";
import tmhms from "./data/thmh";
import Table from "../components/Table";
import Search from "../components/Search";

const TmHm = () => {
  const [search, setSearch] = useState("");

  const rowsData = tmhms.filter((tmhm) => {
    const keyword = new RegExp(search, "i");
    return keyword.test(tmhm.move) || keyword.test(tmhm.type) || keyword.test(tmhm.location);
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
        placeholder="Search for move, type or location... (Shift + Enter)"
        handleSearch={(e) => setSearch(e.target.value.replace(/[^a-z0-9\s]/gi, ""))}
      />
      <Table columns={["Entries", "Moves", "Types", "Locations"]}>
        {rowsData.map((row) => (
          <tr>
            <td>{getText(row.entries)}</td>
            <td>{getText(row.move)}</td>
            <td>{getText(row.type)}</td>
            <td>{getText(row.location)}</td>
          </tr>
        ))}
      </Table>
    </>
  );
};

export default TmHm;
