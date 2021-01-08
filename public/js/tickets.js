//searches HTML file for items with the class of 'logged-out' and 'logged-in'
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
var accountType;

//changes the display style of the navbar elements based of the sign in status
const setupUI = (user) => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            accountType = doc.data().userType;
        });
        
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

//checks that the sign in status has changed before calling setupUI
auth.onAuthStateChanged(user => {
    if (user) {
        //get data
        db.collection('events').onSnapshot(snapshot => {
            setupUI(user);
        });
    } else {
        setupUI();
    }
});