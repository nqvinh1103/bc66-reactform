import React, { useState } from "react";
import TableForm from "./Table";
import Search from "./SearchForm";

const defaultValue = {
  fullName: "",
  email: "",
  phone: "",
  id: "",
};

export default function MyForm() {
  const [formValues, setFormValues] = useState(defaultValue);
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    id: "",
  });
  const [newValues, setNewValues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [editID, setEditID] = useState(null);

  const validate = (event) => {
    const { value, name, required, pattern } = event.target;
    const newErrors = { ...formErrors };
    if (!value.trim()) {
      if (required) {
        newErrors[name] = "Vui lòng nhập thông tin";
      }
    } else {
      if (pattern) {
        const regex = new RegExp(pattern);
        const isValid = regex.test(value);
        if (!isValid) {
          if (name === "email") {
            newErrors[name] = "Email không hợp lệ";
          } else {
            newErrors[name] = "Nội dung không hợp lệ";
          }
        } else {
          newErrors[name] = "";
        }
      } else {
        newErrors[name] = "";
      }
    }
    setFormErrors(newErrors);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const hasError = Object.values(formErrors).some((item) => !!item);
    if (!hasError) {
      if (isUpdateMode) {
        handleUpdate();
      } else {
        setNewValues([...newValues, formValues]);
      }
      setFormValues(defaultValue);
    }
  };

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    validate(event);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleOnBlur = (event) => {
    validate(event);
  };

  const handleDelete = (id) => {
    const updatedValues = newValues.filter((item) => item.id !== id);
    setNewValues(updatedValues);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredValues = newValues.filter(
    (item) =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.id.includes(searchTerm)
  );

  const handleEdit = (item) => {
    setFormValues(item);
    setIsUpdateMode(true);
    setEditID(item.id);
  };

  const handleUpdate = () => {
    const updatedValues = newValues.map((item) =>
      item.id === editID ? formValues : item
    );
    setNewValues(updatedValues);
    setIsUpdateMode(false);
    setEditID(null);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-5xl text-red-600 my-10">
            Thông Tin Sinh Viên
          </h2>
        </div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 text-black">
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="id">Mã Số Sinh Viên</label>
                <input
                  type="text"
                  name="id"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={formValues.id}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  required={true}
                />
                {formErrors.id && (
                  <p className="text-red-600 text-sm text-start mt-2">
                    {formErrors.id}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="fullName">Họ Tên</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={formValues.fullName}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  required={true}
                />
                {formErrors.fullName && (
                  <p className="text-red-600 text-sm text-start mt-2">
                    {formErrors.fullName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={formValues.email}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  required={true}
                  pattern="^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$"
                />
                {formErrors.email && (
                  <p className="text-red-600 text-sm text-start mt-2">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone">Số Điện Thoại</label>
                <input
                  type="text"
                  name="phone"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={formValues.phone}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  required={true}
                  pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
                />
                {formErrors.phone && (
                  <p className="text-red-600 text-sm text-start mt-2">
                    {formErrors.phone}
                  </p>
                )}
              </div>
              <div className="text-start">
                <button
                  type="submit"
                  className={`${
                    isUpdateMode
                      ? "bg-blue-500 hover:bg-blue-700"
                      : "bg-green-500 hover:bg-green-700"
                  } text-white font-bold py-2 px-4 rounded`}
                >
                  {isUpdateMode ? "Cập nhật" : "Thêm sinh viên"}
                </button>
              </div>
            </div>
          </form>
          <Search searchTerm={searchTerm} handleSearch={handleSearch} />
          <TableForm
            newValues={filteredValues}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}
