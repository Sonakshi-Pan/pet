var dog,sadDog,happyDog;
var foodObj;
var foodS,foodStoke;
var fedTime,lastFed,feed,addFood;
var database;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database()
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the Dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS)

}

function draw() {
  background(46,139,87);
  
  foodObj.display();

  feedTime = database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed = data.val()
  })

  fill(255,255,254)
  textSize(15)
  if(lastFed >= 12){
    text("last feed:"+lastFed %12+"PM",350,30);
  }
  else if(lastFed == 0){
    text("last feed :12PM",350,30);
  }
  else{
    text("last feed:"+lastFed+"AM",350,30);
  }
  drawSprites();

}




//function to read food Stock
function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
    
  })
}

//function to add food in stock
function addFoodS(){
  foodS++
  database.ref('/').update({
    
    Food:foodS
  })
}