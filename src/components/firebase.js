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
        const reference = this.db.collection(`posts`).doc(`${title}`);
        const doc = await reference.get();
        if (doc.data())
            return doc.data();
        return null;
    }

    async getAllPosts()
    {
        const snapshot = await app.firestore().collection('posts').get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getRecentPosts(title)
    {
        var recent = [], ret = [], counter = 0;
        const snapshot = await app.firestore().collection('posts').get();
        snapshot.docs.map(doc => recent.push(doc.data()));
        var sorted = recent.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        for (var i=0; i<sorted.length; i++)
        {
            if (sorted[i].title !== title && new Date(sorted[i].date.seconds * 1000) <= new Date().setHours(23, 59, 59, 59))
            {
                ret.push(sorted[i]);
                counter++;
            }
            if (counter === 3)
                break;
        }
        return ret;
    }

    async getSixRecentPosts()
    {
        var recent = [], ret = [];
        const snapshot = await app.firestore().collection('posts').get();
        snapshot.docs.map(doc => recent.push(doc.data()));
        var sorted = recent.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        for (var i=0; i<6; i++)
            if (new Date(sorted[i].date.seconds * 1000) <= new Date().setHours(23, 59, 59, 59))
                ret.push(sorted[i]);
        return ret;
    }

    // async getAllPostsByCategory(category)
    // {
    //     console.log('====================================');
    //     console.log('in');
    //     console.log('====================================');
    //     var ret = [];
    //     const snapshot = await app.firestore().collection('posts').where("category", "==", category).get();
    //     snapshot.docs.map(doc => 
    //         ret.push({title: doc.data().title, subtitle: doc.data(), date: doc.data().date}));
    //     return ret;
    // }

    async getAllPostsByCategory(category)
    {
        return new Promise((resolve, reject) => {
            let posts = [];
            app.firestore().collection('posts').where("category", "==", category).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => posts.push(doc.data()));
                resolve(posts);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    // async getPostsByCategories(category)
    // {
    //     var posts = [], ret = [];
    //     const snapshot = await app.firestore().collection('posts').get();
    //     snapshot.docs.map(doc => 
    //     {
    //         if (doc.data().category === category)
    //             posts.push(doc.data())
    //     });
    // }

    async getAllCategories()
    {
        var posts = [], ret = [];
        const snapshot = await app.firestore().collection('posts').get();
        snapshot.docs.map(doc => posts.push(doc.data().category));
        for (var i = 0; i < posts.length; i++)
            if (ret.indexOf(posts[i]) == -1)
                ret.push(posts[i]);
        return ret;
    }

    async categoriesDistribution()
    {
        var categories = [], a = [], b = [], ret = [], prev;
        const snapshot = await app.firestore().collection('posts').get();
        snapshot.docs.map(doc => 
        {
            if (new Date(doc.data().date.seconds * 1000) <= new Date().setHours(23, 59, 59, 59))
                categories.push(doc.data().category)
        });
        categories.sort();
        for (var i = 0; i<categories.length; i++) 
        {
            if (categories[i] !== prev) 
            {
                a.push(categories[i]);
                b.push(1);
            } 
            else
                b[b.length-1]++;
            prev = categories[i];
        }
        for (var i=0; i<a.length; i++)
            ret.push({category: a[i], occurrences: b[i]});
        return ret.sort((a,b) => (a.occurrences < b.occurrences) ? 1 : ((b.occurrences < a.occurrences) ? -1 : 0));
    }

    async editPost(title, subtitle, category, date, text)
    {
        this.db.collection('posts').doc(`${title}`).update({
            subtitle: subtitle,
            category: category,
            date: date,
            text: text
        });
    }

    deletePost(title)
    {
        var _this = this;
        const storageRef = this.storage.ref();

        // delete main image
        var mainImageRef = storageRef.child(`posts/${title}/main/main image`);
        mainImageRef.delete().then(() => {
            console.log("Main image deleted");
        }).catch((error) => {
            console.log(error.message);
        });
        
        // delete other images
        storageRef.child(`posts/${title}`).listAll()
        .then((res) => {
            res.items.forEach((itemRef) => {
                itemRef.getDownloadURL().then(function(url)
                {
                    _this.storage.refFromURL(url).delete().then(() => {
                        console.log("Deleted");
                    }).catch(err => console.log(err));
                });
            });
        }).catch((error) => {
            console.log(error.message);
        });
        return this.db.collection('posts').doc(`${title}`).delete();
    }
}

export default new Firebase();