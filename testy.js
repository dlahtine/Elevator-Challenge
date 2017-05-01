{
    init: function(elevators, floors){
        var N_FLOORS = floors.length;
        var WEIGHT_LIMIT = .7
        //elevators[1].goToFloor(N_FLOORS - 1);
        //elevators[0].goingUpIndicator(true);
        //elevators[0].goingDownIndicator(false);
        /*elevators[0].on("idle", function(){
            if (elevators[0].currentFloor() === 0){
                elevators[0].goingUpIndicator(true);
                elevators[0].goingDownIndicator(false);
            } else {
                //elevators[0].goToFloor(0);
                elevators[0].goingUpIndicator(false);
                elevators[0].goingDownIndicator(true);
            }
            
        });
        elevators[1].on("idle", function(){
            if (elevators[1].currentFloor() == N_FLOORS - 1){
                elevators[1].goingUpIndicator(false);
                elevators[1].goingDownIndicator(true);
            } else {
                //elevators[1].goToFloor(N_FLOORS - 1);
                elevators[1].goingUpIndicator(true);
                elevators[1].goingDownIndicator(false);
            }
            
        });*/
        
        elevators.forEach(function (elev) {
            
            //Check if the floor you are passing is on the list.
            // if it is, stop there.
            elev.on("passing_floor", function(floorNum, direction) {
                unloadAtFloor = elev.getPressedFloors().indexOf(floorNum) > -1;
                if (unloadAtFloor || elev.destinationQueue.indexOf(floorNum) > -1) {
                    if (elev.loadFactor() < WEIGHT_LIMIT || unloadAtFloor) {
                        //stop at this floor
                        var floorIndex = elev.destinationQueue.indexOf(floorNum);
                        elev.destinationQueue.splice(floorIndex, 1);
                        elev.goToFloor(floorNum, true);
                        //Just to be on the safe side...
                        elev.checkDestinationQueue();
                    } else {
                        //delay stopping here until the elevator is empty
                        var floorIndex = elev.destinationQueue.indexOf(floorNum);
                        elev.destinationQueue.splice(floorIndex, 1);
                        elev.goToFloor(floorNum);
                        //elev.goToFloor(elev.getPressedFloors()[0], true);
                        
                    }
                } 
                //Make sure your indicators are in order
                /*if (direction == "up" && elev.goingDownIndicator()){
                    elev.goingUpIndicator(true);
                    elev.goingDownIndicator(false);
                } else if (direction == "down" && elev.goingUpIndicator()) {
                    elev.goingUpIndicator(false);
                    elev.goingDownIndicator(true);
                }*/
                //Once you hit the bottom/top, switch indicators
                /*if (floorNum == 0) {
                    elev.goingUpIndicator(true);
                    elev.goingDownIndicator(false);
                } else if (floorNum == N_FLOORS - 1){
                    elev.goingUpIndicator(false);
                    elev.goingDownIndicator(true);
                }*/
            });
            
            
            //Queue it up
            elev.on("floor_button_pressed", function(floorNum) {
                elev.goToFloor(floorNum); 
                //elev.checkDestinationQueue();
            });
        });
        
        //For these 2 functions:
        // it goes like this: 
        // get preferred elevator if convenient (0 for up, 1 for down)
        // get other elevator if convenient
        //  if neither is convenient:
        // get prefferred elevator 
        floors.forEach(function(floor){
            floor.on("up_button_pressed", function(){
                if (elevators[0].loadFactor() < WEIGHT_LIMIT){
                    elevators[0].goToFloor(floor.floorNum());
                } else if (elevators[1].loadFactor() < WEIGHT_LIMIT){
                    elevators[1].goToFloor(floor.floorNum());
                } else {
                    elevators[0].goToFloor(floor.floorNum(), true);
                    //elevators[0].goingUpIndicator(true);
                }
            });
            
            
            //Get elevator 
            floor.on("down_button_pressed", function() {
                
                if (elevators[1].loadFactor() < WEIGHT_LIMIT){
                    elevators[1].goToFloor(floor.floorNum());
                } else if (elevators[0].loadFactor() < WEIGHT_LIMIT){
                    elevators[0].goToFloor(floor.floorNum());
                } else {
                    elevators[1].goToFloor(floor.floorNum());
                    //elevators[1].goingDownIndicator(true);
                }
                       
                       
            });
        });
        
    },
             
    update: function(dt, elevators, floors){}    
}