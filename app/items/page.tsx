"use client";

import { useEffect, useState } from "react";
import locationsData from "./data/locations";
import Search from "../components/Search";

type Item = {
  id: number;
  name: string;
  detail: string;
  obtained: boolean;
};

type Location = {
  name: string;
  items: Item[];
};

const Items = () => {
  const [data, setData] = useState<Location[]>(locationsData);
  const [showObtained, setShowObtained] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const obtainedIds = localStorage.getItem("obtained") || "[]";
    if (obtainedIds.length <= 2) return;

    setData((locations) => {
      return locations.map((location) => {
        const ids = JSON.parse(obtainedIds);
        return {
          name: location.name,
          items: location.items.map((item) => ({ ...item, obtained: ids.includes(item.id) })),
        };
      });
    });
  }, []);

  useEffect(() => {
    const obtainedIds: number[] = [];
    data.forEach((location) => {
      location.items.forEach((item) => {
        if (item.obtained) obtainedIds.push(item.id);
      });
    });
    localStorage.setItem("obtained", JSON.stringify(obtainedIds));
  }, [data]);

  function handleChange(id: number) {
    setData((locations) => {
      return locations.map((location) => {
        return {
          name: location.name,
          items: location.items.map((item) =>
            item.id == id ? { ...item, obtained: !item.obtained } : item
          ),
        };
      });
    });
  }

  let locations = data;

  if (!showObtained) {
    locations = locations
      .map((location) => ({
        name: location.name,
        items: location.items.filter((item) => !item.obtained),
      }))
      .filter((location) => location.items.length);
  }

  if (search) {
    const keyword = new RegExp(search, "i");
    locations = locations
      .map((location) => ({
        name: location.name,
        items: location.items.filter(
          (item) => keyword.test(item.name) || keyword.test(location.name)
        ),
      }))
      .filter((location) => location.items.length);
  }

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

  const rows = locations.map((location, i) => (
    <table
      className="mb-2 w-full border-collapse bg-white text-black rounded-b-lg overflow-hidden"
      key={i}
    >
      <caption className="font-bold text-lg text-white border rounded-t-lg">
        {getText(location.name)}
      </caption>
      {location.items.map((item, i) => (
        <tbody key={i}>
          <tr
            className={`${
              item.obtained ? "bg-green-300" : ""
            } text-black item-row hover:bg-green-300`}
          >
            <td className="w-[24ch]">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  name="complete"
                  className="mr-2 cursor-pointer"
                  onChange={() => handleChange(item.id)}
                  checked={item.obtained}
                />
                {getText(item.name)}
              </label>
            </td>
            <td>
              <label className="font-medium">{item.detail}</label>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  ));

  return (
    <>
      <div className="relative">
        <div className="absolute right-0">
          <button
            className={`px-2 py-1 rounded-lg ${
              showObtained ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={() => setShowObtained(!showObtained)}
          >
            {showObtained ? "Hide Obtained Items" : "Show Obtained Items"}
          </button>
          <button
            className="bg-red-600 px-2 py-1 ml-2 rounded-lg hover:bg-red-700"
            onClick={() => {
              if (!confirm("Are you sure want to reset?")) return;
              localStorage.setItem("obtained", "[]");
              setData(locationsData);
            }}
          >
            Reset
          </button>
        </div>
        <Search
          search={search}
          placeholder="Search for item or location..."
          handleSearch={(e) => setSearch(e.target.value.replace(/[^a-z0-9\s-]/gi, ""))}
        />
        {rows}
      </div>
    </>
  );
};

export default Items;
