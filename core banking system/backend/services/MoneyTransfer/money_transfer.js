// import db from '../Config/database.js';

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
