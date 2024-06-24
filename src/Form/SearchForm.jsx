import React from 'react';

export default function Search({ searchTerm, handleSearch }) {
  return (
    <div className="my-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Tìm kiếm sinh viên"
        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
      />
    </div>
  );
}
