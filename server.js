const express = require("express");
const cors = require("cors");
const app = express();
const partnerRouter = require("./routes/partner");

app.use(express.json());
app.use(cors());
app.use("/partner", partnerRouter);

//testing
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(5050, () => {
  console.log("Running on port: 5050");
});
