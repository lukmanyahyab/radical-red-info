"use client";
import { useState } from "react";
import tutors from "./data/tutor";
import Table from "../components/Table";
import Search from "../components/Search";

const Tutor = () => {
  const [search, setSearch] = useState("");

  const rowsData = tutors.filter((tutor) => {
    const keyword = new RegExp(search, "i");
    return keyword.test(tutor.move) || keyword.test(tutor.location);
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
        placeholder="Search for move or location... (Shift + Enter)"
        handleSearch={(e) => setSearch(e.target.value.replace(/[^a-z0-9\s]/gi, ""))}
      />
      <Table columns={["Moves", "From", "Locations", "Prices"]}>
        {rowsData.map((row) => (
          <tr>
            <td>{getText(row.move)}</td>
            <td>{row.from}</td>
            <td>{getText(row.location)}</td>
            <td>{row.price}</td>
          </tr>
        ))}
      </Table>
    </>
  );
};

export default Tutor;
