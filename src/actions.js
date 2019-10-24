import store from './store';

function switchActive(value) {
    store.dispatch({
        type: 'SWITCH_ACTIVE',
        payload: value
    });
}

function sendMessage(recepient, body, author) {
    author = author || store.getState().client.nick;
    store.dispatch({
        type: 'ADD_MESSAGE',
        payload: {
            recepient: recepient,
            author: author,
            body: body
        }
    });
}

export { switchActive, sendMessage };
