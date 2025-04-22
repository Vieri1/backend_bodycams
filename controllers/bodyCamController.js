const { Op } = require('sequelize');
const { bodyCam } = require('../db_connection')
const { proveedor } = require('../db_connection')

const newbody = async ({ numero, serie, nro_bateria, id_proveedor }) => {
    try {
        const response = await bodyCam.create({
            numero, serie, nro_bateria, id_proveedor
        })
        return response || null
    } catch (error) {
        console.error("Error al crear la body Cam:", error);
        return false;
    }
};

const getBodcyCamCount = async () => {
    try {
        const count = await bodyCam.count();
        return count;
    } catch (error) {
        console.error("Error getting bodyCam count:", error);
        return 0;
    }
};
const getAllbodycams = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await bodyCam.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'ASC']], 
            include: [
                {
                    model: proveedor,
                    as: 'proveedors',
                    attributes: ['marca', 'modelo']
                }
            ]
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error({ message: "Error en el controlador al traer todos las body cams", data: error });
        return false;
    }
};
const getbodycam = async (id) => {
    try {
        const response = await bodyCam.findOne({ where: { id } });
        return response || null;
    } catch (error) {
        console.error({ message: "Error en el controlador al traer la bodycam", data: error });
        return false;
    }
};
const getBodyCamByName = async (numero) => {

    try {
        const response = await bodyCam.findOne({ where: { numero } });


        return response || null;
    } catch (error) {
        console.error({ message: "Error en el controlador al buscar la bodycam por nombre", data: error });
        return false;
    }
};
const getReguistroBodysfilter = async (page = 1, limit = 20, filtros = {}) => {
    const offset = (page - 1) * limit;

    try {
        let whereCondition = {}; // Se construye dinámicamente     
        // 🔹 Solo se agregan los filtros que existen
        if (filtros.numero) {
            whereCondition['numero'] = { [Op.like]: `%${filtros.numero}%` };
        }
        if (filtros.serie) {
            whereCondition['serie'] = { [Op.like]: `%${filtros.serie}%` };
        }
        if (filtros.nro_bateria) {
            whereCondition['nro_bateria'] = { [Op.like]: `%${filtros.nro_bateria}%` };
        }
        

        const response = await bodyCam.findAndCountAll({
            limit,
            offset,
            where: whereCondition,
            attributes: {
                exclude: ['updatedAt', 'id_Body', 'state']
            },
            include: [
                { model: proveedor, as: 'proveedors', attributes: ['marca','modelo'] } 
            ],
            order: [["createdAt", "DESC"]]
        });

        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error("❌ Error al obtener controlBodys:", error);
        return false;
    }
};

const updatebodyCam = async (id, { numero, serie, nro_bateria, id_proveedor }) => {
    try {
        const response = await getbodycam(id);
        if (response) await response.update({ numero, serie, nro_bateria, id_proveedor });
        return response || null;
    } catch (error) {
        console.error("Error al modificar la bodycam en el controlador:", error);
        return false;
    }
};
// Eliminar una bodyCam  (cambia el estado a false)
const deletebodyCam = async (id) => {
    try {
        const response = await bodyCam.findByPk(id);

        if (!response) {
            console.error("bodyCam no encontrado");
            return null;
        }

        // Cambia el estado a false en lugar de eliminar el registro
        response.state = false;
        await response.save();

        return response;
    } catch (error) {
        console.error("Error al cambiar de estado al eliminar la bodyCam", error);
        return false;
    }
};

// Función auxiliar para obtener un proveedor por ID
const getProveedor = async (id) => {
    try {
        // Ajusta "Proveedor" al nombre de tu modelo real
        const response = await proveedor.findOne({ where: { id } });
        return response || null;
    } catch (error) {
        console.error({ message: "Error en el controlador al traer el proveedor", data: error });
        return false;
    }
};

// Función auxiliar para obtener todos los proveedores
const getAllProveedores = async () => {
    try {
        // Ajusta "Proveedor" al nombre de tu modelo real
        const response = await proveedor.findAll();
        return response || [];
    } catch (error) {
        console.error("Error en el controlador al traer proveedores", error);
        return false;
    }
};


module.exports = {
    newbody,
    getAllbodycams,
    getbodycam,
    updatebodyCam,
    deletebodyCam,
    getBodyCamByName,
    getProveedor,
    getAllProveedores,
    getBodcyCamCount,
    getReguistroBodysfilter
}