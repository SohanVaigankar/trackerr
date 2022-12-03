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
    - PrivateRoute.jsx - renders login page if user is not authenticated  and children components if authenticated
- configs
    - firebase.config.jsx - initilization and configuration of firebase
- context
    - action.types.jsx - main actions on which the entire app works on
    - UserReducer.jsx - reducer for UserContext that performs operations according to the dispatched action
    - UserContext.jsx - central place that keeps a track of state values
- components
    - Login.jsx
        - performs user authentication, if authenticated stores the user data to context and context stores this data to localstorage, redirects to home
    - Home.jsx
        - the dashboard to display all the available vehicles with search functionality
         


### resources
-  [for google maps](https://www.youtube.com/watch?v=9e-5QHpadi0)
-  stackoverflow for understanding how to add bearer token to axios
- tailwind docs
- firebase real time db docs