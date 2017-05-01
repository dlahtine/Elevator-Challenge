{
    init: function(elevators, floors){
        var N_FLOORS = floors.length;
        elevators[1].goToFloor(N_FLOORS - 1);
        
        elevators[0].goingUpIndicator(true);
        elevators[0].goingDownIndicator(false);
        
        elevators[0].on("idle", function(){
            elevators[0].goToFloor(0);
        });
        
        elevators[1].on("idle", function(){
            elevators[1].goToFloor(N_FLOORS - 1);
        });
        
        elevators.forEach(function (elev) {
            
            //Check if the floor you are passing is on the list.
            // if it is, stop there.
            elev.on("passing_floor", function(floorNum, direction) {
                unloadAtFloor = elev.getPressedFloors().indexOf(floorNum) > -1;
                if (unloadAtFloor || elev.destinationQueue.indexOf(floorNum) > -1) {
                    
                        //passenger weights not exact: use .9 instead of 1
                    if (elev.loadFactor() < .8 || unloadAtFloor) {
                        //stop at this floor
                        var floorIndex = elev.destinationQueue.indexOf(floorNum);
                        elev.destinationQueue.splice(floorIndex, 1);
                        elev.goToFloor(floorNum, true);
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
                if (floorNum == 0) {
                    elev.goingUpIndicator(true);
                    elev.goingDownIndicator(false);
                } else if (floorNum == N_FLOORS - 1){
                    elev.goingUpIndicator(false);
                    elev.goingDownIndicator(true);
                }
            });
            elev.on("stopped_at_floor", function(floorNum){
                if (floorNum == 0){
                    elev.goingDownIndicator(false);
                    elev.goingUpIndicator(true);
                } else if (floorNum == N_FLOORS - 1){
                    elev.goingUpIndicator(false);
                    elev.goingDownIndicator(true);
                }
            });
            
            //Queue it up
            elev.on("floor_button_pressed", function(floorNum) {
                elev.goToFloor(floorNum); 
                //elev.checkDestinationQueue();
            });
        });
        
        floors.forEach(function(floor){
            floor.on("up_button_pressed", function(){
                if (elevators[0].goingUpIndicator()){
                    elevators[0].goToFloor(floor.floorNum());
                } else if (elevators[1].goingUpIndicator()){
                    elevators[1].goToFloor(floor.floorNum());
                } else if (elevators[0].loadFactor < .8) {
                    elevators[0].goToFloor(floor.floorNum(), true);
                    elevators[0].goingUpIndicator(true);
                } else {
                    elevators[1].goToFloor(floor.floorNum(), true);
                    elevators[1].goingUpIndicator(true);
                }
            });
            
            
            floor.on("down_button_pressed", function() {
                
                if (elevators[1].goingDownIndicator()){
                    elevators[1].goToFloor(floor.floorNum());
                } else if (elevators[0].goingDownIndicator()){
                    elevators[0].goToFloor(floor.floorNum());
                } else if (elevators[1].loadFactor() < .8) {
                    elevators[1].goToFloor(floor.floorNum());
                    elevators[1].goingDownIndicator(true);
                } else {
                    elevators[0].goToFloor(floor.floorNum());
                    elevators[0].goingDownIndicator(true)
                }
                       
                       
            });
        });
        
    },
        
    update: function(dt, elevators, floors){}    
}