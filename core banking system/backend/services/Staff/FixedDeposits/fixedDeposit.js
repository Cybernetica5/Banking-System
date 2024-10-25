import db from '../../Config/database.js';

async function createFixedDeposit(req, res) {
  const { customerId, accountNumber, amount, duration } = req.body;

  try {
    // Validate required fields
    if (!customerId || !accountNumber || !amount || !duration) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    console.log('Creating fixed deposit:', req.body);

    // Create fixed deposit
    await db.query(
      `CALL create_fixed_deposit(?, ?, ?);`,
      [accountNumber, amount, duration]
    );

    return res.status(200).json({ success: true, message: 'Fixed deposit created successfully' });
  } catch (error) {
    console.error('Error creating fixed deposit:', error);
    return res.status(500).json({ success: false, message: 'Error creating fixed deposit' });
  }
}

async function getSavingsAccounts(req, res) {
  try {
    const [rows] = await db.query('SELECT name, account_number FROM customer_details WHERE account_type = "savings"');
    console.log('Savings accounts:', rows);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error getting savings accounts:', error);
    res.status(500).json({ success: false, message: 'Error getting savings accounts' });
  }
}

export { createFixedDeposit, getSavingsAccounts };