# Elevator-Challenge
My submission to the 4th Elevator Saga problem

This algorithm is not perfect; it has about an 84% success rate. I did not want to look at the other solutions for the problem, though, as I felt that would be dishonest for this purpose. 

I initially tried using the indicator arrows for the purposes of delivering more passengers at a time, but I found that the success rate was much higher if the arrows went untouched. The general idea is, when someone requests an elevator, that request is queued to one of the elevators. Elevator 0 is preferred if it is a request to go up, and elevator 1 is preferred if it is a request to go down. Another request will be made when a user requests to be taken to a floor. An elevator will stop at a floor if 1. it has a request to go there, and 2. if it is only picking up passengers, it must have enough room. 

It is possible that this algorithm could be improved by looking at what the last queued destinations of the elevators would be when requesting it, but I doubt it would be significant
