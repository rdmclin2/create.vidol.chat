import React from 'react';

export default function Pagination() {
  return (
    <div className="flex justify-center items-center space-x-2">
      <button className="px-3 py-1 border rounded-md hover:bg-gray-100">上一页</button>
      <div className="flex space-x-1">
        <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">1</button>
        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">2</button>
        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">3</button>
        <span className="px-3 py-1">...</span>
        <button className="px-3 py-1 border rounded-md hover:bg-gray-100">10</button>
      </div>
      <button className="px-3 py-1 border rounded-md hover:bg-gray-100">下一页</button>
    </div>
  );
}
