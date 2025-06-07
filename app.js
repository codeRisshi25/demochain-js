import crypto from 'crypto';

class Block {
    constructor (index,timestamp,data,previousHash="") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = 0;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash () {
        const hashData =this.index+this.timestamp+this.data+this.nonce+this.previousHash
        const hash = crypto.createHash('sha256').update(hashData).digest('hex');
        return hash;
    }
}

const block1 = new Block(0,2005,"meow");
const block2 = new Block(1,2006,"weow",block1.hash);
console.log(block1,block2)