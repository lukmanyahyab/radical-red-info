"use client";

import { useEffect, useState } from "react";
import locations from "./data/locations";

const Items = () => {
  const [data, setData] = useState(locations);

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

  return (
    <>
      {data.map((location, i) => (
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
              <tr
                className={`${item.obtained ? "bg-green-300" : "bg-red-300"} text-black no-hover`}
              >
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
      ))}
    </>
  );
};

export default Items;
