

function paint_environment() {
    background(50,90,255); // A hue of blue, bluer than the blue danube.....
    //top line
    stroke(50,50,256)
    strokeWeight(5)
    line(screen_width-screen_width,sea_level,screen_width, sea_level)
    
    //bottom line
    stroke(50,50,50)
    line(0,sea_bottom + 30,screen_width, sea_bottom + 30)
    
    //sky
    strokeWeight(0) //remove line around square
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
    fill(0,0,0)
  }