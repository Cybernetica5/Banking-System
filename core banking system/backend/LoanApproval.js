app.post("/approve-loan", async (req, res) => {
    const { loan_id, manager_user_id } = req.body;
    try {
        const [rows] = await db.query(
            "CALL approve_loan(?, ?)",
            [loan_id, manager_user_id]
        );
        res.json({ success: true, message: 'Loan approved successfully' });
    } catch (err) {
        console.error('Error during loan approval:', err);
        if (err.sqlState === '45000') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});