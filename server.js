// INITIALIZING CONFIG
const config = {};
config['system'] = {
    version: 'pre-alpha-9ri51',
    databaseVersion: '1.0',
    isProxied: true
}
config['logs'] = {
    verbosity: 3, // NONE, ERRORS, WARNINGS, ALL
    logToFile: ''
}

// ADDING LODASH
var _ = require('lodash');

// ADDING EXPRESS AND HTTP AND INITIALIZING
const express = require('express');
const app = express();
const server = require('http').createServer(app);
var io = require('socket.io')(server, {
    pingInterval: 5000,
    pingTimeout: 20000
});
app.use(express.static('dist'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require('sanitize').middleware);

// ADDING BCRYPT
const bcrypt = require('bcrypt');
const saltRounds = 5;

// ADDING UUID/V4
const uuidv4 = require('uuid/v4');

// ADDING LOWDB AND CONNECTING TO FILE
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ users: [], channels: [], databaseVersion: config['system'].databaseVersion })
    .write();

// LOGGING
function log(log, verbosity) {
    if (config['logs'].verbosity >= verbosity)
        console.log(verbosity, log);
}

// PERMISSION LOGIC
const DEFAULT_PERMS = {
    isAdmin: false,
    manageRoles: false, // NOT IMPLEMENTED
    manageChannels: false, // NOT IMPLEMENTED
    manageMessages: false, // NOT IMPLEMENTED
    manageNicks: false, // NOT IMPLEMENTED
    kick: false, // NOT IMPLEMENTED
    ban: false, // NOT IMPLEMENTED
    invite: false, // NOT IMPLEMENTED
    changeNick: true, // NOT IMPLEMENTED
    sendMessages: true,
    readMessages: true, // NOT IMPLEMENTED
    prefix: '', // NOT IMPLEMENTED
    suffix: '', // NOT IMPLEMENTED
    colorR: 255, // NOT IMPLEMENTED
    colorG: 255, // NOT IMPLEMENTED
    colorB: 255 // NOT IMPLEMENTED
}
function permCheck(userId, channelId, permId) {
    var channel = db.get('channels').find({ id: channelId });
    if (channel) {
        if (channel.value().owner == userId) {
            log(`PERM CHECK - TRUE - ${permId} for @${userId} in #${channelId}`, 3);
            return true;
        }
        else {
            var user = channel.get('users').find({ id: userId });
            if (user) {
                user.get('roles').forEach(function checkPerm (val) {
                    var role = channel.get('roles').find({ id: val });
                    if (role) {
                        if (role.get('perms').value()[permId] == true || role.get('perms').value().isAdmin) {
                            log(`PERM CHECK - TRUE - ${permId} for @${userId} in #${channelId}`, 3);
                            return true;
                        }
                    }
                    else {
                        log(`PERM CHECK FAILED! : ROLE DOES NOT EXIST : - $${val} for @${userId} in #${channelId}`, 2);
                        return false;
                    }
                });
                log(`PERM CHECK - FALSE - ${permId} for @${userId} in #${channelId}`, 3);
                return false;
            }
            else {
                log(`PERM CHECK FAILED! : USER DOES NOT EXIST : - @${userId} in #${channelId}`, 2);
                return false;
            }
        }
    }
    else {
        return false;
        log(`CHANNEL DOES NOT EXIST : permCheck - #${channelId}`, 2);
    }
}

// AUTHENTICATION
AUTH_TOKENS = [];
/*
AUTH_TOKENS:
    IP ( string )
        - token ( string ) [ email@token ]
*/

