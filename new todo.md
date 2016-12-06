## TO DO ##



- Need to set a debouncer for fetches!
- Clean up the actions/reducers/etc related to the test fetcher, and thank it for its service
- Make the inputFields component have 3 tabs: "List" (listing all licitaciones), "Proveedor" (showing licitaciones by svc provider), "Licitacion" (a singple licitacion, which is much more detailed)

## DONE ##
- Need to separate the logic in some of the stateless functional components into actions
- Add dates, currently <DateField /> does not alter state so you cant actually pick a date meaningfully
- Need to see  how to pass value of stateless functional components to container so it gets turned into state <- this was done with actions/reducers etc (the redux way)
- Need to take <SearchResults /> off inputfields (or make it not always update) since that utterly kills performance (5000 renders when typing "vialidad"...) - Changed it into a PureComponent component instead of a stateless func comp.
- A loading anim so it isn't so confusing when stuff updates to the same result - Did a very basic fadeIn anim, works but def improvable.