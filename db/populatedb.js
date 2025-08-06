#! /usr/bin/env node
require('dotenv').config();
const { Client } = require("pg");

const SQL = `
-- Clear existing data
DELETE FROM posts;
DELETE FROM users;

-- Insert users
INSERT INTO users (first_name, last_name, email, password) VALUES
('Walter', 'White', 'walter@hive.com', 'Password123*'),
('Jesse', 'Pinkman', 'jesse@hive.com', 'Password123*'),
('Saul', 'Goodman', 'saul@hive.com', 'Password123*'),
('Gustavo', 'Fring', 'gus@hive.com', 'Password123*'),
('Hank', 'Schrader', 'hank@hive.com', 'Password123*'),
('Skyler', 'White', 'skyler@hive.com', 'Password123*'),
('Mike', 'Ehrmantraut', 'mike@hive.com', 'Password123*'),
('Marie', 'Schrader', 'marie@hive.com', 'Password123*');

-- Insert posts
INSERT INTO posts (user_id, title, content) VALUES
((SELECT id FROM users WHERE email = 'walter@hive.com'), 'I Am The Danger', 'I am not in danger, Skyler. I am the danger!'),
((SELECT id FROM users WHERE email = 'walter@hive.com'), 'Say My Name', 'Say my name. You are goddamn right.'),
((SELECT id FROM users WHERE email = 'jesse@hive.com'), 'Science', 'Yeah, science! Magnets, bitch!'),
((SELECT id FROM users WHERE email = 'jesse@hive.com'), 'Private Domicile', 'This is my own private domicile and I will not be harassed!'),
((SELECT id FROM users WHERE email = 'saul@hive.com'), 'Better Call Saul', 'Hi, I am Saul Goodman. Did you know that you have rights?'),
((SELECT id FROM users WHERE email = 'saul@hive.com'), 'Criminal Lawyer', 'I am not a criminal lawyer, I am a criminal lawyer.'),
((SELECT id FROM users WHERE email = 'gus@hive.com'), 'A Man Provides', 'A man provides. And he does it even when he is not appreciated.'),
((SELECT id FROM users WHERE email = 'hank@hive.com'), 'Minerals', 'They are minerals, Marie! Jesus Christ!'),
((SELECT id FROM users WHERE email = 'hank@hive.com'), 'ASAC Schrader', 'My name is ASAC Schrader, and you can go f yourself.'),
((SELECT id FROM users WHERE email = 'skyler@hive.com'), 'Shut Up', 'Shut up. Just shut up.'),
((SELECT id FROM users WHERE email = 'mike@hive.com'), 'No Half Measures', 'No more half measures, Walter.'),
((SELECT id FROM users WHERE email = 'marie@hive.com'), 'Purple', 'I just think purple is such a beautiful color.');
`;

async function main() {
  console.log("Seeding database...");
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
    console.log("Done!");
  }
}

main();