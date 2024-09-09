import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import { FaEdit, FaSave, FaTimes, FaTrash, FaUpload } from "react-icons/fa";

const Product = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        productName: "",
        productCode: "",
        description: "",
        createdBy: "",
        partImage: null,
        media: null,
    });
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alice Johnson' },
        // Add more users as needed
    ];

    const [savedData, setSavedData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Confirm delete modal
    const [partToDelete, setPartToDelete] = useState(null);
    const apiURL = "http://127.0.0.1:8000/api/products/";

    // Fetch parts data from the API
    useEffect(() => {
        axios
            .get(apiURL)
            .then((response) => setSavedData(response.data))
            .catch((error) => console.log(error));
    }, []);

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
            } else if (name === "partImage") {
                setFormData((prev) => ({
                    ...prev,
                    partImage: files[0],
                }));
                setImagePreview(URL.createObjectURL(files[0]));
            }
        }
    };

    // Save or Edit part
    const handleSave = async () => {
        const { productName, productCode, description, createdBy, partImage, media } = formData;

        if (productName.trim() === "" || productCode.trim() === "" || !partImage) {
            toast.error("Please fill in all fields and upload an image before saving.");
            return;
        }

        // Assuming `createdBy` should be a number (e.g., user ID)
        const createdByPk = parseInt(createdBy, 10); // Convert to integer if needed

        const data = new FormData();
        data.append("product_name", productName);
        data.append("product_code", productCode);
        data.append("description", description);
        data.append("created_by", createdByPk); // Use the integer ID
        if (partImage) data.append("image", partImage);
        if (media) data.append("video", media);

        try {
            if (editMode) {
                // Update the part using PUT
                await axios.put(`${apiURL}${editId}/`, data);
                toast.success("Product updated successfully!");
            } else {
                // Create a new part using POST
                await axios.post(apiURL, data);
                toast.success("Product saved successfully!");
            }
            fetchParts(); // Re-fetch the updated parts list
            resetForm();
        } catch (error) {
            toast.error("Failed to save product data.");
            console.log(error);
        }
    };


    // Fetch parts
    const fetchParts = () => {
        axios
            .get(apiURL)
            .then((response) => setSavedData(response.data))
            .catch((error) => toast.error("Failed to fetch products"));
    };

    // Reset form fields
    const resetForm = () => {
        setFormData({
            productName: "",
            productCode: "",
            description: "",
            createdBy: "",
            partImage: null,
            media: null,
        });
        setMediaPreview(null);
        setImagePreview(null);
        setEditMode(false);
        setEditId(null);
        setShowModal(false);
    };

    // Edit part
    const handleEdit = (part) => {
        setFormData({
            productName: part.product_name,
            productCode: part.product_code,
            description: part.description,
            createdBy: part.created_by,
            partImage: null,
            media: null,
        });
        setEditId(part.id);
        setEditMode(true);
        setShowModal(true);
    };

    // Delete part
    const handleDelete = async () => {
        try {
            await axios.delete(`${apiURL}${partToDelete}/`);
            toast.success("Product deleted successfully!");
            fetchParts();
            setShowConfirmDelete(false); // Close confirm delete modal
        } catch (error) {
            toast.error("Failed to delete product.");
        }
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
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Created By
                                    </label>
                                    <select
                                        name="createdBy"
                                        value={formData.createdBy}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                    >
                                        <option value="" disabled>Select a user</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div className="space-y-6">
                                    <div className="relative">
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                            Upload Media
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden shadow-sm">
                                            {/* Hidden file input */}
                                            <input
                                                id="mediaInput"
                                                type="file"
                                                name="media"
                                                accept="video/*"
                                                onChange={handleFileChange}
                                                className="hidden" // Hide the default file input
                                            />
                                            {/* Custom button to trigger file input */}
                                            <button
                                                type="button"
                                                className="block w-full text-xs sm:text-sm cursor-pointer py-2 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                onClick={() => document.getElementById("mediaInput").click()} // Trigger file input click
                                            >
                                                Upload Media
                                            </button>
                                            {/* Upload icon */}
                                            <FaUpload className="absolute left-2 text-gray-500" size={20} />
                                        </div>

                                        {/* Video preview if media is selected */}
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
                                            Upload Part Image
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden shadow-sm">
                                            <input
                                                id="fileInput"
                                                type="file"
                                                name="partImage"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden" // Hides the default file input
                                            />
                                            <button
                                                type="button"
                                                className="block w-full text-xs sm:text-sm cursor-pointer py-2 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                onClick={() => document.getElementById("fileInput").click()} // Trigger file input click
                                            >
                                                Upload Part Image
                                            </button>
                                            <FaUpload className="absolute left-2 text-gray-500" size={20} />
                                        </div>
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt="Part Preview"
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
                                        onClick={() => setShowModal(false)}
                                        className="bg-red-500 text-white px-3 py-2 rounded flex items-center gap-1 text-xs sm:text-sm hover:bg-red-600"
                                    >

                                        <FaTimes /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* Confirm Delete Modal */}
                {showConfirmDelete && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full relative mx-2 sm:mx-4 md:mx-6 lg:mx-8">
                            <button
                                onClick={() => setShowConfirmDelete(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes size={20} />
                            </button>
                            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                            <p>Are you sure you want to delete this product?</p>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                    onClick={() => setShowConfirmDelete(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Display parts */}
            <div className="sm:h-32 md:h-96 overflow-y-auto">
                <div className="flex flex-wrap space-x-3 my-2">
                    {savedData.length > 0 ? (
                        savedData.map((part) => (
                            <div
                                key={part.id}
                                className="w-64 bg-white rounded-xl border border-gray-300 shadow-lg my-1"
                            >
                                {part.image && (
                                    <img
                                        src={typeof part.image === "string" ? part.image : URL.createObjectURL(part.image)}
                                        alt="Part"
                                        className="h-48 w-full object-cover rounded-t-xl border-b"
                                    />
                                )}

                                <div className="px-4 py-3">

                                    <div className="text-sm text-gray-600">
                                        <p>
                                            <strong>Step Name:</strong> {part.step_name }
                                        </p>
                                        <p>
                                            <strong>Product Code:</strong> {part.product_code}
                                        </p>
                                        <p>
                                            <strong>Product Description:</strong> {part.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-center space-x-3  bg-gray-100 rounded-lg shadow-md p-2">
                                    <button className="flex items-center justify-center p-2 text-blue-600 bg-white border border-blue-300 rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-800 transition-colors duration-300">
                                        <FaEdit onClick={() => handleEdit(part)} size={18} />
                                    </button>
                                    <button className="flex items-center justify-center p-2 text-red-600 bg-white border border-red-300 rounded-full shadow-sm hover:bg-red-50 hover:text-red-800 transition-colors duration-300">
                                        <FaTrash onClick={() => {
                                            setShowConfirmDelete(true);
                                            setPartToDelete(part.id);
                                        }} size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="p-3 text-center">
                                No parts available.
                            </td>
                        </tr>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
