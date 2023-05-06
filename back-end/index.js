const port = 9000;
const express = require('express');
const app = express();
const cors = require("cors");
const User = require('./database/User');

app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
    resp.send("Hello World");
})

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    resp.send(result);
})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.send(user);
        }
        else {
            resp.send({ result: "No User found" });
        }
    }
})

app.listen(port, () => {
    console.log("App is listening port " + port);
})