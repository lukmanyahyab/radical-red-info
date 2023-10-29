"use client";

import { useEffect, useState } from "react";
import Form from "../components/Abilities/Form";
import Input from "../components/Abilities/Input";
import Table from "../components/Abilities/Table";
import TableRows from "../components/Abilities/TableRows";
import Button from "../components/Abilities/Button";
import Search from "../components/Abilities/Search";
import DataList from "../components/Abilities/DataList";
import abilities from "@/app/abilities/data/abilities";
import species from "@/app/abilities/data/species";

type FormState = {
  id: number;
  species: string;
  regular: string;
  hidden: string;
};

const Abilities: React.FC = () => {
  const [form, setForm] = useState<FormState>({ id: -1, species: "", regular: "", hidden: "" });
  const [rows, setRows] = useState<FormState[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const pokemons = localStorage.getItem("pokemons") || "[]"; // Get Pokemon From Local Storage
    if (pokemons.length > 2) setRows(JSON.parse(pokemons)); // Set Table Rows From Local Storage
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemons", JSON.stringify(rows)); // Update Local Storage If Rows Changes
  }, [rows]);

  function generateId() {
    const id = ~~(Math.random() * 100000) + 1;
    const isExists = rows.find((row) => row.id == id);
    if (isExists) return generateId();
    return id;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((oldForm) => ({ ...oldForm, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const pokemon = rows.find((row) => row.id == form.id); // Finding Pokemon
    if (pokemon) {
      // Edit Pokemon
      setRows((prevRows) => prevRows.map((row) => (row.id == pokemon.id ? form : row)));
    } else {
      // Add Pokemon
      setRows((prevRows) => [
        ...prevRows,
        {
          id: generateId(),
          species: form.species,
          regular: form.regular || "Unknown",
          hidden: form.hidden || "Unknown",
        },
      ]);
    }
    setForm({ id: -1, species: "", regular: "", hidden: "" });
    setOpenModal(false);
  }

  function handleEdit(id: number) {
    const pokemon = rows.find((row) => row.id == id);
    setForm(pokemon || form);
    setOpenModal(true);
  }

  function handleDelete(id: number) {
    if (!confirm("Are you sure?")) return;
    const filtered = rows.filter((row) => row.id != id);
    setRows(filtered);
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement;

    if (target.innerText === "Cancel") {
      e.preventDefault();
      setForm({ id: -1, species: "", regular: "", hidden: "" });
      setOpenModal(false);
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setSearch(value);
  }

  function findData(datalist: string[], keyword: string) {
    const rules = new RegExp(`${keyword}`, "i");
    return datalist.find((data) => data.match(rules));
  }

  function handleFocusOut(e: React.FocusEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    let data = name === "species" ? findData(species, value) : findData(abilities, value);
    setForm((prev) => ({ ...prev, [name]: data || prev[name as keyof FormState] }));
  }

  const rowsData = rows.slice().filter((row) => {
    const keyword = new RegExp(search, "i");
    return keyword.test(row.species) || keyword.test(row.regular) || keyword.test(row.hidden);
  });

  return (
    <>
      <button
        className="absolute right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl"
        onClick={() => {
          if (confirm("Are you sure?")) setRows([]);
        }}
      >
        Delete All
      </button>
      <Form handleSubmit={handleSubmit}>
        <Input
          label="Species"
          list="species"
          name="species"
          handleChange={handleChange}
          handleFocusOut={handleFocusOut}
          placeholder="Pokemon's name..."
          value={form.species}
          required
        />
        <Input
          label="Regular Ability"
          list="abilities"
          name="regular"
          handleChange={handleChange}
          handleFocusOut={handleFocusOut}
          placeholder="eg: Huge Power"
          value={form.regular}
          required={false}
        />
        <Input
          label="Hidden Ability"
          list="abilities"
          name="hidden"
          handleChange={handleChange}
          handleFocusOut={handleFocusOut}
          placeholder="eg: Feline Prowess"
          value={form.hidden}
          required={false}
        />
        <Button
          handleClick={handleClick}
          style={{ bg: "bg-green-600", hover: "hover:bg-green-700" }}
        >
          Add
        </Button>
        <DataList data={abilities} id="abilities" />
        <DataList data={species} id="species" />
      </Form>
      <Search search={search} handleSearch={handleSearch} />
      <Table>
        <TableRows rows={rowsData} handleDelete={handleDelete} handleEdit={handleEdit} />
      </Table>

      <div
        className="fixed inset-0 bg-slate-900/80 flex items-center backdrop-FocusOut-sm"
        style={{ display: openModal ? "flex" : "none" }}
      >
        <dialog open={openModal} className="mb-[10%] p-2 bg-[#cacaca] rounded-lg">
          <h2 className="mt-0 text-center font-bold text-xl">Edit Pokemon</h2>
          <hr className="my-2 bg-white h-1" />
          <Form handleSubmit={handleSubmit}>
            <input type="hidden" name="id" value={form.id} />
            <Input
              label="Species"
              list="species"
              name="species"
              handleChange={handleChange}
              handleFocusOut={handleFocusOut}
              placeholder="Pokemon's name..."
              value={form.species}
              required
            />
            <Input
              label="Regular Ability"
              list="abilities"
              name="regular"
              handleChange={handleChange}
              handleFocusOut={handleFocusOut}
              placeholder="eg: Huge Power"
              value={form.regular}
              required={false}
            />
            <Input
              label="Hidden Ability"
              list="abilities"
              name="hidden"
              handleChange={handleChange}
              handleFocusOut={handleFocusOut}
              placeholder="eg: Feline Prowess"
              value={form.hidden}
              required={false}
            />
            <Button
              handleClick={handleClick}
              style={{ bg: "bg-green-600", hover: "hover:bg-green-700" }}
            >
              Change
            </Button>
            <Button
              handleClick={handleClick}
              style={{ bg: "bg-red-600", hover: "hover:bg-red-700" }}
            >
              Cancel
            </Button>
          </Form>
        </dialog>
      </div>
    </>
  );
};

export default Abilities;
