const config = {
    width: 800,
    height: 600,
    audio:{
        disableWebAudio: true
    },
    backgroundColor: 0x000000,
    parent: 'phaser-game',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Scene1, Scene2, GameOver, GameWon, Controls]
}

const game = new Phaser.Game(config);

