const SERVER_IP = '127.0.0.1'
const SERVER_PORT = 1337

const net = require('net');

const server = net.createServer((socket) => {
    socket.on('error', (err) => {
        console.log(err)
    })

    socket.on('data', (data) => {
        const {value, type} = JSON.parse(data)
        console.log(socket)
        socket.write(`[type ${type === typeof value?type:'TYPE_ERROR'}]` + value)
    })
});

server.on('listening', () => {
    console.log(`Server is successfully started at ${SERVER_IP}:${SERVER_PORT}!`)
})

server.listen(SERVER_PORT, SERVER_IP);