// SOCKET LOGIC
io.sockets.on('connection', function onConnection (socket) {
    log(`CONNECTION INITIALIZED : ${socket.handshake.address}`, 3);

    function baseDisconnect(socket) {
        log(`DISCONNECTED : ${socket.handshake.address}`, 3);
        socket.removeAllListeners();
    }

    socket.on('disconnect', function onDisconnect () {
        baseDisconnect(socket);
    });

    socket.on('login', function onLogin (data, callback) {
        /*
        DATA
            - token ( string )
        */
        data.email = String(data.email);
        data.token = String(data.token);

        var user = db.get('users').find({ email: data.token.substring(0, data.token.lastIndexOf('///')) });
        if (AUTH_TOKENS[socket.handshake.address] &&
            AUTH_TOKENS[socket.handshake.address].token == data.token) {
            try {
                callback({
                    code: 0,
                    body: 'LOGGED IN'
                });

                socket.removeAllListeners();
                user.assign({ status: 0 }).write(); // SET STATUS TO ONLINE

                log(`SUCCESSFULLY LOGGED IN : ${user.value().id}`, 3);
            }
            catch (err) {
                log(`ERROR AT 'socket -> login' ${socket.handshake.address} : ${err}`, 1);
            }

            socket.on('join', function onJoin (data, callback) {
                try {
                    /*
                    DATA:
                        - id ( int ) [ id of channel ]
                    */
                    data.id = String(data.id);

                    if (data.id) {
                        if (/^[a-z\-]+$/i.test(data.id)) {
                            var channel = db.get('channels').find({ id: data.id });
                            if (channel.value()) {
                                socket.join(`#${data.id}`);
                                callback({
                                    code: 0,
                                    new: false,
                                    body: 'SUCCESSFULLY JOINED CHANNEL'
                                });
                                log(`JOINED CHANNEL : ${user.value().id} -> #${data.id}`, 3);
                            }
                            else {
                                createChannel(data.id, user.value().id);
                                socket.join(`#${data.id}`);

                                callback({
                                    code: 0,
                                    new: true,
                                    body: 'CHANNEL DID NOT EXIST - CREATED CHANNEL'
                                });
                                log(`ATTEMPTED ACCESSING NON-EXISTANT CHANNEL - CREATED CHANNEL : ${user.value().id} -> #${data.id}`, 2);
                            }
                        }
                        else {
                            callback({
                                code: 2,
                                body: 'INVALID ID'
                            });
                            log(`socket -> join INVALID ID : ${user.value().id}`, 2);
                        }
                    }
                    else {
                        callback({
                            code: 1,
                            body: 'MISSING PARAMETERS'
                        });
                        log(`socket -> join MISSING PARAMETERS : ${user.value().id}`, 2);
                    }
                }
                catch (err) {
                    log(`ERROR AT 'socket -> join' ${socket.handshake.address} : ${err}`, 1);
                }
            });

            // MESSAGING TO CHANNELS/USERS
            socket.on('message', function onMessage (data, callback) {
                try {
                    /*
                    DATA:
                        - to ( string ) [ id of channel/user with #/@ ]
                        - headers ( string )
                        - body ( string )
                    */
                    data.to = String(data.to);
                    data.headers = String(data.to);
                    data.body = String(data.body);

                    if (data.to && data.body) {
                        if (data.to.substring(0, 1) == '@') {
                             // NOT IMPLEMENTED
                        }
                        else if (data.to.substring(0, 1) == '#') {
                            var channel = db.get('channels').find({ id: data.to.substring(1) });
                            if (channel.value()) {
                                if (permCheck(user.value().id, channel.value().id, 'sendMessages')) {
                                    var messageData = {
                                        from: {
                                            id: user.value().id,
                                            nick: user.value().nick
                                        },
                                        to: data.to,
                                        headers: data.headers || {},
                                        body: data.body
                                    }

                                    // ONLY SAVE MESSAGES TO DB IF ENABLED
                                    if (channel.value().saveMessages)
                                        channel.get('messages').push(messageData).write();

                                    io.to(data.to).emit('message', messageData);

                                    callback({
                                        code: 0,
                                        body: 'MESSAGE SUCCESSFULLY SENT'
                                    });
                                    log(`MESSAGE SENT : ${data.headers} - ${data.body} : ${user.value().id} -> ${data.to}`, 3);
                                }
                                else {
                                    callback({
                                        code: 4,
                                        body: 'PERMISSION DENIED'
                                    });
                                }
                            }
                            else {
                                callback({
                                    code: 2,
                                    body: 'CHANNEL DOES NOT EXIST'
                                });
                                log(`ATTEMPTED ACCESSING NON-EXISTANT CHANNEL : ${user.value().id} -> ${data.to}`, 2);
                            }
                        }
                        else {
                            callback({
                                code: 3,
                                body: 'INVALID MESSAGE TYPE'
                            });
                            log(`INVALID MESSAGE TYPE : ${user.value().id} -> ${data.to}`, 2);
                        }
                    }
                    else {
                        callback({
                            code: 1,
                            body: 'MISSING PARAMETERS'
                        });
                        log(`socket -> message MISSING PARAMETERS : ${user.value().id}`, 2);
                    }
                }
                catch (err) {
                    log(`ERROR AT 'socket -> message' ${socket.handshake.address} : ${err}`, 1);
                }
            });

            socket.on('query-user', function onQueryUser (data, callback) {

            });

            // MANUALLY LOGGING OUT
            socket.on('logout', function onLogout (callback) {
                try {
                    delete AUTH_TOKENS[socket.handshake.address];
                    callback({
                        code: 0,
                        body: 'SUCCESFFULLY LOGGED OUT'
                    });
                    socket.disconnect(true);
                    log(`LOGOUT : ${user.value().id}`, 3);
                }
                catch (err) {
                    log(`ERROR AT 'socket -> logout' ${socket.handshake.address} : ${err}`, 1);
                }
            });

            // DISCONNECTING FROM SOCKET
            socket.on('disconnect', function onDisconnect () {
                baseDisconnect(socket);
                user.assign({ status: 1 }).write(); // SET STATUS TO OFFLINE
            });
        }
        else {
            callback({
                code: 1,
                body: 'INVALID AUTH TOKEN'
            });
            log(`INVALID AUTH TOKEN : ${socket.handshake.address} - ${data.token}`, 2);
            socket.disconnect(true);
        }
    });
});

