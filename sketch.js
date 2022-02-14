var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg;
var heart1, heart2, heart3;
var life;
var score;
function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  shoot_sound = loadSound("assets/explosion.mp3")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png")

}

function setup() {
  

  createCanvas(windowWidth, windowHeight);
  score = 0;
  //adding the background image
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  ZombiesGrp = new Group();
  BulletGrp = new Group();


  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)


}

function draw() {
  background(0);
  life = 3;
  heart1 = createSprite(displayWidth / 2, 40, 20, 20)
  heart1.visble = false;
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.2
  heart2 = createSprite(displayWidth / 2, 40, 20, 20)
  heart2.visible = false;
  heart2.scale = 0.2
  heart2.addImage("heart2", heart2Img)
  heart3 = createSprite(displayWidth / 2, 40, 20, 20)
  heart3.visible = false;
  heart3.scale = 0.2;
  heart3.addImage("heart3", heart3Img)

  if (life == 3) {
    heart3.visible = true;
  }
  if (life == 2) {
    heart2.visible = true;
  }
  if (life == 0) {
    heart1.visible = true;
  }


  //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("UP_ARROW") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player.y = player.y + 30
  }



  //release bullets and change the image of shooter to shooting position when space is pressed
  if (keyWentDown("space")) {
    bullet = createSprite(player.x, player.y, 20, 10)
    bullet.shapeColor = "white";
    bullet.velocityX = 3
    BulletGrp.add(bullet);
    shoot_sound.play();
    player.addImage(shooter_shooting)

  }

  //player goes back to original standing image once we stop pressing the space bar
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }
  if (BulletGrp.isTouching(ZombiesGrp)){
    life = life - 1;
    score = score++;
  for (var i = 0; i < ZombiesGrp.length; i++) {
    if (ZombiesGrp[i].isTouching(BulletGrp)) {
      ZombiesGrp[i].destroy();
      BulletGrp.destroyEach();
      shoot_sound.play();
    }
  }
}

  zombies();
  drawSprites();
  textSize(20);
  fill("white")
  text("Score: " + score, 100,50);


}

function zombies() {
  //creating of zombie
  if (frameCount % 200 == 0) {
    zombie = createSprite(random(displayWidth, displayWidth + 100), random(0, displayHeight - 150), 20, 20)
    zombie.addImage(zombieImg)
    zombie.scale = 0.2
    zombie.velocityX = -2;
    ZombiesGrp.add(zombie);
  }
}

