# A) General
1. All track elements are instances of classes: TrainSignal, Track, Point, Block.
2. These instances own static and dynamic properties.
3. The static properties contain mainly geographic informations (position, neigbours etc.).
4. The dynamic property *'ok'* (not faulty) is used in all classes of track elements.
5. Tracks and points own always a property 'free' (not occupied).
6. Speciality: All instances of tracks and points own the properties 'ZfL' and 'ZfR' (train route is set in left resp. in right direction).
7. All instances of tracks and points own the properties 'olL', 'olR' and 'flProt': overlap element for right/left direction and element of a flank protection.
8. The train routes are set with the geographic principle: starting from the target signal backwards, points tied in both positions, until the start signal is found.
9. With setting the train route, also the overlap and the flank protection elements ars searched and set.
10. A track element (track or point) belayed with a train route ('ZfR' or 'ZfL') is reset, if it was occupied and then free and if the preceding track element is free and not belayed with a train route.
# B) Software
1. Program language: Java Script with canvas
# C) Files
1. Root: index.html calls the canvas, sets the buttons and calls the 3 js scripts.
2. */scripts/…_classes.js* defines all classes.
3. */scripts/…_functions.js* defines all functions
4. */scripts/…_definitions.js* defines all parameters
# D) Classes
1. Train Signal
2. Track
3. Block
4. Point
# E) Functions
1. *completeTopo()* sets all neighbours L and various other redundant data
(neighbours R are defined in *.._definitions.js*).
2. *onNewLoad()* resets all dynamic parameters (D: Grundzustand) and redraws everything in magenta.
3. *initialize()* - if all docs loaded - starts loadDoc for the different tables, normalizes all elements and redraws everything.
4. *operationInstruction()* brings the operation instruction to the screen.
5. *drawStatics()* draws the title (here: "F-Dorf") in a rectangle.
6. *showFailureText()*
7. *hideFailureText()*
8. *failureTextResetClick()*
9. *onClickCanvas(event)* checks the coordinates of the mouse and calls with them all methods named *…click()* of all instances of the classes.
10. *flashGeneric()*
11. *onMouseDownCanvas(event)*
12. *onMouseDownMoveConvas(event)*
13. *onMouseUpCanvas(event)*
14. *reDraw()*
15. *findRouteBackwards()*
16. *preBuildTrainRoute()*
17. *setPointsForTrainRoute()*
18. *startBuildingTR()*
19. *buildTrainRoute()* 
