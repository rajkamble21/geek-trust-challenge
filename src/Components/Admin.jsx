// Import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import DeleteSelectedButton from "./DeleteSelectedButton";
import "./Admin.css";
import { toast } from "react-toastify";

// Admin component
const Admin = () => {
  // State variables to manage user data
  const [users, setUsers] = useState([]); // All users
  const [filteredUsers, setFilteredUsers] = useState([]); // Users based on search
  const [selectedRows, setSelectedRows] = useState([]); // Selected rows for actions
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [selectAll, setSelectAll] = useState(false); // Checkbox to select all

  // State variable to track the currently edited user ID
  const [editingUserId, setEditingUserId] = useState(null);

  // State variables for edit form
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("");

  // Function to handle opening the edit popup
  const handleEdit = (id) => {
    // Find the user with the given ID
    const userToEdit = users.find((user) => user.id === id);

    // Set the state variables with the current user's data
    setEditingUserId(id);
    setEditedName(userToEdit.name);
    setEditedEmail(userToEdit.email);
    setEditedRole(userToEdit.role);
  };

  // Function to handle saving edits
  const handleSaveEdit = () => {
    // Update the user in the users state
    const updatedUsers = users.map((user) =>
      user.id === editingUserId
        ? { ...user, name: editedName, email: editedEmail, role: editedRole }
        : user
    );

    // Update both users and filteredUsers states
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);

    // Reset the editing state
    setEditingUserId(null);
    setEditedName("");
    setEditedEmail("");
    setEditedRole("");

    toast.success("Saved successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Adjust as needed
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  // Function to handle cancelling edits
  const handleCancelEdit = () => {
    // Reset the editing state
    setEditingUserId(null);
    setEditedName("");
    setEditedEmail("");
    setEditedRole("");
  };

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  // Function to handle pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle row selection
  const handleRowSelection = (id) => {
    const isSelected = selectedRows.includes(id);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Function to handle selecting/deselecting all rows
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : filteredUsers.map((user) => user.id));
  };

  // Function to handle deleting selected rows
  const handleDeleteSelected = () => {
    // Filter out the selected rows from the users state
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );

    // Update both users and filteredUsers states
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);

    // Clear the selectedRows state
    setSelectedRows([]);

    if(selectedRows.length!==0){
      toast.error("All selected items have been successfully removed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }else{
      toast.warn("Please select items to delete", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    
  };

  // Function to handle deleting a specific row
  const handleDelete = (id) => {
    // Filter out the deleted row from the users state
    const updatedUsers = users.filter((user) => user.id !== id);

    // Update both users and filteredUsers states
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);

    // Clear the selectedRows state if the deleted row was selected
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));

    toast.error(`Deleted successfully`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Admin Dashboard</h1>
      </div>
      {/* Search bar */}
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />

      {/* Table */}
      <UserTable
        handleSelectAll={handleSelectAll}
        selectAll={selectAll}
        filteredUsers={filteredUsers}
        currentPage={currentPage}
        selectedRows={selectedRows}
        handleRowSelection={handleRowSelection}
        editingUserId={editingUserId}
        editedName={editedName}
        setEditedName={setEditedName}
        editedEmail={editedEmail}
        setEditedEmail={setEditedEmail}
        editedRole={editedRole}
        setEditedRole={setEditedRole}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Pagination */}
      <Pagination
        handlePagination={handlePagination}
        currentPage={currentPage}
        filteredUsers={filteredUsers}
      />

      {/* Delete selected button */}
      <DeleteSelectedButton handleDeleteSelected={handleDeleteSelected} />
    </div>
  );
};

export default Admin;
