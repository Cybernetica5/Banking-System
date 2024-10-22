import db from '../Config/database.js';

async function getAccountDetails(req, res) {
    const customerId = req.body.customerId;

    try {
        const [rows] = await db.query('CALL GetAccountDetails(?)', [customerId]);
        res.json(rows[0]); // The result of a CALL statement is an array of arrays
    } catch (err) {
        console.error('Error fetching loan details:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export {getAccountDetails};