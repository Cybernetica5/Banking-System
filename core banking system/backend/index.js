import express from 'express';
//import mysql from 'mysql';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());



const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.getConnection((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

app.listen(8800, () => {
    console.log('Connected to backend!.....Server is running on http://localhost:8800');
  });

// get methods //

app.get("/",(req,res)=>{
    res.json("Hello this is the backend")
})

app.get("/accounts", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM account");
        res.json(rows);
    } catch (err) {
        console.error('Error fetching accounts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// get account summary
app.get("/accounts_summary", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM bank_database.accounts_summary WHERE customer_id = ?",
            [req.query.customer_id]
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching account summary:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// get recent transactions

app.get("/recent_transactions", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT transaction_id, date, transaction_type, amount, description FROM bank_database.transaction_history WHERE customer_id = ? LIMIT 3",
            [req.query.customer_id]
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching recent transactions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post("/login", async (req, res) => {
    const { user_name, password } = req.body;
    try {
      const [rows] = await db.query(
        "SELECT * FROM user WHERE user_name = ? AND password = ?",
        [user_name, password]
      );
      if (rows.length > 0) {
        const user = rows[0];
        res.json({ 
            success: true, 
            user: { 
                id: user.user_id, 
                user_name: user.user_name, 
                role: user.role 
            } 
        });
      } else {
        res.json({ success: false });
      }
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get("/loan_details", async (req, res) => {
    const userId = req.query.userId;
    try {
      const [rows] = await db.query(`
        SELECT 
            l.loan_id, 
            l.loan_type, 
            l.amount, 
            l.interest_rate,
            COALESCE(ply.penalty_amount, 0) AS penalty_amount
        FROM
            loan l
            JOIN account a ON l.account_id = a.account_id
            JOIN customer c ON a.customer_id = c.customer_id
            JOIN user u ON c.user_id = u.user_id
            LEFT JOIN (
                SELECT 
                    li.loan_id, 
                    lp.instalment_id, 
                    pt.penalty_amount
                FROM
                    loan_installment li
                    LEFT JOIN loan_payment lp ON li.installment_id = lp.instalment_id
                    LEFT JOIN penalty p ON lp.penalty_id = p.penalty_id
                    LEFT JOIN penalty_types pt ON p.penalty_type_id = pt.penalty_type_id
            ) AS ply ON l.loan_id = ply.loan_id
        WHERE
            u.user_id = ?
        GROUP BY 
            l.loan_id, l.loan_type, l.amount, l.interest_rate, ply.penalty_amount
      `, [userId]);
      res.json(rows);
    } catch (err) {
      console.error('Error fetching loan details:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get("/credit-limit", async (req, res) => {
    const userId = req.query.userId;
    console.log('User ID:', userId);
    
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const [rows] = await db.query(`
            SELECT bank_database.credit_limit(?) AS credit_limit;
        `, [userId]);

        if (rows.length > 0 && rows[0].credit_limit !== null) {
            const creditLimit = rows[0].credit_limit; // Assuming function returns correct value
            res.json({ creditLimit });
        } else {
            res.json({ creditLimit: 0, message: "No fixed deposits found." });
        }
    } catch (err) {
        console.error('Error fetching credit limit:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get transaction history
app.get("/transaction_History", (req, res) => {
    const q = "SELECT transaction_id, date, transaction_type, amount, description FROM bank_database.transaction_history WHERE customer_id = 1"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
