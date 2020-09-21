//add admin cloud functions
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email:adminEmail}).then(result =>{
        console.log(result);
    });
});

//track users
auth.onAuthStateChanged(user =>{
    if(user){

         /*Verify the admin*/ 
         user.getIdTokenResult().then(idTokenResult =>{
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        })
        //getting photos from the db
        db.collection('photos').onSnapshot(snapshots =>{
            Photos(snapshots.docs);
        },err =>{
            console.log(err.message);
        })
    }else{
        Photos([])
        setupUI()
    }
})

//create a photo
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    db.collection('photos').add({
        title:createForm['title'].value,
        image:createForm['file'].value
    }).then(() =>{
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err =>{
        createForm.querySelector('.error').innerHTML = err.message;
    })
})


//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        return db.collection('users').doc(cred.user.uid).set({
            bio:signupForm['signup-bio'].value
        })
    }).then(() =>{
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch(err =>{
        signupForm.querySelector('.error').innerHTML = err.message;
    })
})


//sign out
const logout = document.querySelector('#logout');
logout.addEventListener('click',() =>{
    auth.signOut();
})

//signin
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then(cred =>{
       
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch(err =>{
        loginForm.querySelector('.error').innerHTML = err.message;
    })
})
