"use client";

import { useEffect, useState } from "react";
import locationsData from "./data/locations";

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
    locations = locations.map((location) => {
      return { name: location.name, items: location.items.filter((item) => !item.obtained) };
    });
    locations = locations.filter((location) => location.items.length);
  }

  const rows = locations.map((location, i) => (
    <table
      className="mb-2 w-full border-collapse bg-white text-black rounded-lg overflow-hidden"
      key={i}
    >
      <thead>
        <tr>
          <th className="font-bold text-lg text-black" colSpan={2}>
            {location.name}
          </th>
        </tr>
      </thead>
      {location.items.map((item, i) => (
        <tbody key={i}>
          <tr className={`${item.obtained ? "bg-green-300" : ""} text-black no-hover`}>
            <td className="w-[24ch]">
              <input
                type="checkbox"
                name="complete"
                className="mr-2"
                onChange={() => handleChange(item.id)}
                checked={item.obtained}
              />
              <span>{item.name}</span>
            </td>
            <td>
              <span className="font-medium">{item.detail}</span>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  ));

  return (
    <>
      <div className="float-right">
        <button
          className={`p-2 mb-2 rounded-lg ${
            showObtained ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() => setShowObtained(!showObtained)}
        >
          {showObtained ? "Hide Obtained Items" : "Show Obtained Items"}
        </button>
        <button
          className="bg-red-500 p-2 ml-2 rounded-lg hover:bg-red-600"
          onClick={() => {
            if (!confirm("Are you sure want to reset?")) return;
            localStorage.setItem("obtained", "[]");
            setData(locationsData);
          }}
        >
          Reset
        </button>
      </div>
      {rows}
    </>
  );
};

export default Items;
