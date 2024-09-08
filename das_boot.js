
const INF = 9999999999

var game_on = true;
let timer_ms = 0;
let start_time = 0;
let current_time = start_time;
let last_check = start_time;


let mine_alive = 0
let distance_closest_mine  = 0

let destroyer_alive = 0

let screen_width = 900
let screen_height = 500

let sea_mine_image = null
let destroyer_image = null

const sea_mine_arr = [];
const destroyer_arr = [];

/** This function loads resources that will be used later. */
function preload() {
  das_boot = new das_boot("Das Boot")
  das_boot.image = loadImage("/resources_painted/das_boot.jpg");  
  sea_mine_image = loadImage("/resources_painted/sea_mine.jpg");
  destroyer_image = loadImage("/resources_painted/destroyer.jpg");

  for (let i = 0; i < 10; i++){
    sea_mine_arr[i] = new sea_mine(i, sea_mine_image,false);
    get_location_for_mine(i)
  }
  for (let i = 0; i < 2; i++){
    destroyer_arr[i] = new destroyer(i, destroyer_image,false);
    destroyer_arr[i].x_position = 100;
    destroyer_arr[i].y_position = 75;
  }
}

function setup() {
  createCanvas(screen_width, screen_height);
  start_time = millis();
}

function draw() { 
  paint_environment()
  if (game_on) { // if game_on === true, then game on........
    game_on = game_running()
  }
  else {
    game_over();
  }
}

function game_over() {
  text("BOOT is dead", 120,90)
  debug_text()
}

function game_running() {
  debug_text()
  image(das_boot.image,das_boot.x_position, das_boot.y_position, 60, 30); 
  
  key_pressed(); //Check for movement every frame, should really be an event
  spawn_destroyer()
  render_destroyer() 
  check_for_spawn();
  render_mine()
  distance_closest_mine = closest_mine()
  let game_on = check_for_damage();

  sub_constraints(); // important to keep this below check_for_damage
  return game_on
}


function render_destroyer() {
  destroyer_alive = 0 // not very smart honestly....
  let i = 0
  for (let i = 0; i < destroyer_arr.length; i++){
    if (destroyer_arr[i].activated === true){
      image(destroyer_arr[i].image,destroyer_arr[i].x_position,destroyer_arr[i].y_position, 60,30 )
      destroyer_alive = destroyer_alive + 1;
    }
  }
}


function spawn_destroyer() {
  for (let i = 0; i < destroyer_arr.length; i++){
    if (destroyer_arr[i].activated === false){
      destroyer_arr[i].activated = true
      destroyer_arr[i].x_position = 120
      destroyer_arr[i].Y_position = 100

    }
  }
}

function debug_text(){
  text("x_boat: " + das_boot.x_position + " y_boat: " + das_boot.y_position + "\nLife: " + das_boot.health, 10, 30);
  //text(sea_mine_arr[0],400, 30)
  text("Total mines in game: " + mine_alive + " Total destroyers in game: " + destroyer_alive, 10, 60)
  text(`Distance to closest {${das_boot.closest_mine}} mine: ` + distance_closest_mine,10, 75)
  if (mine_alive > 0) { // doesnt really work when mine is not activated......... 
    stroke(57,255,20)
    strokeWeight(2)
    line(das_boot.x_position+30,das_boot.y_position+15,sea_mine_arr[das_boot.closest_mine].x_position+30,sea_mine_arr[das_boot.closest_mine].y_position+15)
    strokeWeight(0)
  }
}