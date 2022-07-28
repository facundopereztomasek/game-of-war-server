const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("OK");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
