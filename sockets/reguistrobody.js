const { newbody, updatebodyCam, getAllbodycams, deletebodyCam, getbodycam, getAllProveedores, getProveedor, getBodcyCamCount } = require("../controllers/bodyCamController");

const socketHandlers = (socket, io) => {
    socket.on("getBody", async (data, callback) => {
        const { id } = data

        try {
            const response = await getbodycam(id);
            if (!response)

                return callback({ status: 500, message: "Error al traer la Bodycam" })



            io.emit("getbody", { message: "Se hiso la operacion correctamente la body", data: response })

            callback({ status: 200, message: "Se hiso la operacion correctamente la body" })

        } catch (error) {

            console.error("Eror en el controlador", error)

            callback({ status: 500, message: "Error al eliminar la body" })
        }
    })
    socket.on("deleteBody", async (data, callback) => {
        const { id } = data;
        try {
            const response = await deletebodyCam(id);

            if (!response) {
                return callback({ status: 500, message: "Error al modificar la BodyCam." });
            }

            io.emit("changeStateBody", { message: "Se elimino correctamente la body(state)", data: response })

            callback({ status: 200, message: "Se elimino correctamente la body(state)" })

        } catch (error) {
            console.error("Eror en el controlador", error)
            callback({ status: 500, message: "Error al eliminar la body" })
        }

    })
    // console.log(Cliente conectado: ${socket.id});
    socket.on("getAllBodys", async (data) => {
        const { page = 1, limit = 20 } = data;

        if (isNaN(page) || page <= 0 || isNaN(limit) || limit <= 0) {
            return callback({ status: 400, message: "Page y limit deben ser números válidos" });
        }

        try {
            const response = await getAllbodycams(Number(page), Number(limit));

            io.emit("listaallbodys", { status: 200, message: 'Bodycams obtenidos correctamente', data: response });
        } catch (error) {
            console.error("Error al obtener NCs:", error);
            io.emit("listaallbodys", { status: 500, message: 'Bodycams obtenidos correctamente', data: response });
        }

    })
    // Evento para actualizar BodyCam
    socket.on('updateBody', async (data, callback) => {
        const { id, numero, serie, nro_bateria, id_proveedor } = data;

        const errores = [];
        const regexNumeros = /^[0-9]+$/;
        const regexLetrasNumeros = /^[a-zA-Z0-9]+$/;

        if (!numero) errores.push("El campo numero es requerido");
        else if (!regexNumeros.test(numero)) errores.push("El campo 'numero' solo debe contener números.");

        if (!serie) errores.push("El campo serie es requerido");
        else if (!regexLetrasNumeros.test(serie)) errores.push("La serie solo debe tener números y letras.");

        if (!nro_bateria) errores.push("El campo nro_bateria es requerido");
        else if (!regexLetrasNumeros.test(nro_bateria)) errores.push("El nro_bateria solo debe tener números y letras.");

        if (errores.length > 0) {
            return callback({ status: 400, errores });
        }

        try {
            const response = await updatebodyCam(id, { numero, serie, nro_bateria, id_proveedor });

            if (!response) {
                return callback({ status: 500, message: "Error al modificar la BodyCam." });
            }

            // Emitir evento a todos los clientes

            io.emit("bodyCamActualizada", { message: "BodyCam modificada con éxito", data: response });

            callback({ status: 200, message: "BodyCam modificada con éxito", data: response });
        } catch (error) {
            console.error("Error al modificar BodyCam:", error);
            callback({ status: 500, message: "Error interno del servidor" });
        }
    });

    // Evento para crear una nueva BodyCam
    socket.on('createBody', async (data, callback) => {
        const { numero, serie, nro_bateria, id_proveedor, currentPage } = data;

        const errores = [];
   
        const regexLetrasNumeros = /^[a-zA-Z0-9]+$/;

        if (!numero) errores.push("El campo numero es requerido");
        else if (!regexLetrasNumeros.test(numero)) errores.push("El campo 'numero' solo debe contener números.");

        if (!serie) errores.push("El campo serie es requerido");
        else if (!regexLetrasNumeros.test(serie)) errores.push("La serie solo debe tener números y letras.");

        if (!nro_bateria) errores.push("El campo nro_bateria es requerido");
        else if (!regexLetrasNumeros.test(nro_bateria)) errores.push("El nro_bateria solo debe tener números y letras.");

        if (errores.length > 0) {
            return callback({ status: 400, errores });
        }

        try {
            const newBody = await newbody({ numero, serie, nro_bateria, id_proveedor });

            if (!newBody) {
                return callback({ status: 500, message: "Error al registrar la BodyCam." });
            }

            // En lugar de recalcular la página, mantén la página actual del usuario
            io.emit("bodyCamRegistrada", {
                status: 200,
                message: "BodyCam registrada con éxito",
                goToPage: currentPage, // Mantener la página actual
                stayOnCurrentPage: true, // Nuevo flag que indica mantener la página actual
                bodyData: newBody
            });

            callback({ status: 200, message: "BodyCam registrada con éxito", data: newBody });
        } catch (error) {
            console.error("Error al registrar BodyCam:", error);
            callback({ status: 500, message: "Error interno del servidor" });
        }
    });

    // Evento para obtener UN proveedor
    socket.on("getProveedor", async (data, callback) => {
        const { id } = data;

        try {
            const response = await getProveedor(id);
            if (!response) {
                return callback({ status: 500, message: "Error al traer el proveedor" });
            }

            // Emitir evento a todos los clientes con los datos
            io.emit("proveedorObtenido", { message: "Operación exitosa", data: response });

            // Responder al cliente que hizo la petición
            callback({ status: 200, message: "Proveedor obtenido correctamente", data: response });
        } catch (error) {
            console.error("Error en el controlador getProveedor", error);
            callback({ status: 500, message: "Error interno al obtener el proveedor" });
        }
    });

    // Evento para obtener TODOS los proveedores
    socket.on("getProveedores", async (data, callback) => {
        try {
            const response = await getAllProveedores();
            if (!response) {
                return callback({ status: 500, message: "Error al traer los proveedores" });
            }

            // Emitir evento a todos los clientes con la lista de proveedores (opcional)
            io.emit("listaProveedores", { message: "Operación exitosa", data: response });

            // Responder al cliente que hizo la petición con callback
            callback({ status: 200, message: "Proveedores obtenidos correctamente", data: response });
        } catch (error) {
            console.error("Error en el controlador getProveedores", error);
            callback({ status: 500, message: "Error interno al obtener proveedores" });
        }
    });


};

module.exports = { socketHandlers };