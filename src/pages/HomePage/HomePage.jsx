import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './HomePage.scss'
import CreateContact from '../../components/CreateContact/CreateContact';
import ContactsList from '../../components/ContactsList/ContactsList';
import Container from '../../components/Container/Container'


const HomePage = () => {
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
        console.log('starting fetchContacts...');

        const response = await fetch(`/api/v1/contacts`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response body:', errorText);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setContacts(data.resources);
        console.log('fetchContacts completed');
        console.log('Data:', data);


    };


    useEffect(() => {
        fetchContacts();
    }, []);

    const handleAddContact = async (newContact) => {
        const contactData = {
            id: uuidv4(),
            fields: {
                'first name': [{ value: newContact.fields['first name'][0].value }],
                'last name': [{ value: newContact.fields['last name'][0].value }],
                email: [{ value: newContact.fields.email[0].value }]
            },
            record_type: newContact.record_type,
            privacy: newContact.privacy,
            owner_id: newContact.owner_id
        };
        setContacts((prevContacts) => [contactData, ...prevContacts]);
    };

    const handleDeleteContact = async (contactId) => {
        try {
            const response = await fetch(`/api/v1/contact/${contactId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn',
                    'Origin': 'http://localhost:5175',
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('deleted sucsessfully');
            setContacts((prev) => prev.filter((contact) => contact.id !== contactId));

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <div className="home-page">
                <Container>
                    <CreateContact onContactAdded={handleAddContact} />
                    <ContactsList contacts={contacts} handleDeleteContact={handleDeleteContact} />
                </Container>
            </div>

        </>
    )
}

export default HomePage;
