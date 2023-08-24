import SearchIcon from "../Icons/Search";
import "./searchbar.css";

export default function Searchbar() {
  return (
    <div className='flex bg-light-grey w-full h-10 mt-2 rounded-[22px] gap-4 ml-6'>
      <SearchIcon className='ml-4 aspect-square w-6' />
      <input
        className='bg-light-grey focus:outline-none'
        placeholder='Search'
      />
    </div>
  );
}
