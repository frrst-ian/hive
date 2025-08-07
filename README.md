# Hive - Members Only Club

## Table of Contents

1. [Description](#description)
2. [Demo](#demo)
3. [Design](#design)
4. [Features](#features)
5. [Technologies Used](#technologies-used)
6. [Project Challenges](#project-challenges)
7. [Thoughts and Observations](#thoughts-and-observations)
8. [Future Enhancements](#future-enhancements)
9. [Installation](#installation)

## Description

Hive is a members-only messaging platform that I built to enable users to post messages with tiered access control based on membership levels. I created this project to master my PostgreSQL database skills and practice authentication methods.

## Demo

Click here: [https://hive-ohwf.onrender.com/](https://hive-ohwf.onrender.com/)

## Design

<div align='center'>
<img src='/public/282shots_so.png' alt='Screenshot of desktop design'>
<img src='/public/329shots_so.png' alt='Screenshot of mobile design'>
</div>

## Features

- **Authentication System:** Secure user registration and login
- **Data Storage:** PostgreSQL database integration
- **Message Creation:** All users can create and post messages
- **Tiered Access Control:**

| Membership Level | Create Messages | View Authors | Delete Messages |
|------------------|----------------|--------------|-----------------|
| Basic | ✓ | ✗ | ✗ |
| Premium | ✓ | ✓ | ✗ |
| Admin | ✓ | ✓ | ✓ |

## Technologies Used

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- Passport.js (authentication)
- Bcrypt (password hashing)

**Frontend:**
- EJS templating
- CSS

## Project Challenges

The main challenge I faced was implementing different user authentication levels. Passport.js helped me achieve the login methods while Bcrypt provided secure password hashing. I explored various authentication approaches and settled on using conditional statements in my EJS views to limit content based on user membership status.

## Thoughts and Observations

Working on this project highlighted the importance of the DRY (Don't Repeat Yourself) principle. Focusing primarily on backend development without adequate frontend planning led to extensive code refactoring later. The key lesson I learned was maintaining balance between backend and frontend planning from the project's inception.

## Future Enhancements

- Update user messages
- Create user profiles

## Installation

1. Clone the GitHub repository to your local machine:

   ```bash
   git clone https://github.com/frrst-ian/hive.git
   ```

2. Navigate to the project's directory:

   ```bash
   cd hive
   ```

3. Install the project's dependencies using npm:

   ```bash
   npm install
   ```

4. To build the project:

   ```bash
   npm run build
   ```