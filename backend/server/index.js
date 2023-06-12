const express = require('express');
const app = express();
const { connectDB } = require('./utils/dbConnection');
const { notFound, errorHandler } = require('./middlewares/errorHandle');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
connectDB();

// Routes
const UserRoutes = require('./routes/user.route');
const StudentRoutes = require('./routes/student.route');
const ClassRoutes = require('./routes/class.route');
const SubjectRoutes = require('./routes/subject.route');
const ScoreRoutes = require('./routes/score.route');
const AuthRoutes = require('./routes/auth.route');

// Setup routes
// User route
app.use('/api/v1/users', UserRoutes);

// Student route
app.use('/api/v1/students', StudentRoutes);

// Class route
app.use('/api/v1/classes', ClassRoutes);

// Subject route
app.use('/api/v1/subjects', SubjectRoutes);

// Score route
app.use('/api/v1/scores', ScoreRoutes);

// Auth route
app.use('/api/v1/auth', AuthRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening port ${PORT}`);
});
