const { Op } = require('sequelize');
const { controlBody } = require('../db_connection');
const { bodyCam } = require('../db_connection')
const { horario } = require('../db_connection');
const { Jurisdiccion } = require('../db_connection');
const { Unidad } = require('../db_connection');

const newControlBody = async (controlBodies) => { 
    try {
        const response = await controlBody.bulkCreate(controlBodies);
        return response || null;
    } catch (error) {
        console.error("Error al crear controlBody:", error);
        return false;
    }
};
//aca comenzo todooooooo y desde aqui lo arreglo 

const getControlBodys = async (page = 1, limit = 20, searchTerm = null, ordenarPor = 'createdAt', orden = 'DESC') => {
    const offset = (page - 1) * limit;
    
    try {
        let whereCondition = {}; // Para filtrar en controlBody
        let includeOptions = [
            { model: horario, as: 'horarios', attributes: ['turno'] },
            { model: Jurisdiccion, as: 'Jurisdiccions', attributes: ['jurisdiccion'] },
            { model: Unidad, as: 'Unidads', attributes: ['numero'] },
            { model: bodyCam, as: 'bodyCams', attributes: ['numero'] }
        ];

        // 🔹 Si hay un término de búsqueda, filtramos en controlBody en lugar de solo en bodyCam
        if (searchTerm) {
            whereCondition = {
                [Op.or]: [
                    { status: { [Op.like]: `%${searchTerm}%` } }, // Busca en controlBody.status
                    { fecha_entrega: { [Op.like]: `%${searchTerm}%` } }, // Busca en controlBody.fecha_entrega
                    { '$bodyCams.numero$': { [Op.like]: `%${searchTerm}%` } } // También busca en bodyCams.numero
                ]
            };
        }

        const response = await controlBody.findAndCountAll({
            limit,
            offset,
            where: whereCondition, // 🔥 Ahora se filtra en controlBody
            attributes: {
                exclude: ['updatedAt', 'id_Body', 'id_dni', 'id_turno', 'id_jurisdiccion', 'id_unidad', 'id_funcion']
            },
            include: includeOptions,
            order: [[ordenarPor, orden]]
        });

        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error("❌ Error al obtener controlBodys:", error);
        return false;
    }
};




const getControlBody = async (id) => {
    if (!id) {
        console.error("ID is undefined");
        return null;
    }

    try {
        const response = await controlBody.findOne({ where: { id } });
        return response || null;
    } catch (error) {
        console.error("Error al obtener controlBody:", error);
        return false;
    }
};
const updateControlBody = async ({id, fecha_devolucion,numero_unidad, hora_devolucion, detalles, status }) => {

    console.log("mmgvo",id, fecha_devolucion,numero_unidad, hora_devolucion, detalles, status);
    
    try {
        // Usar el ID del control body real en lugar de id_Body
        const response = await controlBody.findOne({ where: { id } });

        const responseunidad= await Unidad.findOne({ where:{ numero:numero_unidad} });
         
        const id_unidad=responseunidad.id

        if (response) {
            await response.update({
                id_unidad,
                fecha_devolucion,
                hora_devolucion,
                detalles,
                status
            });
            
        }

        return response || null;
    } catch (error) {
        console.error("Error al actualizar controlBody:", error);
        return false;
    }
};
const updateControlBodybynombre = async (body, {fecha_devolucion,hora_devolucion,detalles}) => {
 
    try {
        const response = await controlBody.findOne({ where: { id_Body: body.id } });    
        if (response) await response.update({fecha_devolucion,hora_devolucion,detalles});
        return response || null;
        
    } catch (error) {
        console.error("Error al actualizar controlBody:", error);
        return false;
    }
};

const deleteControlBody = async (id) => {
    try {
        const response = await controlBody.findByPk(id);
        if (!response) {
            console.error("controlBody no encontrado");
            return null;
        }
        response.status = 'EN CECOM'; // Se podría considerar otro método de eliminación lógica si es necesario
        await response.save();
        return response;
    } catch (error) {
        console.error("Error al eliminar controlBody:", error);
        return false;
    }
};

const getAllControlBodysGeneral = async () => {
    try {
        const includeOptions = [
          
            { model: horario, as: 'horarios', attributes: ['turno'] },
            { model: Jurisdiccion, as: 'Jurisdiccions', attributes: ['jurisdiccion'] },
            { model: Unidad, as: 'Unidads', attributes: ['numero'] },
           
            { model: bodyCam, as: 'bodyCams', attributes: ['numero'] }
        ];

        const response = await controlBody.findAll({
            attributes: {
                exclude: ['updatedAt', 'id_Body',  'id_turno', 'id_jurisdiccion', 'id_unidad']
            },
            include: includeOptions,
            order: [['createdAt', 'DESC']]
        });

        return response || [];
    } catch (error) {
        console.error("Error al obtener todos los controlBodys:", error);
        return [];
    }
};


module.exports = {
    newControlBody,
    getControlBodys,
    getControlBody,
    updateControlBody,
    deleteControlBody,
    updateControlBodybynombre,
    getAllControlBodysGeneral
};
