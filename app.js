import crypto from 'crypto';

class Block {
    constructor (index,data,previousHash="") {
        this.index = index;
        this.timestamp = Date.now();
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

const block1 = new Block(0,"meow");
const block2 = new Block(1,"weow",block1.hash);
const block3 = new Block(2,"peow",block2.hash);

console.log(
    "block 1 : ",block1,
    "\nblock 2 : ",block2,
    "\nblock 3 : ",block3
)