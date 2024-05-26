import React, { useState } from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import styles from './Contact.module.css';
import axios from "axios";

const Contact = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/"); // Redirect to the login page
        window.close(); // Close all tabs
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3000/contact', {
            name,
            email,
            text
        })
        .then(res => {
            console.log(res.data);
            alert('Message sent successfully!'); // Show success alert
            // Reset form fields
            setName('');
            setEmail('');
            setText('');
        })
        .catch(err => {
            console.log(err);
            alert('Failed to send the message. Please try again.'); // Show error alert
        });
    }

    return (
        <div className={styles.contactBody}>
            <Navbar className={styles.navbar} expand="lg">
                <Container>
                    <Navbar.Brand href="/Dashboard">BookFinder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link className="nav-link" to="/Dashboard">Home</Link>
                            <Link className="nav-link" to="/about" target="_blank">About</Link>
                            <Link className="nav-link" to="/contact" target="_blank">Contact</Link>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section className={styles.contact}>
                <div className={styles.content}>
                    <h2>Contact us</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus atque temporibus similique</p>
                </div>
                <div className={styles.container}>
                    <div className={styles.contactinfo}>
                        <div className={styles.box}>
                            <div className={styles.icon}><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                            <div className={styles.text}>
                                <h3>Address</h3>
                                <p>127, golden nager, <br />chidambaram,  <br /> 608001</p>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.icon}><i className="fa fa-phone" aria-hidden="true"></i></div>
                            <div className={styles.text}>
                                <h3>Phone</h3>
                                <p>+91-9790334323</p>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.icon}><i className="fa fa-envelope-o" aria-hidden="true"></i></div>
                            <div className={styles.text}>
                                <h3>E-mail</h3>
                                <p>sabasaba85603@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contactform}>
                        <form onSubmit={handleSubmit}>
                            <h2>Send message</h2>
                            <div className={styles.inputbox}>
                                <input type="text" value={name} required onChange={e => setName(e.target.value)} />
                                <span>Full Name</span>
                            </div>
                            <div className={styles.inputbox}>
                                <input type="email" value={email} required onChange={e => setEmail(e.target.value)} />
                                <span>Email</span>
                            </div>
                            <div className={styles.inputbox}>
                                <textarea value={text} required onChange={e => setText(e.target.value)}></textarea>
                                <span>Type your message...</span>
                            </div>
                            <div className={styles.inputbox}>
                                <button className={styles.sendbtn} type="submit">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
