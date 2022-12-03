import React, { useState } from "react";

// context
import { useUserContext } from "../context/UserContext";

// components
import Gallery from "./Gallery";

// icons
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const { vehicles } = useUserContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value.trim());

    // filtering vehicles based o search query
    setSearchResult(
      vehicles.filter((vehicle) =>
        vehicle.registrationNumber.includes(e.target.value.trim().toUpperCase())
      )
    );
  };

  return (
    <>
      <div className="flex justify-center items-center border-2 leading-8 border-solid border-primary-bg bg sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] mx-auto rounded  gap-5">
        <input
          type="text"
          className="w-full  bg-primary-font px-5 caret-primary-bg focus-within:border-none"
          onChange={handleOnChange}
          placeholder="ex: SK 01 D 4016"
        />
        <button className="font-[600]  flex justify-center items-center gap-2 sm:bg-primary-bg text-primary-font px-3 h-full">
          <BsSearch className="text-primary-bg sm:text-primary-font"  />
          <p className="hidden sm:block">Search</p>
        </button>
      </div>
      {searchQuery !== "" && (
        <Gallery
          data={searchResult}
          title={searchQuery !== "" && `Search results for '${searchQuery}' :`}
        />
      )}
    </>
  );
};

export default SearchBar;
