var bg_img,bg1,bg2;
var playButton,aboutButton;
var gameState="wait";
var player,player_img;
var enemy1img,enemy2img,enemyGroup,enemyGroupLevel2;
var arrow,arrow_img,arrowGroup;
var levelUp;
var numberOfArrows=3;
var  tiger1,tiger2,bird1,bird2,bird3,enemy2Group;
var score=0;


function preload(){
    bg_img = loadImage("assets/Jungle.gif");
    bg1=loadImage("assets/background-4.jpg")
    bg2=loadImage("assets/background-3.jpg")
    player_img=loadImage("assets/bow.png")
    enemy1img=loadImage("assets/dragon.png")
    enemy2img=loadImage("assets/eagle.png")
    arrow_img=loadImage("assets/arrow1.png")
    levelUp=loadImage("assets/levelUp.png")
    tiger1=loadImage("assets/Tiger1.png")
    tiger2=loadImage("assets/Tiger2.png")
    bird1=loadImage("assets/bird1.png")
    bird3=loadImage("assets/bird2.png")
    bird3=loadImage("assets/bird3.png")


}



function setup() {
    createCanvas(windowWidth, windowHeight)
    playButton = createImg("assets/play_button.png");
    playButton.position(220, 470);
    playButton.size(300, 300);
    playButton.hide();

    aboutButton = createImg("assets/About_button.png");
    aboutButton.position(50, 470);
    aboutButton.size(300, 300);
    aboutButton.hide();

    player = createSprite(100, 400);
    player.addImage("main", player_img);
    player.scale = 0.6;
    player.visible = false;

    enemyGroup = new Group();
    arrowGroup = new Group();

    enemyGroupLevel2=new Group();



}

function draw() {
    if (gameState == "wait") {
        background(bg_img)
        playButton.show()
        aboutButton.show()


        aboutButton.mousePressed(() => {
            playButton.hide();
            aboutButton.hide();
            gameState = "about";
        })

        playButton.mousePressed(() => {
            playButton.hide();
            aboutButton.hide();
            gameState = "play";
        })
    }

    if (gameState == "about") {
        aboutGame();

    }

    if (gameState == "play") {
        background(bg1);
        player.visible = true;
        spawnEnemies();
        movement();

        for (var i = 0; i < enemyGroup.length; i++) {
            if (arrowGroup.isTouching(enemyGroup.get(i))) {
                score += 5;
                enemyGroup.get(i).remove()
                arrowGroup.destroyEach()
            }
        }

        if (score >= 5 && numberOfArrows>0) {
            gameState = "nextlevelinfo"
            arrowGroup.destroyEach()
            player.visible = false
            enemyGroup.destroyEach()

        }

        if (gameState == "nextlevelinfo") {
            nextlevelpopup();

        }

        if (numberOfArrows == 0) {
            enemyGroup.destroyEach();
            arrowGroup.destroyEach();
            player.visible=false;
            gameOver();
          }


    }

    if (gameState == "level2") {
        background(bg2);
        player.visible = true;
        spawnEnemiesLevel2();
        
        movement();

        for (var i = 0; i < enemyGroupLevel2.length; i++) {
            if (arrowGroup.isTouching(enemyGroupLevel2.get(i))) {
                score += 5;
                enemyGroupLevel2.get(i).remove()
                 arrowGroup.destroyEach()
             }
         }

        if(score>5 && numberOfArrows>0){

            enemyGroupLevel2.destroyEach();
            arrowGroup.destroyEach();
            player.visible=false;
            win();
        }


       
         

        // if (gameState == "nextlevelinfo") {
        //     nextlevelpopup();

        // }

        // if (numberOfArrows == 0) {
        //     gameOver();
        //   }
        



    }
    drawSprites()

    if (gameState == "play" || gameState=="level2") {
        fill(255);
        textSize(25);
        text("SCORE: " + score, 50, 50);

        fill("#FFFF");
        textAlign("center");
        textSize(30);
        text("Remaining Arrows : " + numberOfArrows, 200, 100);



    }
    

}





