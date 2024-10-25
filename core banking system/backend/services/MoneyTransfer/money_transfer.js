import db from '../Config/database.js';

async function money_transfer(req, res) {
    const { sender_account_id, receiver_account_id, transfer_amount, description } = req.body;

    const query = `CALL MoneyTransfer(?, ?, ?, ?)`;

    try {
        const [result] = await db.query(query, [sender_account_id, receiver_account_id, transfer_amount, description]);
        res.status(200).json({ message: 'Money transfer successful', result });
    } catch (err) {
        console.error('Error during money transfer:', err);
        res.status(500).send('Money transfer failed');
    }
}

export { money_transfer };
