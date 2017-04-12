This is the front end of an app to browse/search for contracts put out to tender("licitaciones") by government entities in Chile.

Additionally you can save searches or search results on the backend and see their
results in the front end

demo url:
    https://www.buscadorchilecompra.info

user: example@example3.com

password: password

The app was made using the following starter kit: [react-slingshot](https://github.com/coryhouse/react-slingshot)

Thanks!

The app uses:

- React for views
- Redux for state management
- Redux-thunk for async actions
- Jest + Enzyme for testing
- ...among others

Installing:
    - fork the repo
    - git clone
    - npm install
    - npm run test -> all should pass!
    - npm run start -> will start a dev server on localhost:3000 (but will require a backend to work)


Directory structure: 
```
.
│── node_modules //dependencies
├── src //code for the app
│   ├── actions //action creators
│   │   └── test
│   ├── api // functions that do the api calls
│   │   └── test
│   ├── components // components that make up the UI
│   │   ├── inputs 
│   │   ├── searchResults 
│   │   ├── resultComparer // used in "Historia" (see variations of a result)
│   │   ├── test
│   │   │   ├── inputs
│   │   │   ├── resultComparer
│   │   │   ├── user
│   │   │   └── searchResults
│   │   └── user // user related components
│   ├── constants // values used several times that shouldn't change at runtime
│   ├── containers
│   │   └── test
│   ├── css 
│   │   └── bootstrap
│   ├── fonts
│   ├── helpers // functions used by some component or container in particular
│   │   └── test
│   ├── __mocks__ //mocks for testing
│   ├── reducers // redux reducers & initialState
│   │   └── test
│   ├── store //redux store config
│   └── utils // misc. functions that are reused in several instances & are standalone
│       └── test
└── tools // app related utils from react-slingshot


```


