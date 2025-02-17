Welcome to finder dog "my-dog" application.

# To run it locally

- Clone directory locally from github repository.
- Run command `npm install` to install all dependencies.
- Run command `npm start` to run application. 


# The application features:

- [Deployed app](https://find-the-friends.vercel.app/)

- The first page of app is the 'Sign in" page where user is required enter **Name** and **Email** to be authenticated. The "Sign in" button is disabled until required fields will be provided with valid email.

- After authentication user will be redirected to **Home** page where they could see paginated list of the available dogs. Each dog is displayed as a card with picture of the dog, name and other information.

- Number of dogs per page is 25. User could click to any page to retrieve information about the next 25 dogs.

- For the user convenience paginated pages were added at the top and bottom. Also page has **Go to bottom** and **Go to Top** buttons for easier moving.

- The dogs on the page are sorted by breed in the **ascending** alphabetical order by default. User could change the order to descending/ascending as well. Please note the dogs on the 1st page have the same breed, so sorting won't be noticeable. **Please use the 2nd page to try sort option.** The drop down sort menu will contains only those breeds which are on the current page. For example, if all 25 dogs on the page are only two types of breeds: Chihuahua and Silky Terrier, user will only see the two options to sort. 

- The dogs on the page could be filtered by breed. The **filter** button is disabled if all dogs on the page have the same breed. **Please use the 2nd page to see "filter" option.** The "filter" bar also has tooltip to let user know why the "filtering" is disabled. There is the separate button to reset filter result. 

- There is the link to "Search" page which redirect user to Search component where user could search dog by dog id. The "Search" page will be opened in the new tab. User could click to the "Search" button, to the "Search" icon or hit "Enter" key to initiate search. 

- Both "Home" and "Search" pages have "Sign out" button. Clicking on it will bring user to "Sign in" page.


****** Below is the original info provided when React app was created. ******

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
