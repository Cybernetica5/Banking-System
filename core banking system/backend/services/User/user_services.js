import db from '../Config/database.js';
import bcrypt from 'bcrypt';

async function getUserInfo(req, res) {
    const userId = req.params.userId;

    const q = "SELECT * FROM bank_database.user_info WHERE user_id = ?";

    try {
        const [data] = await db.query(q, [userId]);
        return res.json(data);
    } catch (err) {
        console.error('Error fetching user info:', err);
        return res.status(500).json({ error: 'Database query failed', details: err.message });
    }
}

async function updateUserInfo(req, res) {
    const userId = req.params.userId;
    const { username, email, address, mobileNumber, landlineNumber } = req.body;

    const q = "CALL update_user_info(?, ?, ?, ?, ?, ?);";

    try {
        const [data] = await db.query(q, [userId, username, email, address, mobileNumber, landlineNumber]);
        return res.json(data);
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        return res.status(500).json({ error: 'Database query failed', details: err.message });
    }
}

async function getStaffInfo(req, res) {
    const userId = req.params.userId;

    const q = "SELECT * FROM bank_database.staff_info WHERE user_id = ?";

    try {
        const [data] = await db.query(q, [userId]);
        return res.json(data);
    } catch (err) {
        console.error('Error fetching user info:', err);
        return res.status(500).json({ error: 'Database query failed', details: err.message });
    }
}

async function updateStaffInfo(req, res) {
    const userId = req.params.userId;
    const { username, email } = req.body;

    const q = "CALL update_staff_info(?, ?, ?);";

    try {
        const [data] = await db.query(q, [userId, username, email]);
        return res.json(data);
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        return res.status(500).json({ error: 'Database query failed', details: err.message });
    }
}

async function changeUserPassword(req, res) {
    const userId = req.params.userId;
    const { currentPassword, newPassword } = req.body;

    const passwordObj =  await db.execute('SELECT password as password_hash FROM user WHERE user_id = ?', [userId]);
    const hashedCurrentPassword = passwordObj[0][0].password_hash;
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const isMatch = await bcrypt.compare(currentPassword, hashedCurrentPassword);

    if (isMatch) {
        const q = "CALL change_user_password(?, ?, @result)";
        const q_result = "SELECT @result AS result";

        try {
            const [data] = await db.query(q, [userId, hashedNewPassword]);
            const [results] = await db.query(q_result);
            console.log('Results from SELECT query:', results[0].result);
            return res.json(results[0]);
        } catch (err) {
            console.error('Error executing stored procedure:', err);
            return res.status(500).json({ error: 'Database query failed', details: err.message });
        }
    }
    else {;
        console.error('Invalid password');
        return res.status(401).json({ error: 'Invalid password' });
    }   
}

export { updateUserInfo , getUserInfo, updateStaffInfo, getStaffInfo, changeUserPassword };