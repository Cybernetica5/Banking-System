// Import the database configuration
import db from '../Config/database.js';
import bcrypt from 'bcrypt';

// Define the function to add an employee
async function addEmployee(req, res) {
    const { userName, password, email, fullName, dateOfBirth, NIC, branchId } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `CALL AddEmployee(?, ?, ?, ?, ?, ?, ?)`;

    try {
        const [result] = await db.query(query, [userName, hashedPassword, email, fullName, dateOfBirth, NIC, branchId]);
        res.status(200).json({ message: 'Employee added successfully', result });
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).send('Failed to add employee');
    }
}

// 

// Define the function to remove an employee
async function removeEmployee(req, res) {
    const { staff_id } = req.body;
    const query = `CALL removeEmployee(?)`;

    try {
        const [result] = await db.query(query, [staff_id]);
        res.status(200).json({ message: 'Employee removed successfully', result });
    } catch (err) {
        console.error('Error removing employee:', err);
        res.status(500).send('Failed to remove employee');
    }
}

// Define the function to update employee details
async function updateEmployeeDetails(req, res) {
    const { staff_id, full_name, date_of_birth } = req.body;
    const query = `CALL updateEmployee_staff_details(?, ?, ?)`;

    try {
        const [result] = await db.query(query, [staff_id, full_name, date_of_birth]);
        res.status(200).json({ message: 'Employee details updated successfully', result });
    } catch (err) {
        console.error('Error updating employee details:', err);
        res.status(500).send('Failed to update employee details');
    }
}

// Define the function to update user details
async function updateUserDetails(req, res) {
    const { staff_id, user_name, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `CALL updateEmployee_user_details(?, ?, ?, ?)`;

    try {
        const [result] = await db.query(query, [staff_id, user_name, hashedPassword, email]);
        res.status(200).json({ message: 'User details updated successfully', result });
    } catch (err) {
        console.error('Error updating user details:', err);
        res.status(500).send('Failed to update user details');
    }
}

// Define the function to update employee branch
async function updateEmployeeBranch(req, res) {
    const { staff_id, branch_id } = req.body;
    const query = `CALL updateEmployee_branch(?, ?)`;

    try {
        const [result] = await db.query(query, [staff_id, branch_id]);
        res.status(200).json({ message: 'Employee branch updated successfully', result });
    } catch (err) {
        console.error('Error updating employee branch:', err);
        res.status(500).send('Failed to update employee branch');
    }
}

// Export the functions as named exports
export { addEmployee, removeEmployee, updateEmployeeDetails, updateUserDetails, updateEmployeeBranch };
