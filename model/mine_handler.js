let random_x_right = Math.ceil(800)
let random_x_left = Math.floor(50)
let random_y_up = Math.floor(100)
let random_y_down = Math.ceil(400) 

function get_location_for_mine(index){
  let x_value = Math.floor(Math.random() * (random_x_right - random_x_left) + random_x_left) 
  let y_value = Math.floor(Math.random() * (random_y_down - random_y_up) + random_y_up) 
  distance = distance_two_points(das_boot.x_position, x_value, das_boot.y_position, y_value)
  if (distance > 60) {
    sea_mine_arr[index].x_position = x_value
    sea_mine_arr[index].y_position = y_value
  }
  else{
    get_location_for_mine(index)
  }
}

function closest_mine(){
  let distance_closest_mine = INF
  for (let i = 0; i < sea_mine_arr.length; i++){
    distance = distance_two_points(das_boot.x_position, sea_mine_arr[i].x_position, das_boot.y_position, sea_mine_arr[i].y_position)
    if (distance < distance_closest_mine){
      distance_closest_mine = distance
      das_boot.closest_mine = i
    }
  }
  return distance_closest_mine
}

function check_for_spawn(){ // could us some randomness, but good for now
  is_time = (millis() - last_check)
  if ((is_time) > 100 + mine_alive * 1000){
    if (mine_alive < 10){
      for (let i = 0; i < sea_mine_arr.length; i++){ // change to while loop?
        if (sea_mine_arr[i].activated === false){ 
          get_location_for_mine(i)
          sea_mine_arr[i].activated = true
          i = sea_mine_arr.length
        }
      }
    }
    else { // deactivate first mine, and give new position
      sea_mine_arr[millis()%10].activated = false
      get_location_for_mine(0)
    }
    last_check = millis();
  }
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