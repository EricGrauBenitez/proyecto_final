import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaCheck } from 'react-icons/fa';
import '../css/ChatList.css';

const DeleteConfirmation = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="delete-confirmation">
            <p>Delete this?</p>
            <button className="delete-final-button" onClick={onConfirm}>
                <FaCheck />
            </button>
            <button className="cancel-button" onClick={onCancel}>
                <FaTimes />
            </button>
        </div>
    );
};

DeleteConfirmation.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmation;
