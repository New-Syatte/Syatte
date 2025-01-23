"use client";
// legacy
// (product)/store
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/slice/searchSlice";

interface CategoryToSearchLinkProps {
  to: string;
  searchQuery: string;
  [x: string]: any;
  children: React.ReactNode;
}
const CategoryToSearchLink = ({
  to,
  searchQuery,
  children,
  ...restProps
}: CategoryToSearchLinkProps) => {
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(setSearchQuery(searchQuery));
  };
  return (
    <Link
      href={to}
      {...restProps}
      onClick={handleSearch}
      className="sm:flex sm:justify-center sm:items-center"
    >
      {children}
    </Link>
  );
};

export default CategoryToSearchLink;
