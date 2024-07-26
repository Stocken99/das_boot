

let is_alive = true;
let timer = 0;

let starting_pos_sub_x = 50
let starting_pos_sub_y = 350
let starting_health = 100

let starting_pos_destroyer = -100 // or 900 -100 for left side, 900 for right side
let sea_level = 100 // y-axis
let sea_bottom = 400

let screen_width = 900
let screen_height = 500

const das_boot = new Object();
das_boot.name = "Das Boot";
das_boot.image = ""
das_boot.x_position = starting_pos_sub_x
das_boot.y_position = starting_pos_sub_y
das_boot.health = starting_health


const sea_mine = new Object(); //all empty values will be added when spawn
sea_mine.id = "" // id of mine
sea_mine.image = "";
sea_mine.x_position = null
sea_mine.y_position = null
sea_mine.health = starting_health
sea_mine.is_exploded = false // If true remove

const destroyer = new Object();
destroyer.id = "" // id of mine
destroyer.image = "";
destroyer.x_position = null
destroyer.y_position = null
destroyer.health = starting_health
destroyer.is_exploded = false // If true remove

/** This function loads resources that will be used later. */
function preload() {
  das_boot.image = loadImage("/resources_painted/das_boot.jpg");  
}

function setup() {
  createCanvas(screen_width, screen_height);
}

function reset_game(){
  das_boot.x_position = starting_pos_sub_x;
  das_boot.y_position = starting_pos_sub_y;
  das_boot.health = starting_health;
  timer = 0;
  is_alive = true;

  //reset game, built in function for this?
}

function draw() {
  background(50,90,256); // A hue of blue, bluer than the blue danube.....
  paint_environment()
  //is_alive = game_running()
  if (!game_running()) {
    game_over();
  }
}

function paint_environment() {
  //top line
  stroke(50,50,256)
  strokeWeight(5)
  line(screen_width-screen_width,sea_level,screen_width, sea_level)
  
  //bottom line
  stroke(50,50,50)
  line(0,sea_bottom + 30,screen_width, sea_bottom + 30)
  
  //sky
  strokeWeight(0) //reomve line around square
  fill(64,128,256)
  rect(0,0, 900,100)
  //bottom
  fill(139,69,19)
  rect(0,sea_bottom + 30 ,900,100)
  
  //Frame
  stroke(102,51,0)
  strokeWeight(20)
  noFill()
  rect(0,0, screen_width, screen_height)
  strokeWeight(0)
}

function game_running() {
  image(das_boot.image,das_boot.x_position, das_boot.y_position, 60, 30); 
  fill(0,0,0) //debug text, remove later
  text(" x_boat: " + das_boot.x_position + " y_boat: " + das_boot.y_position + "\n Life: " + das_boot.health, 10, 30);
  key_pressed(); //Check for movement every frame, should really be an event
  sub_constraints();
  return is_dead();
}

function game_over() {
  text("BOOT is dead", 120,90)
}

function sub_hit() {

}

function enemy_hit() {

}

function is_dead () {
  if (das_boot.health < 1){
    return false;
  }
  else {
    return true
  }
}

function sub_constraints () {
    if (das_boot.y_position >= sea_bottom){ // check bottom
      if (das_boot.health > 0) {
        das_boot.health = das_boot.health - 1;
      }
      das_boot.y_position = das_boot.y_position - 5
    }
    if (das_boot.x_position < -60){ // check left and move right
      das_boot.x_position = screen_width
    }
    if (das_boot.x_position > screen_width){ // check right and move left
      das_boot.x_position = 0
    }
    if (das_boot.y_position <= sea_level - 20) {
      das_boot.y_position = das_boot.y_position + 2
    }
}

function key_pressed(){ // Change values of x and y for BOAT position
  if (keyIsPressed === true) {
    if (keyCode === RIGHT_ARROW) {
      das_boot.x_position = das_boot.x_position + 1;
    }
    else if (keyCode === LEFT_ARROW) {
      das_boot.x_position = das_boot.x_position - 1;
    }
    else if (keyCode === UP_ARROW) {
      das_boot.y_position = das_boot.y_position - 1;
    }
    else if (keyCode === DOWN_ARROW) {
      das_boot.y_position = das_boot.y_position + 1;
    }
  }
}



