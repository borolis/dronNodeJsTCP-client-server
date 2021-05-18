const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const SERVER_IP = '192.168.1.47'
const SERVER_PORT = 1337

const msg = {
    type: 'string',
    value: undefined
}

const net = require('net');
const client = new net.Socket();

client.connect(SERVER_PORT, SERVER_IP, () => {
    rl.write(`Client connected to server ${SERVER_IP}:${SERVER_PORT}!\n`)
    askUser()

});

client.on('data', (data) => {
    console.log('Received from server:' + data.toString('utf-8')+ '\n');
    askUser()
});

client.on('close', () => {
    console.log('Connection closed');
});

const sendMessageToServer = () => {
    console.log(`Message:[${msg.value}] Type:[${msg.type}] is sent to server`)
    client.write(JSON.stringify(msg))
}
const askUser = () => {
    rl.question('Please enter one of type (string, number, boolean): ', (answer) => {
        if (answer === 'boolean' || answer === 'string' || answer === 'number') {
            msg.type = answer
        } else {
            msg.type = 'string'
            console.log('Entered type is Incorrect, using default type [string]')
        }

        rl.question('Enter value:', (answer) => {
            if(msg.type === 'boolean') {
                msg.value = answer === 'true'
            }
            if(msg.type === 'number') {
                msg.value = Number(answer)
            }
            if(msg.type === 'string') {
                msg.value = answer
            }

            sendMessageToServer()
        });
    })
}



rl.on('close',  () => {
    rl.write('\nGoodBye!')
    client.destroy()
    rl.close();
    process.exit(0);
});
