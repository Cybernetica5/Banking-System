import db from '../../services/Config/database.js';

async function addIndividualCustomer(req, res) {
    const { branchId, fullName, dateOfBirth, NIC, address, mobileNumber, landlineNumber, accountType } = req.body;

    try {
        await db.query(
            `CALL add_individual_customer(?, ?, ?, ?, ?, ?, ?, ?, @account_number);`,
            [branchId, fullName, dateOfBirth, NIC, address, mobileNumber, landlineNumber, accountType]
        );

        // get the account number
        const [rows] = await db.query(`SELECT @account_number AS account_number;`);

        const accountNumber = rows[0].account_number;
        res.json({ success: true, message: 'Individual customer added successfully', accountNumber });
    } catch (err) {
        console.error('Error adding individual customer:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function addOrganizationCustomer(req, res) {
    const { branchId, name, licenseNumber, address, mobileNumber, landlineNumber, accountType } = req.body;

    try {
        await db.query(
            `CALL add_organization_customer(?, ?, ?, ?, ?, ?, ?, @account_number);`,
            [branchId, name, licenseNumber, address, mobileNumber, landlineNumber, accountType]
        );

        // get the account number
        const [rows] = await db.query(`SELECT @account_number AS account_number;`);

        const accountNumber = rows[0].account_number;
        res.json({ success: true, message: 'Organization customer added successfully', accountNumber });
    } catch (err) {
        console.error('Error adding organization customer:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

export { addIndividualCustomer, addOrganizationCustomer };
