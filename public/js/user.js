//searches HTML file for items with the class of 'logged-out' and 'logged-in'
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.user-details');

//changes the display style of the navbar elements based of the sign in status
const setupUI = (user) => {
    if (user) {
        //account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div class="col-md-6 col-xs-12">Display Name</div>
            <div class="col-md-6 col-xs-12">${doc.data().displayName}</div>
            <div class="col-md-6 col-xs-12">Account Type</div>
            <div class="col-md-6 col-xs-12">${doc.data().userType}</div>
            <div class="col-md-6 col-xs-12">Email</div>
            <div class="col-md-6 col-xs-12">${user.email}</div>
        `;
        accountDetails.innerHTML = html;
        });

        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        //hide account info
        accountDetails.innerHTML = '';
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