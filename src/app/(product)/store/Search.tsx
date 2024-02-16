"use client";

const Search = () => {
  return (
    <div className="relative font-family">
      <input
        className="w-[710px] h-[50px] bg-white rounded-[10px] border border-zinc-300 focus:outline-none p-3 text-lg text-zinc-300"
        placeholder="상품을 검색해주세요"
      />
      <button className="w-[100px] h-[50px] bg-black rounded-tr-[10px] rounded-br-[10px] border border-zinc-300 absolute right-0 top-0 text-white text-xl font-bold">
        검색
      </button>
    </div>
  );
};

export default Search;
