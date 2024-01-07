# Overlap
## Properties
| Property | Meaning |
| :---------------- | :----------------------------------------- |
| Track\[olL\] | this track is the overlap of neighbour track R |
| Track\[olR\] | this track is the overlap of neighbour track L |
| Track\[olStartSig\] | start signal of a train route with this overlap |
| Track\[myOlTrack\] | for neighbour track before (with target signal): track is overlap protection |
## Set / Reset
- the overlap properties are set with the function
  *buildTrainRoute(...)*
- the overlap properties are reset with the method
  *Track.trackGotOccupied()* of the neighbour track before
## Occupation of an overlap track
In the method *Track.trackGotOccupied()*:
- at the start signal: TrainSignal.ma and TrainSignal.start set to FALSE
- reset concerned properties
- funtion *showFailureText("this track got occupied")*
