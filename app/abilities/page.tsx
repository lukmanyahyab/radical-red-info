"use client";

import { useEffect, useState } from "react";
import Form from "../components/Abilities/Form";
import Input from "../components/Abilities/Input";
import Search from "../components/Search";
import Table from "../components/Table";
import TableRows from "../components/Abilities/TableRows";
import Button from "../components/Abilities/Button";
import DataList from "../components/Abilities/DataList";
import abilities from "@/app/abilities/data/abilities";
import species from "@/app/abilities/data/species";
import Dialog from "../components/Abilities/Dialog";

type FormState = {
  id: number;
  species: string;
  regular: string;
  hidden: string;
};

const Abilities: React.FC = () => {
  const [form, setForm] = useState<FormState>({ id: -1, species: "", regular: "", hidden: "" });
  const [rows, setRows] = useState<FormState[]>([]);
  const [openModal, setOpenModal] = useState<string>("");
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
    setOpenModal("");
  }

  function handleEdit(id: number) {
    const pokemon = rows.find((row) => row.id == id);
    setForm(pokemon || form);
    setOpenModal("Edit");
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
      setOpenModal("");
    }
  }

  function findData(datalist: string[], keyword: string) {
    const rules = new RegExp(`${keyword}`, "i");
    return datalist.find((data) => data.match(rules));
  }

  function handleFocusOut(e: React.FocusEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    if (!value) return;
    let data = name === "species" ? findData(species, value) : findData(abilities, value);
    setForm((prev) => ({ ...prev, [name]: data || prev[name as keyof FormState] }));
  }

  return (
    <>
      <div className="flex justify-center gap-4 mb-4">
        <button
          className="bg-green-700 hover:bg-green-800 text-white py-[0.25rem] px-3 rounded-lg"
          onClick={() => setOpenModal("Add")}
        >
          Add Pokemon
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-[0.25rem] px-3 rounded-lg"
          onClick={() => (confirm("Are you sure?") ? setRows([]) : null)}
        >
          Delete All
        </button>
      </div>
      <Search
        search={search}
        placeholder="Search for species or ability..."
        handleSearch={(e) => setSearch(e.target.value.replace(/[^a-z0-9\s-]/gi, ""))}
      />
      {rows.length ? (
        <Table columns={["#", "Species", "Regular Ability", "Hidden Ability", "Options"]}>
          <TableRows
            rows={rows}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            search={search}
          />
        </Table>
      ) : (
        <h1 className="m-auto text-center font-bold rounded bg-red-600 max-w-xs">No Entries</h1>
      )}
      <Dialog open={openModal === "Add"} title="Add">
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
            placeholder="ex: Huge Power"
            value={form.regular}
            required={false}
          />
          <Input
            label="Hidden Ability"
            list="abilities"
            name="hidden"
            handleChange={handleChange}
            handleFocusOut={handleFocusOut}
            placeholder="ex: Feline Prowess"
            value={form.hidden}
            required={false}
          />
          <Button
            handleClick={handleClick}
            style={{ bg: "bg-green-700", hover: "hover:bg-green-800" }}
          >
            Add
          </Button>
          <Button handleClick={handleClick} style={{ bg: "bg-red-600", hover: "hover:bg-red-700" }}>
            Cancel
          </Button>
          <DataList data={abilities} id="abilities" />
          <DataList data={species} id="species" />
        </Form>
      </Dialog>
      {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      <Dialog open={openModal === "Edit"} title="Edit">
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
            placeholder="ex: Huge Power"
            value={form.regular}
            required={false}
          />
          <Input
            label="Hidden Ability"
            list="abilities"
            name="hidden"
            handleChange={handleChange}
            handleFocusOut={handleFocusOut}
            placeholder="ex: Feline Prowess"
            value={form.hidden}
            required={false}
          />
          <Button
            handleClick={handleClick}
            style={{ bg: "bg-green-700", hover: "hover:bg-green-800" }}
          >
            Change
          </Button>
          <Button handleClick={handleClick} style={{ bg: "bg-red-600", hover: "hover:bg-red-700" }}>
            Cancel
          </Button>
        </Form>
      </Dialog>
    </>
  );
};

export default Abilities;
