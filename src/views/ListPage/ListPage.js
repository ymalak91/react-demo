import React, { useState, useEffect, useRef } from "react";

import UniversityItem from "../../components/University/UniversityItem";
import Pagination from "../../components/Pagination/Pagination";

import {
  getAnimationClasses,
  clearFadeOutClasses,
} from "../../controlers/helpers"; // Adjust the import path

const ListPage = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [animationClass, setAnimationClass] = useState({});
  const prevFilteredDataRef = useRef([]);
  const [sortedData, setSortedData] = useState(data);
  const [isAscending, setIsAscending] = useState(true);

  //pager inputs
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  useEffect(() => {
    const filteredData = sortedData.filter((item) => {
      //
      setCurrentPage(1);
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Get animation classes based on the previous and new filtered data
    const newAnimationClass = getAnimationClasses(
      prevFilteredDataRef.current,
      filteredData
    );
    setAnimationClass(newAnimationClass);

    // Update reference to the current filtered data
    prevFilteredDataRef.current = filteredData;

    // Clear fade-out animation class after animation completes
    const timer = clearFadeOutClasses(700, setAnimationClass);

    return () => clearTimeout(timer);
  }, [sortedData, searchTerm]);

  // Filtered data based on search term
  const filteredData = sortedData.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSort = () => {
    const sorted = [...sortedData].sort((a, b) =>
      isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setSortedData(sorted);
    setIsAscending(!isAscending); // Toggle sort order
  };

  const handleDelete = (name) => {
    setAnimationClass((prev) => ({ ...prev, [name]: "fade-out" }));
    setTimeout(() => {
      setSortedData((prev) => prev.filter((item) => item.name !== name));
    }, 700);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="listPage page-wrapper">
      <h1 className="page-title">Universities List</h1>
      <div className="filters-wrapper d-flex flex-wrap justify-content-between align-items">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
          maxLength={50}
        />
        <div className="d-flex">
          <button className="btn btn-sort" onClick={handleSort}>
            {isAscending ? "Sort Ascending" : "Sort Descending"}
          </button>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-between align-items">
        {(() => {
          if (paginatedData.length > 0) {
            return paginatedData.map((item, index) => (
              <UniversityItem
                key={index}
                data={item}
                className={animationClass[item.name]}
                onDelete={handleDelete}
              />
            ));
          } else {
            return <div className="no-data-found">No Data Found</div>;
          }
        })()}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredData.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ListPage;
