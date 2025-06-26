require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')

app.use(cors())

// db connection
const dbconnection = require('./db/dbconfig');
// ./routes/userRoute
const userRouter = require('./routes/user');

app.use(express.json());

app.use("/api/user", userRouter);

async function testDatabaseConnection() {
    try {
        const [rows] = await dbconnection.execute("SELECT 'test' AS message");
        await app.listen(port);
        console.log(`Server is running on http://localhost:${port}`);
         // Log the message from the database
         console.log("Database connection successful:", rows[0].message);
       
        
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
    }
}
testDatabaseConnection();


