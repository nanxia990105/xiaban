
This is based on [create-react-app](https://create-react-app.dev/) and [electron](https://www.electronjs.org/), so Basic operations You can see two links.


## Available Scripts
In the project directory, you can run:

### `npm run start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm run el-start`
You can see electron started [show more](https://www.electronjs.org/)

###Build by exe (only windows) 
You run `npm run build` and will be generated `build` dir , 
and use `npm run packager-win` (This package command is use [electron-packager](https://electron.github.io/electron-packager/main/))
will be generated `release` dir.

### Some package of the problems I've had  
I run the executable packaged some runtime error `cant find module ` you can run `npm install` in build dir,  and npm install option need use `--save`, not use `--save-dev`.
And restart `npm run package-win`