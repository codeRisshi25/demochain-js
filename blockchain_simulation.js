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
}

class Blockchain {
    constructor() {
        this.chain = [];
    }
    addBlock(block) {
        this.chain.push(block);
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

// Create and adding blocks
const block1 = new Block(0,"meow");
const block2 = new Block(1,"weow",block1.hash);
const block3 = new Block(2,"peow",block2.hash);

blockchain.addBlock(block1);
blockchain.addBlock(block2);
blockchain.addBlock(block3);

//? Display the original blockchain
console.log("=== ORIGINAL CHAIN ===");
blockchain.displayChain();

// Task 1 : Tamper with Block 1
console.log("\n\n=== TAMPERING WITH BLOCK 1 ===");
console.log("Changing Block 1 data from 'meow' to 'TAMPERED!'");
block1.data = "TAMPERED!";

console.log("\n--- After tampering (without recalculating hash) ---");
blockchain.displayChain();

// Now recalculate Block 1's hash
console.log("\n--- After recalculating Block 1's hash ---");
block1.recalculateHash();
blockchain.displayChain();

// Just recalculating the blocks hash makes the chain invalid so fixing the whole chain
console.log("\n\n=== FIXING THE ENTIRE CHAIN ===");
console.log("Recalculating all hashes to restore chain integrity...");

// Fix Block 2
block2.previousHash = block1.hash;
block2.recalculateHash();

// Fix Block 3
block3.previousHash = block2.hash;
block3.recalculateHash();

console.log("\n--- After fixing all blocks ---");
blockchain.displayChain();