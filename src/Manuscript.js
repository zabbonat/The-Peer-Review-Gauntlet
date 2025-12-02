export class Manuscript {
    constructor(game) {
        this.game = game;
        this.width = 60;
        this.height = 80;
        this.x = 100; // Fixed X position, world moves around it or enemies come to it
        this.y = 300; // Center lane

        // Stats
        this.stats = {
            novelty: 100,
            robustness: 100,
            clarity: 100,
            citations: 100,
            figures: 100
        };

        this.rejectionReason = '';
    }

    update(deltaTime) {
        // Manuscript stays in place or moves slowly forward visually
        // For now, let's say it's stationary and enemies approach from right
    }

    draw(ctx) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Draw text lines effect
        ctx.fillStyle = '#ccc';
        for (let i = 10; i < 70; i += 10) {
            ctx.fillRect(this.x + 10, this.y + i, this.width - 20, 2);
        }

        // Label
        ctx.fillStyle = '#000';
        ctx.font = '12px serif';
        ctx.fillText('Paper', this.x + 15, this.y - 5);
    }

    takeDamage(stat, amount) {
        if (this.stats[stat] !== undefined) {
            this.stats[stat] = Math.max(0, this.stats[stat] - amount);
            this.game.uiManager.updateStats(this.stats);
        }
    }

    isRejected() {
        if (this.stats.novelty <= 0) {
            this.rejectionReason = "REJECTED: Lack of Novelty. 'We find this work incremental.'";
            return true;
        }
        if (this.stats.robustness <= 0) {
            this.rejectionReason = "REJECTED: Methodological Flaws. 'Your control group is invalid.'";
            return true;
        }
        if (this.stats.clarity <= 0) {
            this.rejectionReason = "REJECTED: Poorly Written. 'The English is unreadable.'";
            return true;
        }
        // ... other stats
        return false;
    }
}
