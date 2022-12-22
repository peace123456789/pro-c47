var gamestate="start"
 var score=0
var life=300

function preload(){
 bg1=loadImage("bg1.jpg")
 bg2=loadImage("bg2.jpg")
 start=loadImage("start.png")
 mobile=loadImage("car.png")
 sph=loadImage("super heart.png")
 nasty=loadImage("germ.png")
 stacks=loadImage("paper.png")
 hero=loadImage("savior.png")
 cv=loadImage("virus.png")
}

function setup() {

  createCanvas(windowWidth,windowHeight);
  
  playButton=createSprite(width/2,height/2)
  playButton.addImage(start)

  car=createSprite(width/2,height-200)
  car.addImage(mobile)
  car.scale=0.5

  obstacles=new Group()
  saviors=new Group()
  addSprites(saviors,10,sph,0.7)
  addSprites(saviors,10,hero,0.7)
  addSprites(obstacles,10,nasty,1)
  addSprites(obstacles,5,stacks,0.5)
  addSprites(obstacles,10,cv,1)

  
}

function draw() { 
  if(gamestate=='start'){
    background(bg1);
    drawSprites();
    car.visible=false
    saviors.setVisibleEach(false)
    obstacles.setVisibleEach(false)
    if(mousePressedOver(playButton)){
      gamestate="play"
    }
  }
  if(gamestate=="play"){
    background("white")
    car.visible=true
    playButton.visible=false
    saviors.setVisibleEach(true)
    obstacles.setVisibleEach(true)

    image (bg2,0,-height*19,width,height*20)

    camera.position.x=width/2
    camera.position.y=car.y-250
    car.y-=5


    if(keyIsDown(UP_ARROW)){
      car.y-=15
    }
    if(keyIsDown(LEFT_ARROW)&&car.x>100){
      car.x-=15
    }
    if(keyIsDown(RIGHT_ARROW)&&car.x<width-100){
      car.x+=15
    }

    handleSaviors()
    handleObstacles()
    showScore()
    showLife()

    if(life<=0){
      car.destroy()
      gameOver()
    }
    console.log(car.y)

    if(car.y<-18500){
      gamestate="end"
    }

    drawSprites();
  }
  if(gamestate=="end"){
    showRank()
  }

  
  

}
function addSprites(group,number,image,scale,positions=[]){
  for(var i=0;i<number;i++){
    var x,y
    if(positions.length>0){
      x=positions[i].x
      y=positions[i].y
      image=positions[i].image
    }
    else{
      x=random (150,width-150)
      y=random (-height*19,height-400)
    }
    var sprite=createSprite(x,y)
    sprite.addImage(image)
    sprite.scale=scale
    group.add(sprite)
  }
}
function handleSaviors(){
  car.overlap(saviors,function(c,s){
    s.remove()
    score+=15
  })
}
function handleObstacles(){
  car.overlap(obstacles,function(c,o){
    o.remove()
    life-=100
  })
}
function showScore(){
  push ()
  image(sph,80,car.y-600,40,40)
  fill("white")
  rect (130,car.y-600,300,30)
  fill("yellow")
  rect (130,car.y-600,score,30)
  pop ()
}
function showLife(){
  push ()
  image(cv,80,car.y-550,40,40)
  fill("white")
  rect (130,car.y-550,300,30)
  fill("yellow")
  rect (130,car.y-550,life,30)
  pop ()
}
function  gameOver(){
  swal({
    title:`GAMEOVER`,
    text:"opps you lost the race",
    imageUrl:"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize:"100x100",
    confirmButtonText:"thanks for playing"
  },
  function(isConfirm){
    if(isConfirm){
      window.location.reload()
    }
  }
  )
}
function showRank(){
  swal({
    title:`Congratulations`,
    text:"YOU HAVE SAVED THE WORLD",
    imageUrl:"super heart.png",
    imageSize:"100x100",
    confirmButtonText:"ok"
  })
}