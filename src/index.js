const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
    res.send("OK");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
