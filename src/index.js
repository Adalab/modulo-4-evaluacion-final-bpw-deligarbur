//Dependencies
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

//Data Base
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

//Search by id
server.get('/resources/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const connectDB = await getConnection();
		const select =
			'SELECT resources.title, resources.url_resource, resources.description, resources.level, author.name_author, author.url_author FROM resources INNER JOIN author ON resources.id_resource = author.fk_resource WHERE id_resource = ?';
		const [result] = await connectDB.query(select, [id]);
		await connectDB.end();

		if (result.length === 0) {
			res.status(400).json({
				success: false,
				message: 'El id no existe en la base de datos.',
			});
		} else {
			res.status(200).json({
				success: true,
				data: result[0],
			});
		}
	} catch (error) {
		res.status(400).json(error);
	}
});

//Insert new resource
server.post('/resources', async (req, res) => {
	try {
		const connectDB = await getConnection();
		const data = req.body;
		console.log(data);
		const insertResource =
			'INSERT INTO resources (title, url_resource, description, level) VALUES (?,?,?,?)';
		const [resultsResource] = await connectDB.query(insertResource, [
			data.title,
			data.url_resource,
			data.description,
			data.level,
		]);
		const insertAuthor =
			'INSERT INTO author (name_author, url_author, fk_resource) VALUES (?,?,?)';
		const [resultsAuthor] = await connectDB.query(insertAuthor, [
			data.name_author,
			data.url_author,
			resultsResource.insertId,
		]);
		await connectDB.end();

		res.status(200).json({
			success: true,
			id: resultsResource.insertId,
		});
	} catch (error) {
		res.status(400).json(error);
	}
});
