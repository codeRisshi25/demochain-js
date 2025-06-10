class ConsensusSimulation {
    constructor() {
        this.miners = [];
        this.stakers = [];
        this.delegates = [];
        this.voters = [];
    }

    generateValidators() {
        console.log("=== GENERATING VALIDATORS ===\n");

        for (let i = 1; i <= 3; i++) {
            this.miners.push({
                id: `Miner_${i}`,
                power: Math.floor(Math.random() * 1000) + 100
            });
        }

        for (let i = 1; i <= 3; i++) {
            this.stakers.push({
                id: `Staker_${i}`,
                stake: Math.floor(Math.random() * 5000) + 1000
            });
        }

        for (let i = 1; i <= 3; i++) {
            this.delegates.push({
                id: `Delegate_${i}`,
                votes: 0
            });
        }

        for (let i = 1; i <= 5; i++) {
            const randomDelegate = Math.floor(Math.random() * 3);
            this.voters.push({
                id: `Voter_${i}`,
                votedFor: this.delegates[randomDelegate].id
            });
            this.delegates[randomDelegate].votes++;
        }

        this.displayValidators();
    }

    displayValidators() {
        console.log("Miners:");
        this.miners.forEach(miner => {
            console.log(`  ${miner.id}: ${miner.power} power`);
        });

        console.log("Stakers:");
        this.stakers.forEach(staker => {
            console.log(`  ${staker.id}: ${staker.stake} tokens`);
        });

        console.log("Delegates:");
        this.delegates.forEach(delegate => {
            console.log(`  ${delegate.id}: ${delegate.votes} votes`);
        });
        console.log();
    }

    simulatePoW() {
        console.log("=== PROOF OF WORK ===");
        console.log("Selection: Highest computational power wins");
        
        let winner = this.miners[0];
        for (let miner of this.miners) {
            if (miner.power > winner.power) {
                winner = miner;
            }
        }

        console.log(`Winner: ${winner.id} with ${winner.power} power`);
        console.log("Logic: More power = higher chance to mine\n");
        return winner;
    }

    simulatePoS() {
        console.log("=== PROOF OF STAKE ===");
        console.log("Selection: Highest stake wins");
        
        let winner = this.stakers[0];
        for (let staker of this.stakers) {
            if (staker.stake > winner.stake) {
                winner = staker;
            }
        }

        console.log(`Winner: ${winner.id} with ${winner.stake} tokens`);
        console.log("Logic: More tokens = higher selection chance\n");
        return winner;
    }

    simulateDPoS() {
        console.log("=== DELEGATED PROOF OF STAKE ===");
        console.log("Selection: Most voted delegate wins");
        
        let winner = this.delegates[0];
        for (let delegate of this.delegates) {
            if (delegate.votes > winner.votes) {
                winner = delegate;
            }
        }

        console.log(`Winner: ${winner.id} with ${winner.votes} votes`);
        console.log("Logic: Community votes for representatives\n");
        return winner;
    }

    runSimulation() {
        this.generateValidators();
        
        const powWinner = this.simulatePoW();
        const posWinner = this.simulatePoS();
        const dposWinner = this.simulateDPoS();

        console.log("=== SUMMARY ===");
        console.log(`PoW Winner: ${powWinner.id}`);
        console.log(`PoS Winner: ${posWinner.id}`);
        console.log(`DPoS Winner: ${dposWinner.id}`);
    }
}

const sim = new ConsensusSimulation();
sim.runSimulation();