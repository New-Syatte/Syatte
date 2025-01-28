"use client";
// legacy
// (product/store/Search.tsx)
import { setSearchQuery } from "@/redux/slice/searchSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import URLS from "@/constants/urls";

const Search = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = () => {
    dispatch(setSearchQuery(searchValue));
    if (pathname === "/store") {
      // router.push(URLS.PRODUCT_STORE_SEARCH);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="relative font-family">
      <input
        className="w-[710px] h-[50px] bg-white rounded-[10px] border border-zinc-300 focus:outline-none p-3 text-lg text-zinc-300"
        placeholder="상품을 검색해주세요"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="w-[100px] h-[50px] bg-black rounded-tr-[10px] rounded-br-[10px] border border-zinc-300 absolute right-0 top-0 text-white text-xl font-bold"
        onClick={handleSearch}
      >
        검색
      </button>
    </div>
  );
};

export default Search;
