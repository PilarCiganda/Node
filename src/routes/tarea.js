const express = require("express");
const {obtenerTareas, agregar, borrar} = require("../controllers/tarea")

const router = express.Router();

router.get("/obtener", obtenerTareas)
router.post("/agregar", agregar)
router.delete("/borrar/:tarea", borrar)

module.exports = router;