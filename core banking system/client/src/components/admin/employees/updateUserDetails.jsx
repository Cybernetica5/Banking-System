import React, { useState } from 'react';
import axios from 'axios';

const UpdateUserDetails = () => {
    const [staffId, setStaffId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submission
        setMessage(''); // Reset previous messages

        try {
            // Make API call to update user details
            const response = await axios.post('/api/updateUserDetails', {
                staff_id: staffId,
                user_name: userName,
                password,
                email
            });

            // Set success message
            setMessage(response.data.message);
        } catch (error) {
            // Handle errors and set failure message
            console.error('Error updating user details:', error);
            setMessage('Failed to update user details. Please try again.');
        }
    };

    return (
        <div>
            <h2>Update User Details</h2>
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
                    <label htmlFor="userName">Username:</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update User</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateUserDetails;
