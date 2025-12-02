export class Enemy {
    constructor(game, type) {
        this.game = game;
        this.type = type;
        this.x = game.width;
        this.y = Math.random() * (game.height - 200) + 100; // Random Y within play area
        this.width = 50;
        this.height = 50;
        this.speedX = -2; // Move left
        this.markedForDeletion = false;

        // Stats
        this.damage = 10;
        this.targetStat = 'novelty'; // Default
        this.name = 'Enemy';
        this.color = 'red';

        this.configureType(type);
    }

    configureType(type) {
        switch (type) {
            case 'desk_rejection':
                this.name = 'Desk Rejection Golem';
                this.color = '#555';
                this.damage = 30;
                this.targetStat = 'novelty';
                this.speedX = -3;
                break;
            case 'reviewer_2':
                this.name = 'Reviewer 2';
                this.color = '#8b0000';
                this.damage = 20;
                this.targetStat = 'robustness'; // Can change dynamically
                this.speedX = -2.5;
                break;
            case 'auto_reply':
                this.name = 'Auto-Reply Specter';
                this.color = 'rgba(100,100,255,0.5)';
                this.damage = 5;
                this.targetStat = 'clarity';
                this.speedX = -1;
                break;
        }
    }

    update(deltaTime) {
        this.x += this.speedX;
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Name
        ctx.fillStyle = '#000';
        ctx.font = '10px sans-serif';
        ctx.fillText(this.name, this.x, this.y - 5);
    }

    attack(manuscript) {
        manuscript.takeDamage(this.targetStat, this.damage);
        this.markedForDeletion = true; // Die on impact for now

        // Visual feedback
        this.game.uiManager.showNotification(`${this.name} hit your ${this.targetStat}!`);
    }
}
