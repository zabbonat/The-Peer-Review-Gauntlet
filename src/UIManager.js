import { Defense } from './Defense.js';

export class UIManager {
    constructor(game) {
        this.game = game;
        this.statsElements = {
            novelty: document.getElementById('val-novelty'),
            robustness: document.getElementById('val-robustness'),
            clarity: document.getElementById('val-clarity'),
            citations: document.getElementById('val-citations'),
            figures: document.getElementById('val-figures')
        };
        this.barElements = {
            novelty: document.getElementById('bar-novelty'),
            robustness: document.getElementById('bar-robustness'),
            clarity: document.getElementById('bar-clarity'),
            citations: document.getElementById('bar-citations'),
            figures: document.getElementById('bar-figures')
        };

        this.notificationArea = document.getElementById('notification-area');
        this.selectedDefense = null;

        this.setupDefenseSelection();
    }

    setupDefenseSelection() {
        const slots = document.querySelectorAll('.defense-slot');
        slots.forEach(slot => {
            slot.addEventListener('click', () => {
                this.selectedDefense = slot.dataset.type;
                this.showNotification(`Selected: ${slot.querySelector('.name').innerText}`);
            });
        });
    }

    handleCanvasClick(x, y) {
        if (this.selectedDefense) {
            this.game.defenses.push(new Defense(this.game, this.selectedDefense, x, y));
            this.selectedDefense = null; // Deselect after placement
        }
    }

    updateStats(stats) {
        for (const [key, value] of Object.entries(stats)) {
            if (this.statsElements[key]) {
                this.statsElements[key].innerText = Math.floor(value);
                this.barElements[key].style.width = `${Math.max(0, value)}%`;
            }
        }
    }

    showNotification(text) {
        const notif = document.createElement('div');
        notif.className = 'notification';
        notif.innerText = text;
        this.notificationArea.appendChild(notif);

        // Remove after 3 seconds
        setTimeout(() => {
            notif.remove();
        }, 3000);
    }

    showGameOver(reason) {
        const screen = document.getElementById('game-over-screen');
        const reasonEl = document.getElementById('end-reason');
        reasonEl.innerText = reason;
        screen.classList.remove('hidden');

        document.getElementById('restart-btn').onclick = () => {
            location.reload();
        };
    }
}
