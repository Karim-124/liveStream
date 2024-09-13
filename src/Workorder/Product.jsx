import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import { FaEdit, FaSave, FaTimes, FaTrash, FaUpload, FaUser } from "react-icons/fa";
import { useUser } from "../CONTEXT/UserContext"; // Import the useUser hook
import gold from "../assets/gold.jpg";

const Product = () => {
    const { user } = useUser(); // Get the user from context, which contains the token

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        productName: "",
        productCode: "",
        description: "",
        created_by: "",
    });


    const [savedData, setSavedData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Confirm delete modal
    const [partToDelete, setPartToDelete] = useState(null);
    const apiURL = "http://127.0.0.1:8000/api/products/";

    // Fetch parts data from the API
    useEffect(() => {
        const headers = { Authorization: `Bearer ${user?.token}` };
        axios
            .get(apiURL, { headers })
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



    // Save or Edit part
    const handleSave = async () => {
        const { productName, productCode, description, created_by } = formData;

        // Validation for mandatory fields
        if (productName.trim() === "" || productCode.trim() === "") {
            toast.error("Please fill in all fields and upload an image before saving.");
            return;
        }

        const data = new FormData();
        data.append("product_name", productName);
        data.append("product_code", productCode);
        data.append("description", description);
        data.append("created_by", created_by);

        const headers = { Authorization: `Bearer ${user?.token}` };
        try {
            if (editMode) {
                await axios.put(`${apiURL}${editId}/`, data, { headers });
                toast.success("Product updated successfully!");
            } else {
                await axios.post(apiURL, data, { headers });
                toast.success("Product saved successfully!");
            }
            fetchParts();
            resetForm();
        } catch (error) {
            toast.error("Failed to save product data.");
            console.log(error);
        }
    };




    // Fetch parts
    const fetchParts = () => {
        const headers = { Authorization: `Bearer ${user?.token}` };
        axios
            .get(apiURL, { headers })
            .then((response) => setSavedData(response.data))
            .catch((error) => toast.error("Failed to fetch products"));
    };

    // Reset form fields
    const resetForm = () => {
        setFormData({
            productName: "",
            productCode: "",
            description: "",
            created_by: "",
        });
        setEditMode(false);
        setEditId(null);
        setShowModal(false);
    };

    // Edit part
    // Edit part
    const handleEdit = (part) => {
        setFormData({
            productName: part.product_name,
            productCode: part.product_code,
            description: part.description,
            created_by: part.created_by,
        });



        setEditId(part.id);
        setEditMode(true);
        setShowModal(true);
    };


    // Delete part
    const handleDelete = async () => {
        const headers = { Authorization: `Bearer ${user?.token}` };
        try {
            await axios.delete(`${apiURL}${partToDelete}/`, { headers });
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
                    onClick={() => {
                        resetForm(); // Reset form fields
                        setShowModal(true); // Show the modal
                    }}
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
                                        value={formData.created_by}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                    >
                                        <option value={user?.username}>{user?.username}</option>
                                        {/* Add other users if needed */}
                                    </select>
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
                                className="py-2 px-2.5 rounded-xl my-4 border-l shadow-[2px_2px_5px_rgba(0,0,0,0.3)]"
                            >
                                <div className="flex space-x-2 text-xl font-semibold mb-1">
                                    <img
                                        src={gold}
                                        className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full"
                                        alt="product"
                                    />
                                    <h2>{part.product_name}</h2>
                                </div>
                                <p className="text-gray-700 mb-1">{part.product_code}</p>

                                {/* Display Work Order Status */}


                                <div className="flex justify-between space-x-6 mt-2">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src="https://media.istockphoto.com/id/1341251514/vector/gift-box-cartoon-style-icon-colorful-symbol-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=jc5-fVrm3Qhnyqz2pLEHQbYTovF2W7cC90RTQBZ5oiw="
                                            className="w-8 h-8 md:w-12 md:h-12"
                                            alt="product"
                                        />
                                        <p className="text-gray-800 md:font-medium">
                                            {part.product_name}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaUser className="text-blue-500" /> {/* Person Icon */}
                                        <p className="text-gray-800 md:font-medium">{part.created_by}</p>
                                    </div>
                                </div>
                                <div className="flex justify-center space-x-3  bg-gray-100 rounded-lg shadow-md p-2">
                                    <button className="flex items-center justify-center p-2 text-blue-600 bg-white border border-blue-300 rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-800 transition-colors duration-300">
                                        <FaEdit onClick={() => handleEdit(part)} size={18} />
                                    </button>
                                    <button className="flex items-center justify-center p-2 text-red-600 bg-white border border-red-300 rounded-full shadow-sm hover:bg-red-50 hover:text-red-800 transition-colors duration-300">
                                        <FaTrash onClick={() => {
                                            setPartToDelete(part.id);
                                            setShowConfirmDelete(true);
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
