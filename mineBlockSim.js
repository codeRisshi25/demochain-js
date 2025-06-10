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
    recalculateHash() {
        this.hash = this.calculateHash();
    }
    // implement Proof of Work by mining a block
    mineBlock(difficulty) {
        const target = Array(difficulty+1).join("0");
        const startTime = Date.now();
        let attempts = 0;

        console.log("=== Mining Block ===")
        while (this.hash.substring(0,difficulty) !== target ){
            this.nonce++;
            this.hash = this.calculateHash();
            attempts++;
            if (attempts % 10000 == 0) {
                console.log(`Attempts ${attempts} : nonce = ${this.nonce} `);
                
            }
        }
        const endTime = Date.now();
        const miningTime = (endTime-startTime) / 1000;

        console.log(`✅ Block mined successfully!`);
        console.log(`Final nonce: ${this.nonce}`);
        console.log(`Final hash: ${this.hash}`);
        console.log(`Mining attempts: ${attempts}`);
        console.log(`Mining time: ${miningTime} seconds`);
    }
}

class Blockchain {
    constructor() {
        this.chain = [];
        this.difficulty = 3;
    }
    addBlock(block) {
        this.chain.push(block);
    }
    addMinedBlock(index,data) {
        const previousHash = index == 0 ? "" : this.chain[index-1].hash;
        const newBlock = new Block (index,data, previousHash);

        newBlock.mineBlock(this.difficulty);
        this.addBlock(newBlock);

        return newBlock;
    }
    //! Validate the entire chain
    isChainValid() {
        for (let i = 1; i < this.chain.length ; i++){
            const currentBlock =  this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    displayChain() {
        console.log('\n=== BLOCKCHAIN STATUS ===');
        this.chain.forEach((block) => {
            console.log(block);
        });
        console.log(`\nChain Valid: ${this.isChainValid()}`);
    }
}

// Creating a blockchain
const blockchain = new Blockchain();

blockchain.addMinedBlock(0,"meow");
blockchain.addMinedBlock(1,"weow");
blockchain.addMinedBlock(2,"peow");

//? Display the original blockchain
console.log("=== ORIGINAL CHAIN ===");
blockchain.displayChain();
