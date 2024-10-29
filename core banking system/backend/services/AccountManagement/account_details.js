import db from '../../services/Config/database.js';

async function getAccounts(req, res) {
    try {
        const [rows] = await db.query("SELECT account_number FROM account");
        res.json(rows);
    } catch (err) {
        console.error('Error fetching accounts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getUserAccounts(req, res) {
    try {
        console.log('Fetching user accounts...');
        console.log('User ID:', req.query.customerId);
        const [rows] = await db.query("SELECT account_number FROM account WHERE customer_id = ?", [req.query.customerId]);
        console.log('User accounts:', rows);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching user accounts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAccountSummary(req, res) {
    try {
        const [rows] = await db.query(
            "SELECT * FROM bank_database.accounts_summary WHERE customer_id = ?",
            [req.query.customer_id]
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching account summary:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export { getAccounts, getAccountSummary, getUserAccounts };