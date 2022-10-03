const db = require ("../../db/index")

const obtenerTareas = async (req, res, next) => {
    try {
        const tareas = await db.query("select * from tarea")
        return res
        .status(200)
        .json({ data: tareas.rows, message: "Todas las tareas" }); 

    } catch (error) {
        return next(error);
    }
}

const agregar = async (req, res, next) => {
    try {
      const nuevaTarea = {
        titulo: req.body.titulo,
        prioridad: req.body.prioridad,
      };
  
      await db.query("insert into tarea (titulo, prioridad) values($1, $2)", [
        nuevaTarea.titulo,
        nuevaTarea.prioridad,
      ]);
  
      return res.status(201).json({ data: nuevaTarea, message: "Éxito" });
    } catch (error) {
      return next(error);
    }
  };

  
  const borrar = async (req, res) => {
    try {
        const {tarea} = req.params

        await db.query(`delete from tarea where id=${tarea}`)

        return res.status(200).json({message: "Borrada"})

    } catch (error) {
        console.error(error)
    }
  }

  module.exports = {obtenerTareas, agregar, borrar}