import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
import { FaEdit, FaSave, FaTimes, FaTrash, FaUpload } from "react-icons/fa";
import { useUser } from "../CONTEXT/UserContext"; // Import the useUser hook
const Part = () => {
  const { user } = useUser(); // Get the user from context, which contains the token
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    partName: "",
    partDim: "",
    partImage: null,
    media: null,
  });
  const [savedData, setSavedData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [partToDelete, setPartToDelete] = useState(null);
  const apiURL = "http://127.0.0.1:8000/api/parts/";

  // Fetch parts data from the API
  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = () => {
    const headers = { Authorization: `Bearer ${user?.token}` };
    axios
      .get(apiURL, { headers })
      .then((response) => setSavedData(response.data))
      .catch((error) => toast.error("Failed to fetch parts"));
  };

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
    const { partName, partDim, partImage, media } = formData;

    if (partName.trim() === "" || partDim.trim() === "" || !partImage) {
      toast.error("Please fill in all fields and upload an image before saving.");
      return;
    }

    const data = new FormData();
    data.append("part_name", partName);
    data.append("part_dimensions", partDim);
    if (partImage) data.append("image", partImage);
    if (media) data.append("video", media);
    const headers = { Authorization: `Bearer ${user?.token}` };
    try {
      if (editMode) {
        // Update the part using PUT
        await axios.put(`${apiURL}${editId}/`, data, { headers });
        toast.success("Part updated successfully!");
      } else {
        // Create a new part using POST
        await axios.post(apiURL, data, { headers });
        toast.success("Part saved successfully!");
      }
      fetchParts(); // Re-fetch the updated parts list
      resetForm();
    } catch (error) {
      toast.error("Failed to save part data.");
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      partName: "",
      partDim: "",
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
      partName: part.part_name,
      partDim: part.part_dimensions,
      partImage: part.partImage,
      media: part.media,
    });
    setEditId(part.id);
    setEditMode(true);
    setShowModal(true);
  };

  // Show confirm delete modal
  const openDeleteConfirm = (id) => {
    setPartToDelete(id);
    setShowConfirmDelete(true);
  };

  // Delete part
  const handleDelete = async () => {
    const headers = { Authorization: `Bearer ${user?.token}` };
    try {
      await axios.delete(`${apiURL}${partToDelete}/`, { headers });
      toast.success("Part deleted successfully!");
      fetchParts();
      setShowConfirmDelete(false); // Close confirm delete modal
    } catch (error) {
      toast.error("Failed to delete part.");
    }
  };
  return (
    <div className="md:h-screen p-3 rounded-tr-3xl rounded-br-3xl lg:mr-3 bg-gradient-to-l from-[#E2E9E9] to-[#ffffff]">
      <ToastContainer />
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Work Order</h1>
          <h2 className="text-xl font-semibold text-gray-600">Part</h2>
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
                    Part Name
                  </label>
                  <input
                    type="text"
                    name="partName"
                    value={formData.partName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-2 py-2 text-xs sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Part Dimensions
                  </label>
                  <input
                    type="text"
                    name="partDim"
                    value={formData.partDim}
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
      </div>

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative p-4 text-center bg-white rounded-lg shadow  sm:p-5">
            <button
              onClick={() => setIsDeleteConfirmOpen(false)}
              type="button"
              className="text-gray-400 absolute top-2.5 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
              data-modal-toggle="deleteModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 4.293a1 1 0 011.414 0L10 5.586l2.293-1.293a1 1 0 111.414 1.414L11.414 7l2.293 2.293a1 1 0 01-1.414 1.414L10 8.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 9l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="mt-3">
              <h3 className="text-lg font-medium  ">
                Are you sure you want to delete this Reason Group?
              </h3>
              <svg
                className="text-gray-400  w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                onClick={handleDelete}
              >
                Yes, delete
              </button>
              <button
                type="button"
                className="text-gray-500 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                onClick={() => setShowConfirmDelete(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overflow container for saved data */}
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
                      <strong>Part Name:</strong> {part.part_name}
                    </p>
                    <p>
                      <strong>Part Dimensions:</strong> {part.part_dimensions}
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

export default Part;
