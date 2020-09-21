const galleryList = document.querySelector('.container-gallery');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const acountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

//photo gallery
const Photos = (data) =>{
    if(data.length){
        let html = '';
        data.forEach(doc =>{
            let gallery = doc.data();
            let list = `
            <div class="gallery">
            <a target="_blank" href=${gallery.image}>
                <img src=${gallery.image} alt="Cinque Terre" width="600" height="400">
              </a>
              <div class="desc">${gallery.title}</div>
        </div>
            `;
            html += list;
        })
        galleryList.innerHTML = html;
    }else{
        galleryList.innerHTML = '<h4 class="center-align">Login to See Photos</h4>'
    }
}

//display UI
const setupUI = (user) =>{
    if(user){
        if(user.admin){
            adminItems.forEach(item => item.style.display = 'block')
        }
        db.collection('users').doc(user.uid).get().then(doc =>{
               //display account details
            const html = `
            <div>${user.email}</div>
            <div>${doc.data().bio}</div>
            <div class="pink-text">${user.admin ? 'Admin' :''}</div>
    `;

     acountDetails.innerHTML = html;
        })

        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }else{
        acountDetails.innerHTML = '';

        adminItems.forEach(item => item.style.display = 'none')

        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}



//setup materialze components
document.addEventListener('DOMContentLoaded',function(){

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
})