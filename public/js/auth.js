//searches HTML file for items with the ID of 'signup-form'
const signupForm = document.querySelector('#signup-form');
let file = {};

function chooseFile(pfp) {
    file = pfp.target.files[0];
}

//adds user to database
signupForm.addEventListener('submit', (e) => {
    //prevents action when an error is present
    e.preventDefault();

    //pulls in values for various form fields
    const email = signupForm['inputEmail'].value;
    const password = signupForm['inputPassword'].value;

    //firebase function adds user to database
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        firebase.storage().ref('users/' + cred.user.uid + '/profile.png').put(file).then(function() {
            console.log('successfully uploaded');
        }).catch(error => {
            console.log(error.message);
        });

        return db.collection('users').doc(cred.user.uid).set({
            displayName: signupForm['inputUsername'].value,
            userType: signupForm['userType'].value
        });
    }).then(() => {
        //sends the user to the sign in page and resets the form
        window.location = 'account.html';
        signupForm.reset();
    });
});