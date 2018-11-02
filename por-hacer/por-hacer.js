const fs = require('fs');

let listadoPorHacer = [];

const guardaDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new error('No se pudo grabar', err);
    });
}


const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (err) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardaDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    /*Devuelve el indice de la tarea que coincida con la descripcion*/
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardaDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    /*Devuelve el listado nuevo, sin la tarea de la descripcion*/
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardaDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}