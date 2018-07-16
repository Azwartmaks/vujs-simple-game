new Vue ({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		logs: []
	},
	methods: {
		startGame: function () {
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.logs = [];
		},
		attack: function () {
			var damage = this.damageCalculate(3,10);
			this.monsterHealth -= damage;
			
			this.logs.unshift({
				isPlayer: true,
				message: 'Player hits monster for ' + damage 
			});

			if (this.winSelector()) {
				return;
			}

			this.monsterAttack();
		},
		specialAttack: function () {
			var damage = this.damageCalculate(10,20);
			this.monsterHealth -= damage;
			this.logs.unshift({
				isPlayer: true,
				message: 'Player super hits player for ' + damage 
			});

			if (this.winSelector()) {
				return;
			}

			this.monsterAttack();
		},
		monsterAttack: function () {
			var damage = this.damageCalculate(5,12);
			this.playerHealth -= damage;
			this.logs.unshift({
				isPlayer: false,
				message: 'Monster hits player for ' + damage 
			});
		},
		heal: function () {
			if (this.playerHealth <= 90) {
				this.playerHealth += 10;
			} else {
				this.playerHealth = 100;
			}

			this.logs.unshift({
				isPlayer: true,
				message: 'Player heal for 10 points'
			});

			this.monsterAttack();
		},
		giveUp: function () {
			this.gameIsRunning = false;
		},
		damageCalculate: function (min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		winSelector: function () {
			if (this.monsterHealth <= 0 ) {
				if (confirm('You won! Start new game ?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;

			} else if (this.playerHealth <= 0) {
				if (confirm('You lost! Start new game ?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			}
			return false;
		}
 	}
});