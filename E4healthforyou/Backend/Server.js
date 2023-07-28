const express = require('express');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('../middleware/db');
const login = require('../routes/login');
const signup = require('../routes/signup');
const forgotpassword = require('../routes/forgotpassword');
 const passwordreset = require('../routes/passwordreset');
 const Getpatients = require('../routes/getpatients');
//  const patient = require('../routes/patient');
//  const Getpatients = require('../routes/getpatients');
//  const updatepatient = require('../routes/updatepatient');
//  const Getpatientid = require('../routes/getpatients');
// const protect = require('../routes/protect');


app.use(bodyParser.json());
app.use(express.json());


app.use(cookieParser());

connectToDatabase();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));



// app.use('/api', protect);
app.use('/api', signup);
app.use('/api', login);
app.use('/api', forgotpassword);
app.use('/api', passwordreset);
// app.use('/api', patient);
app.use('/api', Getpatients);
// app.use('/api', patient);
// app.use('/api', updatepatient);

// app.use(cookieParser());
// connectToDatabase();
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
  // })
  // .catch((error) => {
  //   console.log('Failed to connect to MongoDB:', error.message);
  // });
  // db.connection
//   .once('open', () => {
//   //   console.log('Connected to MongoDB');
//   // })
//   // .on('error', (error) => {
//   //   console.log('Failed to connect to MongoDB:', error);
//   });


// mongoose.connect('mongodb://localhost:27017/e4health', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // createIndexes: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');

    // app.post('/api/signupUser', async (req, res) => {
    //   const { fullName, email, password } = req.body;
    //   console.log(req.body)

    //   if (!fullName || !email || !password) {
    //     return res.status(400).json({ error: 'Missing required fields' });
    //   }

    //   try {
    //     const newSignup = new Signup({
    //       fullName,
    //       email,
    //       password,
    //     });

    //     await newSignup.save();
    //     console.log('Admin signed up');
    //     return res.status(200).json({ message: 'Admin signed up successfully' });
    //   } catch (error) {
    //     console.log('Error signing up:', error.message);
    //     return res.status(500).json({ error: 'Error signing up' });
    //   }
    // });
    // app.use(session({
//   secret: 'azhar456', // Replace with a secure secret key
//   resave: false,
//   saveUninitialized: true,
// }));
// app.use(session({
//   secret: 'azhar456', // Replace with a secure secret key
//   resave: false,
//   saveUninitialized: true,
// }));




