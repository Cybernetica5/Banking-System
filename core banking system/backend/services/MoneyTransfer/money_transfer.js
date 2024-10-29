import db from '../Config/database.js';

async function money_transfer(req, res) {
    const { selectedAccount: sender_account_id, beneficiaryAccount: receiver_account_id, transferAmount: transfer_amount, description } = req.body;    console.log('Money transfer request:', req.body);

    console.log('Money transfer request:', sender_account_id, receiver_account_id, transfer_amount, description);

    const query = `
        CALL MoneyTransfer(?, ?, ?, ?, @confirmation_message);
        SELECT @confirmation_message AS confirmation_message;
    `;

    try {
        const [results] = await db.query(query, [sender_account_id, receiver_account_id, transfer_amount, description]);

        // Access confirmation message from the second result set
        console.log('Money transfer result:', results);
        const confirmationMessage = results[1][0].confirmation_message || 'No message returned';
        console.log('Money transfer result:', confirmationMessage);

        res.status(200).json({ message: 'Money transfer successful', confirmationMessage });
    } catch (err) {
        console.error('Error during money transfer:', err);
        res.status(500).send('Money transfer failed');
    }
}

export { money_transfer };