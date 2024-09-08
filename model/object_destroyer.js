
class destroyer{ constructor(id, image, activated) { // disappears after a few bombings 
    this.id = id // id of mine
    this.image = image;
    this.x_position = null
    this.y_position = null
    this.health = starting_health
    this.has_launched_bomb_recently = false 
    this.no_bomb_launched = 0
    this.activated = activated
    }
}