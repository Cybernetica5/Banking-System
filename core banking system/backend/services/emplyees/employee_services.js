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
export default addEmployee;