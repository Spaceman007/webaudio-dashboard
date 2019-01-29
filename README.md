# webaudio-dashboard
a web audio demo site, which
- is a react based project
- uses [umijs](https://umijs.org/) framework
- is aimed at providing some demos of the web audio api

# Run it
- `$ npm install` to install the npm modules. Or if you have yarn installed, you can just `$ yarn`
- `$ yarn dev` or `yarn start` to run a development environment
- `$ yarn build` to build it
- some resouces like mp3 is loaded from a local express server, so you may run:
    ```
    $ cd server
    $ node app.js
    ```
