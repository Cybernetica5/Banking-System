import db from '../Config/database.js';


async function getPendingLoans(req, res) {
    try {
        const [rows] = await db.query('CALL GetPendingLoans()');
        res.json(rows); 
    } catch (err) {
        console.error('Error fetching pending loans:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function approveLoan(req, res) {
    const loanId = req.body.loanId;

    try {
        const [result] = await db.query(`UPDATE loan SET status = 'approved' WHERE loan_id = ?`, [loanId]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Loan not found or already approved' });
        } else {
            res.json({ message: 'Loan approved successfully' });
        }
    } catch (err) {
        console.error(`Error approving loan with ID ${loanId}:`, err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export { getPendingLoans, approveLoan };
