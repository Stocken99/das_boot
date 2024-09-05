
function check_for_damage(){ // change to event based later
    let type_of_damage  = -1
    if (das_boot.y_position >= sea_bottom){
        type_of_damage = 0
    }
    if (distance_closest_mine < 30 && sea_mine_arr[das_boot.closest_mine].activated === true){
        type_of_damage = 1
    }
    return sub_damage_effect(type_of_damage)
}
  
function sub_damage_effect(type_of_damage) { // just for different damages
    switch(type_of_damage){ 
    case 0: // botton
        das_boot.health = das_boot.health - 1;
        break;
    case 1: // mine
        das_boot.health = das_boot.health - 2; //20
        sea_mine_arr[das_boot.closest_mine].activated = false // deactivate mine as well
        break
    case 2: // sink bomb
        das_boot.health = das_boot.health - 10;
        break;
    case 3: // aerieal bomb
        das_boot.health = das_boot.health - 30;
        break;
    case -1: // no damage
        break;
    }
    return check_if_alive()
}

function check_if_alive() {
    if (das_boot.health < 1){
        return false;
    }
    else {
        return true
    }
}