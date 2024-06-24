import React from "react";

export default function TableForm({ newValues, handleDelete, handleEdit }) {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg my-5">
      <table className="w-full">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3">
              Mã số
            </th>
            <th scope="col" className="px-6 py-3">
              Họ tên
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Số ĐT
            </th>
            <th scope="col" className="px-6 py-3">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {newValues.map((item, index) => {
            return (
              <tr key={index}>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.fullName}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded mx-2 px-5 py-3 bg-red-500 hover:bg-red-700 text-black"
                  >
                    Xóa
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="rounded px-5 py-3 bg-green-500 hover:bg-green-700 text-black"
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
