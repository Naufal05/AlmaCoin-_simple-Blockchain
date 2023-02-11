const SHA256 = require("crypto-js/sha256");

class Block {
  //constructor
  constructor(blockNumber, timeStamp, data, previousHash = "") {
    this.blockNumber = blockNumber;
    this.timeStamp = timeStamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash(); //combine of all the above
    this.nonce = 0;
  }

  //define method to calc hash
  calculateHash() {
    return SHA256(
      this.blockNumber +
        this.timeStamp +
        this.previousHash +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined : " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  //function
  createGenesisBlock() {
    return new Block(0, "11/02/2023", "Genesis-Block", "0");
  }
  // to get the latest block detail
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  //add a new block
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    // newBlock.hash = newBlock.calculateHash();
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  //check the vailidation

  isValid() {
    for (let i = 0; i < this.chain.length; i++) {
      const previousBlock = this.chain[i - 1];
      const currentBlock = this.chain[i];

      if (currentBlock.hash !== currentBlock.calculateHash) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

const AlmaChain = new Blockchain();

console.log("Mining Block 1...");
AlmaChain.addBlock(new Block(1, "12/02/2023", { amount: 5 }));

console.log("Mining Block 2...");

AlmaChain.addBlock(new Block(2, "13/02/2023", { amount: 10 }));

// AlmaChain.chain[1].data = { amount: 100 };
// AlmaChain.chain[1].hash = AlmaChain.chain[1].calculateHash();
// AlmaChain.chain[2].previousHash = AlmaChain.chain[1].hash;
// AlmaChain.chain[2].hash = AlmaChain.chain[2].calculateHash();

// // console.log(JSON.stringify(AlmaChain, null, 4));

// console.log("Is our chain valid?", AlmaChain.isValid());
