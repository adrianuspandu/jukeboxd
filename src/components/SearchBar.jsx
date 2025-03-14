import searchIcon from "../assets/search-icon.svg";

export default function SearchBar({action, placeholder}) {
  return (
    <form
      action={action}
      className="flex flex-row justify-center items-center gap-1"
    >
      <div className="inline-flex flex-row border-2 rounded-sm p-0.5">
        <img src={searchIcon} className="w-[24px]" />
        <input
          type="text"
          name="query"
          placeholder={placeholder}
          aria-label="Search an album"
          required
          className="p-0.8 text-base w-sm ml-1 focus:outline-0"
        />
      </div>
      <button type="submit" className="border-2 m-0 py-0.5 px-1.5 rounded-sm cursor-pointer hover:bg-grayaccent">
        Search
      </button>
    </form>
  );
}
