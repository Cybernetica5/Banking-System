import db from '../Config/database.js';

async function getPendingLoans() {
    try {
        const [rows] = await db.query('CALL GetPendingLoans()');
        return rows[0]; 
    } catch (err) {
        console.error('Error fetching pending loans:', err);
        throw err;
    }
}

async function approveLoan(loanId,approvedDate) {
    try {
        // Call the stored procedure and pass loanId as a parameter
        console.log('Approving loan:', loanId, approvedDate);
        const [result] = await db.query('CALL ManagerApproveLoan(?,?)', [loanId,approvedDate]);
        console.log('ApproveLoan result:', result);

        // Check if the stored procedure affected any rows
        if (result.affectedRows === 0) {
            return { error: 'Loan not found or already approved' };
        } else {
            return { message: 'Loan approved successfully' };
        }
    } catch (err) {
        console.error(`Error approving loan with ID ${loanId}:`, err);
        return { error: 'Internal server error' };
    }
}

export { getPendingLoans, approveLoan };
