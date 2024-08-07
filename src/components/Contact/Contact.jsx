import React from "react";
import './Contact.scss';
import CloseIcon from '../../pictures/circle.svg?react';
import Avatar from '../../pictures/avatar.svg';
import { Link } from "react-router-dom";

const Contact = ({ data, handleDeleteContact }) => {
    const { fields, avatar_url, tags } = data;

    const emailArray = fields.email || [];
    const emailValue = emailArray.length > 0 ? emailArray[0].value : '';

    const firstNameArray = fields['first name'] || [];
    const firstNameValue = firstNameArray.length > 0 ? firstNameArray[0].value : '';

    const lastNameArray = fields['last name'] || [];
    const lastNameValue = lastNameArray.length > 0 ? lastNameArray[0].value : '';

    const handleWrapperClick = () => {
        window.location.href = `/contact/${data.id}`;
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        handleDeleteContact(data.id);
    };

    return (
        <div className="contact-wrapper" onClick={handleWrapperClick}>
            <div className="contact-header">
                <div className="contact-info">
                    <img src={avatar_url ? avatar_url : Avatar} alt="Avatar" />
                    <div className="contact-name">
                        <p>{firstNameValue} {lastNameValue}</p>
                        <p>{emailValue}</p>
                    </div>
                </div>
                <button className="contact-delete-btn" onClick={handleDeleteClick}>
                    <CloseIcon />
                </button>
            </div>
            <div className="contact-tags">
                {tags?.map((tag, index) => (
                    <div className="contact-tag" key={index}>{tag.tag}</div>
                ))}
            </div>
        </div>
    );
};

export default Contact;
