// This JavaScript file has the functions for the SQL commands which I'll use to GET, POST, PUT and DELETE
// I have installed Pool (pg) and express before initializig node.js 

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api1',
  password: 'password',
  port: 5432,
})

const getDevices = (request, response) => {
    pool.query('SELECT * FROM devices ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getDeviceById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM devices WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createDevice = (request, response) => {
    const { name, serialNum } = request.body
  
    pool.query('INSERT INTO devices (name, serialNum) VALUES ($1, $2)', [name, serialNum], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Device added with ID: ${result.insertId}`)
    })
  }

  const updateDevice = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, serialNum } = request.body
  
    pool.query(
      'UPDATE devices SET name = $1, serialNum = $2 WHERE id = $3',
      [name, serialNum, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Device modified with ID: ${id}`)
      }
    )
  }

  const deleteDevice= (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM devices WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Device deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice,
  }