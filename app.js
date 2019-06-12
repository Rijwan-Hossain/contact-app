import Contact from './Contact'
import { 
    createContact,   // arg - contact object 
    contactSize,     // no arg 
    viewContact,     // no arg 
    deleteContact,   // arg - index 
    searchContact    // arg - name 
} from './ContactList'; 

// ! Variables
let ul = document.getElementById('list'); 
ul.className = 'mb-5'; 
let resetBtn = document.getElementById('reset'); 


// ! Contact Length ! 
function declareSize() {
    let size = document.getElementById('contactSize')
    let length = contactSize() 

    if(length) {
        if(length === 1) 
            size.innerHTML = `App has 1 contact available`
        else 
            size.innerHTML = `App has ${length} contacts available`
    } 
    else { 
        size.innerHTML = 'No contact available'; 
        size.className = 'text-info'; 
    } 
    return length; 
}
declareSize(); 


// ! Create new contact ! 
!(function create() {
    let btn = document.getElementById('create') 
    btn.addEventListener('click', (e) => { 
        e.preventDefault(); 

        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value || null;

        let contact = new Contact({name, email, phone})
        createContact(contact); 

        declareSize(); 
        showContact(); 
    }) 
})(); 


// ! View Contact ! 
function showContact() { 
    // Delete if list exist 
    while (ul.firstChild) { 
        ul.removeChild(ul.firstChild); 
    } 
    
    let length = declareSize(); 
    let heading = document.getElementById('contacts'); 
    if(length) { 
        heading.innerHTML = 'All Contact(s)'; 

        // Create List 
        let contacts = viewContact(); 
        createList(contacts); 
    } 
    else { 
        heading.innerHTML = ''
    } 
} 
showContact(); 

function createList(contacts) { 
    // sort contact by name 
    contacts.sort(function sort(a, b) { 
        if(a.name > b.name) 
            { return 1; } 
        else if(a.name < b.name) 
            { return -1; }  
        else 
            return 0; 
    })


    // Display
    contacts.map((contact, i) => { 
        let li = document.createElement('li'); 
        li.className = 'list-group-item d-flex'

        // name - h4 
        let name = document.createElement('h4'); 
        name.innerHTML = contact.name; 
        name.style.width = '250px';
        li.append(name)

        // phone - h4 
        let phone = document.createElement('h4'); 
        phone.innerHTML = contact.phone; 
        phone.style.width = '250px';
        li.append(phone)

        // email - h4
        let email = document.createElement('h4'); 
        email.innerHTML = contact.email; 
        email.style.width = '250px';
        li.append(email) 

        // Delete - (ml-auto) 
        let button = document.createElement('button'); 
        button.innerHTML = 'Delete'; 
        button.className = 'btn btn-danger ml-auto';
        button.id = 'remove'; 
        li.append(button); 
        
        ul.append(li); 

        button.addEventListener('click', function () {
            removeContact(i)
        }) 
    }) 
} 




// ! Remove Contact ! 
function removeContact(i) { 
    let choice = confirm('Once deleted, cannot be undone'); 
    if(choice) { 
        deleteContact(i); 
        showContact(); 
    } 
} 

// ! Search Contact !
(function search() { 
    let input = document.getElementById('search'); 
    input.addEventListener('keypress', function(e) { 
        if(e.keyCode === 13) { 
            let name = input.value; 
            let output = searchContact(name); 
            
            if(typeof output === 'string') {
                alert(output); 
            } 
            else { 
                createSearchList(output); 
                resetBtn.style.display = 'block'; 
            } 
        } 
    }) 
})(); 


// ! Create search list ! 
function createSearchList(contacts) { 
    // Delete if list exist 
    while (ul.firstChild) { 
        ul.removeChild(ul.firstChild); 
    } 

    contacts.sort(function sort(a, b) { 
        if(a.name > b.name) 
            { return 1; } 
        else if(a.name < b.name) 
            { return -1; }  
        else 
            return 0; 
    })

    // Display
    contacts.map((contact, i) => { 
        let li = document.createElement('li'); 
        li.className = 'list-group-item d-flex'

        // name - h4 
        let name = document.createElement('h4'); 
        name.innerHTML = contact.name; 
        name.style.width = '250px';
        li.append(name)

        // phone - h4 
        let phone = document.createElement('h4'); 
        phone.innerHTML = contact.phone; 
        phone.style.width = '250px';
        li.append(phone)

        // email - h4
        let email = document.createElement('h4'); 
        email.innerHTML = contact.email; 
        email.style.width = '250px';
        li.append(email) 

        // Delete - (ml-auto) 
        let button = document.createElement('button'); 
        button.innerHTML = 'Delete'; 
        button.className = 'btn btn-danger ml-auto';
        button.id = 'remove'; 
        li.append(button); 
        
        ul.append(li); 
        
        button.addEventListener('click', function () {
            contacts.splice(i, 1); 
            createSearchList(contacts); 
        }) 
    }) 
}



// ! Reset Contact !
(function() {
    resetBtn.style.display = 'none'; 
    resetBtn.addEventListener('click', function() {
        showContact(); 
        resetBtn.style.display = 'none'; 
    }) 
})(); 
