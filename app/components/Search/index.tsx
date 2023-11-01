type Props = {
  search: string;
  placeholder: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ search, placeholder, handleSearch }: Props) => {
  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder={placeholder}
        className="w-1/3"
        id="search"
      />
    </div>
  );
};

export default Search;
