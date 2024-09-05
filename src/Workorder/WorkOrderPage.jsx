import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import { FaSave, FaTimes } from "react-icons/fa";
import { LuFileText } from "react-icons/lu";


const WorkOrderPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    stepName: "",
    product: "",
    part: "",
    description: "",
    partValidated: "yes",
  });
  const [savedData, setSavedData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (
      formData.stepName.trim() === "" ||
      formData.product.trim() === "" ||
      formData.part.trim() === "" ||
      formData.description.trim() === ""
    ) {
      toast.error("Please fill in all fields before saving.");
      return;
    }

    setSavedData((prev) => [...prev, formData]);
    setFormData({
      stepName: "",
      product: "",
      part: "",
      description: "",
      partValidated: "yes",
    });
    setShowForm(false);
    toast.success("Data saved successfully!");
  };

  const handleRemove = () => {
    setShowForm(false);
    setFormData({
      stepName: "",
      product: "",
      part: "",
      description: "",
      partValidated: "yes",
    });
    toast.info("Form cleared.");
  };

  return (
    <div className="h-screen p-3 rounded-tr-3xl rounded-br-3xl  mr-3 bg-gradient-to-l from-[#E2E9E9] to-[#ffffff]">
      <ToastContainer />
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Work Order</h1>
        <img src={logo} className="w-48 -mr-5 -mt-5" alt="Logo" />
      </div>

      <div className="">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowForm(!showForm)}
        >
          New
        </button>

        {showForm && (
          <div className="p-3 border border-gray-300 rounded shadow-md bg-white max-w-xs mb-4">
            <div className="flex space-x-3 ">
              <div className="flex flex-col gap-2 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Step Name
                  </label>
                  <input
                    type="number"
                    name="stepName"
                    value={formData.stepName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-2 py-2 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Select Product
                  </label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-1.5 py-2 text-xs"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="product1">Product 1</option>
                    <option value="product2">Product 2</option>
                    <option value="product3">Product 3</option>
                  </select>
                </div>


              </div>

              <div className="flex flex-col">
                <div className="">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-1.5 text-xs"
                    rows="2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Select Part
                  </label>
                  <select
                    name="part"
                    value={formData.part}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-1.5 py-2 text-xs"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="part1">Part 1</option>
                    <option value="part2">Part 2</option>
                    <option value="part3">Part 3</option>
                  </select>
                </div>
                <div className="mt-3 ml-5">
                  <span className="block text-xs font-medium text-gray-700 mb-1">
                    Part Validated?
                  </span>
                  <div className="flex items-center gap-1">
                    <label className="flex items-center text-xs">
                      <input
                        type="radio"
                        id="yes"
                        name="partValidated"
                        value="yes"
                        checked={formData.partValidated === "yes"}
                        onChange={handleInputChange}
                        className="mr-1"
                      />
                      Yes
                    </label>
                    <label className="flex items-center text-xs">
                      <input
                        type="radio"
                        id="no"
                        name="partValidated"
                        value="no"
                        checked={formData.partValidated === "no"}
                        onChange={handleInputChange}
                        className="mr-1"
                      />
                      No
                    </label>
                  </div>
                </div>


              </div>

            </div>

            <div className="flex justify-center gap-1">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded flex items-center gap-1 text-xs"
                onClick={handleSave}
              >
                <FaSave /> Save
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 text-xs"
                onClick={handleRemove}
              >
                <FaTimes /> Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overflow container for saved data */}
      <div className="sm:h-32 md:h-56 overflow-y-auto">
        <div className="flex flex-wrap space-x-3 my-2">
          {savedData.map((data, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl my-2 shadow-md bg-white w-60"
            >
              <div className="flex space-x-2 text-2xl">
                <LuFileText className="mt-1 text-red-600" />
                <h2 className="">{data.stepName}</h2>
              </div>
              <p>{data.description}</p>
              <p>{data.product || "Not selected"}</p>
              <p>{data.part || "Not selected"}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default WorkOrderPage;
