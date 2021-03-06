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

    addPost(title, subtitle, date, category, text, credit, tags)
    {
        return this.db.doc(`posts/${title}`).set({
            title: title,
            subtitle: subtitle,
            date: date,
            category: category,
            text: text,
            credit: credit,
            tags: tags,
            comments: []
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

    async getAllPostsByCategory(category)
    {
        var ret = [];
        const snapshot = await app.firestore().collection('posts').where("category", "==", category).get();
        snapshot.docs.map(doc => 
            ret.push({title: doc.data().title, 
                      subtitle: doc.data().subtitle, 
                      date: doc.data().date,
                      comments: doc.data().comments}));
        return ret;
    }

    async getAllPostsByTags(tag)
    {
        var ret = [];
        const snapshot = await app.firestore().collection('posts').where("tags", "array-contains", tag).get();
        snapshot.docs.map(doc => 
            ret.push({title: doc.data().title, 
                      subtitle: doc.data().subtitle, 
                      category: doc.data().category,
                      date: doc.data().date,
                      comments: doc.data().comments}));
        return ret;
    }

    async getPostsPerMonths()
    {
        var months = [
            {month: 'ינואר', amount: 0},
            {month: 'פברואר', amount: 0},
            {month: 'מרץ', amount: 0},
            {month: 'אפריל', amount: 0},
            {month: 'מאי', amount: 0},
            {month: 'יוני', amount: 0},
            {month: 'יולי', amount: 0},
            {month: 'אוגוסט', amount: 0},
            {month: 'ספטמבר', amount: 0},
            {month: 'אוקטובר', amount: 0},
            {month: 'נובמבר', amount: 0},
            {month: 'דצמבר', amount: 0}];
        const snapshot = await app.firestore().collection('posts').get();
        snapshot.docs.map(doc => {
            var casting = new Date(doc.data().date.seconds * 1000);
            if (casting.getFullYear() === new Date().getFullYear())
                months[casting.getMonth()].amount++;
        });
        return months;
    }

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

    async categoriesDistribution(origin)
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
        if (origin === 'homepage')
        {
            for (var i=0; i<a.length; i++)
                if (b[i] >= 3)
                    ret.push({category: a[i], occurrences: b[i]});
        }
        else
        {
            for (var i=0; i<a.length; i++)
                ret.push({category: a[i], occurrences: b[i]});
        }
        return ret.sort((a,b) => (a.occurrences < b.occurrences) ? 1 : ((b.occurrences < a.occurrences) ? -1 : 0));
    }

    async tagsDistribution()
    {
        var tags = [], a = [], b = [], ret = [], prev;
        const snapshot = await app.firestore().collection('posts').get();
        snapshot.docs.map(doc => 
        {
            if (new Date(doc.data().date.seconds * 1000) <= new Date().setHours(23, 59, 59, 59))
                doc.data().tags.map(tag => tags.push(tag));
        });
        tags.sort();
        for (var i = 0; i<tags.length; i++) 
        {
            if (tags[i] !== prev) 
            {
                a.push(tags[i]);
                b.push(1);
            } 
            else
                b[b.length-1]++;
            prev = tags[i];
        }
        for (var i=0; i<a.length; i++)
            if (b[i] >= 2)
                ret.push({tag: a[i], occurrences: b[i]});
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

    async addComment(title, comment)
    {
        var reference = this.db.collection("posts").doc(`${title}`);
        reference.update({
            comments: app.firestore.FieldValue.arrayUnion(comment)
        });
    }

    async addAdminComment(title, index, comment)
    {
        const reference = this.db.collection(`posts`).doc(`${title}`);
        const doc = await reference.get();
        var comments = doc.data().comments;
        comments.splice(index, 0, comment);
        console.log(comments);
        reference.update({ comments: comments });
    }

    deleteComment(title, comment)
    {
        var reference = this.db.collection("posts").doc(`${title}`);
        reference.update({
            comments: app.firestore.FieldValue.arrayRemove(comment)
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

    async addSubscribe(email)
    {
        var reference = this.db.collection('subscribes').doc('users');
        reference.update({
            emails: app.firestore.FieldValue.arrayUnion(email)
        });
    }

    async unsubscribe(email)
    {
        var reference = this.db.collection('subscribes').doc('users');
        const doc = await reference.get();
        var exists = false;
        if (doc.data())
            doc.data().emails.map((element) => 
            {
                if (element === email)
                    exists = true;
            });
        if (exists)
        {
            reference.update({
                emails: app.firestore.FieldValue.arrayRemove(email)
            });
            return true;
        }
        return false;
    }

    async getListOfSubscribes()
    {
        const reference = this.db.collection('subscribes').doc('users');
        const doc = await reference.get();
        if (doc.data())
            return doc.data().emails;
        return null;
    }
}

export default new Firebase();