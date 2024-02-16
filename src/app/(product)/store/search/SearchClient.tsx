"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { getProducts } from "@/services/sanity/products";
import ProductCards from "../ProductCards";

const SearchClient = () => {
  const { data, error } = useSWR("getProducts", getProducts);
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery,
  );
  const [matchingResults, setMatchingResults] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const results = data.filter(
        (product: any) =>
          product.productName.includes(searchQuery) ||
          product.category.includes(searchQuery) ||
          product.detailCategory.includes(searchQuery),
      );
      setMatchingResults(results);
    }
  }, [data, searchQuery]);

  return (
    <div className="w-full">
      <h3 className="text-black text-[40px] font-bold">
        검색 결과 {`(${matchingResults.length}건)`}
      </h3>
      {matchingResults.length > 0 ? (
        <ProductCards products={matchingResults} />
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default SearchClient;
