class GameWon extends Phaser.Scene {
    constructor() {
        super("gameWon");
    }

    preload() {
        this.load.image('ReplayButton', 'img/ReplayButton.png');
        this.load.image('GameWonB', 'assets/MenuScreens/LunaWIN-01.png');
        this.load.audio('GameEndMusic','assets/Music/EndGameSound.mp3');

    }

    create () {

        this.add.image(400,300, 'GameWonB');

        this.gameEnd = this.sound.add('GameEndMusic');
        var musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        this.gameEnd.play(musicConfig);


        let playButton = this.add.image(620, 520, 'ReplayButton');
        playButton.setInteractive();
        playButton.on("pointerover", ()=>{
            console.log("HOVER")
        })
        playButton.on("pointerout", ()=>{
            console.log("OUT")
        })
        playButton.on("pointerup", ()=>{
            console.log("Trying to load Game..")
            this.scene.start('bootGame');
        })
        //this.scene.start("playGame");
    }
}