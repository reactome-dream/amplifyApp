import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// };
const config = {
    apiKey: 'AIzaSyANZUl3xhELbnszkZnZ3DcY4ShSNDlbTQw',
    authDomain: 'fir-inreact-ee7ab.firebaseapp.com',
    databaseURL: 'https://fir-inreact-ee7ab-default-rtdb.firebaseio.com',
    projectId: 'fir-inreact-ee7ab',
    storageBucket: 'fir-inreact-ee7ab.appspot.com',
    messagingSenderId: '304162485178',
};

const REACT_APP_CONFIRMATION_EMAIL_REDIRECT='http://localhost:3000'

class Firebase {

    constructor() {
        app.initializeApp(config)

        this.emailAuthProvider = app.auth.EmailAuthProvider;
        this.auth = app.auth();
        this.db = app.database();
        this.store = app.storage();
        // app.database.enableLogging(function(message) {
        //     console.log("[FIREBASE]", message);
        // });

        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
    }

    // *** AUTH API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    doSignInWithFacebook = () =>
        this.auth.signInWithPopup(this.facebookProvider);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    // *** Merge Auth and DB(real) User API *** //
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({
            url: REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        });

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');


    deleteThisUser = (userId) => {
        this.db.ref(`users/${userId}`).remove();
    }
}

export default Firebase;

