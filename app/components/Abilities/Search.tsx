type Props = {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ search, handleSearch }: Props) => {
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for species or ability..."
        className="min-w-[25%]"
      />
    </div>
  );
};

export default Search;
