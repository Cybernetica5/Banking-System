import db from '../../Config/database.js';

async function createFixedDeposit(req, res) {
  const { accountNumber, amount, duration, fd_plan_id } = req.body;

    // Validate required fields
    if ( !fd_plan_id || !accountNumber || !amount || !duration) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    console.log('Creating fixed deposit:', req.body);

    try {
      const [accountIdResult] = await db.query('SELECT account_id FROM account WHERE account_number = ?', [accountNumber]);
      const accountId = accountIdResult[0].account_id;
      console.log('Account ID:', accountId);
      const startDate = new Date().toISOString().slice(0, 10);
      const endDate = new Date(new Date().setMonth(new Date().getMonth() + duration)).toISOString().slice(0, 10);
      console.log('Start date:', startDate);
      console.log('End date:', endDate);
    
      // Create fixed deposit
      const [results] = await db.query(
        `SET @p_message = '0'; CALL create_fixed_deposit(?, ?, ?, ?, ?, @p_message); SELECT @p_message AS message;`,
        [accountId, amount, fd_plan_id, startDate, endDate]
      );
    
      //const message = db_response.message;
      const message = results[2][0].message;
      console.log('Fixed deposit created:', message);

      return res.status(200).json({ success: true, message });
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