import React, { useState } from 'react';
import axios from 'axios';

const UpdateEmployeeBranch = () => {
    const [staffId, setStaffId] = useState('');
    const [branchId, setBranchId] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form refresh on submit
        setMessage(''); // Clear previous messages

        try {
            // Make API call to update employee branch
            const response = await axios.post('/api/updateEmployeeBranch', {
                staff_id: staffId,
                branch_id: branchId,
            });

            // Set success message
            setMessage(response.data.message);
        } catch (error) {
            // Handle errors and set failure message
            console.error('Error updating employee branch:', error);
            setMessage('Failed to update employee branch. Please try again.');
        }
    };

    return (
        <div>
            <h2>Update Employee Branch</h2>
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
                    <label htmlFor="branchId">Branch ID:</label>
                    <input
                        type="text"
                        id="branchId"
                        value={branchId}
                        onChange={(e) => setBranchId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Branch</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateEmployeeBranch;
