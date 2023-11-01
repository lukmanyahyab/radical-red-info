type Props = {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ search, handleSearch }: Props) => {
  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        value={search.replace(/[^a-z0-9\s]/gi, "")}
        onChange={handleSearch}
        placeholder="Search for species or ability... (Shift + Enter)"
        className="w-1/3"
        id="search"
      />
    </div>
  );
};

export default Search;
