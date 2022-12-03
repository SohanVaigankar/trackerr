# [TRACKERR]()

- tracknerd frontend dev assignment

## Tech Stack Summary

- Reactjs web app created using vite framework and a whole bunch of javascript
- used TailwindCSS for styling
- ContextAPI with useReducer for state management

## Procedure to install & run on local machine

### Pre-requisites

- install nodejs and npm (preferrably latest LTS versions)

1. Clone the repository or download zip
2. Navigate to the cloned/downloaded repo
3. open terminal/command prompt inside it and enter the following commands
   - `npm install` - this will install all the required dependencies
   - `npm run dev` - this will run the app on local server
4. now copy the `localhost` url displayed in the terminal and paste it in the browser

### Project Structure

- Main.jsx
  - wraps the entire App component inside user context and react router
- App.jsx
  - setting up of routes (home, vehicle information and private route)
    - both home and vehicle info pages are protected with private route, only to be accessed after authentication
- routes
  - PrivateRoute.jsx - renders login page if user is not authenticated and children components if authenticated
- configs
  - firebase.config.jsx - initilization and configuration of firebase
- context
  - action.types.jsx - main actions on which the entire app works on
  - UserReducer.jsx - reducer for UserContext that performs operations according to the dispatched action
  - UserContext.jsx - central place that keeps a track of state values
- pages
  - Login.jsx
    - performs user authentication, if authenticated stores the user data to context and context stores this data to localstorage, redirects to home
  - Home.jsx
    - the dashboard to display all the available vehicles with search functionality
    - loads the vehicle data upon component render & dispatches it over to context, which then stores it into local storage
    - data is fetched by making a GET request to API with bearer token attained upon authentication
    - only fetched the data of the first org as other org's had same id's and were not having any data
  - VehicleInfo.jsx
    - displays the Live location on google map component and the vehicle info based on the values provided in the URL
    - vid (vehicle ID) & vrn (vehicle registration number) are passed from the vehicle gallery component, based on the vid, info of the vehicle is loaded and sent over to info compinent and map component
- components
  - Card.jsx - displays vehicle stats which are passed on to it as proprs by the parent component
  - Gallery.jsx - renders the Card component within by passing each vehicle's data as per the vehicle data array
  - SearchBar.js - takes the list of vehicles from the context, filters out the vehicles that matches the search query and sends the filtered array to the gallery component
    - so far, only handled for VRN's (spaces and commas should be intact)
  - Navbar.jsx - places logo to the left which on click can redirect to home page, right side has profile pill which takes the user's name from context and signout functionality which deleted the data from localstorage when clicked
  - Loader.jsx - Loading animation that is placed when data/component is taking time to load
  - LiveMap.jsx - uses react-google-maps/api to render a google map screen based on the data provided to it, fetches live data from firebase realtime db

### resources & references

- [for google maps](https://www.youtube.com/watch?v=9e-5QHpadi0)
- stackoverflow for understanding how to add bearer token to axios
- tailwind docs
- firebase real time db docs
