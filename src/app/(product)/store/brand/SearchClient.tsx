"use client";
// legacy
// (product)/store/search
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { getProducts } from "@/services/sanity/products";
import ProductCards from "../ProductCards";
import { Product } from "@/type/products";

const SearchClient = () => {
  const { data, error } = useSWR("getProducts", getProducts);
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery,
  );
  const [matchingResults, setMatchingResults] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const results = data.filter(
        (product: Product) =>
          product.productName.includes(searchQuery) ||
          product.mainCategory.includes(searchQuery) ||
          product.subCategory.includes(searchQuery),
      );
      setMatchingResults(results);
    }
  }, [data, searchQuery]);

  if (error) return <div>Failed to load products</div>;

  return (
    <div className="w-full">
      <h3 className="text-black text-[40px] font-bold">
        검색 결과 {`(${matchingResults.length}건)`}
      </h3>
      {matchingResults.length > 0 ? (
        <ProductCards products={matchingResults} />
      ) : (
        <div>준비중입니다.</div>
      )}
    </div>
  );
};

export default SearchClient;
