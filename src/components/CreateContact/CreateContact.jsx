import React, { useState } from "react";
import './CreateContact.scss'

const CreateContact = ({ onContactAdded }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('handleSubmit starts...');


        if (!firstName && !lastName) {
            setError('Please enter either first name or last name.');
            return;
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        const contactData = {
            fields: {
                'first name': [{ value: firstName }],
                'last name': [{ value: lastName }],
                email: [{ value: email }]
            },
            record_type: 'person',
            privacy: {
                edit: null,
                read: null,
            },
            owner_id: null,
        };

        try {
            const response = await fetch('/api/v1/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn',
                    'Origin': 'http://localhost:5175'
                },
                body: JSON.stringify(contactData),
            }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newContact = await response.json();

            setFirstName('');
            setLastName('');
            setEmail('');
            setError('');
            setShowToast(true);
            setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => {
                    setShowToast(false);
                    setFadeOut(false);
                }, 1000); // Duration of the fade-out transition
            }, 2000); // Time before starting fade-out
            onContactAdded(newContact);


        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };
    return (<>
        <div className="cc-wrapper">
            <h2 className="cc-title">Create Contact</h2>
            <form className="cc-form" onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                <label htmlFor="first-name" className="first-name">First Name</label>
                <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="last-name" className="last-name">Last Name</label>
                <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="email" className="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Add Contact</button>
            </form>
        </div>
        {showToast && (
            <div className={`toast ${fadeOut ? 'fade-out' : ''}`}>
                Contact added successfully!
            </div>
        )}
    </>
    );
}


export default CreateContact