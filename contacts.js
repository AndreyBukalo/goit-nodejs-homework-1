const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.resolve('db/contacts.json');

const parsedContacts = async () => {
    const contactsList = await fs.readFile(contactsPath, 'utf-8');
    const contactsData = JSON.parse(contactsList);
    return contactsData;

};

async function listContacts() {
return await parsedContacts();
}

async function getContactById(contactId) {
   const contactsList = await parsedContacts();
    const resultData = contactsList.find(contact => contact.id === contactId);
    return resultData;
}

async function removeContact(contactId) {
    const contactsList = await parsedContacts();
     const removedData = contactsList.find(
       (contact) => contact.id === contactId
     );
 const updatedContacts = contactsList.filter(
   (contact) => contact.id !== contactId
 );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return removedData;
}

async function addContact(name, email, phone) {
    const contactsList = await parsedContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    contactsList.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}