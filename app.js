const express = require("express")
const tareaRoute = require("./src/routes/tarea");
const auth = require("./src/routes/auth");
const figu = require("./src/routes/figuritas")

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello, world!");
  });


app.use("/tareas", tareaRoute);
app.use("/auth", auth);
app.use("/figu", figu);

app.listen(PORT, () => console.log(`App running in ${PORT}`))