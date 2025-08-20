import React, { useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import StartCanvas from "../canvas/Stars";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-contnet: center;
    position: relative;
    z-index: 1;
    align-items: center;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;
const Title = styled.div`
    font-size: 52px;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
    }
`;
const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const ContactForm = styled.form`
    width: 95%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    background-color: rgba(17, 25, 40, 0.83);
    border: 1px solid rgba(255, 255, 255, 0.125);
    padding: 32px;
    border-radius: 12px;
    box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
    margin-top: 28px;
    gap: 12px;
`;
const ContactTitle = styled.div`
    font-size: 28px;
    margin-bottom: 6px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
`;
const ContactInput = styled.input`
    flex: 1;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.text_secondary + 50};
    outline: none;
    font-size: 18px;
    color: ${({ theme }) => theme.text_primary};
    border-radius: 12px;
    padding: 12px 16px;
    &:focus {
        border: 1px solid ${({ theme }) => theme.primary};
    }
`;
const ContactInputMessage = styled.textarea`
    flex: 1;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.text_secondary + 50};
    outline: none;
    font-size: 18px;
    color: ${({ theme }) => theme.text_primary};
    border-radius: 12px;
    padding: 12px 16px;
    &:focus {
        border: 1px solid ${({ theme }) => theme.primary};
    }
`;
const ContactButton = styled.input`
    width: 100%;
    text-decoration: none;
    text-align: center;
    background: hsla(271, 100%, 50%, 1);
    padding: 13px 16px;
    margin-top: 2px;
    border-radius: 12px;
    border: none;
    color: ${({ theme }) => theme.text_primary};
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
`;

const Contact = () => {
    const form = useRef();
    const handelSubmit = (e) => {
        e.preventDefault();
        if (!form.current || !(form.current instanceof HTMLFormElement)) {
            console.error("Form element is not valid");
            return;
        }
        const formData = new FormData(form.current);
        const email = formData.get("email");
        const name = formData.get("name");
        const subject = formData.get("subject");
        const message = formData.get("message");
        const contentData = { email, name, subject, message };
        console.log({ email, name, subject, message });

        emailjs
            .send(
                "service_zzrzjdu", // your EmailJS service ID
                "template_zoqzg6t", // your EmailJS template ID
                contentData,
                "9XWdHm35MK6kbTbRK" // your public key
            )
            .then(
                (result) => {
                    toast.success("Message Sent!");
                    form.current.reset(); // ✅ Reset form after successful send
                },
                (error) => {
                    toast.error("Failed to send message.");
                    console.error("EmailJS Error:", error);
                }
            );
    };

    return (
        <Container id="Contact">
            <StartCanvas />
            <Wrapper>
                <Title>Contact</Title>
                <Desc
                    style={{
                        marginBottom: "40px",
                    }}
                >
                    Feel free to reach out to me for any questions or
                    opportunities!
                </Desc>
                <ContactForm ref={form}>
                    <ContactTitle>Email Me 🚀</ContactTitle>
                    <ContactInput
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        required
                    />
                    <ContactInput
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        required
                    />
                    <ContactInput
                        type="text"
                        placeholder="Subject"
                        name="subject"
                        required
                    />
                    <ContactInputMessage
                        placeholder="Message"
                        name="message"
                        rows={4}
                        required
                    />
                    <ContactButton
                        type="button"
                        value="Send"
                        onClick={(e) => handelSubmit(e)}
                    />
                </ContactForm>
            </Wrapper>
        </Container>
    );
};

export default Contact;
