import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import { FaEdit, FaSave, FaTimes, FaTrash, FaUpload } from "react-icons/fa";
import { LuFileText } from "react-icons/lu";

const Product = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        productName: "",
        productCode: "",
        description: "",
        createdBy: "",
        productImage: null,
        media: null,
    });
    const [savedData, setSavedData] = useState([]);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            if (name === "media") {
                setFormData((prev) => ({
                    ...prev,
                    media: files[0],
                }));
                setMediaPreview(URL.createObjectURL(files[0]));
            } else if (name === "productImage") {
                setFormData((prev) => ({
                    ...prev,
                    productImage: files[0],
                }));
                setImagePreview(URL.createObjectURL(files[0]));
            }
        }
    };

    const handleSave = () => {
        if (
            formData.productName.trim() === "" ||
            formData.productCode.trim() === "" ||
            formData.description.trim() === "" ||
            formData.createdBy.trim() === "" ||
            !formData.productImage
        ) {
            toast.error(
                "Please fill in all fields and upload an image before saving."
            );
            return;
        }

        setSavedData((prev) => [...prev, formData]);
        setFormData({
            productName: "",
            productCode: "",
            description: "",
            createdBy: "",
            productImage: null,
            media: null,
        });
        setMediaPreview(null);
        setImagePreview(null);
        setShowModal(false);
        toast.success("Data saved successfully!");
    };

    const handleRemove = () => {
        setShowModal(false);
        setFormData({
            productName: "",
            productCode: "",
            description: "",
            createdBy: "",
            productImage: null,
            media: null,
        });
        setMediaPreview(null);
        setImagePreview(null);
        toast.info("Form cleared.");
    };

    return (
        <div className="md:h-screen p-3 rounded-tr-3xl rounded-br-3xl lg:mr-3 bg-gradient-to-l from-[#E2E9E9] to-[#ffffff]">
            <ToastContainer />
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Work Order</h1>
                    <h2 className="text-xl font-semibold text-gray-600">Product</h2>
                </div>
                <img src={logo} className="w-28 md:w-48 lg:-mr-5 -mt-5" alt="Logo" />
            </div>

            <div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
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
                            <div className="flex flex-col gap-2 mb-1 max-h-[80vh] overflow-y-auto">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Product Code
                                    </label>
                                    <input
                                        type="text"
                                        name="productCode"
                                        value={formData.productCode}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Created By
                                    </label>
                                    <input
                                        type="text"
                                        name="createdBy"
                                        value={formData.createdBy}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-6">
                                    <div className="relative">
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                            Upload Media
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden shadow-sm">
                                            <input
                                                id="mediaInput"
                                                type="file"
                                                name="media"
                                                accept="video/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            <button
                                                type="button"
                                                className="block w-full text-xs sm:text-sm cursor-pointer py-2 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                onClick={() => document.getElementById("mediaInput").click()}
                                            >
                                                Upload Media
                                            </button>
                                            <FaUpload className="absolute left-2 text-gray-500" size={20} />
                                        </div>

                                        {mediaPreview && (
                                            <video
                                                className="mt-3 w-full h-48 object-cover rounded-md border border-gray-300 shadow-sm"
                                                controls
                                            >
                                                <source src={mediaPreview} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                            Upload Product Image
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden shadow-sm">
                                            <input
                                                id="fileInput"
                                                type="file"
                                                name="productImage"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            <button
                                                type="button"
                                                className="block w-full text-xs sm:text-sm cursor-pointer py-2 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                onClick={() => document.getElementById("fileInput").click()}
                                            >
                                                Upload Product Image
                                            </button>
                                            <FaUpload className="absolute left-2 text-gray-500" size={20} />
                                        </div>
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt="Product Preview"
                                                className="mt-3 w-full h-48 object-cover rounded-md border border-gray-300 shadow-sm"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
                                    <button
                                        className="bg-green-500 text-white px-3 py-2 rounded flex items-center gap-1 text-xs sm:text-sm hover:bg-green-600"
                                        onClick={handleSave}
                                    >
                                        <FaSave /> Save
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-2 rounded flex items-center gap-1 text-xs sm:text-sm hover:bg-red-600"
                                        onClick={handleRemove}
                                    >
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Saved Data */}
                <div className="sm:h-32 md:h-96 overflow-y-auto">
                    <div className="flex flex-wrap space-x-3 my-2">
                        {savedData.map((data, index) => (
                            <div
                                key={index}
                                className="w-64 bg-white rounded-xl border border-gray-300 shadow-lg my-1"
                            >
                                {data.productImage && (
                                    <img
                                        src={URL.createObjectURL(data.productImage)}
                                        alt="Part"
                                        className="h-48 w-full object-cover rounded-t-xl border-b"
                                    />
                                )}
                                <div className="px-4 py-3">

                                    <div className="text-sm text-gray-600">
                                        <p>
                                            <strong>Product Name:</strong> {data.productCode}
                                        </p>
                                        <p>
                                            <strong>Product Code:</strong> {data.productCode}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end p-2">
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => {
                                            setSavedData((prev) => prev.filter((_, i) => i !== index));
                                            toast.info("Item removed.");
                                        }}
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        className="text-blue-500 hover:text-blue-700 ml-4"
                                        onClick={() => {
                                            setFormData(data);
                                            setShowModal(true);
                                        }}
                                    >
                                        <FaEdit />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
