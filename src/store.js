import { createStore } from 'redux';

const initialState = {
    client: {
        nick: 'KuriGohan',
        id: '23j6-19k5-13j5'
    },
    active: '@weirdodobird',
    recent: [
        'weirdodobird',
        'Minnowfeather',
        'Paelen',
        'Alanisahorse',
        'Officer-chan',
        'Underslash',
        'Blackdeath45678',
        'eugenius',
        'gaidancecounselor',
        'ENam',
        'prog_ju',
        'Runningsloths',
        'rip',
        'Mudamaid 6',
        'woojinguy208',
        'ManuFraxured'
    ],
    history: {
        '@weirdodobird': [
            { id: 0, author: 'weirdodobird', body: 'test' },
            { id: 1,  author: 'weirdodobird', body: '123' },
            { id: 2, author: 'weirdodobird', body: 'test' },
            { id: 3, author: 'weirdodobird', body: '123' },
            { id: 4, author: 'weirdodobird', body: 'test' },
            { id: 5, author: 'weirdodobird', body: '123' },
            { id: 6, author: 'weirdodobird', body: 'test' },
            { id: 7, author: 'weirdodobird', body: '123' },
            { id: 8, author: 'weirdodobird', body: 'test' },
            { id: 9, author: 'weirdodobird', body: '123' },
            { id: 10, author: 'weirdodobird', body: 'test' },
            { id: 11, author: 'weirdodobird', body: '123' },
            { id: 12, author: 'weirdodobird', body: 'test' },
            { id: 13, author: 'weirdodobird', body: '123' },
            { id: 14, author: 'weirdodobird', body: 'test' },
            { id: 15, author: 'weirdodobird', body: '123' }
        ],
        '@Minnowfeather': [
            { id: 0, author: 'Minnowfeather', body: 'testing' },
            { id: 1, author: 'Minnowfeather', body: 'body' },
            { id: 2, author: 'KuriGohan', body: '123oiu' }
        ]
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SWITCH_ACTIVE':
            let recent = state.recent.concat();
            if (action.payload[0] === '@') {
                recent.splice(recent.indexOf(action.payload.substr(1)), 1);
            }
            recent.unshift(action.payload.substr(1));
            return Object.assign({}, state, {
                active: action.payload,
                recent: recent
            });
            break;
        case 'ADD_MESSAGE':
            let newState = Object.assign({}, state);
            newState.history[action.payload.recepient] = newState.history[action.payload.recepient].concat();
            newState.history[action.payload.recepient].push({
                author: action.payload.author,
                body: action.payload.body
            });
            return newState;
            break;
        case 'SET_CLIENT':
            return Object.assign({}, state, {
                client: { ...state.client, ...action.payload }
            });
            break;
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;
