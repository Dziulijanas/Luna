class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");

        this.look_direction = 1; // direction modifier for bullets -
        this.directionTwo = 1;
        this.directionThree = 1;
        this.score = 0;

        this.nextTick = 0; //////////////////////////////////////////////////////////////////////////////////////////////
        this.fireRate = 100;
        this.nextFire = 0;
        this.enemyHp = 50;
        this.eTwo = 50;
        this.no = false;
        this.eBoolTwo= false;
        this.nextTick2 = 0; // for second enemy to shoot
        //this.nextTick3 = 0; // for second enemy to shoot

        // P1
        //var heartGroup;
        //var heart1;
        //var heart2;
        //var heart3;
        this.lives = 3;
        // P1

        // P2
        this.boyDirection = 1;
        this.livesTwo = 3;
        // P2

        this.pathCounter = 0;
        this.enemyThreeHp = 3;

        this.keys = 0;
        this.destroyed = false;

        this.pathCounterOne = 0;
        this.enemyThreeHp2 = 3;

        this.pathCounterTwo = 0;
        this.enemyThreeHp3 = 3;

        this.pathCounterThree = 0;
        this.enemyThreeHp4 = 3;

        this.directionBoss = 1;
        this.bossTick = 0;
        this.bossHp = 100;
        this.bombCount = 2;
        this.bossAlive = false;
        this.hasCreated = false;
    }

    preload () {
        // MAP ---------------------------------------------------
        this.load.image('background', 'assets/BACKGROUND2.png');
        this.load.image('BottomG', 'assets/GroundBottom.png');
        this.load.image('wallLeft', 'assets/WallLeft.png');
        this.load.image('wallRight', 'assets/WallRight.png');
        this.load.image('Top', 'assets/Top.png');
        this.load.image('CaveLeft', 'assets/CaveLeftPlatform.png');
        this.load.image('CaveLeftLong', 'assets/CaveLeftLong.png');
        this.load.image('PlatLong', 'assets/LongPlatform.png');
        this.load.image('CaveRight', 'assets/CaveRight.png');
        this.load.image('FloatLong', 'assets/FloatingLong.png');
        this.load.image('GroundLair', 'assets/GroundLair.png');
        this.load.image('TopLair', 'assets/TopLair.png');
        this.load.image('LairLeft', 'assets/WallLairLeft.png');
        this.load.image('LairWall', 'assets/WallLair.png');
        this.load.image('GroundBump', 'assets/GroundBump.png');
        this.load.image('KeyPlat', 'assets/KeyPlat.png');
        this.load.image('RightLong', 'assets/CaveRightLong.png');
        this.load.image('PlatformSmall', 'assets/PlatformSmall.png');

        this.load.image('WPLeft', 'assets/WoodenPlatformLeft.png');
        this.load.image('WPRight', 'assets/WoodenPlatformRight.png');
        this.load.image('WLLeft', 'assets/WoodenLongLeft.png');
        this.load.image('WLRight', 'assets/WoodenLongRight.png');

        this.load.image('Spike1', 'assets/Spike1.png');
        this.load.image('Spike2', 'assets/Spike2.png');

        this.load.image('RocksLong', 'assets/RocksLong.png');
        this.load.image('RocksMedium', 'assets/RocksMedium.png');
        this.load.image('RocksSmall', 'assets/RocksSmall.png');

        this.load.image('OneTree', 'assets/OneTree.png');
        this.load.image('TwoTree', 'assets/TwoTree.png');
        this.load.image('STree', 'assets/SimilarTree.png');
        this.load.image('Flowers', 'assets/Flowers.png');
        this.load.image('cauldron', 'assets/cauldron.png');
        // MAP ---------------------------------------------------

        // P1 ---------------------------------------------------
        this.load.spritesheet('girl', 'assets/Characters/Girl.png', {frameWidth: 32, frameHeight: 32});
        this.load.image("bullet", "assets/bullet.png");
        // P1 ---------------------------------------------------

        // P2 ---------------------------------------------------
        this.load.spritesheet('Boy', 'assets/Characters/Boy.png', {frameWidth: 64, frameHeight: 64});
        this.load.image("sword", "assets/Sword.png");
        // P2 ---------------------------------------------------

        this.load.spritesheet('gol', 'assets/Gol.png', {frameWidth: 110, frameHeight: 110});
        this.load.image("star", "assets/star.png");
        this.load.image("star2", "assets/star.png");

        this.load.image("trap", "assets/Trap.png");

        this.load.image("bulletTwo", "assets/Wball.png");
        this.load.image("bulletThree", "assets/Wball.png");

        this.load.image("cageT", "assets/cageTop.png");
        this.load.image("cageB", "assets/cageBottom.png");

        this.load.image("box", "assets/Barrels.png");

        // HEARTS
        this.load.image('heartFull', 'assets/hud_heartFull_1_50.png');
        this.load.image('heartFull2', 'assets/hud_heartFull2_1_50.png');
        this.load.image('heartEmpty', 'assets/hud_heartEmpty.png');
        // Key
        this.load.image('key', 'assets/Key.png');

        this.load.image('collectKey1', 'assets/Key.png');
        this.load.image('collectKey2', 'assets/Key.png');
        this.load.image('collectKey3', 'assets/Key.png');

        this.load.spritesheet('door', 'assets/Doors.png', {frameWidth: 267, frameHeight: 335});
        this.load.spritesheet('dog', 'assets/Dog.png', {frameWidth: 48, frameHeight: 67}); // 50, 68 {frameWidth: 76, frameHeight: 45}

        //Music
        this.load.audio('GameMusic', 'assets/Music/Brave World.mp3');

        //Witch
        this.load.spritesheet('witch', 'assets/Characters/WitchSprite.png', {frameWidth:36, frameHeight: 40});

        //Boss
        this.load.spritesheet('boss', 'assets/Characters/BossSprite.png', {frameWidth:258, frameHeight: 250});
        this.load.image("ball", "assets/BossBall.png");
        this.load.image("bombs", "assets/bomb.png");
    }

    create () {
        //GAME MUSIC
        this.gameMusic = this.sound.add('GameMusic');
        var musicConfig = {
            mute: false,
            volume: 0.7,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.gameMusic.play(musicConfig);

        // MAP ---------------------------------------------------
        this.add.image(500, 540, 'background');
        this.add.image(1700, 1000, 'Spike1');
        this.add.image(2100, 1000, 'Spike1');

        this.add.image(1000, 420, 'Spike1');
        this.add.image(600, 450, 'Spike2');
        this.add.image(600, 200, 'Spike2');
        this.add.image(-60, 400, 'Spike2');
        this.add.image(-570, 200, 'Spike2');
        this.add.image(-580, 450, 'Spike2');
        this.add.image(1680, 500, 'Spike2');

        this.add.image(2450, 380, 'Spike1');
        this.add.image(2450, 880, 'Spike1');
        this.add.image(2450, 1100, 'Spike1');

        this.add.image(1900, 1100, 'RocksLong');
        this.add.image(2170, 1150, 'RocksLong');

        this.add.image(-375, 450, 'RocksLong');

        this.add.image(2300, 250, 'RocksLong');
        this.add.image(1050, 405, 'RocksMedium');
        this.add.image(1350, 405, 'RocksMedium');
        this.add.image(1100, 65, 'RocksMedium');

        this.add.image(175, 405, 'RocksMedium');
        this.add.image(-100, 125, 'RocksMedium');

        this.add.image(-450, -10, 'RocksSmall');
        this.add.image(200, -30, 'RocksSmall');
        this.add.image(680, 450, 'RocksSmall');
        this.add.image(1820, 410, 'RocksSmall');
        this.add.image(2000, 430, 'RocksSmall');
        this.add.image(1700, 1154, 'cauldron');
        // MAP ---------------------------------------------------

        this.createPlatforms();
        this.createBox();
        this.createDoor();
        this.createPlayer();
        this.createPlayerTwo()
        this.createCursor();
        this.createCursorTwo();
        // Interesting bug, if colliders comes before the player, then doors becomes behind or freezes.
        this.physics.add.collider(this.door, this.platforms);
        this.physics.add.collider(this.door, this.player);
        this.physics.add.collider(this.box, this.player); // collide with platform
        this.physics.add.collider(this.box, this.playerTwo); // collide with platform
        this.physics.add.collider(this.door, this.playerTwo);
        // Interesting bug, if colliders comes before the player, then doors becomes behind or freezes.
        this.createTraps();
        this.createStars();
        this.createElite();
        this.createBoss();

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(this.player, this.player, 2000, 600);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player);
        //this.cameras.main.setZoom(1.5);
        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor('#ccccff');

        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 7
        });

        this.swords = this.physics.add.group({
            defaultKey: 'sword',
            maxSize: 7
        });

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.scoreText = this.add.text(screenCenterX, screenCenterY, "-0" + '/3', {fontSize: 'bold 36px', fill: '#fff'});

        // Enemy 1 -------------------------------------------
        this.bulletsTwo = this.physics.add.group({
            defaultKey: 'bulletTwo',
            maxSize: 10
        });
        // Enemy 1 -------------------------------------------

        // Enemy 2 -------------------------------------------
        this.bulletsThree = this.physics.add.group({
            defaultKey: 'bulletThree',
            maxSize: 10
        });
        // Enemy 2 -------------------------------------------

        this.createDog();
        this.createCage();
        this.createCageBottom();
        this.allKeys();

        // Boss 2 -------------------------------------------
        this.bossBullet = this.physics.add.group({
            defaultKey: 'ball',
            maxSize: 10
        });
        // Boss 2 -------------------------------------------
        this.bombs = this.physics.add.group({
            maxSize: 2
        });

        this.createList();

        this.heartGroup = this.add.group();
        this.heart1 = this.heartGroup.create(screenCenterX, screenCenterY, 'heartFull');
        this.heart2 = this.heartGroup.create(screenCenterX, screenCenterY, 'heartFull');
        this.heart3 = this.heartGroup.create(screenCenterX, screenCenterY, 'heartFull');

        this.heart4 = this.heartGroup.create(screenCenterX, screenCenterY, 'heartFull2');
        this.heart5 = this.heartGroup.create(screenCenterX, screenCenterY, 'heartFull2');
        this.heart6 = this.heartGroup.create(screenCenterX, screenCenterY, 'heartFull2');

        this.heartEmptyGroup = this.add.group();
        this.heartEmpty1 = this.heartEmptyGroup.create(screenCenterX, screenCenterY, 'heartEmpty');
        this.heartEmpty2 = this.heartEmptyGroup.create(screenCenterX, screenCenterY, 'heartEmpty');
        this.heartEmpty3 = this.heartEmptyGroup.create(screenCenterX, screenCenterY, 'heartEmpty');

        this.heartEmpty4 = this.heartEmptyGroup.create(screenCenterX, screenCenterY, 'heartEmpty');
        this.heartEmpty5 = this.heartEmptyGroup.create(screenCenterX, screenCenterY, 'heartEmpty');
        this.heartEmpty6 = this.heartEmptyGroup.create(screenCenterX, screenCenterY, 'heartEmpty');

        this.keyGroup = this.add.group();
        this.key = this.keyGroup.create(screenCenterX, screenCenterY, 'key'); // UI
    }

    gameWon() {
        setTimeout(() => {
            this.scene.start('gameWon');
            this.lives = 3;
            this.livesTwo = 3;
            this.enemyHp = 50;
            this.eTwo = 50;
            this.keys = 0;
            this.bossHp = 100;
            this.bossAlive = false;
            this.hasCreated = false;
            this.gameMusic.stop();
        }, 6000);
    }

    dogRescue(){
        this.cages2.disableBody(true, true); // Disable works only sprite, static-group doesnt work
    }

    createCage(){
        this.cages = this.physics.add.staticGroup();
        this.cages.create(1700, 940, 'cageT');

        this.physics.add.collider(this.player, this.cages); // collide with platform + ADD PLAYER2
        this.physics.add.collider(this.playerTwo, this.cages); // collide with platform + ADD PLAYER2
    }

    createBox(){
        this.box = this.physics.add.sprite(560, -14, 'box'); // 100, 450 560
        this.box.setSize(60, 100); // width, height - position
        this.box.setScale(0.8); // image size
        //this.box.body.setImmovable(true); // Slips all other collisions on top/touched
        this.box.body.pushable = false;
        this.box.body.moves = false;

        this.physics.add.collider(this.box, this.platforms); // collide with platform
    }

    collectBox(player, box){
        box.disableBody(true, true);
    }

    createCageBottom(){
        this.cages2 = this.physics.add.sprite(1700, 1040, 'cageB'); // 100, 450
        this.cages2.body.setImmovable(true); // Slips all other collisions on top/touched
        this.cages2.body.pushable = false;
        this.cages2.body.moves = false;

        this.physics.add.collider(this.dog, this.cages2); // collide with platform
    }

    collectKeys(player, kStars){
        this.keys += 1;
        this.scoreText.setText('-' + this.keys + '/3');
        kStars.destroy();

        if(this.keys == 0)
        {
            this.door.anims.play('closed', true);
            this.destroyed = false;
        }
        if(this.keys == 3)
        {
            // Liar opens
            this.door.body.enable = false;
            this.door.anims.play('open', true);
            this.destroyed = true;
        }
    }

    createDog(){
        this.dog = this.physics.add.sprite(1700, 980, 'dog'); // 100, 450 , 1697 , 980
        this.dog.setBounce(0.2);
        this.dog.setSize(26, 26); // width, height - position

        this.physics.add.collider(this.dog, this.platforms);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('dog', { start: 3, end: 4 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'escape',
            frames: this.anims.generateFrameNumbers('dog', { start: 15, end: 17 }),
            frameRate: 8,
            repeat: -1
        });
    }

    allKeys(){
        this.collectKey1 = this.physics.add.sprite(580, 450, 'collectKey1'); // 580
        this.collectKey2 = this.physics.add.sprite(610, 10, 'collectKey2');
        this.collectKey3 = this.physics.add.sprite(2440, 220, 'collectKey3'); // 220

        this.physics.add.collider(this.collectKey1, this.platforms);
        this.physics.add.collider(this.collectKey2, this.platforms);
        this.physics.add.collider(this.collectKey3, this.platforms);
    }

    loseLifeTwo(player, bulletsTwo){
        this.livesTwo -=1;
        bulletsTwo.destroy();

        if(this.livesTwo == 2){
            this.heart4.destroy();
        }else if(this.livesTwo == 1){
            this.heart5.destroy();
        }else if(this.livesTwo == 0){
            this.heart6.destroy();
        }

        if(this.livesTwo == 0) {
            this.resetToStart();
        }
    }

    loseLife(player, bulletsTwo){
        this.lives -=1;
        bulletsTwo.destroy();
        if(this.lives == 2){
            this.heart3.destroy();
        }else if(this.lives == 1){
            this.heart2.destroy();
        }else if(this.lives == 0){
            this.heart1.destroy();
        }

        if(this.lives == 0) {
            this.resetToStart();
        }
    }

    loseLifeBossTwo(player, bossBullet){
        this.livesTwo -=1;
        bossBullet.destroy();
        if(this.livesTwo == 2){
            this.heart4.destroy();
        }else if(this.livesTwo == 1){
            this.heart5.destroy();
        }else if(this.livesTwo == 0){
            this.heart6.destroy();
        }

        if(this.livesTwo == 0) {
            this.resetToStart();
        }
    }

    loseLifeBoss(player, bossBullet){
        this.lives -=1;
        bossBullet.destroy();
        if(this.lives == 2){
            this.heart3.destroy();
        }else if(this.lives == 1){
            this.heart2.destroy();
        }else if(this.lives == 0){
            this.heart1.destroy();
        }

        if(this.lives == 0) {
            this.resetToStart();
        }
    }

    destroyPlayerOneBullet(bullet){
        bullet.destroy();
    }

    resetToStart(){
        this.cameras.main.fadeOut(1000);
        this.scene.start('gameOver');
        this.gameMusic.stop();
        this.lives = 3;
        this.livesTwo = 3;
        this.enemyHp = 50;
        this.eTwo = 50;
        this.keys = 0;
        this.bossHp = 100;
        this.bossAlive = false;
        this.hasCreated = false;
    }

    fireTwo(time) {

        if(this.no == true)
        {
            if (this.time.now > this.nextTick)
            {
                var bulletTwo_speed = 150;
                var bulletTwo_position_correction = 20;
                var bulletTwo = this.bulletsTwo.get(this.stars.x + (this.directionTwo * bulletTwo_position_correction), this.stars.y);
                //var bullet = this.bullets.get(pointer.x, pointer.y);
                if (bulletTwo) {
                    bulletTwo.setActive(true);
                    bulletTwo.setVisible(true);
                    //bullet.setScale(0.1);
                    bulletTwo.body.velocity.x = this.directionTwo * bulletTwo_speed;
                    bulletTwo.body.setAllowGravity(false);

                    var tickFreq = 1500;
                    this.nextTick = this.time.now + tickFreq;

                    this.physics.add.overlap(bulletTwo, this.platforms, this.destroyPlayerOneBullet, null, this);
                }
            }
        }
        else {
            this.no = false;
        }
    }

    fireThree(time) {
        if(this.eBoolTwo == true)
        {
            if (this.time.now > this.nextTick2)
            {
                //this.nextFire = this.time.now + this.fireRate;

                var bulletThree_speed = 150;
                var bulletThree_position_correction = 20;
                var bulletThree = this.bulletsThree.get(this.stars2.x + (this.directionTwo * bulletThree_position_correction), this.stars2.y);
                //var bullet = this.bullets.get(pointer.x, pointer.y);
                if (bulletThree) {
                    bulletThree.setActive(true);
                    bulletThree.setVisible(true);
                    //bullet.setScale(0.1);
                    bulletThree.body.velocity.x = this.directionTwo * bulletThree_speed;
                    bulletThree.body.setAllowGravity(false);

                    var tickFreq = 1500;
                    this.nextTick2 = this.time.now + tickFreq;

                    this.physics.add.overlap(bulletThree, this.platforms, this.destroyPlayerOneBullet, null, this);
                }
            }
        }
        else {
            this.eBoolTwo = false;
        }
    }

    bossFire(time) {
        if(this.bossAlive == true)
        {
            if (this.time.now > this.bossTick)
            {
                var bulletBoss_speed = 150;
                var bulletBoss_position_correction = 25;
                var bulletBoss = this.bossBullet.get(this.boss.x + (this.directionBoss * bulletBoss_position_correction), this.boss.y);
                //var bullet = this.bullets.get(pointer.x, pointer.y);
                if (bulletBoss) {
                    bulletBoss.setActive(true);
                    bulletBoss.setVisible(true);
                    //bullet.setScale(0.1);
                    bulletBoss.body.velocity.x = this.directionBoss * bulletBoss_speed;
                    bulletBoss.body.setAllowGravity(false);

                    var tickFreq = 1500;
                    this.bossTick = this.time.now + tickFreq;

                    this.physics.add.overlap(bulletBoss, this.platforms, this.destroyPlayerOneBullet, null, this);
                }
            }
        }
        else {
            this.bossAlive = false;
        }
    }

    destroyBullet(bullet, star){
        //this.enemyHp -= 10;
        bullet.destroy();
        if(this.enemyHp <= 0){
            star.destroy();
        }
    }

    destroyBulletTwo(bullet, star2){
        //this.eTwo -= 10;
        bullet.destroy();
        if(this.eTwo <= 0){
            star2.destroy();
        }
    }

    destroyBulletTree(bullet, elite){
        bullet.destroy();
        elite.disableBody(true, true);
    }

    destroyBulletBoss(bullet, boss){
        this.bossHp -= 10;
        bullet.destroy();
        if(this.bossHp <= 0){
            boss.destroy();
        }
    }

    // WITCHES
    createStars(){
        this.stars = this.physics.add.sprite(600, 200, 'witch'); // group()
        this.stars.setSize(24, 24); // width, height - position
        this.stars.setScale(1.8); // image size
        this.stars2 = this.physics.add.sprite(2050, 200, 'witch'); // group()
        this.stars2.setSize(24, 24); // width, height - position
        this.stars2.setScale(1.8); // image size

        this.anims.create({
            key: 'witchL',
            frames: this.anims.generateFrameNumbers('witch', { start: 0, end: 1 }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'witchIL',
            frames: [ { key: 'witch', frame: 2 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'witchIR',
            frames: [ { key: 'witch', frame: 3 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'witchR',
            frames: this.anims.generateFrameNumbers('witch', { start: 4, end: 5 }),
            frameRate: 6,
            repeat: -1
        });

        this.physics.add.collider(this.stars, this.platforms); // collide with platform
        this.physics.add.collider(this.stars2, this.platforms); // collide with platform
    }

    collectElites(player, elite){
        this.elite4.disableBody(true, true);
        this.lives -= 3;
        this.livesTwo -=3;
        if(this.lives == 0 || this.livesTwo == 0) {
            this.resetToStart();
        }
    }

    collectTrap(player, trap){
        trap.disableBody(true, true);
        this.lives -= 3;
        this.livesTwo -=3;
        if(this.lives == 0 || this.livesTwo == 0) {
            this.resetToStart();
        }
    }
    
    // NATALIA FOR YOU MY FRIEND TO ADD ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ----------- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    createTraps(){
        this.trap = this.physics.add.sprite(0, 400, 'trap'); // group()
        this.trap4 = this.physics.add.sprite(0, 100, 'trap'); // group()
        this.trap1 = this.physics.add.sprite(-550, 300, 'trap'); // group()
        this.trap2 = this.physics.add.sprite(975, 300, 'trap'); // group()
        this.trap3 = this.physics.add.sprite(1725, 200, 'trap'); // group()

        this.physics.add.collider(this.trap, this.platforms); // collide with platform
        this.physics.add.collider(this.trap1, this.platforms); // collide with platform
        this.physics.add.collider(this.trap2, this.platforms);
        this.physics.add.collider(this.trap3, this.platforms);
        this.physics.add.collider(this.trap4, this.platforms);
    }
    // NATALIA FOR YOU MY FRIEND TO ADD ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ----------- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    enemyPath(){
        if (this.pathCounter < 300){
            this.elite.body.velocity.x = -70;
            this.elite.anims.play('leftG', true); // right
        }
        else {
            this.elite.body.velocity.x = 70;
            this.elite.anims.play('rightG', true); // right
        }
    }

    enemyPathTwo(){
        if (this.pathCounterOne < 400){
            this.elite2.body.velocity.x = -70;
            this.elite2.anims.play('leftG', true); // right
        }
        else {
            this.elite2.body.velocity.x = 70;
            this.elite2.anims.play('rightG', true); // right
        }
    }

    enemyPathThree(){
        if (this.pathCounterTwo < 180){
            this.elite3.body.velocity.x = -70;
            this.elite3.anims.play('leftG', true); // right
        }
        else {
            this.elite3.body.velocity.x = 70;
            this.elite3.anims.play('rightG', true); // right
        }
    }

    enemyPathFour(){
        if (this.pathCounterThree < 190){
            this.elite4.body.velocity.x = -70;
            this.elite4.anims.play('leftG', true); // right
        }
        else {
            this.elite4.body.velocity.x = 70;
            this.elite4.anims.play('rightG', true); // right
        }
    }
    // Touch Shooters --- = Die
    collectStar(player, star){
        //this.lives -= 3;
        //star.disableBody(true, true);
        //if(this.lives == 2){
            //this.heart3.destroy();
        //}else if(this.lives == 1){
            //this.heart2.destroy();
       // }else if(this.lives == 0){
            //this.heart1.destroy();
        //}

        //if(this.lives == 0) {
            //this.resetToStart();
        //}

        //if(this.livesTwo == 0) {
            //this.resetToStart();
        //}
        this.lives -= 3;
        this.livesTwo -=3;
        star.disableBody(true, true);
        if(this.lives == 0 || this.livesTwo == 0) {
            this.resetToStart();
        }
    }
    // Touch Shooters --- = Die
    collectStarTwo(player, star){
        //this.livesTwo -= 3;
        //this.no = true;
        //star.disableBody(true, true);
        //if(this.livesTwo == 2){
            //this.heart4.destroy();
        //}else if(this.livesTwo == 1){
            //this.heart5.destroy();
        //}else if(this.livesTwo == 0){
            //this.heart6.destroy();
        //}

        //if(this.livesTwo == 0) {
            //this.resetToStart();
        //}

        star.disableBody(true, true);
        this.lives -= 3;
        this.livesTwo -=3;
        if(this.lives == 0 || this.livesTwo == 0) {
            this.resetToStart();
        }
    }
    // Touch Shooters --- = Die

    collectBoss(player, boss){
        boss.disableBody(true, true);
        this.lives -= 3;
        this.livesTwo -=3;
        if(this.lives == 0 || this.livesTwo == 0) {
            this.resetToStart();
        }
    }

    createElite(){
        this.elite = this.physics.add.sprite(580, -100, 'gol'); // group()
        this.elite.setSize(45, 90); // width, height - position

        this.elite2 = this.physics.add.sprite(1450, 400, 'gol'); // group()
        this.elite2.setSize(45, 90); // width, height - position

        this.elite3 = this.physics.add.sprite(2030, 400, 'gol'); // group()
        this.elite3.setSize(45, 90); // width, height - position

        this.elite4 = this.physics.add.sprite(300, 400, 'gol'); // group()
        this.elite4.setSize(45, 90); // width, height - position

        this.anims.create({
            key: 'leftG',
            frames: this.anims.generateFrameNumbers('gol', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'rightG',
            frames: this.anims.generateFrameNumbers('gol', { start: 15, end: 8 }),
            frameRate: 8,
            repeat: -1
        });

        this.physics.add.collider(this.elite, this.platforms);
        this.physics.add.collider(this.elite2, this.platforms);
        this.physics.add.collider(this.elite3, this.platforms);
        this.physics.add.collider(this.elite4, this.platforms);
        this.physics.add.collider(this.elite3, this.door);

    }

    createPlatforms(){
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(200, 625, 'BottomG').setScale(1).refreshBody();
        this.platforms.create(800, -270, 'Top').setScale(1).refreshBody();
        this.platforms.create(2080, 1320, 'GroundLair').setScale(1).refreshBody();
        this.platforms.create(1550, 700, 'TopLair').setScale(1).refreshBody();

        this.platforms.create(-500,350, 'CaveLeft');
        this.platforms.create(-440,80, 'CaveLeftLong');
        this.platforms.create(350,80, 'FloatLong');
        this.platforms.create(-70,250, 'PlatLong');
        this.platforms.create(2225,300, 'CaveRight');
        this.platforms.create(1100,200, 'PlatLong');
        this.platforms.create(2320,120, 'RightLong');

        this.platforms.create(1900,55, 'PlatformSmall');
        this.platforms.create(1200,35, 'PlatformSmall');
        this.platforms.create(2150,1050, 'PlatformSmall'); ////////////////////////////// Boss Platform


        this.platforms.create(400,450, 'GroundBump');
        this.platforms.create(500,450, 'GroundBump');
        this.platforms.create(500,350, 'GroundBump');
        this.platforms.create(850,450, 'GroundBump');

        this.platforms.create(1600,450, 'GroundBump');
        this.platforms.create(1600,350, 'GroundBump');
        this.platforms.create(1600,250, 'GroundBump');

        this.platforms.create(1740,380, 'CaveLeft');

        this.platforms.create(1525,340, 'WPRight');
        this.platforms.create(1340,200, 'WPLeft');

        this.platforms.create(2255,520, 'WLLeft');
        this.platforms.create(2255,720, 'WLLeft');


        this.platforms.create(2430,620, 'WLRight');
        this.platforms.create(2430,820, 'WLRight');
        this.platforms.create(2430,1020, 'WLRight');

        this.platforms.create(635,325, 'CaveLeft');

        this.platforms.create(690,-15, 'GroundBump');
        this.platforms.create(600,-68, 'KeyPlat'); ///////////////


        this.platforms.create(-830,240, 'wallLeft');
        this.platforms.create(2700, 455, 'wallRight');
        this.platforms.create(1420, 1055, 'LairLeft');
        this.platforms.create(2210,660, 'LairWall');

        this.add.image(-450, 435, 'OneTree');
        this.add.image(600, 240, 'OneTree');
        this.add.image(-450, -5, 'TwoTree');
        this.add.image(280, -40, 'STree');
        this.add.image(1200, 435, 'TwoTree');
        this.add.image(1435, 420, 'STree');
        this.add.image(1000, 100, 'OneTree');
        this.add.image(2350, 35, 'TwoTree');
        this.add.image(2140, 200, 'OneTree');
        this.add.image(1800, 460, 'Flowers');
        this.add.image(0, 460, 'Flowers');
        this.add.image(-100, 175, 'Flowers');
        this.add.image(510, 4, 'Flowers');
    }

    createDoor(){
        this.door = this.physics.add.sprite(2120, 430, 'door');
        this.door.setScale(0.33); // image size
        this.door.setBounce(0);

        //this.door.body.setImmovable(false);
        this.door.body.pushable = false;
        this.door.body.moves = false;

        this.anims.create({
            key: 'closed',
            frames: [ { key: 'door', frame: 0 } ],
            frameRate: 10
        });

        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNumbers('door', { start: 0, end: 5 }),
            frameRate: 10,
        });
    }

    collectBomb(player, bomb){
        bomb.disableBody(true, true);
        this.lives -= 3;
        this.livesTwo -=3;
        if(this.lives == 0 || this.livesTwo == 0) {
            this.resetToStart();
        }
    }

    createBoss(){
        this.boss = this.physics.add.sprite(1850, 1000, 'boss'); // group()
        this.boss.setSize(100, 100); // width, height - position
        this.boss.setScale(1.1); // image size

        this.anims.create({
            key: 'bossL',
            frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'bossIL',
            frames: [ { key: 'boss', frame: 3 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'bossIR',
            frames: [ { key: 'boss', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'bossR',
            frames: this.anims.generateFrameNumbers('boss', { start: 4, end: 7 }),
            frameRate: 4,
            repeat: -1
        });

        this.physics.add.collider(this.boss, this.platforms); // collide with platform
    }

    createPlayerTwo(){
        // PLAYER!
        this.playerTwo = this.physics.add.sprite(-550, 450, 'Boy'); // -550, 450 - 2000, 850

        this.playerTwo.setBounce(0.2); // how softly the character jumps
        this.playerTwo.setCollideWorldBounds(false); // screen collisions disabled

        this.playerTwo.setScale(1.4); // image size
        this.playerTwo.setSize(18, 36); // width, height - position
        //this.player.setOffset(4, 3);
        this.physics.add.collider(this.playerTwo, this.platforms);
        //this.player.body.setGravityY(300);

        this.anims.create({
            key: 'leftB',
            frames: this.anims.generateFrameNumbers('Boy', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turnB',
            frames: [ { key: 'Boy', frame: 8 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'turnBL',
            frames: [ { key: 'Boy', frame: 7 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'rightB',
            frames: this.anims.generateFrameNumbers('Boy', { start: 9, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
    }

    createPlayer(){
        // PLAYER!
        this.player = this.physics.add.sprite(-500, 450, 'girl'); // -500, 450 - 2000, 850

        this.player.setBounce(0.2); // how softly the character jumps
        this.player.setCollideWorldBounds(false); // screen collisions disabled

        this.player.setScale(1.8); // image size
        this.player.setSize(18, 24); // width, height - position
        //this.player.setOffset(4, 3);
        this.physics.add.collider(this.player, this.platforms);
        //this.player.body.setGravityY(300);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'girl', frame: 10 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'turnL',
            frames: [ { key: 'girl', frame: 6 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('girl', { start: 9, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
    }

    createCursor(){
        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.on('pointerdown', function(){
            var bullet_speed = 500;
            var bullet_position_correction = 20;
            var bullet = this.bullets.get(this.player.x + (this.look_direction * bullet_position_correction), this.player.y);
            if (bullet) {
                bullet.setActive(true);
                bullet.setVisible(true);
                //bullet.setScale(0.1);
                bullet.body.velocity.x = this.look_direction * bullet_speed;
                bullet.body.setAllowGravity(false);

                this.physics.add.overlap(bullet, this.stars, this.destroyBullet, null, this);
                this.physics.add.overlap(bullet, this.stars2, this.destroyBulletTwo, null, this);

                this.physics.add.overlap(bullet, this.elite, this.destroyBulletTree, null, this);
                this.physics.add.overlap(bullet, this.elite2, this.destroyBulletTree, null, this);
                this.physics.add.overlap(bullet, this.elite3, this.destroyBulletTree, null, this);
                this.physics.add.overlap(bullet, this.elite4, this.destroyBulletTree, null, this);
                this.physics.add.overlap(bullet, this.platforms, this.destroyPlayerOneBullet, null, this);
                this.physics.add.overlap(bullet, this.boss, this.destroyBulletBoss, null, this);
            }
        }, this);
    }

    createCursorTwo(){
        this.keysBoy = this.input.keyboard.addKeys('W,S,A,D');
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.input.keyboard.on('keydown_SPACE', function(){
            var bullet_speed = 400;
            var bullet_position_correction = 20;
            var bullet = this.swords.get(this.playerTwo.x + (this.boyDirection * bullet_position_correction), this.playerTwo.y);
            if (bullet) {
                bullet.setActive(true);
                bullet.setVisible(true);
                //bullet.setScale(0.1);
                bullet.body.velocity.x = this.boyDirection * bullet_speed;
                bullet.body.setAllowGravity(false);

                this.physics.add.overlap(bullet, this.stars, this.destroyBullet, null, this);
                this.physics.add.overlap(bullet, this.stars2, this.destroyBulletTwo, null, this);
                this.physics.add.overlap(bullet, this.elite, this.destroyBulletTree, null, this);
                this.physics.add.overlap(bullet, this.elite2, this.destroyBulletTree, null, this);
                this.physics.add.overlap(bullet, this.elite3, this.destroyBulletTree, null, this);
                this.physics.add.overlap(bullet, this.elite4, this.destroyBulletTree, null, this);
                this.physics.add.overlap(bullet, this.platforms, this.destroyPlayerOneBullet, null, this);
                this.physics.add.overlap(bullet, this.boss, this.destroyBulletBoss, null, this);
                this.physics.add.overlap(bullet, this.box, this.collectBox, null, this);
            }
        }, this);
    }

    createList(){

        // WAS KEYS HERE

        this.physics.add.overlap(this.player, this.bulletsTwo, this.loseLife, null, this);
        this.physics.add.overlap(this.player, this.bulletsThree, this.loseLife, null, this); // 2
        this.physics.add.overlap(this.player, this.bossBullet, this.loseLifeBoss, null, this); // 2
        this.physics.add.overlap(this.playerTwo, this.bulletsTwo, this.loseLifeTwo, null, this);
        this.physics.add.overlap(this.playerTwo, this.bulletsThree, this.loseLifeTwo, null, this); // 2
        this.physics.add.overlap(this.playerTwo, this.bossBullet, this.loseLifeBossTwo, null, this); // 2


        this.physics.add.overlap(this.player, this.trap, this.collectTrap, null, this); // 2
        this.physics.add.overlap(this.playerTwo, this.trap, this.collectTrap, null, this);
        this.physics.add.overlap(this.player, this.trap1, this.collectTrap, null, this); // 2
        this.physics.add.overlap(this.playerTwo, this.trap1, this.collectTrap, null, this);
        this.physics.add.overlap(this.player, this.trap2, this.collectTrap, null, this); // 2
        this.physics.add.overlap(this.playerTwo, this.trap2, this.collectTrap, null, this);
        this.physics.add.overlap(this.player, this.trap3, this.collectTrap, null, this); // 2
        this.physics.add.overlap(this.playerTwo, this.trap3, this.collectTrap, null, this);
        this.physics.add.overlap(this.player, this.trap4, this.collectTrap, null, this); // 2
        this.physics.add.overlap(this.playerTwo, this.trap4, this.collectTrap, null, this);
    }

    update(){
        this.physics.collide(this.player, this.stars, this.collectStar, null, this);
        this.physics.collide(this.player, this.stars2, this.collectStar, null, this); // 2
        this.physics.collide(this.player, this.boss, this.collectBoss, null, this); // 2

        this.physics.collide(this.playerTwo, this.stars, this.collectStarTwo, null, this);
        this.physics.collide(this.playerTwo, this.stars2, this.collectStarTwo, null, this); // 2
        this.physics.collide(this.playerTwo, this.boss, this.collectBoss, null, this); // 2

        this.physics.collide(this.player, this.bomb3, this.collectBomb, null, this); // 2
        this.physics.collide(this.player, this.bomb4, this.collectBomb, null, this); // 2
        this.physics.collide(this.playerTwo, this.bomb3, this.collectBomb, null, this); // 2
        this.physics.collide(this.playerTwo, this.bomb4, this.collectBomb, null, this); // 2

        this.physics.collide(this.player, this.elite, this.collectElites, null, this);
        this.physics.collide(this.playerTwo, this.elite, this.collectElites, null, this);
        this.physics.collide(this.player, this.elite2, this.collectElites, null, this);
        this.physics.collide(this.playerTwo, this.elite2, this.collectElites, null, this);
        this.physics.collide(this.player, this.elite3, this.collectElites, null, this);
        this.physics.collide(this.playerTwo, this.elite3, this.collectElites, null, this);
        this.physics.collide(this.player, this.elite4, this.collectElites, null, this);
        this.physics.collide(this.playerTwo, this.elite4, this.collectElites, null, this);

        this.physics.collide(this.player, this.collectKey1, this.collectKeys, null, this); // Key + player
        this.physics.collide(this.player, this.collectKey2, this.collectKeys, null, this); // Key + player
        this.physics.collide(this.player, this.collectKey3, this.collectKeys, null, this); // Key + player
        this.physics.collide(this.playerTwo, this.collectKey1, this.collectKeys, null, this); // Key + player
        this.physics.collide(this.playerTwo, this.collectKey2, this.collectKeys, null, this); // Key + player
        this.physics.collide(this.playerTwo, this.collectKey3, this.collectKeys, null, this); // Key + player
        // P1 ---------------------------------------------
        this.bullets.children.each(function(b) {
            if (b.active) {
                if (b.x < this.player.x - 400 || b.x > this.player.x + 400) {
                    b.setActive(false);
                }
            }
        }.bind(this));

        // P2 ---------------------------------------------
        this.swords.children.each(function(b) {
            if (b.active) {
                if (b.x < this.playerTwo.x - 800 || b.x > this.playerTwo.x + 800) {
                    b.setActive(false);
                }
            }
        }.bind(this));
        // P2 ---------------------------------------------

        // Enemy 1 ---------------------------------------------
        this.bulletsTwo.children.each(function(c) {
            if (c.active) {
                if (c.x < this.stars.x - 400 || c.x > this.stars.x + 400) {
                    c.setActive(false);
                }
            }
        }.bind(this));
        // Enemy 1 ---------------------------------------------

        // Enemy 2 ---------------------------------------------
        this.bulletsThree.children.each(function(d) {
            if (d.active) {
                if (d.x < this.stars2.x - 400 || d.x > this.stars2.x + 400) {
                    d.setActive(false);
                }
            }
        }.bind(this));
        // Enemy 2 ---------------------------------------------

        // Boss 2 ---------------------------------------------
        this.bossBullet.children.each(function(e) {
            if (e.active) {
                if (e.x < this.boss.x - 800 || e.x > this.boss.x + 800) {
                    e.setActive(false);
                }
                else if(this.bossHp <= 0){
                    this.bossAlive = false; // MAYBE Get rid of this
                    e.setVisible(false);
                    e.setActive(false);
                    e.body.setEnable(false);
                }
            }
        }.bind(this));
        // Boss 2 ---------------------------------------------

        // P1 ---------------------------------------------
        if(this.lives > 0) {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
                this.player.anims.play('left', true);
                this.look_direction = -1; // direction modifier for bullets -------------------------------------
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(160);
                this.player.anims.play('right', true);
                this.look_direction = 1; // direction modifier for bullets -------------------------------------
            } else {
                this.player.setVelocityX(0);
                //this.player.anims.play('turn');
                // direction modifier for bullets -------------------------------------
                if (this.look_direction == 1) {
                    this.player.anims.play('turn', true); // right
                } else if (this.look_direction == -1) {
                    this.player.anims.play('turnL', true); // left
                } else {
                    this.player.anims.play('turn', true);
                }
                // direction modifier for bullets -------------------------------------
            }
            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-330);
            }
        }
        else if (this.lives <= 0){
            this.player.anims.play('turn', true);
            this.player.setVelocityX(0);
        }
        // P1 ---------------------------------------------

        // P2 ---------------------------------------------
        if(this.livesTwo > 0) {
            if (this.keysBoy.A.isDown) {
                this.playerTwo.setVelocityX(-160);
                this.playerTwo.anims.play('leftB', true);
                this.boyDirection = -1; // direction modifier for bullets -------------------------------------
            } else if (this.keysBoy.D.isDown) {
                this.playerTwo.setVelocityX(160);
                this.playerTwo.anims.play('rightB', true);
                this.boyDirection = 1; // direction modifier for bullets -------------------------------------
            } else {
                this.playerTwo.setVelocityX(0);
                //this.player.anims.play('turn');
                // direction modifier for bullets -------------------------------------
                if (this.boyDirection == 1) {
                    this.playerTwo.anims.play('turnB', true); // right
                } else if (this.boyDirection == -1) {
                    this.playerTwo.anims.play('turnBL', true); // left
                } else {
                    this.playerTwo.anims.play('turnB', true);
                }
                // direction modifier for bullets -------------------------------------
            }
            if (this.keysBoy.W.isDown && this.playerTwo.body.touching.down) {
                this.playerTwo.setVelocityY(-330);
            }
        }
        else if (this.livesTwo <= 0){
            this.playerTwo.anims.play('turnB', true);
            this.playerTwo.setVelocityX(0);
        }
        // P2 ---------------------------------------------

        //////////////////////// UI ////////////////////////////
        // Girl ---------------------------------------------
        this.heartEmpty1.x = this.player.body.position.x - 365;
        this.heartEmpty1.y = this.player.body.position.y - 260;
        this.heartEmpty2.x = this.player.body.position.x - 335;
        this.heartEmpty2.y = this.player.body.position.y - 260;
        this.heartEmpty3.x = this.player.body.position.x - 305;
        this.heartEmpty3.y = this.player.body.position.y - 260;

        this.heart1.x = this.player.body.position.x - 365;
        this.heart1.y = this.player.body.position.y - 260;
        this.heart2.x = this.player.body.position.x - 335;
        this.heart2.y = this.player.body.position.y - 260;
        this.heart3.x = this.player.body.position.x - 305;
        this.heart3.y = this.player.body.position.y - 260;
        // Girl ---------------------------------------------

        // Boy ---------------------------------------------
        this.heartEmpty4.x = this.player.body.position.x + 340;
        this.heartEmpty4.y = this.player.body.position.y - 260;
        this.heartEmpty5.x = this.player.body.position.x + 370;
        this.heartEmpty5.y = this.player.body.position.y - 260;
        this.heartEmpty6.x = this.player.body.position.x + 400;
        this.heartEmpty6.y = this.player.body.position.y - 260;

        this.heart4.x = this.player.body.position.x + 340;
        this.heart4.y = this.player.body.position.y - 260;
        this.heart5.x = this.player.body.position.x + 370;
        this.heart5.y = this.player.body.position.y - 260;
        this.heart6.x = this.player.body.position.x + 400;
        this.heart6.y = this.player.body.position.y - 260;
        // Boy ---------------------------------------------
        // Keys --------------------------------------------
        this.key.x = this.player.body.position.x + 0;
        this.key.y = this.player.body.position.y - 260;

        this.scoreText.x = this.player.body.position.x + 15;
        this.scoreText.y = this.player.body.position.y - 277;
        //////////////////////// UI ////////////////////////////

        // Enemy 1 ---------------------------------------------
        if(this.enemyHp > 0){
            if(this.player.x >= 250 && this.player.x <= 599 || this.playerTwo.x >= 250 && this.playerTwo.x <= 599){
                this.stars.anims.play('witchL', true); // right
                this.directionTwo = -1;
                this.no = true;
            }
            else if (this.player.x >= 600 && this.player.x <= 949 || this.playerTwo.x >= 600 && this.playerTwo.x <= 949){
                this.stars.anims.play('witchR', true); // right
                this.directionTwo = 1;
                this.no = true;
            }
            else if (this.player.x < 250 || this.playerTwo.x < 250){
                this.stars.anims.play('witchIL', true); // right
                this.no = false;
            }
            else if (this.player.x > 950 || this.playerTwo.x > 950){
                this.stars.anims.play('witchIR', true); // right
                this.no = false;
            }
        }
        else if (this.enemyHp <= 0){
            this.no = false;
        }

        if(this.directionTwo == -1){
            this.fireTwo(this.time);
        }
        else if(this.directionTwo == 1){
            this.fireTwo(this.time);
        }
        // Enemy 1 ---------------------------------------------

        // Enemy 2 ---------------------------------------------
        if(this.eTwo > 0){
            if(this.player.x >= 1600 && this.player.x <= 2049 || this.playerTwo.x >= 1600 && this.playerTwo.x <= 2049){
                this.stars2.anims.play('witchL', true); // right
                this.directionTwo = -1;
                this.eBoolTwo = true;
            }
            else if (this.player.x >= 2050 && this.player.x <= 2449 || this.playerTwo.x >= 2050 && this.playerTwo.x <= 2449){
                this.stars2.anims.play('witchR', true); // right
                this.directionTwo = 1;
                this.eBoolTwo = true;
            }
            else if (this.player.x < 1600 || this.playerTwo.x < 1600){
                this.stars2.anims.play('witchIL', true); // right
                this.eBoolTwo = false;
            }
            else if (this.player.x > 2450 || this.playerTwo.x > 2450){
                this.stars2.anims.play('witchIR', true); // right
                this.eBoolTwo = false;
            }
        }
        else if (this.eTwo <= 0){
            this.eBoolTwo = false;
        }

        if(this.directionTwo == -1){
            this.fireThree(this.time);
        }
        else if(this.directionTwo == 1){
            this.fireThree(this.time);
        }
        // Enemy 2 ---------------------------------------------

        // Enemy 3 ---------------------------------------------
        this.pathCounter += 1;
        if(this.pathCounter >= 600){
            this.pathCounter = 0;
        }
        if(this.enemyThreeHp > 0){
            this.enemyPath();
        }

        this.pathCounterOne += 1;
        if(this.pathCounterOne >= 800){
            this.pathCounterOne = 0;
        }
        if(this.enemyThreeHp2 > 0){
            this.enemyPathTwo();
        }

        this.pathCounterTwo += 1;
        if(this.pathCounterTwo >= 350){ // was 370
            this.pathCounterTwo = 0;
        }
        if(this.enemyThreeHp3 > 0){
            this.enemyPathThree();
        }

        this.pathCounterThree += 1;
        if(this.pathCounterThree >= 370){
            this.pathCounterThree = 0;
        }
        if(this.enemyThreeHp4 > 0){
            this.enemyPathFour();
        }
        // Enemy 3 ---------------------------------------------

        // BOSS

        if(this.bossHp > 0){
            this.dog.anims.play('idle', true);
            if(this.player.x >= 1500 && this.player.x <= 1849 || this.playerTwo.x >= 1500 && this.playerTwo.x <= 1849){
                this.boss.anims.play('bossL', true); // 1850
                this.directionBoss = -1;
                this.bossAlive = true;
            }
            else if (this.player.x >= 1850 && this.player.x <= 2349 || this.playerTwo.x >= 1850 && this.playerTwo.x <= 2349){
                this.boss.anims.play('bossR', true); // 1850
                this.directionBoss = 1;
                this.bossAlive = true;
            }
            else if (this.player.x < 1500 || this.playerTwo.x < 1500){
                this.boss.anims.play('bossIL', true); // 1850
                this.bossAlive = false;
            }
            else if (this.player.x > 2450 || this.playerTwo.x > 2450){
                this.boss.anims.play('bossIR', true); // 1850
                this.bossAlive = false;
            }
        }
        else if(this.bossHp <= 0)
        {
            this.bossAlive = false;
            this.dog.anims.play('escape', true);
            this.dog.setVelocityX(20)
            this.dogRescue(); ///////////////////////////////// ADD THIS TO BOSS <= 0 ALSO DELETE FROM HERE
            this.gameWon(); // ADD THIS TO BOSS <= 0 ----------------------------------------------------------------------------
        }

        if(this.bossHp <= 50) {
            this.bossAlive = true;
            if (!this.hasCreated) {
                this.bomb3 = this.physics.add.sprite(1850, 850, 'bombs');
                this.bomb3.setVelocity(Phaser.Math.Between(-150, 150), 10);
                this.bomb3.setBounce(1);
                this.physics.add.collider(this.bomb3, this.platforms);

                this.bomb4 = this.physics.add.sprite(1750, 850, 'bombs');
                this.bomb4.setVelocity(Phaser.Math.Between(-200, 200), 20);
                this.bomb4.setBounce(1);
                this.physics.add.collider(this.bomb4, this.platforms);
                this.hasCreated = true;
            }
        }
        else if(this.bossHp <= 0)
        {
            this.bossAlive = false;
        }

        if(this.bossHp <= 0){
            this.bossAlive = false;
            this.bomb3.body.setEnable(false);
            this.bomb3.setVisible(false);
            this.bomb4.body.setEnable(false);
            this.bomb4.setVisible(false);
            this.bomb4.body.setEnable(false);
        }
        // BOSS

        if(this.directionBoss == -1){
            this.bossFire(this.time);
        }
        else if(this.directionBoss == 1){
            this.bossFire(this.time);
        }
    }
}