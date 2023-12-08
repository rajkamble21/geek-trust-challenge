import React from "react";
import "./UserTable.css";

const UserTable = ({
  handleSelectAll,
  selectAll,
  filteredUsers,
  currentPage,
  selectedRows,
  handleRowSelection,
  editingUserId,
  editedName,
  setEditedName,
  editedEmail,
  setEditedEmail,
  editedRole,
  setEditedRole,
  handleSaveEdit,
  handleCancelEdit,
  handleEdit,
  handleDelete,
}) => {
  return (
    <table>
      <thead>
        <tr>
          {/* Checkbox to select all rows */}
          <th>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectAll}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* Map through filtered users for display */}
        {filteredUsers
          .slice((currentPage - 1) * 10, currentPage * 10)
          .map((user) => (
            <tr
              key={user.id}
              style={{
                backgroundColor: selectedRows.includes(user.id)
                  ? "#ccc"
                  : "transparent",
              }}
            >
              {/* Checkbox for row selection */}
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleRowSelection(user.id)}
                  checked={selectedRows.includes(user.id)}
                />
              </td>
              {/* Editable fields for name, email, and role */}
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <select
                    value={editedRole}
                    onChange={(e) => setEditedRole(e.target.value)}
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              {/* Action buttons for edit and delete */}
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button className="save" onClick={handleSaveEdit}>
                      <i className="fas fa-save"></i> Save
                    </button>
                    <button className="cancel" onClick={handleCancelEdit}>
                      <i className="fas fa-times"></i> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit"
                      onClick={() => handleEdit(user.id)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UserTable;
