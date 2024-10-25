import db from '../Config/database.js';

async function addEmployee(req, res) {
    const { user_name, password, email, full_name, date_of_birth, NIC, branch_id } = req.body;

    const query = `CALL AddEmployee(?, ?, ?, ?, ?, ?, ?)`;

    try {
        const [result] = await db.query(query, [user_name, password, email, full_name, date_of_birth, NIC, branch_id]);
        res.status(200).json({ message: 'Employee added successfully', result });
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).send('Failed to add employee');
    }
}


async function removeEmployee(req, res) {
    const { staff_id } = req.body;

    // Define the query to call the removeEmployee procedure
    const query = `CALL removeEmployee(?)`;

    try {
        // Execute the query with the given staff_id
        const [result] = await db.query(query, [staff_id]);

        // If successful, respond with a success message
        res.status(200).json({ message: 'Employee removed successfully', result });
    } catch (err) {
        // Handle any errors and send a failure response
        console.error('Error removing employee:', err);
        res.status(500).send('Failed to remove employee');
    }
}

async function updateEmployeeDetails(req, res) {
    const { staff_id, full_name, date_of_birth } = req.body;

    const query = `CALL updateEmployee_staff_details(?, ?, ?)`;

    try {
        // Execute the stored procedure with the parameters
        const [result] = await db.query(query, [staff_id, full_name, date_of_birth]);

        // Send success response
        res.status(200).json({ message: 'Employee details updated successfully', result });
    } catch (err) {
        // Handle errors and send failure response
        console.error('Error updating employee details:', err);
        res.status(500).send('Failed to update employee details');
    }
}

async function updateUserDetails(req, res) {
    const { staff_id, user_name, password, email } = req.body;

    const query = `CALL updateEmployee_user_details(?, ?, ?, ?)`;

    try {
        // Execute the stored procedure with the provided parameters
        const [result] = await db.query(query, [staff_id, user_name, password, email]);

        // Send a success response
        res.status(200).json({ message: 'User details updated successfully', result });
    } catch (err) {
        // Handle errors and send a failure response
        console.error('Error updating user details:', err);
        res.status(500).send('Failed to update user details');
    }
}

async function updateEmployeeBranch(req, res) {
    const { staff_id, branch_id } = req.body;

    const query = `CALL updateEmployee_branch(?, ?)`;

    try {
        // Execute the stored procedure with the provided parameters
        const [result] = await db.query(query, [staff_id, branch_id]);

        // Send a success response
        res.status(200).json({ message: 'Employee branch updated successfully', result });
    } catch (err) {
        // Handle errors and send a failure response
        console.error('Error updating employee branch:', err);
        res.status(500).send('Failed to update employee branch');
    }
}


export default {addEmployee,removeEmployee,updateEmployeeDetails,updateUserDetails,updateEmployeeBranch};