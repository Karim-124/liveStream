import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import gold from "../assets/gold.jpg";
import { FaSave, FaTimes } from "react-icons/fa";
import { LuFileText } from "react-icons/lu";

const WorkOrder = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        workOrderName: "", // Changed from stepName to workOrderName
        product: "",
        assignTo: "", // Added assignTo field
        description: "",
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
            formData.workOrderName.trim() === "" || // Updated field check
            formData.product.trim() === "" ||
            formData.assignTo.trim() === "" || // Added assignTo validation
            formData.description.trim() === ""
        ) {
            toast.error("Please fill in all fields before saving.");
            return;
        }

        setSavedData((prev) => [...prev, formData]);
        setFormData({
            workOrderName: "", // Reset workOrderName
            product: "",
            assignTo: "", // Reset assignTo
            description: "",
        });
        setShowModal(false);
        toast.success("Data saved successfully!");
    };

    const handleRemove = () => {
        setShowModal(false);
        setFormData({
            workOrderName: "",
            product: "",
            assignTo: "", // Reset assignTo
            description: "",
        });
        toast.info("Form cleared.");
    };

    return (
        <div className="md:h-screen p-3 rounded-tr-3xl rounded-br-3xl lg:mr-3 bg-gradient-to-l from-[#E2E9E9] to-[#ffffff]">
            <ToastContainer />
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Work Order</h1>
                    <h2 className="text-xl font-semibold text-gray-600">Work order</h2>
                </div>
                <img src={logo} className="w-28 md:w-48 lg:-mr-5 -mt-5" alt="Logo" />
            </div>

            <div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => setShowModal(true)}
                >
                    New
                </button>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full relative mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes size={20} />
                            </button>
                            <div className="flex flex-col gap-2 mb-1">
                                {/* Work Order Name Input */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Work Order Name
                                    </label>
                                    <input
                                        type="text"
                                        name="workOrderName"
                                        value={formData.workOrderName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                        required
                                    />
                                </div>

                                {/* Product Selection */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Select Product
                                    </label>
                                    <select
                                        name="product"
                                        value={formData.product}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-1.5 py-2 text-xs sm:text-sm"
                                        required
                                    >
                                        <option value="">Select...</option>
                                        <option value="product1">Product 1</option>
                                        <option value="product2">Product 2</option>
                                        <option value="product3">Product 3</option>
                                    </select>
                                </div>

                                {/* Assign To Input */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Assign To
                                    </label>
                                    <input
                                        type="text"
                                        name="assignTo"
                                        value={formData.assignTo}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-1.5 py-2 text-xs sm:text-sm"
                                        rows="2"
                                        required
                                    />
                                </div>

                                {/* Save and Remove Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
                                    <button
                                        className="bg-green-500 text-white px-3 py-2 rounded flex items-center gap-1 text-xs sm:text-sm"
                                        onClick={handleSave}
                                    >
                                        <FaSave /> Save
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-2 rounded flex items-center gap-1 text-xs sm:text-sm"
                                        onClick={handleRemove}
                                    >
                                        <FaTimes /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Display saved data */}
            <div className="sm:h-32 md:h-72 overflow-y-auto">
                <div className="flex flex-wrap space-x-3 my-2">
                    {savedData.map((data, index) => (
                        <div
                            key={index}
                            className="py-2 px-2.5 rounded-xl my-4 border-l shadow-[2px_2px_5px_rgba(0,0,0,0.3)]"
                        >
                            <div className="flex space-x-2 text-xl font-semibold mb-1">
                                <LuFileText className="mt-1 text-red-600" />
                                <h2>{`Work Order: ${data.workOrderName}`}</h2>
                            </div>
                            <p className="text-gray-700 mb-1">{data.description}</p>

                            <div className="flex justify-between space-x-6">
                                <div className="flex items-center">
                                    <img
                                        src={gold}
                                        className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full"
                                        alt="product"
                                    />
                                    <p className="text-gray-800 md:font-medium">{data.product}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-gray-800 md:font-medium">{data.assignTo}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkOrder;
