const { Pool } = require('pg')
const config = require('./dbconfig');
require('dotenv').config()

let pool;

const init = () => {

    pool = new Pool(config);

};

const getConnection = async () => {
    let connection = await pool.connect();
    //console.log(pool);
    return connection

};

const getPool = () => {

    return pool;
}

const checkClient = async (client, attatched) => {
    if (client == undefined) {

        client = await getConnection();

        attatched = true;
    } else {
        attatched = false;
    }
    return { client, attatched };
}

module.exports = {
    init,
    getConnection,
    getPool,
    checkClient,
}