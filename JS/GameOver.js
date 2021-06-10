class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    preload() {
        this.load.image('ReplayB', 'img/ReplayButton.png');
        this.load.image('GameOverB', 'assets/MenuScreens/GameOver.png');
        this.load.image('TestGO', 'img/GameOver.png');

        this.load.audio('GameOverMusic', 'assets/Music/GameOverSound.mp3');
    }

    create () {
        this.add.image(400,300, 'GameOverB');
        this.add.image(400,300, 'TestGO');

        this.gameOver = this.sound.add('GameOverMusic');
        var musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        this.gameOver.play(musicConfig);

        let playButton = this.add.image(620, 520, 'ReplayB');
        playButton.setInteractive();
        playButton.on("pointerover", ()=>{
            console.log("HOVER")
        })
        playButton.on("pointerout", ()=>{
            console.log("OUT")
        })
        playButton.on("pointerup", ()=>{
            console.log("Trying to load Game..")
            this.scene.start('playGame');
        })
        //this.scene.start("playGame");
    }
}