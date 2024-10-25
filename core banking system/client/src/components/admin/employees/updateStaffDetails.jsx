import React, { useState } from 'react';
import axios from 'axios';

const UpdateEmployeeDetails = () => {
    const [staffId, setStaffId] = useState('');
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page
        setMessage(''); // Clear previous messages

        try {
            // Make API call to update employee details
            const response = await axios.post('/api/updateEmployeeDetails', {
                staff_id: staffId,
                full_name: fullName,
                date_of_birth: dateOfBirth,
            });

            // Set success message
            setMessage(response.data.message);
        } catch (error) {
            // Handle errors and set failure message
            console.error('Error updating employee details:', error);
            setMessage('Failed to update employee details. Please try again.');
        }
    };

    return (
        <div>
            <h2>Update Employee Details</h2>
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
                <div>
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Employee</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateEmployeeDetails;
