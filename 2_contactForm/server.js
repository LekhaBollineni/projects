const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database("/database.sqlite", (err) => {
    if(err){
        console.error("Database connection error: ", err);
    } else {
        console.log("Connected to the database.");
    }
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Create the contacts table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// handle form submission

app.post('/submit', (req, res) =>{
    const { firstName, lastName, phoneNumber, email, message } = req.body;
    console.log("Received data: ", req.body);
    
    if(!firstName || !lastName || !phoneNumber || !email){
        return res.status(400).json({message: "Please fill in all required fields."});
    }

    db.run(
        `INSERT INTO contacts(firstName, LastName, phoneNumber, email, message) VALUES(?,?,?,?,?)`,
        [firstName, lastName, phoneNumber, email, message],
        function(err){
            if(err){
                console.error("Database error: ", err);
                return res.status(500).json({message: "An error occurred while saving your message."});
            }
            res.status(200).json({message: "Thank you for contacting us!"});
        }
    ); 
});

//admin page
app.get("/admin", (req, res) => {
    db.all("SELECT * FROM contacts ORDER BY timestamp DESC", [], (err, rows) => {
        if(err){
            console.error("Database error: ", err);
            return res.status(500).send("An error occurred while retrieving messages.");
        }
        let html = `<h2> Contact Messages</h2>
        <table border="1" cellpadding="5" cellspacing="0">
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Message</th>
                <th>Timestamp</th>
            </tr>
            ${rows.map(row => `
                <tr>
                    <td>${row.id}</td>
                    <td>${row.firstName}</td>
                    <td>${row.lastName}</td>
                    <td>${row.phoneNumber}</td>
                    <td>${row.email}</td>
                    <td>${row.message}</td>
                    <td>${new Date(row.timestamp).toLocaleString()}</td>
                </tr>`).join('')}
        </table>`;
        res.send(html);
    });
});

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




