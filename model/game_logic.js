function sub_constraints () {
    if (das_boot.y_position >= sea_bottom){ // check bottom
      if (das_boot.health > 0) {
        das_boot.health = das_boot.health - 100;
      }
      das_boot.y_position = das_boot.y_position - 5
    }
    if (das_boot.x_position < -60){ // check left and move right
      das_boot.x_position = screen_width
    }
    if (das_boot.x_position > screen_width){ // check right and move left
      das_boot.x_position = -60
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

function check_if_alive () {
    if (das_boot.health < 1){
      return false;
    }
    else {
      return true
    }
  }