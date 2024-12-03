import mysql from 'mysql2'


const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Do34117x!',
    database: 'test'
}).promise()

export async function getFlights() {
    try {
        const [rows] = await pool.query("SELECT * FROM FLIGHTS")
        return rows
    } catch (error) {
        console.error('Error executing query:', error)
    }
}

export async function getFlight(id) {
    try {
        const [rows] = await pool.query(`
            SELECT * 
            FROM FLIGHTS 
            WHERE flightID = ?
        `, [id])
        return rows
    } catch (error) {
        console.error('Error executing query:', error)
    }
}

 

const result = await getFlights()
console.log(result)