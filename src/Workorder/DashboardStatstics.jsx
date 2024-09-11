import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaSave, FaTimes, FaTrash, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LuFileText } from "react-icons/lu";
import gold from "../assets/gold.jpg";

const DashboardStatstics = () => {
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

    const fetchWorkOrders = () => {
        axios.get(workOrdersApiUrl)
            .then(response => setSavedData(response.data))
            .catch(error => toast.error("Failed to fetch work orders"));
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

    // Define a function to style the status
    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "In Progress":
                return "bg-blue-100 text-blue-800";
            case "Completed":
                return "bg-green-500 text-green-800";
            case "Canceled":
                return "bg-red-500 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="md:h-screen p-3 rounded-tr-3xl rounded-br-3xl lg:mr-3 bg-gradient-to-l from-[#E2E9E9] to-[#ffffff]">
            <ToastContainer />
            <div className="flex justify-end">
                <img src={logo} className="w-28 md:w-48 lg:-mr-5 -mt-5" alt="Logo" />
            </div>

            <div>
                {/* Display work orders */}
                <div className="sm:h-32 md:h-96 overflow-y-auto">
                    <div className="flex flex-wrap space-x-3 my-2">
                        {savedData.length > 0 ? (
                            savedData.map((step) => {
                                // Find the product name by matching the product ID
                                const product = productsData.find((p) => p.id === step.product);
                                const productName = product ? product.product_name : "Unknown Product";

                                return (
                                    <div
                                        key={step.id}
                                        className="py-2 px-2.5 rounded-xl my-4 border-l shadow-[2px_2px_5px_rgba(0,0,0,0.3)]"
                                    >
                                        <div className="flex space-x-2 text-xl font-semibold mb-1">
                                            <img
                                                src={gold}
                                                className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full"
                                                alt="product"
                                            />
                                            <h2>{step.workorder_number}</h2>
                                        </div>
                                        <p className="text-gray-700 mb-1">{step.description}</p>

                                        {/* Display Work Order Status */}
                                        <div className={`px-2 py-1 rounded-md text-sm font-semibold ${getStatusStyle(step.workorder_status)}`}>
                                            {step.workorder_status} {/* Ensure the correct status value is used here */}
                                        </div>

                                        <div className="flex justify-between space-x-6 mt-2">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src="https://media.istockphoto.com/id/1341251514/vector/gift-box-cartoon-style-icon-colorful-symbol-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=jc5-fVrm3Qhnyqz2pLEHQbYTovF2W7cC90RTQBZ5oiw="
                                                    className="w-8 h-8 md:w-12 md:h-12"
                                                    alt="product"
                                                />
                                                <p className="text-gray-800 md:font-medium">
                                                    {productName}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <FaUser className="text-blue-500" /> {/* Person Icon */}
                                                <p className="text-gray-800 md:font-medium">{` Gemy`}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No work orders found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStatstics;
