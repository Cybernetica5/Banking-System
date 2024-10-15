import db from '../Config/database.js';

async function getLoanDetails(req, res) {
    const userId = req.query.userId;
    try {
        const [rows] = await db.query('CALL GetLoanDetails(?)', [userId]);
        res.json(rows[0]); // The result of a CALL statement is an array of arrays
    } catch (err) {
        console.error('Error fetching loan details:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getCreditLimit(req, res) {
    const userId = req.query.userId;
    console.log('User ID:', userId);

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const [rows] = await db.query(`
            SELECT bank_database.GetCreditLimit(?) AS credit_limit;
        `, [userId]);

        if (rows.length > 0 && rows[0].credit_limit !== null) {
            const creditLimit = rows[0].credit_limit; // Assuming function returns correct value
            res.json({ creditLimit });
        } else {
            res.json({ creditLimit: 0, message: "No fixed deposits found." });
        }
    } catch (err) {
        console.error('Error fetching credit limit:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Ensure only one export statement
export { getLoanDetails, getCreditLimit };