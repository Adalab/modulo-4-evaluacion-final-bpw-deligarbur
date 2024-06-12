//Dependencias
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

require('dotenv').config();

//Server
const server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
	console.log(`Server running at port: http://localhost:${PORT}`);
});

//Base de datos
const getConnection = async () => {
	const connection = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});
	connection.connect();
	console.log('Conexión con la BD ' + connection.threadId);
	return connection;
};
