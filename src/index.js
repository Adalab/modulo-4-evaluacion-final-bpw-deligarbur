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
	return connection;
};

//ENDPOINTS
//List
server.get('/resources', async (req, res) => {
	try {
		const connectDB = await getConnection();
		const select =
			'SELECT resources.title, resources.url_resource, resources.description, resources.level, author.name_author, author.url_author FROM resources INNER JOIN author ON resources.id_resource = author.fk_resource;';
		const [result] = await connectDB.query(select);
		await connectDB.end();
		res.status(200).json({
			success: true,
			results: result,
		});
	} catch (error) {
		res.status(400).json(error);
	}
});
