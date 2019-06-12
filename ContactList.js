
let contactList = []

const createContact = (contact) => {
    contactList.push(contact); 
} 


const contactSize = () => {
    return contactList.length
} 

const viewContact = () => {
    return contactList
} 

const deleteContact = (index) => {
    contactList.splice(index, 1); 
    console.log('Deleted: ' + index);
    
} 


const searchContact = (name) => { 
    let contact = contactList.filter(contact => { 
        if(contact.name.toUpperCase() === name.toUpperCase()) 
            return contact 
    }) 

    if(contact.length) return contact 
    else return 'No contact found'
} 

export { 
    createContact, 
    contactSize, 
    viewContact, 
    deleteContact, 
    searchContact
} 
