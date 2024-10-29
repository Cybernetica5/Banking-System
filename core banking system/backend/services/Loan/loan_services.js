import db from '../Config/database.js';

async function getLoanDetails(req, res) {
    console.log('Fetching loan details...');
    const userId = req.query.userId;
    try {
        const [rows] = await db.query('CALL GetLoanDetails(?)', [userId]);
        console.log("loan details: ", rows[0]);
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
            console.log('Credit limit:', creditLimit);
            res.json({ creditLimit });
        } else {
            res.json({ creditLimit: 0, message: "No fixed deposits found." });
        }
    } catch (err) {
        console.error('Error fetching credit limit:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function applyLoan(req, res) {
    const { accountNumber, customerId,loanType, loanAmount, loanStartDate, loanEndDate } = req.body;

    if (!customerId || !loanAmount || !loanStartDate || !loanType || !accountNumber || !loanEndDate) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        console.log("loan details: ",loanType, loanAmount, loanStartDate, loanEndDate);
        const [account_id] = await db.query('SELECT account_id FROM account WHERE account_number = ?', [accountNumber]);
        const accountId = account_id[0].account_id;
        console.log("account ID: ",accountId);

        const [rows] = await db.query('CALL ApplyLoan(?, ?, ?, ?, ?)', [accountId, loanType, loanAmount, loanStartDate, loanEndDate]);
        console.log("Loan application submitted successfully");
        res.json({ message: "Loan application submitted successfully" });
    } catch (err) {
        console.error('Error applying for loan:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function payLoanInstallment (req,res){
    const {installment_id,amount} = req.body;
    console.log(req.body);
    
    const date = new Date().toISOString().slice(0, 11).replace('T', ' ');
    console.log("date: ",date);

    if(!installment_id || !amount){
        return res.status(400).json({error: "Missing required fields"});
    }
    try{

        const [rows] = await db.query('CALL AddLoanPayment(?,?,?)',[installment_id,amount,date]);
        console.log("Loan installment paid successfully");
        res.json({message: "Loan installment paid successfully"});
    }catch(err){
        console.error('Error paying loan installment:', err);
        res.status(500).json({error: 'Internal server error'});
    }

};

async function getInstallmentAmount(req,res){
    console.log("Fetching installment amount...");
    console.log("req.body: ",req.query);
    const {loanId} = req.query;
    console.log("loan_id: ",loanId);
    if(!loanId){
        return res.status(400).json({error: "Missing required fields"});
    }
    try{
        const [rows] = await db.query('SELECT installment_id, amount FROM loan_installment WHERE loan_id = ?',[loanId]);
        res.json(rows[0]);
    }catch(err){
        console.error('Error fetching loan installment amount:', err);
        res.status(500).json({error: 'Internal server error'});
    }
}

// Ensure only one export statement
export { getLoanDetails, getCreditLimit, applyLoan, payLoanInstallment, getInstallmentAmount };