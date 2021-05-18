const SERVER_IP = '192.168.1.47'
const SERVER_PORT = 1337
const uuidModule = require('uuid')
const net = require('net');

const server = net.createServer()

server.on('connection', (conn)=> {
    conn.id = uuidModule.v4()
    console.log(`Client connected with address:[${conn.remoteAddress}], clientUUID:[${conn.id}] `)
    conn.on('error', (err) => {
        console.log(err)
    })

    conn.on('data', (data) => {
        const {value, type} = JSON.parse(data.toString())
        console.log(`Data from client [${conn.id}]: ${data}`)
        conn.write(`[type ${type === typeof value?type:'TYPE_ERROR'}] ` + value)
    })
})


server.on('listening', () => {
    console.log(`Server is successfully started at ${SERVER_IP}:${SERVER_PORT}!`)
})

server.listen(SERVER_PORT, SERVER_IP);
