const express = require("express");

const router = express.Router();
const { obtener, agregar, modificar, eliminar } = require("../controllers/figuritas");

router.get("/obtener", obtener)
router.post("/agregar", agregar)
router.put("/modificar", modificar)
router.delete("/eliminar", eliminar)

module.exports = router;