import React, { useEffect, useState } from 'react';
import Contact from '../Contact/Contact';
import './ContactsList.scss'

const ContactsList = ({ contacts, handleDeleteContact }) => {

    return (
        <div className="contact-list-wrapper">
            <h2 className="contact-list-title">Contacts</h2>


            {contacts.map(contact => (
                <Contact key={contact.id} data={contact} handleDeleteContact={handleDeleteContact} />

            ))}
        </div>
    );
};

export default ContactsList;
