// our dependencies 
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// let us run the server.so its running,
app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
});

//let us create our database(mysql)
const db =mysql.createConnection({
    host:'localhost',
    post:3306,//specify the port here
    user:'root',
    password:'pass@1234',
    database:'project',
})

//let us now create a route to the server that will register a user.

app.post('/register', (req, res)=>{
    //we need to get variables sent from the form
    const sentEmail =req.body.Email
    const sentUserName =req.body.UserName
    const sentPassword =req.body.Password

    //lets create sql statement to insert the user to the database table user
    const SQL = 'INSERT INTO user(email, username, password) VALUES(?,?,?)'//we are going to enter these values through a variable
    const Values = [sentEmail, sentUserName, sentPassword]

    //query to execute the  sql statement stated above
    db.query(SQL, Values,(err, results)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log('User inserted successfully!')
            res.send({message:'user added'})
            //let try and see
            //user has not been submitted, we need to use Express and cors
            //successful
        }
    })
})

//Now we need to login with these credentiels from a regitered user
//lets create another route 
app.post('/login',(req, res)=>{
    //we nee to get variables sent from the form
    const sendloginUserName = req.body.LoginUserName
    const sentloginPassword = req.body.LoginPassword

    //lets create sql statement to insert the user to the database table user
    const SQL = 'SELECT*FROM user WHERE username =? && password =?'
    //we are going to enter these values through a variable
    const Values = [sendloginUserName, sentloginPassword]

    //query to execute the sql statement started above
    db.query(SQL, Values, (err, results)=>{
        if(err){
            res.send({error: err})
        }
        if(results.length > 0){
            res.send(results)
        }
        else{
            res.send({message: `Credentials Don't match!`})
            //this should be good, lets try to login.
        }
    })
})

// Route to handle contact form submission
app.post('/contact', (req, res) => {
const{name,email,text}=req.body;

    const sql = 'INSERT INTO contact (name, email, text) VALUES (?, ?, ?)';
    const values = [name,email, text];

    db.query(sql, values, (err, results) => {
        if (err) {
            return res.send("Message failed");
        } else {
            return res.send({message:"message sent successfully",data:results});
        }
    });
});
// Route to handle reset password request
app.post('/reset-password', (req, res) => {
    // Get username and new password from the request body
    const { username, newPassword } = req.body;

    // Check if username and new password are provided
    if (!username || !newPassword) {
        return res.status(400).send({ message: 'Username and new password are required.' });
    }

    // Create SQL statement to update user's password
    const SQL = 'UPDATE user SET password = ? WHERE username = ?';
    const values = [newPassword, username];

    // Execute the SQL query to update the password
    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error('Error updating password:', err);
            return res.status(500).send({ message: 'Internal server error.' });
        }

        // Check if the password was updated successfully
        if (results.affectedRows > 0) {
            return res.status(200).send({ message: 'Password reset successfully.' });
        } else {
            return res.status(404).send({ message: 'User not found or password not updated.' });
        }
    });
});
