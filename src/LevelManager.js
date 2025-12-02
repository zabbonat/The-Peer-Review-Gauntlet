import { Enemy } from './Enemy.js';

export class LevelManager {
    constructor(game) {
        this.game = game;
        this.currentLevel = 1;
        this.waveTimer = 0;
        this.waveInterval = 2000; // Spawn every 2 seconds
        this.levelDuration = 30000; // 30 seconds per level
        this.levelTimer = 0;
    }

    startLevel(level) {
        this.currentLevel = level;
        this.levelTimer = 0;
        this.game.uiManager.showNotification(`Starting Level ${level}: The Editorial Office`);
    }

    update(deltaTime) {
        this.levelTimer += deltaTime;
        this.waveTimer += deltaTime;

        if (this.waveTimer > this.waveInterval) {
            this.spawnEnemy();
            this.waveTimer = 0;
        }

        if (this.levelTimer > this.levelDuration) {
            this.nextLevel();
        }
    }

    spawnEnemy() {
        let type = 'desk_rejection';
        if (this.currentLevel === 1) {
            type = Math.random() > 0.5 ? 'desk_rejection' : 'auto_reply';
        } else if (this.currentLevel === 2) {
            type = Math.random() > 0.7 ? 'reviewer_2' : 'desk_rejection';
        }

        this.game.enemies.push(new Enemy(this.game, type));
    }

    nextLevel() {
        this.currentLevel++;
        this.levelTimer = 0;
        this.game.uiManager.showNotification(`Level Complete! Advancing to Level ${this.currentLevel}...`);
        // Ideally pause or show a transition screen
    }
}
