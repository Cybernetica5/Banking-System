import db from '../Config/database.js';

// app.post('/money-transfer', (req, res) => {
//     const { sender_account_id, receiver_account_id, transfer_amount } = req.body;
  
//     const query = `CALL MoneyTransfer(?, ?, ?)`;
  
//     db.query(query, [sender_account_id, receiver_account_id, transfer_amount], (err, result) => {
//       if (err) {
//         console.error('Error during money transfer:', err);
//         res.status(500).send('Money transfer failed');
//       } else {
//         res.status(200).json({ message: 'Money transfer successful', result });
//       }
//     });
//   });


async function depositFunds(req, res) {
    const { accountNumber, amount, branchId, description } = req.body;

    const callQuery = `CALL DepositFunds(?, ?, ?, ?, @result_message)`;
    const selectQuery = `SELECT @result_message AS result`;

    try {
        await db.query(callQuery, [accountNumber, amount, branchId, description]);

        const [results] = await db.query(selectQuery);

        console.log('Results from SELECT query:', results[0].result);

        if (results.length > 0 && results[0]) {
            if (results[0].result === 'Deposit successful') {
                const resultMessage = results[0].result; 
                return res.status(200).json({ message: resultMessage });
            }
            else {
                const resultMessage = results[0].result; 
                return res.status(400).json({ message: resultMessage });
            }
        } else {
            return res.status(400).json({ error: 'No result message returned from the stored procedure.' });
        }
    } catch (err) {
        console.error('Error processing deposit:', err);
        return res.status(500).json({ error: 'Error processing deposit', details: err.message });
    }
}

async function withdrawFunds(req, res) {
    const { accountNumber, amount, branchId, description } = req.body;

    const callQuery = `CALL WithdrawFunds(?, ?, ?, ?, @result_message)`;
    const selectQuery = `SELECT @result_message AS result`;


    try {
        await db.query(callQuery, [accountNumber, amount, branchId, description]);

        const [results] = await db.query(selectQuery);

        console.log('Results from SELECT query:', results[0].result);

        if (results.length > 0 && results[0]) {
            if (results[0].result === 'Withdrawal successful') {
                const resultMessage = results[0].result; 
                return res.status(200).json({ message: resultMessage });
            }
            else {
                const resultMessage = results[0].result; 
                return res.status(403).json({ message: resultMessage });
            }
        } else {
            return res.status(400).json({ error: 'No result message returned from the stored procedure.' });
        }
    } catch (err) {
        console.error('Error processing deposit:', err);
        return res.status(500).json({ error: 'Error processing withdraw', details: err.message });
    }
}

export { depositFunds, withdrawFunds };