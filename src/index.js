/*
 * D-MAIL <client>
 * @author: lanpai
 * @license: MIT
 */

import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db');
const db = low(adapter);

db.defaults({ channels: [] }).write();

window.register = function () {
    var email = document.getElementsByClassName('email-register')[0].value;
    var nick = document.getElementsByClassName('nick-register')[0].value;
    var password = document.getElementsByClassName('password-register')[0].value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/api/register", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`email=${email}&nick=${nick}&password=${password}`);
    var response = JSON.parse(xhttp.response);
    console.log(response);
}

window.generate = function () {
    var email = document.getElementsByClassName('email-generate')[0].value;
    var password = document.getElementsByClassName('password-generate')[0].value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/api/genAuthToken", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`email=${email}&password=${password}`);
    var response = JSON.parse(xhttp.response);
    console.log(response);
    if (response.code == 0)
        document.getElementsByClassName('authToken-login')[0].value = `${email}///${response.token}`;
        window.localStorage.setItem('authToken', response.token);
        window.localStorage.setItem('email', email);
}

import io from 'socket.io-client';

var socket = io('/');
socket.on('connect', function() {
    console.log('CONNECTED');
});
socket.on('message', function (data) {
    console.log(data);
    document.getElementsByClassName(`channel-${data.to.substring(1)}`)[0].textContent += `${data.from.nick}@${data.from.id} - ${data.body}\n`;
});
socket.on('disconnect', function () {
    console.log('DISCONNECTED');
});
window.login = function () {
    socket.emit('login', {
        token: document.getElementsByClassName('authToken-login')[0].value
    }, function (data) {
        console.log(data);
    });
}
window.logout = function () {
    socket.emit('logout', function (data) {
        console.log(data);
    });
}
window.reconnect = function () {
    socket.connect();
}
window.message = function () {
    socket.emit('message', {
        to: document.getElementsByClassName('to-message')[0].value,
        headers: document.getElementsByClassName('headers-message')[0].value,
        body: document.getElementsByClassName('body-message')[0].value
    }, function (data) {
        console.log(data);
    });
}
window.join = function () {
    var channelId = document.getElementsByClassName('id-join')[0].value;
    socket.emit('join', {
        id: channelId,
    }, function (data) {
        console.log(data);
        if (data.code == 0) {
            if (document.getElementsByClassName(`channel-${channelId}`).length == 0) {
                var newTextarea = document.createElement("textarea");
                newTextarea.className += `channel-${channelId}`;
                newTextarea.readOnly = true;
                newTextarea.setAttribute('rows', 15);
                newTextarea.setAttribute('cols', 50);
                newTextarea.textContent += `Channel: #${channelId}\n`;
                document.getElementsByClassName('channels-div')[0].appendChild(newTextarea);
            }
        }
    });
}