// API LOGIC
// VALIDATING AN AUTH TOKEN
const rateLimit = require("express-rate-limit");
if (config['system'].isProxied) app.enable("trust proxy");
const apiLimiter = rateLimit({
    windowMs: 5 * 1000, // 2 SECONDS
    max: 5, // MAXIMUM 5 REQUESTS BEFORE LIMITED BY RATE
    message: {
        code: -1,
        body: 'Too many requests!'
    }
});
app.use("/api/", apiLimiter); // LIMIT API USAGE

// MESSAGE QUERY
app.post('/api/query/messages', function onQueryMessages (req, res) {
    /*
    BODY:
        - token ( string )
        - id ( int )
        - size ( int )
        - offset ( int )
        - search ( string )
    */

    if (req.bodyString('token') && req.bodyString('id') && req.bodyInt('size') !== undefined && req.bodyInt('offset') !== undefined) {
        if (AUTH_TOKENS[req.connection.remoteAddress].token == req.bodyString('token')) {
            var channel = db.get('channels').find({ id: req.bodyString('id') }).cloneDeep();
            if (channel.value()) {
                if (permCheck(AUTH_TOKENS[req.connection.remoteAddress].id, req.bodyString('id'), 'readMessages')) {
                    var query = channel.get('messages').reverse()
                        .filter(function channelQueryFilter (o) {
                            return o.body.indexOf(req.bodyString('search')) != -1 || !req.bodyString('search');
                        })
                        .slice(req.bodyInt('offset'), req.bodyInt('offset') + req.bodyInt('size')).reverse().value();
                    res.json({
                        code: 0,
                        body: 'Retrieved message query.',
                        query: query
                    });
                    log(`QUERIED MESSAGE : #${req.bodyString('id')} : size: ${req.bodyInt('size')}, offset: ${req.bodyInt('offset')}, search: ${req.bodyString('search')}`);
                }
                else {
                    res.json({
                        code: 3,
                        body: 'Permission denied!'
                    });
                }
            }
            else {
                res.json({
                    code: 2,
                    body: 'Channel does not exist!'
                });
            }
        }
        else {
            res.json({
                code: 1,
                body: 'Invalid auth token!'
            });
        }
    }
    else {
        res.end();
    }
});

// CHANNEL QUERY
app.post('/api/query/channel', function onQueryChannel (req, res) {
    /*
    BODY:
        - id ( int )
    */

    if (req.bodyString('id')) {
        var query = queryChannel(req.bodyString('id'));
        if (query) {
            res.json({
                code: 0,
                body: 'Retrieved channel query.',
                query: query
            });
            log(`QUERIED CHANNEL : #${req.bodyString('id')}`, 3);
            log(query, 3);
        }
        else {
            res.json({
                code: 1,
                body: 'Channel does not exist!'
            });
        }
    }
    else {
        res.end();
    }
});

// GENERATING AN AUTH TOKEN
app.post('/api/genAuthToken', function onGenAuthToken (req, res) {
    /*
    BODY:
        - email ( string )
        - password ( password )
    */

    if (req.bodyEmail('email') && req.bodyString('password')) {
        var user = db.get('users').find({ email: req.bodyEmail('email') }).value();
        if (user) {
            bcrypt.compare(req.bodyString('password'), user.password, function pswdCompare (err, success) {
                if (success) {
                    var authToken = uuidv4();
                    AUTH_TOKENS[req.connection.remoteAddress] = {
                        token: `${user.email}///${authToken}`,
                        id: user.id
                    };

                    res.json({
                        code: 0,
                        body: 'Authentication token successfully generated.',
                        token: authToken
                    });

                    log(`GENERATED AUTH TOKEN : ${user.id}`, 3);
                    log(AUTH_TOKENS, 3);
                }
                else {
                    res.json({
                        code: 1,
                        body: 'Email or password is incorrect!'
                    });
                }
            });
        }
        else {
            res.json({
                code: 1,
                body: 'Email or password is incorrect!'
            });
        }
    }
    else {
        res.end();
    }
});

