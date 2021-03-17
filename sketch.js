var database;
var dog;
var sad_Dog,happy_Dog;
var feed_Button, add_Button;
var foodObj;
var fedTime, lastFed;

function preload(){
  sad_Dog = loadImage("Images/Dog.png");
  happy_Dog = loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  
  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sad_Dog);
  dog.scale = 0.15;

  foodObj = new Food(500, 200);
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  feed_Button = createButton("Feed the Dog");
  feed_Button.position(700, 95);
  feed_Button.mousePressed(feedDog);

  add_Button = createButton("Add Food");
  add_Button.position(800, 95);
  add_Button.mousePressed(addFoods);
}

function draw() {
  background(46, 139, 87);
  foodObj.display();
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happy_Dog);

  if (foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else {
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  }
  database.ref("/").update({
    Food : foodObj.getFoodStock()
  })
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food : foodS
  })
}