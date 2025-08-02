const pool = require("./pool");

async function signUp(firstName, lastName, email, hashedPassword) {
    const result = await pool.query('INSERT INTO users (first_name, last_name, email,password) VALUES($1,$2,$3,$4) RETURNING *', [
        firstName, lastName, email, hashedPassword,
    ]);
    return result.rows[0];
}

async function getUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0];
}

async function updateMembership(id) {
    const query = "UPDATE users SET membership_status = 'premium' WHERE id = $1";
    await pool.query(query, [id]);
}

async function getUserById(id) {
    const query = "SELECT * FROM users WHERE id = $1"
    const result = await pool.query(query, [id]);
    return result.rows[0];
}

// Insert new message into db 
async function addNewMessage(title, content, created_at, user_id) {
    await pool.query("INSERT INTO posts(title,content,created_at,user_id) VALUES($1,$2,$3,$4)", [
        title, content, created_at, user_id
    ])
}

async function getAllMessages() {
    const query =
        `SELECT
	        p.id,
	        u.first_name,
	        u.last_name,
	        p.user_id,
	        p.title,
	        p.content,
	        p.created_at
        FROM 
	        posts p 
        INNER JOIN users u on p.user_id = u.id
        ORDER BY p.created_at DESC;`
    const { rows } = await pool.query(query)
    return rows;
}

module.exports = { signUp, getUserByEmail, getUserById, updateMembership, addNewMessage, getAllMessages };