//searches HTML file for items with the ID of 'signup-form'
const signupForm = document.querySelector('#signup-form')

//adds user to database
signupForm.addEventListener('submit', (e) => {
    //prevents action when an error is present
    e.preventDefault();

    //pulls in values for various form fields
    const username = signupForm['inputUsername'].value;
    const email = signupForm['inputEmail'].value;
    const password = signupForm['inputPassword'].value;

    //firebase function adds user to database
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        //adds a display name for the user
        var user = auth.currentUser;
        user.updateProfile({
            displayName: username
        });

        //sends the user to the sign in page and resets the form
        console.log(cred);
        window.location = 'account.html';
        signupForm.reset();
    });
});