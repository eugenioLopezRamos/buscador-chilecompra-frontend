## TO DO ##

- Need to set a debouncer for fetches!
- Make it so the user can save search queries and save search results
- change rails routes (and thus the routes used in this app) from /api/:whatever to /api/v1/:whatever
- add validations for requiredness of user data when signing up, and for formatting (email), length & equalness (passwords)
- add tests for everything
- Links to a single licitacion
- make the signup errors flash able to be closed.
- Need to fix the errors flash due to the new format because of devise_token_auth
- Make the user menu not be behind a click in non mobile viewports
- polish the USER_VALIDATION_TOKEN_SUCCESS responding reducers (in particular, userData)
- Need to restructure the SearchResults rendering so it can adapt to single licitacion and proveedor search types
- Pagination for saved searches/saved results
- Login on mobile looks weird, needs fix
- Password resets

## DONE ##
- Clean up the actions/reducers/etc related to the test fetcher, and thank it for its service
- Need to separate the logic in some of the stateless functional components into actions
- Add dates, currently <DateField /> does not alter state so you cant actually pick a date meaningfully
- Need to see  how to pass value of stateless functional components to container so it gets turned into state <- this was done with actions/reducers etc (the redux way)
- Need to take <SearchResults /> off inputfields (or make it not always update) since that utterly kills performance (5000 renders when typing "vialidad"...) - Changed it into a PureComponent component instead of a stateless func comp.
- A loading anim so it isn't so confusing when stuff updates to the same result - Did a very basic fadeIn anim, works but def improvable.
- Break up the fetch query according to the current searchType ("listado" or "codigo" or "proveedor"), and only send the correct one
- Make the inputFields component have 3 tabs: "List" (listing all licitaciones), "Proveedor" (showing licitaciones by svc provider), 
"Licitacion" (a single licitacion, which is much more detailed)
- Fixed a small bug when loading AutoFillerInput organismos publicos from a <Link />
- Turned AutoFillerInput from Class component to stateless functional component
- When the date is deleted the datepicker fails irreversibly. Fixed by adding date._isValid check in the reducer.
- Make the login work
- I think relog bug happens when you reload so fast the promise can't resolve itself so it crashes and then
doesnt get to write the new token to localstorage - Fixed, it was receiving no new token due to the default option of devise_token_auth
