# Block
| State      | State (D)     | preBlocked | Blocked | 
| :----------- | :-------------- | :---------- | :---------- |
| free       | Grundstellung | FALSE      | FALSE   |  
| preblocked | vorgeblockt   | TRUE       | FALSE   | 
| blocked | geblockt | FALSE | TRUE | 

## State Set With
### State *free* (both directions)
- set with Function *onNewLoad()* or
- set with Function *initialize()* or
- from state *blocked* direction exit: set with section track gets free 
- from state *blocked* direction entry: set with entry signal set to stop
### State *preblocked* (only direction exit possible)
- set with setting exit train route
### State *blocked* direction exit
- if exit train route set: set with occupation section track (from state *preblocked*)
### State *blocked* diretion entry
- if no exit train route set: set with occupation section track (from state *free*)
