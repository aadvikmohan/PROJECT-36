//Create variables here
var dogImage1, dogImage2;
var database;
var dog;
var food,foodStock;
var lastFed,fedTime;
var foodObj;
var feed, addFood;

function preload()
{
  //load images here
  dogImage1 = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 700);
  
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(800,350,100,100);
  dog.addImage(dogImage1);
  dog.scale = 0.15;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(850,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);

  drawSprites();

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12)
  {
    text("Last Feed : " + lastFed % 12 + " PM",350,30);
  }
  else if(lastFed == 0)
  {
    text("Last Feed : 12 AM", 350,30);
  }
  else
  {
    text("Last Feed : " + lastFed + " AM",350,30);
  }

  
  //add styles here

  
}

function readStock(data)
{
  food = data.val();
  foodObj.updateFoodStock(food);
}

function feedDog()
{
  dog.addImage(dogImage2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods()
{
  food ++;
  database.ref("/").update({
    Food : food
  })
}