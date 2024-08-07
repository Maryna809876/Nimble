import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import Avatar from '../../pictures/avatar.svg';
import './ContactPage.scss';

const ContactPage = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTags, setNewTags] = useState("");
    const [tags, setTags] = useState([]);

    const fetchContact = async () => {
        try {
            const response = await fetch(`/api/v1/contact/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn',
                    'Origin': 'http://localhost:5175',
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${response.statusText}. Server response: ${errorText}`);
            }

            const data = await response.json();
            const contactData = data.resources[0];

            if (contactData) {
                setContact(contactData);
                setTags(contactData.tags || []);
            }
            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContact()
    }, [])

    ///
    const wtf = async () => {
        await fetch(`/api/v1/contact/${contact.id}/tags`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn',

            }
        }).then((response) => {
            return response.json();
        })
            .then((data) => {
                console.log(data.tags);
            });
    }

    useEffect(() => {
        wtf()
    }, [])

    ///
    console.log(contact.id);

    // console.log(contact.id);


    const handleAddTags = async (e) => {
        e.preventDefault();

        const tagsArray = newTags.split(',').map(tag => tag.trim()).filter(tag => tag);

        if (tagsArray.length === 0) return;

        try {
            const response = await fetch(`/api/v1/contact/${contact.id}/tags`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tags: tagsArray }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${response.statusText}. Server response: ${errorText}`);
            }

            const updatedTags = await response.json();
            setTags(prevTags => [...prevTags, ...updatedTags.tags]);
            setNewTags("");
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchContact();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!contact) return <p>No contact found</p>;

    const { fields, avatar_url } = contact;

    const emailArray = fields.email || [];
    const emailValue = emailArray.length > 0 ? emailArray[0].value : '';

    const firstNameArray = fields['first name'] || [];
    const firstNameValue = firstNameArray.length > 0 ? firstNameArray[0].value : '';

    const lastNameArray = fields['last name'] || [];
    const lastNameValue = lastNameArray.length > 0 ? lastNameArray[0].value : '';

    return (
        <div className="contact-page">
            <Container>
                <div className="contact-page-header">
                    <img src={avatar_url ? avatar_url : Avatar} alt="Avatar" />
                    <div className="contact-name">
                        <p>{firstNameValue} {lastNameValue}</p>
                        <p>{emailValue}</p>
                    </div>
                </div>
                <h2>Tags</h2>
                <div className="contact-tags">
                    {tags?.map((tag, index) => (
                        <div className="contact-tag" key={index}>{tag.tag}</div>
                    ))}
                </div>
                <form className="add-tag-form" onSubmit={handleAddTags}>
                    <input
                        type="text"
                        placeholder="Add new tags, separated by commas"
                        value={newTags}
                        onChange={(e) => setNewTags(e.target.value)}
                    />
                    <button type="submit">Add Tags</button>
                </form>
            </Container>
        </div>
    );
};

export default ContactPage;
