const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json({ message: "CI/CD Deployment Success!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
