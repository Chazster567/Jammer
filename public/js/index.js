const eventList = document.querySelector('.events');
const setupEvents = (data) => {
    let html = '';
    data.forEach(doc => {
        const event = doc.data();
        const li = `
            <div class="col-lg-4 col-md-6 col-xs-12 text-center">
                <h3>${event.title}</h3>
                <p>${event.content}</p>
            </div>
        `;
        html += li;
    });
    eventList.innerHTML = html;
}

//searches HTML file for items with the class of 'logged-out' and 'logged-in'
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

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

//checks that the sign in status has changed before calling setupUI
auth.onAuthStateChanged(user => {
    if (user) {
        //get data
        db.collection('events').onSnapshot(snapshot => {
            setupEvents(snapshot.docs);
            setupUI(user);
        });
    } else {
        setupUI();
        setupEvents([]);
    }
});

const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('pressed');
    db.collection('events').add({
        title: createForm.title.value,
        content: createForm.content.value
    }).then(() => {
        //close modal and reset form
        $('#event-modal').modal('hide');
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });
});