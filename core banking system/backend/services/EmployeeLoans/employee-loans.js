import db from '../Config/database.js';

async function employee_loans(req, res) {
    console.log('Loan request:', req.body);
    const { selectedAccount, loanType, Amount, start_date, end_date, status } = req.body;
    console.log('Loan request:', selectedAccount, loanType, Amount, start_date, end_date, status);

    const query = `CALL AddLoan(?, ?, ?, ?, ?, ?)`;

    try {
        const [result] = await db.query(query, [selectedAccount, loanType, Amount, start_date,end_date,status]);
        res.status(200).json({ message: 'Loan applied successfully ', result });
    } catch (err) {
        console.error('Error during loan applying:', err);
        res.status(500).send('Failed to applying loan');
    }
}

export { employee_loans };
