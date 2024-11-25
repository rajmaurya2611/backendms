const { connectToDB, sql } = require('../config/dbConfig');

// Create a user
async function createUser(req, res) {
    const { username, password, mobileNumber } = req.body;
    const pool = await connectToDB();

    try {
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .input('mobileNumber', sql.NVarChar, mobileNumber)
            .query(`
                INSERT INTO Users (Username, Password, MobileNumber)
                VALUES (@username, @password, @mobileNumber)
            `);

        res.status(201).send({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to create user' });
    }
}

// Get all users
async function getAllUsers(req, res) {
    const pool = await connectToDB();

    try {
        const result = await pool.request().query('SELECT * FROM Users');
        res.status(200).send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Failed to fetch users' });
    }
}

module.exports = { createUser, getAllUsers };
