const sql = require('mssql');

const config = {
    server: "7193RAJMAU4136L\\SQLEXPRESS",
    database: "testdb1",
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    authentication: {
        type: 'ntlm',
        options: {
            userName: "sa",
            password: "Mtsl@123",
            domain: "",
        }
    }
};

async function connectToDB() {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('Database connection failed: ', err);
        throw err;
    }
}

module.exports = { connectToDB, sql };
