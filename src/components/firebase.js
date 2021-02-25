import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAS0K_eKsNtUKY7gDfgBNsXBNYsbMCGyxw",
    authDomain: "personal-blog-a2e4f.firebaseapp.com",
    projectId: "personal-blog-a2e4f",
    storageBucket: "personal-blog-a2e4f.appspot.com",
    messagingSenderId: "215543790889",
    appId: "1:215543790889:web:dd2ab1ab9957f68e5e8b38"
};

class Firebase
{
    constructor()
    {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    isInitialized()
    {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    login(email, password)
    {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout()
    {
        return this.auth.signOut();
    }

    getCurrentUsername()
    {
        return this.auth.currentUser;
    }

    addPost(title, subtitle, date, category, text, credit)
    {
        return this.db.doc(`posts/${title}`).set({
            title: title,
            subtitle: subtitle,
            date: date,
            category: category,
            text: text,
            credit: credit
        });
    }

    async getPost(title)
    {
        console.log("in");
        const reference = this.db.collection(`posts`).doc(`${title}`);
        const doc = await reference.get();
        return doc.data();
    }

    async getAllPosts()
    {
        const snapshot = await app.firestore().collection('posts').get();
        return snapshot.docs.map(doc => doc.data());
    }

    deletePost(title)
    {
        return this.db.collection('posts').doc(`${title}`).delete();
    }
}

export default new Firebase();