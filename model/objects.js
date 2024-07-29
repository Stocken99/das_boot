
let starting_pos_sub_x = 50
let starting_pos_sub_y = 350
let starting_health = 100

let starting_pos_destroyer = -100 // or 900 -100 for left side, 900 for right side
let sea_level = 100 // y-axis
let sea_bottom = 400


//investigate inheritance, if time available

class das_boot { constructor(name, image){
    this.name = name
    this.image = image
    this.x_position = starting_pos_sub_x
    this.y_position = starting_pos_sub_y
    this.health = starting_health
    this.closest_mine = null
    this.closest_destroyer = null
    this.closet_bomb = null
    }
}

class sea_mine { constructor(id, image,activated) {
    this.id = id // id of mine
    this.image = image;
    this.x_position = null
    this.y_position = null
    this.health = starting_health
    this.is_exploded = false // If true remove
    this.activated = activated
    }
}

function destroyer(id, image, x_position,y_position) { // fix this
    this.id = id // id of mine
    this.image = image;
    this.x_position = x_position
    this.y_position = y_position
    this.health = starting_health
    this.is_exploded = false // If true remove
}
