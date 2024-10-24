import db from '../Config/database.js';


// app.get("/user_info/:userId", (req, res) => {
//     const userId = req.params.userId;

//     const q = "SELECT * FROM bank_database.user_info WHERE user_id = ?"

//     db.query(q, [userId], (err, data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     });
// });

// update user information
// app.put("/user_info/:userId", (req, res) => {
//     const userId = req.params.userId;
//     const { username, email, address, mobileNumber, landlineNumber } = req.body;

//     const q = "CALL update_user_info(?, ?, ?, ?, ?, ?);";

//     db.query(q, [userId, username, email, address, mobileNumber, landlineNumber], (err, data) => {
//         if (err) {
//             console.error('Error executing stored procedure:', err);
//             return res.status(500).json({ error: 'Database query failed', details: err });
//         }
//         return res.json(data);
//     });
// });

// import db from '../Config/database.js'; // Ensure you have the correct import for your database connection

async function getUserInfo(req, res) {
    const userId = req.params.userId;

    const q = "SELECT * FROM bank_database.user_info WHERE user_id = ?";

    try {
        const [data] = await db.promise().query(q, [userId]);
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
        const [data] = await db.promise().query(q, [userId, username, email, address, mobileNumber, landlineNumber]);
        return res.json(data);
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        return res.status(500).json({ error: 'Database query failed', details: err.message });
    }
}

export { getUserInfo, updateUserInfo };