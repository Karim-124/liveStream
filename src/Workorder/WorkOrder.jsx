import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LuFileText } from "react-icons/lu";
import gold from "../assets/gold.jpg";

const WorkOrder = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        workOrderNumber: "",
        workOrderStatus: "Pending", // default status
        description: "",
        created_by: "",
        assignedTo: "",
        product: "",
    });

    const [savedData, setSavedData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [stepToDelete, setStepToDelete] = useState(null);
    const workOrdersApiUrl = "http://127.0.0.1:8000/api/workorders/";
    const productsApiUrl = "http://127.0.0.1:8000/api/products/";

    // Fetch work orders and products data from APIs
    useEffect(() => {
        axios.get(workOrdersApiUrl)
            .then(response => setSavedData(response.data))
            .catch(error => console.log(error));

        axios.get(productsApiUrl)
            .then(response => setProductsData(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        const { workOrderNumber, workOrderStatus, description, created_by, assignedTo, product } = formData;

        if (workOrderNumber.trim() === "" || !product) {
            toast.error("Please fill in all fields before saving.");
            return;
        }

        const data = {
            workorder_number: workOrderNumber,
            work_order_status: workOrderStatus,
            description,
            created_by: parseInt(created_by),
            assigned_to: parseInt(assignedTo),
            product: parseInt(product),
        };

        try {
            if (editMode) {
                // Update existing work order
                await axios.put(`${workOrdersApiUrl}${editId}/`, data);
                toast.success("Work Order updated successfully!");
            } else {
                // Create new work order
                await axios.post(workOrdersApiUrl, data);
                toast.success("Work Order saved successfully!");
            }
            fetchWorkOrders();
            resetForm();
        } catch (error) {
            toast.error("Failed to save work order.");
            console.log(error);
        }
    };


    const fetchWorkOrders = () => {
        axios.get(workOrdersApiUrl)
            .then(response => setSavedData(response.data))
            .catch(error => toast.error("Failed to fetch work orders"));
    };

    const resetForm = () => {
        setFormData({
            workOrderNumber: "",
            workOrderStatus: "Pending",
            description: "",
            created_by: "",
            assignedTo: "",
            product: "",
        });
        setShowModal(false);
    };
    // Edit part
    const handleEdit = (workOrder) => {
        setFormData({
            workOrderNumber: workOrder.workorder_number,
            workOrderStatus: workOrder.work_order_status,
            description: workOrder.description,
            created_by: workOrder.created_by, // Convert to string to match select input
            assignedTo: workOrder.assigned_to,
            product: workOrder.product.toString(),
        });
        setEditId(workOrder.id);
        setEditMode(true);
        setShowModal(true);
    };

    // Delete part
    const handleDelete = async () => {
        try {
            await axios.delete(`${workOrdersApiUrl}${stepToDelete}/`); // Correct API URL
            toast.success("Work Order deleted successfully!");
            fetchWorkOrders();
            setShowConfirmDelete(false); // Close confirm delete modal
        } catch (error) {
            toast.error("Failed to delete work order.");
        }
    };

    const openDeleteConfirmation = (id) => {
        setStepToDelete(id);
        setShowConfirmDelete(true);
    };

    return (
        <div className="md:h-screen p-3 rounded-tr-3xl rounded-br-3xl lg:mr-3 bg-gradient-to-l from-[#E2E9E9] to-[#ffffff]">
            <ToastContainer />
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Work Order</h1>
                    <h2 className="text-xl font-semibold text-gray-600">Work Order</h2>
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
                        <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full relative">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes size={20} />
                            </button>

                            <div className="flex flex-col gap-2 mb-1">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Work Order Number
                                    </label>
                                    <input
                                        type="text"
                                        name="workOrderNumber"
                                        value={formData.workOrderNumber}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Work Order Status
                                    </label>
                                    <select
                                        name="workOrderStatus"
                                        value={formData.workOrderStatus}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Complete">Complete</option>
                                        <option value="Complete">Cancle</option>
                                    </select>
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
                                        name="created_by"
                                        value={formData.created_by}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                    >
                                        <option value="" disabled>Select a user</option>
                                        <option value="User1">User1</option>
                                        <option value="User2">User2</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Assigned To
                                    </label>
                                    <select
                                        name="assignedTo"
                                        value={formData.assignedTo}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                    >
                                        <option value="" disabled>Select a user</option>
                                        <option value="User1">User1</option>
                                        <option value="User2">User2</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                        Product
                                    </label>
                                    <select
                                        name="product"
                                        value={formData.product}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                                    >
                                        <option value="" disabled>Select a product</option>
                                        {productsData.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.product_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex justify-center gap-2 mt-2">
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
                {/* Display work orders */}
                <div className="sm:h-32 md:h-96 overflow-y-auto">
                    <div className="flex flex-wrap space-x-3 my-2">
                        {savedData.length > 0 ? (
                            savedData.map((step) => (
                                <div
                                    key={step.id}
                                    className="py-2 px-2.5 rounded-xl my-4 border-l shadow-[2px_2px_5px_rgba(0,0,0,0.3)]"
                                >
                                    <div className="flex space-x-2 text-xl font-semibold mb-1">
                                        <LuFileText className="mt-1 text-red-600" />
                                        <h2>{`Work Order: ${step.workorder_number}`}</h2>
                                    </div>
                                    <p className="text-gray-700 mb-1">{step.description}</p>

                                    <div className="flex justify-between space-x-6">
                                        <div className="flex items-center">
                                            <img
                                                src={gold}
                                                className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full"
                                                alt="product"
                                            />
                                            <p className="text-gray-800 md:font-medium">{step.description}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-gray-800 md:font-medium">{step.step_name}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center space-x-3  bg-gray-100 rounded-lg shadow-md p-2">
                                        <button className="flex items-center justify-center p-2 text-blue-600 bg-white border border-blue-300 rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-800 transition-colors duration-300">
                                            <FaEdit onClick={() => handleEdit(step)} size={18} />
                                        </button>
                                        <button className="flex items-center justify-center p-2 text-red-600 bg-white border border-red-300 rounded-full shadow-sm hover:bg-red-50 hover:text-red-800 transition-colors duration-300">
                                            <FaTrash onClick={() => {
                                                setStepToDelete(step.id);
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
        </div>
    );
};

export default WorkOrder;
