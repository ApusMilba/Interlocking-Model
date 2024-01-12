# Operating Instructions
1. To start the model press the button *Initialize*.
2. Base of the symbols: *ILTIS SBB, Symbolkatalog, Lupe*.
3. For didactic reasons the symbols slightly differ from the base.
4. Occupied elements are shown in red, but not bold.
5. When a corresponding route is set, elements of the flank protection and overlap elements are shown in light green.
6. There are only train routes (D: Zugfahrstrassen), no shunting routes (D: Rangierfahrstrassen).
7. The station *Testikon* works with route logic (D: Fahrstrassenlogik), the section tracks (D: Streckengleise) *113, 115, 213, 215* with block logic (D: Blocklogik).
8. The train routes are set and reset according to the geografic principle (D: Spurplanprinzip); there is no locking table.
9. Flank protection in the mode *banned* (D: Verbotsbewirkter Flankenschutz) with monitoring of the flank protection area (D: Schutzraumüberwachung): Elements of the flank protection area are constantly monitored; an occupation of such an element resets the moving authority and sets the start signal to stop.
10. The main signals are not automated (D: kein ASB, kein automatischer Signalbetrieb).
11. The main signals show the aspects proceed (green) and stop (red); corresponding to the base of the symbols the exact aspect is not shown.
12. To simulate an occupation and a free up of a route element click on it.
13. Setting a train route: Mouse cursor on start signal, click and hold, cursor on a target signal (signal gets yellow if possible as target signal), release mouse button. Elements of the train route get yellow until all points are set; then they get green.
14. For exit routes take as target signal the corresponding rhombus.
15. The blocks 113, 115, 213, 215 are operated in a simplified manner:
- Entries to *Testikon*: Occupation of the corresponding line sets the block in the modus *blocked* (D: geblockt); deblocking with setting the entry signal to stop
- Exits from *Testikon*: Preblocking (D: Vorblocken) and blocking as usual; deblocking directly with section track getting free.  
16. The points can be set individually by clicking on the point designation; only if point is free, has no route set and is not an element of a flank protection.
17. Error messages disappear by clicking on *Reset Text*.
18. The button *Initialize* causes a total reset of the interlocking (**not** like in reality!); all previous states are lost.
19. Test made on VS Code remote 07.01.2023 20:08
  
