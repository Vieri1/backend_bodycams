
const {
    newControlBody,
    getControlBodys,
    getControlBody,
    updateControlBody,
    updateControlBodybynombre,
    getAllControlBodysGeneral
} = require('../controllers/controlBodyController');
const {
    getBodyCamByName
} = require("../controllers/bodyCamController")

const {
    getHorario
} = require("../controllers/horarioController");
const {
    getJurisdiccion
} = require("../controllers/jurisdiccionesController")

const {
    getUnidad
} = require("../controllers/UnidadController");
const socketHandlerscontrol = (socket, io) => {

    console.log("socketHandlers ejecutándose en:", socket.id);

    socket.on("getAllControlBodysGeneral", async () => {
        try {
            const response = await getAllControlBodysGeneral();
            socket.emit("getAllControlBodysGeneralResponse", { 
                status: 200, 
                message: "Todos los ControlBodies obtenidos correctamente", 
                data: response 
            });
            
        } catch (error) {
            console.error("❌ Error al obtener todos los ControlBodies:", error);
            socket.emit("getAllControlBodysGeneralResponse", { 
                status: 500, 
                message: "Error interno del servidor" 
            });
        }
    });

    socket.on("getControlBody", async (data, callback) => {
        const { id } = data;

        try {
            const response = await getControlBody(id);
            if (!response)
                return callback({ status: 500, message: "Error al obtener el ControlBody" });

            const io = getIo();
            io.emit("getControlBody", { message: "Se realizó la operación correctamente para el ControlBody", data: response });

            callback({ status: 200, message: "Se realizó la operación correctamente para el ControlBody", data: response });

        } catch (error) {
            console.error("Error en el controlador", error);
            callback({ status: 500, message: "Error al obtener el ControlBody" });
        }
    });
    socket.on("ActualizarControlBodys", async (data, callback) => {
        const { id, fecha_devolucion, hora_devolucion, numero_unidad,detalles, status } = data;
    console.log("esta es la data",data);
    
        if (!id) {
            return callback?.({ status: 400, message: "El ID del ControlBody es requerido" });
        }
    
        try {
            // Verificar si el registro existe
            const controlBodyRecord = await getControlBody(id);
            if (!controlBodyRecord) {
                return callback?.({ status: 404, message: `Registro de control con ID ${id} no encontrado` });
            }
    
            // Actualizar el registro y obtener el objeto actualizado
            const updatedRecord = await updateControlBody({ id, fecha_devolucion, numero_unidad,hora_devolucion, detalles, status });
    
            if (!updatedRecord) {
                return callback?.({ status: 500, message: "Error al actualizar el registro" });
            }
    
            // Emitir eventos a todos los clientes y al mismo usuario que hizo la actualización
            io.emit("bodycamActualizada", updatedRecord);
            socket.emit("ActualizarControlBodysResponse", { status: 200, message: "ControlBody actualizado", data: updatedRecord });
    
            // Responder al usuario que hizo la solicitud
            return callback?.({ status: 200, message: "ControlBody actualizado", data: updatedRecord });
    
        } catch (error) {
            console.error("Error al actualizar controlBody:", error);
            return callback?.({ status: 500, message: "Error en el servidor" });
        }
    });
    


    socket.on("ActualizarControlBodysbynumero", async (data, callback) => {
       

        const { numero, fecha_devolucion, hora_devolucion,detalles } = data; // Extraer `id`
        
        
       
        try {
            const body=await getBodyCamByName(numero);
           
            if(!body){
                return callback({ status: 404, message: "La bodycam no está registrada en la db"})
            }
            const response = await updateControlBodybynombre(body, { fecha_devolucion, hora_devolucion ,detalles});


            if (!response ) {
                return callback({ status: 404, message: "No se encontró la Bodycam" });
            }
            if (response) {
                
                
                callback({ status: 200, message: "Bodycam actualizada", data: response });
                io.emit("bodycamActualizada", response); // Notificar a todos los clientes
            } else {
                callback({ status: 404, message: "No se encontró la Bodycam" });
            }
        } catch (error) {
            console.error("Error al actualizar controlBody:", error);
            callback({ status: 500, message: "Error en el servidor" });
        }
    });

    socket.on("getAllControlBodys", async (data) => {
        const { page, limit, search, ordenarPor = 'createdAt', orden = 'DESC' } = data;
    
        // Validaciones dentro del socket
        if (isNaN(page) || page <= 0 || isNaN(limit) || limit <= 0) {
            socket.emit("getAllControlBodysResponse", { status: 400, message: "Page y limit deben ser números válidos" });
            return;
        }
    
        const camposValidos = ['id', 'fecha_entrega', 'hora_entrega', 'createdAt', 'updatedAt', 'status'];

        const ordenarPorValido = camposValidos.includes(ordenarPor) ? ordenarPor : 'createdAt';

        const ordenValido = ['ASC', 'DESC'].includes(orden.toUpperCase()) ? orden.toUpperCase() : 'DESC';
    
        try {
            // Llamamos al controlador con los valores ya validados
            const response = await getControlBodys(Number(page), Number(limit), search, ordenarPorValido, ordenValido);
    
            socket.emit("getAllControlBodysResponse", { status: 200, message: "ControlBodies obtenidos correctamente", data: response });
    
         

        } catch (error) {
            console.error("❌ Error al obtener ControlBodies:", error);
    
            socket.emit("getAllControlBodysResponse", { status: 500, message: "Error interno del servidor" });
        }
    });
   
    socket.on('createControlBody', async (data) => {

        try {
            const errores = [];
            const regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/;
            const { numeros, nombres, apellidos,funcion, turno, jurisdiccion, fecha_entrega,  unidad, hora_entrega } = data;

            if (!Array.isArray(numeros) || numeros.length === 0) {
                socket.emit("ControlBodys", { status: 400, message: "Debe proporcionar un arreglo de números de BodyCam." });
                return;
            }

            // Validaciones comunes
            if (typeof nombres !== "string" || !nombres.trim()) errores.push("El campo 'nombres' no puede estar vacío.");
            if (!regex.test(nombres)) errores.push("El campo 'nombres' no debe contener caracteres especiales.");

            if (typeof apellidos !== "string" || !apellidos.trim()) errores.push("El campo 'apellidos' no puede estar vacío.");
            if (!regex.test(apellidos)) errores.push("El campo 'apellidos' no debe contener caracteres especiales.");

            if (errores.length > 0) {
                socket.emit("ControlBodys", { status: 400, message: "Errores en los datos de entrada", errores });
                return;
            }

            // Obtener IDs comunes
            const get_id_turno = await getHorario(turno);
            if (!get_id_turno) {
                socket.emit("ControlBodys", { status: 404, message: "El turno especificado no existe." });
                return;
            }
            const id_turno = get_id_turno.id;

            const get_id_jurisdiccion = await getJurisdiccion(jurisdiccion);
            if (!get_id_jurisdiccion) {
                socket.emit("ControlBodys", { status: 404, message: "La jurisdicción especificada no existe." });
                return;
            }
            const id_jurisdiccion = get_id_jurisdiccion.id;



            const get_id_unidad = await getUnidad(unidad);
            if (!get_id_unidad) {
                socket.emit("ControlBodys", { status: 404, message: "La unidad especificada no existe." });
                return;
            }
            const id_unidad = get_id_unidad.id;
            // Crear múltiples registros en una sola consulta con bulkCreate
            const controlBodies = [];

            for (const numero of numeros) {
                const get_id = await getBodyCamByName(numero);
                if (!get_id) {
                    console.log(`El número de BodyCam ${numero} no existe.`);
                    continue;
                }
                const id_Body = get_id.id;

                controlBodies.push({
                    id_Body,nombres,apellidos,funcion, id_turno, id_jurisdiccion, id_unidad, fecha_entrega, hora_entrega, status: "EN CAMPO"
                });
            }

            if (controlBodies.length === 0) {
                socket.emit("ControlBodys", { status: 404, message: "Ninguna BodyCam válida encontrada en la base de datos." });
                return;
            }

            // Insertar en bulk
            const response = await newControlBody(controlBodies);

            if (!response) {
                socket.emit("ControlBodys", { status: 500, message: "Error al registrar los ControlBody." });
                return;
            }


            // Solo al cliente que hizo la petición
            socket.emit("ControlBodys", { status: 200, message: "Registro completado correctamente", data: response });
            // A todos los demás clientes
            socket.broadcast.emit("newControlBodyAdded", { data: response });


        } catch (error) {
            console.error("Error al registrar ControlBody:", error);
            socket.emit("ControlBodys", { status: 500, message: "Error interno del servidor" });
        }
    });




};

module.exports = { socketHandlerscontrol }