function aboutGame() {
    swal({
        title: "About Game = How to Play!!",
        text: "Protect the inhabitants of the forest from dangerous predators. \n Use Arrow keys to move up and down.",
        textAlign: "center",
        imageUrl: "assets/Jungle.gif",
        imageSize: "250x250",
        confirmButtonText: "Let's kill the enemy!",
        confirmButtonColor: "brown",
    },
        function () {
            gameState = "wait"
        }
    )
}

function spawnEnemies() {
    if (frameCount % 100 == 0) {
        var randy = Math.round(random(50, 530))
        enemy = createSprite(width, randy);
        enemy.scale = 0.3
        enemy.velocityX = -6;

        var randimg = Math.round(random(1, 2))
        switch (randimg) {

            case 1:

                enemy.addImage(enemy1img)
                enemy.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                enemy.addImage(enemy2img)
                enemy.setCollider("rectangle", 0, 0, enemy.width, enemy.height)
                break;

            default: break;

        }


        enemyGroup.add(enemy);



    }
}

function movement() {

    if (player.y <= 10) {
        player.y = 10
    }

    if (player.y >= 525) {
        player.y = 525
    }

    if (keyDown("UP_ARROW")) {
        player.y = player.y - 5;
    }

    if (keyDown("DOWN_ARROW")) {
        player.y = player.y + 5;
    }

}

function spawnArrows() {

    arrow = createSprite(player.x + 3, player.y + 10, 20, 20);
    arrow.addImage(arrow_img);
    arrow.scale = 0.5;
    arrow.velocityX = 10;

    arrow.depth = player.depth;
    player.depth = player.depth + 1;

    arrowGroup.add(arrow);


}


function nextlevelpopup() {

    swal({
        title: "HURRAYY!! You have reached Level 2",
        text: "You defeated them:\n Time for the next adventure.",
        imageUrl: "assets/levelUp.png",
        imageSize: "200x200",
        confirmButtonText: "Let's Win!",
        confirmButtonColor: "brown",
    },
        function () {

            gameState = "level2"
        }

    )

}

function keyReleased() {
    if (keyCode === 32) {
        if (numberOfArrows > 0) {
            spawnArrows();
            numberOfArrows -= 1;
        }
    }
}

function gameOver() {

    swal({
        title: "You LOST!",
        imageUrl: "assets/game_over.png",
        imageSize: "200x200",
        confirmButtonText: "Try Again",
        confirmButtonColor: "brown",
    },
        function () {
            window.location.reload();
        }

    )


}


function spawnEnemiesLevel2() {
    if (frameCount % 100 == 0) {
        var randy = Math.round(random(50, 530))
        enemy = createSprite(width, randy);
        enemy.scale = 0.3
        enemy.velocityX = -20;

        var randimg = Math.round(random(1, 4))
        switch (randimg) {

            case 1:

                enemy.addImage(enemy1img)
                enemy.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                enemy.addImage(enemy2img)
                enemy.setCollider("rectangle", 0, 0, enemy.width, enemy.height)
                break;

            case 3:
                enemy.addImage(bird1)
                enemy.setCollider("rectangle", 0, 0, enemy.width, enemy.height)
                break;

            case 4:
                enemy.addImage(bird2)
                enemy.setCollider("rectangle", 0, 0, enemy.width, enemy.height)
                break;

            default: break;

        }


        enemyGroupLevel2.add(enemy);



    }


}
function win() {

    swal({
        title: "You Won!",
        text: "Congratulations you won the game! \n ",
        imageUrl: "assets/win.png",
        imageSize: "200x200",
        confirmButtonText: "Restart",
        confirmButtonColor: "brown",
    },
        function () {
            window.location.reload();
        }

    )


}