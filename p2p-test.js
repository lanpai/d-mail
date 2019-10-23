const Libp2p = require('libp2p');
const { createLibp2p } = require('libp2p');
const PeerInfo = require('peer-info');
const TCP = require('libp2p-tcp')

const peer = PeerInfo.create('11598y7')/*.then(() => {
    /*peer.multiaddrs.add('/ip4/127.0.0.1/tcp/6734');

    const p2p = new Libp2p({
        peerInfo: peer,
        modules: {
            transport: [ TCP ]
        }
    });

    p2p.start(() => {
        console.log('started');
    });*/
//});
