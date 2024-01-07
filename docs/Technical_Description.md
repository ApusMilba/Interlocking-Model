# A) General
1. All elements are instances of the classes in chapter [E](#e-classes).
2. These instances own static and dynamic properties.
3. The static properties contain mainly geographic informations (position, neigbours etc.).
4. The dynamic property *'ok'* (not faulty) is used in the classes of track and point.
5. Tracks and points own always a property 'free' (not occupied).
6. Speciality: All instances of tracks and points own the properties 'ZfL' and 'ZfR' (train route is set in left resp. in right direction).
7. All instances of tracks and points own the properties 'olL', 'olR' and 'flProt': overlap element for right/left direction and element of a flank protection.
8. The train routes are set with the geographic principle: starting from the target signal backwards, points tied in both positions, until the start signal is found (Details see here chapter G).
9. With setting the train route, also the overlap and the flank protection elements are searched and set.
10. A track element (track or point) belayed with a train route ('ZfR' or 'ZfL') is reset, if it was occupied and then free and if the preceding track element is free and not belayed with a train route.
# B) Software
1. Program language: Java Script with canvas
# C) Files
1. Root: index.html calls the canvas, sets the buttons and calls the 3 js scripts.
2. */scripts/…_classes.js* defines all classes.
3. */scripts/…_functions.js* defines all functions
4. */scripts/…_definitions.js* defines all parameters
# D) Layout
1. Signals are linked to this element, toward which the signal is pointing.
2. *Element* = track or point.
3. Overlap (*ol*): Always the track after target signal (point after start signal not yet possible).
# E) Classes
1. Train Signal
2. Track
3. Block
4. Point
# F) Functions
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
# G) Setting a Train Route ('ZF')
1. When a TrainSignal is clicked and it is a possible start signal, with mouse down moving a yellow line is drawn.
2. When then the mouse is over a possible target signal, the method *findRouteBackwards()* is activated; if ok, the signal changes to yellow.
3. When then releasing the mouse, the method *preBuildTrainRoute()* is activated; if ok, the route elements are drawn in yellow.
4. If ok (preBuildTRok = TRUE), the function *setPointsForTrainRoute()* is activated, the switching points begin flashing for the time *tChangeSwitch*.
5. Afterwards, the function *startBuildingTrainRoute()* is started.
6. The function *buildTrainRoute()* is started: here also the flank protection and the overlap are defined and set.
7. By succesive occupying and setting free the route elements, the train route is released.
# H) Block
1. The simulation of the blocks is simplified to avoid actions on the neighbour stations.
2. The block doesn't have any input element.
2. If a section track (D: Streckengleis) gets occupied, the corresponding block changes to the state "blocked", direction to *Testikon*.
3. To release the block, a train route has to be set and a train has to enter the station *Testikon*.
4. Exit train route from *Testikon*: By setting a route, the block changes to the state "preblocked" (D: vorgeblockt).
5. When the corresponding train get on the section track, the block changes to the state "blocked".
6. When after this the corresponding section track gets free, the block changes to the state "free" (not as in reality!)
# I) Specialities
1. Flank protection, method *ban* (*flProtBan*) uses only one element and works only with tracks.
2. Condition for release resilent route: 
  - last element before target gets free and
  - element before is free and without a train route set or with train route set in the other direction
3. Combining or separating trains (D: vereinigen, trennen) is not possible.
4. Reversing trains (D: wenden) is possible.
5. Reversing a train (D: Wendezug): is possible, the first route is released with building the second route.
6. the block doesnot have any input element

