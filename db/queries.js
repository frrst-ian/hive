const pool = require("./pool");

async function signUp(firstName, lastName, email, hashedPassword) {
    await pool.query('INSERT INTO users(first_name, last_name, email,password) VALUES($1,$2,$3,$4)', [
        firstName, lastName, email, hashedPassword,
    ]);
}

async function getUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0];
}
module.exports = { signUp ,getUserByEmail};