// REGISTERING AN ACCOUNT
function pswdTest(password) {
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password))
        return true;
    return false;
}
app.post('/api/register', function onRegister (req, res) {
    /*
    BODY:
        - email ( string )
        - nick ( string )
        - password ( string )
    */

	if (req.bodyEmail('email') && req.bodyString('nick') && req.bodyString('password')) {
        if (!db.get('users').filter({ email: req.bodyEmail('email') }).size().value()) {
            if (req.bodyString('nick').length >= 3) {
                if (pswdTest(req.bodyString('password'))) {
                    bcrypt.genSalt(saltRounds, function genSalt (err, salt) {
                        bcrypt.hash(req.bodyString('password'), salt, function genHash (err, hash) {
                            var sortedUsers = db.get('users').sortBy('id').reverse().value();
                            var newId = sortedUsers[0] ? sortedUsers[0].id + 1 : 0;

                            db.get('users').push({
                                id : newId,
                                email: req.bodyEmail('email'),
                                nick: req.bodyString('nick'),
                                password: hash,
                                status: 1,
                                note: ''
                            }).write();

                            res.json({
                                code: 0,
                                body: 'Successfully registered.'
                            });

                            log(`REGISTERED : ${newId} - ${req.bodyEmail('email')} - ${req.bodyString('nick')}`, 3);
                        });
                    });
                }
                else {
                    res.json({
                        code: 3,
                        body: 'Password strength is insufficient!'
                    });
                }
            }
            else {
                res.json({
                    code: 2,
                    body: 'Nickname must be at least 3 characters long!'
                });
            }
        }
        else {
            res.json({
                code: 1,
                body: 'Email alrady in use!'
            });
        }
    }
    else {
        res.end();
    }
});

// BEGIN LISTENING
log(`BEGINNING SERVER (${config['system'].version})`, 0);
server.listen(6719);

// CHANNEL MANAGEMENT
function createChannel(id, owner/*, parentServer*/) {
    var newChannel = db.get('channels').push({
        id: id,
        messages: [],
        roles: [],
        owner: owner,
        users: [
            {
                id: owner,
                nick: '',
                roles: []
            }
        ],
        saveMessages: true
    }).write();

    log (`CHANNEL CREATED : #${id}`, 3);
}
function queryChannel(id) {
    var channel = db.get('channels').find({ id: id }).cloneDeep().value();
    if (channel) {
        delete channel.messages;
        log(`QUERIED CHANNEL : #${id}`, 3);
        log(channel, 3);
        return channel;
    }
    else {
        return null;
    }
}

// TECHNICIAN MANAGEMENT CONSOLE
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', function onConsoleInput (input) {
    var argv = input.split(' ');

    switch (argv[0]) {
        case 'createchannel':
            if (argv[1] && argv[2]) {
                createChannel(argv[1], argv[2]);
                console.log('COMMAND EXECUTED');
            }
            else {
                console.log('MISSING ARGUMENTS');
            }
            break;
        case 'permcheck':
            if (argv[1] && argv[2] && argv[3]) {
                permCheck(argv[1], argv[2], argv[3]);
                console.log('COMMAND EXECUTED');
            }
            else {
                console.log('MISSING ARGUMENTS');
            }
            break;
        case 'querychannel':
            if (argv[1]) {
                console.log(queryChannel(argv[1]));
                console.log('COMMAND EXECUTED');
            }
            else {
                console.log('MISSING ARGUMENTS');
            }
            break;
    }
});

/*
DATABASE STRUCTURE:
    USERS:
        - id ( int )
        - email ( string )
        - nick ( string )
        - password ( string )
        - status ( enum ) [ online, offline, invisible, do not disturb ]
        - note ( string )
        - perms ( permissions )
    CHANNELS:
        - id ( int )
        - name ( string )
        - messages ( [message] )
        - roles ( [{
            - id ( int )
            - perms ( permissions )
        }] )
        - owner ( user.id )
        - users ( [{
            - id ( user.id )
            - nick ( string ) [ can be empty ]
            - roles ( [ role.id ] )
        }] ),
        saveMessages ( bool )

MESSAGE STRUCTURE:
    - from ( int ) [ id ]
    - to ( string ) [ user.id/channel.id ]
    - headers ( string )
    - body ( string )

PERMISSIONS STRUCTURE:
    - isAdmin ( bool ) [ superperms ]
    - manageServer ( bool ) [ managing server properties ]
    - manageRoles ( bool ) [ managing server roles ]
    - manageChannels ( bool ) [ managing channels ]
    - manageMessages ( bool ) [ mannaging messages ]
    - manageNicks ( bool ) [ changing others' nicknames ]
    - kick ( bool ) [ kick others of lower role ]
    - ban ( bool ) [ ban others of lower role ]
    - invite ( bool ) [ invite users to server ]
    - changeNick ( bool ) [ change own nicknames ]
    - sendMessages ( bool ) [ sending messages ]
    - readMessages ( bool ) [ seeing messages ]
    
    - prefix ( string )
    - suffix ( string )

    - colorR ( int ) [ role color ]
    - colorG ( int )
    - colorB ( int )
*/