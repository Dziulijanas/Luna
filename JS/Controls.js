class Controls extends Phaser.Scene {
    constructor() {
        super("controls");
    }

    preload() {
        this.load.image('BackButton', 'img/BackButton.png');
        this.load.image('BackgroundC', 'assets/MenuScreens/ControlBack.png');
        this.load.image('Controls', 'img/ControlBox.png');
    }

    create () {


        this.add.image(400,300, 'BackgroundC');
        this.add.image(275,275, 'Controls');
        let playButton = this.add.image(655, 525, 'BackButton');
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