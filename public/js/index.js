const eventList = document.querySelector('.events');
const myEventList = document.querySelector('.myEvents');
//searches HTML file for items with the class of 'logged-out' and 'logged-in'
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
var accountType;
var userName;
var img;

//changes the display style of the navbar elements based of the sign in status
const setupUI = (user) => {
    if (user) {
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

const setupEvents = (data) => {
    let html = '';
    data.forEach (doc => {
        const eventCurrent = doc.data();
        const li = `
            <div class="col-lg-4 col-md-6 col-xs-12 text-center">
                <img src='${eventCurrent.pfp}' style="width: 50%; border-radius: 50%;">
                <h3 style="padding-top: 1rem;">${eventCurrent.title}</h3>
                <p style="margin-bottom: 5px;">${eventCurrent.content}</p>
                <p style="font-weight: bold;">${eventCurrent.userType}</p>
            </div>
        `;
        html += li;
    });
    eventList.innerHTML = html;
}

const setupMyEvents = (data) => {
    let html = '';
    data.forEach (doc => {
        const eventCurrent = doc.data();
        const li = `
            <div class="col-lg-4 col-md-6 col-xs-12 text-center">
                <img src='${eventCurrent.pfp}' style="width: 50%; border-radius: 50%;">
                <h3 style="padding-top: 1rem;">${eventCurrent.title}</h3>
                <p style="margin-bottom: 5px;">${eventCurrent.content}</p>
                <p style="font-weight: bold;">${eventCurrent.userType}</p> 
            </div>
        `;
        html += li;
    });
    myEventList.innerHTML = html;
}

const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('events').add({
        title: createForm.title.value,
        content: createForm.content.value,
        userType: accountType,
        userID: userName,
        pfp: img
    }).then(() => {
        //close modal and reset form
        $('#event-modal').modal('hide');
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });  
});

//checks that the sign in status has changed before calling setupUI
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            //pulls in the user type for filtering purposes
            accountType = doc.data().userType;
            userName = user.uid;

            //only pulls in events that apply to the user type
            db.collection('events').where('userType', '!=', accountType).onSnapshot(snapshot => {
                setupEvents(snapshot.docs);
                setupUI(user);
            });
            db.collection('events').where('userID', '==', userName).onSnapshot(snapshot => {
                setupMyEvents(snapshot.docs);
            });
        });

        firebase.storage().ref('users/' + user.uid + '/profile.png').getDownloadURL().then(imgUrl => {
            img = imgUrl;
        });
    } else {
        setupUI();
        setupEvents([]);
        setupMyEvents([]);
    }
});

