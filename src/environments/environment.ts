// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,

    firebase: {
        apiKey: "AIzaSyCemDAlzTU7ZVYtxER4N0CSHR2_i7pOME0",
        authDomain: "blacksburg-bucketlist.firebaseapp.com",
        databaseURL: "https://blacksburg-bucketlist.firebaseio.com",
        storageBucket: "blacksburg-bucketlist.appspot.com",
        messagingSenderId: "544696650949"
    }
};
