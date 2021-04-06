import mysql from 'promise-mysql';
import keys from '../DataBase/keys';

const pool = mysql.createPool(keys.database);

pool.getConnection()
    .then(connection=>{
        pool.releaseConnection(connection);
        console.log('DB esta conectada');
    });

export default pool;