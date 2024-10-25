import React, { useState } from 'react';
import axios from 'axios';

const RemoveEmployee = () => {
    const [staffId, setStaffId] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page
        setMessage(''); // Reset the message

        try {
            // Make API call to remove employee
            const response = await axios.post('/api/removeEmployee', { staff_id: staffId });

            // Set success message
            setMessage(response.data.message);
        } catch (error) {
            // Handle errors and set failure message
            console.error('Error removing employee:', error);
            setMessage('Failed to remove employee. Please try again.');
        }
    };

    return (
        <div>
            <h2>Remove Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="staffId">Staff ID:</label>
                    <input
                        type="text"
                        id="staffId"
                        value={staffId}
                        onChange={(e) => setStaffId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Remove Employee</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RemoveEmployee;