import db from '../Config/database.js';

async function getTransactionReport(req, res) {
    const { startDate, endDate, branchId } = req.body;

    try {
        const [rows] = await db.query(
            `SELECT 
                transaction_id,
                date,
                amount,
                transaction_type,
                account_number
            FROM branch_transaction_details WHERE date BETWEEN ? AND ? AND branch_id = ?;`,
            [startDate, endDate, branchId]
        );

        if (rows.length === 0) {
            return res.status(400).json({ success: false, error: 'No transactions found' });
        } else {
            return res.json({ success: true, transactions: rows });
        }

    } catch (err) {
        console.error('Error getting transaction report:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

export { getTransactionReport };