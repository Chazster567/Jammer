//searches HTML file for items with the ID of 'logout'
const logout = document.querySelector('#logout');

//logs user out
logout.addEventListener('click', (e) => {
    //prevents action when an error is present
    e.preventDefault();
    
    //when the button is pressed and the user exists they are signed out
    auth.signOut().then(() => {
        console.log('user signed out');
    });
});