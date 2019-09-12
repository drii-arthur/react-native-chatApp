import Firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyCIu_zfrpZ_zSGJl8DanPnyyXyrzuPiZE4",
    authDomain: "chatapp-34423.firebaseapp.com",
    databaseURL: "https://chatapp-34423.firebaseio.com",
    projectId: "chatapp-34423",
    storageBucket: "chatapp-34423.appspot.com",
    messagingSenderId: "202592818291",
    appId: "1:202592818291:web:0146d1b831704d9b138606"
};

let app = Firebase.initializeApp(firebaseConfig);

export const Database = app.database();
export const Auth = app.auth();