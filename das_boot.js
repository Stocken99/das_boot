
var is_alive = true;
let timer_ms = 0;
let start_time = 0;
let current_time = start_time;
let last_check = start_time;

let mine_alive = 0

let screen_width = 900
let screen_height = 500

let random_x_right = Math.ceil(800)
let random_x_left = Math.floor(50)
let random_y_up = Math.floor(100)
let random_y_down = Math.ceil(400) 

let sea_mine_image = null
let destroyer_image = null


const sea_mine_arr = [];

/** This function loads resources that will be used later. */
function preload() {
  das_boot = new das_boot("Das Boot")
  das_boot.image = loadImage("/resources_painted/das_boot.jpg");  
  sea_mine_image = loadImage("/resources_painted/sea_mine.jpg");
  for (let i = 0; i < 10; i++){
    let x_value = Math.floor(Math.random() * (random_x_right - random_x_left) + random_x_left) 
    let y_value = Math.floor(Math.random() * (random_y_down - random_y_up) + random_y_up) 
    sea_mine_arr[i] = new sea_mine(i, sea_mine_image, x_value, y_value, false);
  }
  destroyer_image = loadImage("/resources_painted/destroyer.jpg");
  
}

function setup() {
  createCanvas(screen_width, screen_height);
  start_time = millis();
}


function draw() {
  //text("is_alive: " + is_alive,100,100)    
  paint_environment()
  if (is_alive) {
    is_alive = game_running()
  }
  else {
    game_over();
  }
}

function game_over() {
  text("BOOT is dead", 120,90)
  text(" x_boat: " + das_boot.x_position + " y_boat: " + das_boot.y_position + "\n Life: " + das_boot.health, 10, 30);
  
}

function game_running() {

  image(das_boot.image,das_boot.x_position, das_boot.y_position, 60, 30); 
  //image(sea_mine.image,sea_mine.x_position,sea_mine.y_position,60, 30)
  //fill(0,0,0) //debug text, remove later
  text(" x_boat: " + das_boot.x_position + " y_boat: " + das_boot.y_position + "\n Life: " + das_boot.health, 10, 30);
  text(sea_mine_arr[0],400, 30)
  key_pressed(); //Check for movement every frame, should really be an event
  sub_constraints();
  check_for_spawn();
  text(mine_alive, 200, 200)
  render_mine()
  return check_if_alive();
}

function render_mine() {
  mine_alive = 0 // not very smart honestly....
  for (let i = 0; i < sea_mine_arr.length; i++){
    if (sea_mine_arr[i].activated === true){
      image(sea_mine_arr[i].image,sea_mine_arr[i].x_position,sea_mine_arr[i].y_position, 60,30 )
      mine_alive = mine_alive + 1;
    }
  }
}

function check_for_spawn(){
  is_time = (millis() - last_check)
  if ((is_time) > 500 ){ //+ mine_alive * 1000
    if (mine_alive < 10){
      sea_mine_arr[mine_alive].activated = true
    }
    text("Inside check for spawn",200, 200)
    last_check = millis();
  }
}

function sub_hit() {
  das_boot.health = das_boot.health - 10;
}

function enemy_hit() {

}

