export class Defense {
    constructor(game, type, x, y) {
        this.game = game;
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.markedForDeletion = false;
        this.life = 100; // Duration or health

        this.configureType(type);
    }

    configureType(type) {
        switch (type) {
            case 'supplementary':
                this.name = 'Supp. Material';
                this.color = '#2ecc71';
                break;
            case 'response':
                this.name = 'Response Letter';
                this.color = '#f1c40f';
                break;
            case 'coauthor':
                this.name = 'Coauthor Shield';
                this.color = '#9b59b6';
                break;
        }
    }

    update(deltaTime) {
        // Defenses might degrade over time or shoot projectiles
        this.life -= 0.1;
        if (this.life <= 0) this.markedForDeletion = true;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.font = '10px sans-serif';
        ctx.fillText(this.name, this.x - 20, this.y + 30);
    }
}
