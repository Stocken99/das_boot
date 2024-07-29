
const INF = 9999999999

var game_on = true;
let timer_ms = 0;
let start_time = 0;
let current_time = start_time;
let last_check = start_time;

let mine_alive = 0
let distance_closest_mine  = 0

let screen_width = 900
let screen_height = 500

let sea_mine_image = null
let destroyer_image = null
const sea_mine_arr = [];

/** This function loads resources that will be used later. */
function preload() {
  das_boot = new das_boot("Das Boot")
  das_boot.image = loadImage("/resources_painted/das_boot.jpg");  
  sea_mine_image = loadImage("/resources_painted/sea_mine.jpg");
  for (let i = 0; i < 10; i++){
    sea_mine_arr[i] = new sea_mine(i, sea_mine_image,false);
    get_location_for_mine(i)
  }
  destroyer_image = loadImage("/resources_painted/destroyer.jpg"); 
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
 // text(" x_boat: " + das_boot.x_position + " y_boat: " + das_boot.y_position + "\n Life: " + das_boot.health, 10, 30);
  debug_text()
}

function game_running() {
  debug_text()
  image(das_boot.image,das_boot.x_position, das_boot.y_position, 60, 30); 
  key_pressed(); //Check for movement every frame, should really be an event
  check_for_spawn();
  render_mine()

  distance_closest_mine = closest_mine()
  let game_on = check_for_damage();

  sub_constraints(); // important to keep this below check_for_damage
  return game_on
}

function debug_text(){
  text("x_boat: " + das_boot.x_position + " y_boat: " + das_boot.y_position + "\nLife: " + das_boot.health, 10, 30);
  //text(sea_mine_arr[0],400, 30)
  text("Total mines in game: " + mine_alive + " Total destroyers in game: nA", 10, 60)
  text(`Distance to closest {${das_boot.closest_mine}} mine: ` + distance_closest_mine,10, 75)
  if (mine_alive > 0) { // doesnt really work when mine is not activated.........
    stroke(57,255,20)
    strokeWeight(2)
    line(das_boot.x_position+30,das_boot.y_position+15,sea_mine_arr[das_boot.closest_mine].x_position+30,sea_mine_arr[das_boot.closest_mine].y_position+15)
    strokeWeight(0)
  }
}