class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image('StartButton', 'img/StartB.png');
        this.load.image('ControlButton', 'img/ControlButton.png');
        this.load.image('Logo', 'img/LogoGame.png');


        this.load.image('Background', 'assets/MenuScreens/LunaBack.png');

        //Music
        this.load.audio('MainMusic', 'assets/Music/MainMenuMusic.mp3');
    }

    create () {
        this.add.image(400,300, 'Background');
        this.add.image(180,150, 'Logo');

        this.MainMusic = this.sound.add('MainMusic');
        var mainConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.MainMusic.play(mainConfig);
        let playButton = this.add.image(180, 370, 'StartButton');


        playButton.setInteractive();
        playButton.on("pointerover", ()=>{
            console.log("HOVER")
        })
        playButton.on("pointerout", ()=>{
            console.log("OUT")
        })
        playButton.on("pointerup", ()=>{
            console.log("Trying to load Game..")
            this.MainMusic.stop();
            this.scene.start('playGame');

        })

        let controlButton = this.add.image(180, 500, 'ControlButton');
        controlButton.setInteractive();
        controlButton.on("pointerover", ()=>{
            //console.log("HOVER")
        })
        controlButton.on("pointerout", ()=>{
            //console.log("OUT")
        })
        controlButton.on("pointerup", ()=>{
            //console.log("Trying to load Game..")
            this.scene.start('controls');
        })
        //this.scene.start("playGame");
    }
}