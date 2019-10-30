const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ provider: 'https://u0fee8plb7-u0oc1dfpxi-ipfs.us0-aws.kaleido.io/ipfs', protocol: 'https' });

export const setJSON = (obj) => {
    return new Promise((resolve, reject) => {
        ipfs.addJSON(obj, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    });
}

export const getJSON = (hash) => {
    return new Promise((resolve, reject) => {
        ipfs.catJSON(hash, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        });
    });
}
