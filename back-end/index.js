const port = 3000;
const express = require("express");
const app = express();

const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routers
const homeRouter = require("./app/routes/homeRouter");
app.use("/", homeRouter);

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.listen(port, () => {
  console.log("App is listening port " + port);
});
