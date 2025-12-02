import { Manuscript } from './Manuscript.js';
import { UIManager } from './UIManager.js';
import { LevelManager } from './LevelManager.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width = 1280;
        this.height = canvas.height = 720;

        this.lastTime = 0;
        this.isRunning = false;

        this.uiManager = new UIManager(this);
        this.manuscript = new Manuscript(this);
        this.levelManager = new LevelManager(this);

        this.enemies = [];
        this.projectiles = []; // Attacks from enemies or defenses
        this.defenses = []; // Towers placed

        this.gameState = 'START'; // START, PLAYING, PAUSED, GAMEOVER, VICTORY

        // Bind inputs
        this.setupInputs();
    }

    setupInputs() {
        // Handle defense placement clicks, etc.
        this.canvas.addEventListener('click', (e) => {
            if (this.gameState !== 'PLAYING') return;
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Logic to place defense if selected
            this.uiManager.handleCanvasClick(x, y);
        });
    }

    start() {
        this.gameState = 'PLAYING';
        this.isRunning = true;
        this.levelManager.startLevel(1);
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timestamp) {
        if (!this.isRunning) return;

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.loop.bind(this));
    }

    update(deltaTime) {
        if (this.gameState !== 'PLAYING') return;

        this.manuscript.update(deltaTime);
        this.levelManager.update(deltaTime);

        // Update enemies
        this.enemies.forEach(enemy => enemy.update(deltaTime));
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);

        // Update defenses
        this.defenses.forEach(defense => defense.update(deltaTime));
        this.defenses = this.defenses.filter(defense => !defense.markedForDeletion);

        // Collision detection
        this.checkCollisions();

        // Check Game Over
        if (this.manuscript.isRejected()) {
            this.gameOver(this.manuscript.rejectionReason);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw Background (scrolling effect could go here)
        this.ctx.fillStyle = '#f4f1ea';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw "Lane" lines
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.beginPath();
        this.ctx.moveTo(0, 200);
        this.ctx.lineTo(this.width, 200);
        this.ctx.moveTo(0, 500);
        this.ctx.lineTo(this.width, 500);
        this.ctx.stroke();

        this.manuscript.draw(this.ctx);

        this.defenses.forEach(defense => defense.draw(this.ctx));
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
    }

    checkCollisions() {
        // Simple collision logic
        this.enemies.forEach(enemy => {
            // Check collision with Manuscript
            if (this.checkCollision(enemy, this.manuscript)) {
                enemy.attack(this.manuscript);
            }
        });
    }

    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    gameOver(reason) {
        this.gameState = 'GAMEOVER';
        this.uiManager.showGameOver(reason);
    }
}
