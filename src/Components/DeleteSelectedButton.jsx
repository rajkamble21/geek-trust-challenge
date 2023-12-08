import React from 'react'
import "./DeleteSelectedButton.css"

const DeleteSelectedButton = ({handleDeleteSelected}) => {
  return (
    <button className="delete-selected" onClick={handleDeleteSelected}>
      <i className="fas fa-trash-alt"></i> Delete Selected
      </button>
  )
}

export default DeleteSelectedButton