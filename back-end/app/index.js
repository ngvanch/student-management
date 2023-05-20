const express = require("express");
const app = express();
const { notFound, errorHandler } = require("./errorHandle");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routers
const homeRouter = require("./routes/home.router");
const accountRouter = require("./routes/account.router");

app.use("/", homeRouter);
app.use("/users/", accountRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening port ${PORT}`);
});
