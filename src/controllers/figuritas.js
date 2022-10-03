const db = require ("../../db/index")

const obtener = async (req, res) => {
    try {
        const figuritas = await db.query("select * from figu")
        return res
        .status(200)
        .json({ data : figuritas.rows })

    } catch (error) {
        console.error(error)
    }
}

const agregar = async(req, res) => {
    try { 
        const {name, lastname, hability, age} = req.body;
        
        let nuevaFigurita = {
            name,
            lastname,
            hability,
            age
        }

        await db.query("insert into figu (name, lastname, hability, age) values($1, $2, $3, $4)", [
            name, lastname, hability, age
        ]) 
       
        return res
        .status(200)
        .json({ data: nuevaFigurita, message: "Éxito" })

    } catch (error) {
        console.error(error)
    }
}

const modificar = async(req, res) => {
    try { 
        const { id, name, lastname, hability, age} = req.body;
        
        const nuevaFigurita = {
            id,
            name,
            lastname,
            hability,
            age
        }

        await db.query("update figu set name=$1, lastname=$2, hability=$3, age=$4 where id=$5", [
            name, lastname, hability, age, id
        ]) 

        return res
        .status(200)
        .json({ data: nuevaFigurita, message: "Éxito" })

    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

const eliminar = async (req, res) => {
    const {id} = req.body;

    try {
        await db.query("delete from figu where id=$1", [id]);
        return res.status(200).json({message: "Borrada"});

    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}



module.exports = { obtener, agregar, modificar, eliminar }