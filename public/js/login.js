//searches HTML file for items with the ID of 'signup-form'
const signinForm = document.querySelector('#signin-form')

//check for user in database and logs them in
signinForm.addEventListener('submit', (e) => {
    //prevents action when an error is present
    e.preventDefault();

    //uses form data for each field
    const email = signinForm['loginEmail'].value;
    const password = signinForm['loginPassword'].value;

    //checks that user credentials match and redirects to home page
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
        window.location = 'index.html';
        signinForm.reset();
    });
});