var path = require('path');
var app = require('express')();
// var ws = require('express-ws')(app);
// var http = require('http');
var wamp = require('wamp-server');
app.get('/', (req, res) => {
    console.log('express connection');
    res.sendFile(path.join(__dirname, 'ws.html'));
});
// app.ws('/', (s, req) => {
//     // console.error('websocket connection');
//     ws.on('message', () => {console.log('jh')})
//         // function(msg) {
//         // console.log(msg);
//     // });
//     console.log('socket', req.testing);
// });
// app.listen(3040, () => console.error('listening on http://localhost:3040/'));
// console.error('websocket example');
const WebSocket = require('ws')
// const server = http.createServer(app)
// const wss = new WebSocket.Server({server});


// wss.on('connection', ws  => {
//     // ws.on('message', message => {
//     //     // console.log('received: %s', message)
//     //     ws.send(`Hello, you sent -> ${message}`);
//     // });
//     // ws.send('Hi there, I am a WebSocket server');
// });

// server.listen(process.env.PORT || 3040, () => {
//     console.log(`Server started on port ${server.address().port} :)`);
// });

const server = new wamp({
    port: 3040,
    realms: ['realm1']
});

// console.log(server);
// const x = server.wss;
// console.log(x);