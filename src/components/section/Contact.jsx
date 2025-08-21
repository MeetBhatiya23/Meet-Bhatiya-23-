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

        // Get form values
        const email = form.current.email.value.trim();
        const name = form.current.name.value.trim();
        const subject = form.current.subject.value.trim();
        const message = form.current.message.value.trim();

        // Check for empty fields
        if (!email || !name || !subject || !message) {
            toast.error("Please fill all the fields");
            return;
        }

        // Enhanced Email validation with multiple checks
        if (!isValidEmail(email)) {
            return;
        }

        // Enhanced Name validation with multiple checks
        if (!isValidName(name)) {
            return;
        }

        // Enhanced Subject validation with multiple checks
        if (!isValidSubject(subject)) {
            return;
        }

        // Enhanced Message validation with multiple checks
        if (!isValidMessage(message)) {
            return;
        }

        if (!form.current || !(form.current instanceof HTMLFormElement)) {
            console.error("Form element is not valid");
            return;
        }

        const formData = new FormData(form.current);
        const emailData = formData.get("email");
        const nameData = formData.get("name");
        const subjectData = formData.get("subject");
        const messageData = formData.get("message");
        const contentData = { email: emailData, name: nameData, subject: subjectData, message: messageData };
        console.log("contentData",contentData);

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

    // Powerful email validation function
    const isValidEmail = (email) => {
        // Basic format check
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address format");
            return false;
        }

        // Check for suspicious patterns
        const suspiciousPatterns = [
            /^test@/i,
            /^demo@/i,
            /^example@/i,
            /^fake@/i,
            /^spam@/i,
            /^admin@/i,
            /^user@/i,
            /^guest@/i,
            /^temp@/i,
            /^temp\d+@/i,
            /^user\d+@/i,
            /^test\d+@/i,
            /^demo\d+@/i,
            /^123@/i,
            /^abc@/i,
            /^xyz@/i,
            /^qwerty@/i,
            /^asdf@/i,
            /^password@/i,
            /^email@/i
        ];

        for (let pattern of suspiciousPatterns) {
            if (pattern.test(email)) {
                toast.error("Please enter a real email address, not a test email");
                return false;
            }
        }

        // Check for disposable email domains
        const disposableDomains = [
            'tempmail.org', '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
            'yopmail.com', 'throwaway.email', 'temp-mail.org', 'sharklasers.com',
            'getairmail.com', 'mailnesia.com', 'maildrop.cc', 'mailnesia.com',
            'mailnull.com', 'spam4.me', 'bccto.me', 'chacuo.net', 'dispostable.com',
            'fakeinbox.com', 'getairmail.com', 'guerrillamailblock.com', 'mailmetrash.com',
            'mailnesia.com', 'mailnull.com', 'mailpick.biz', 'mintemail.com',
            'mohmal.com', 'mytrashmail.com', 'nobugmail.com', 'nospam4.us',
            'nospamfor.us', 'nospammail.net', 'pookmail.com', 'rmqkr.net',
            'safe-mail.net', 'sogetthis.com', 'spam4.me', 'spamfree24.org',
            'spammotel.com', 'spamspot.com', 'spam.la', 'tempinbox.com',
            'thisisnotmyrealemail.com', 'tmailinator.com', 'trashmail.net',
            'trashmail.ws', 'wuzupmail.net', 'zoemail.net', 'zzz.com'
        ];

        const domain = email.split('@')[1]?.toLowerCase();
        if (disposableDomains.includes(domain)) {
            toast.error("Please use a real email address, not a temporary/disposable email");
            return false;
        }

        // Check for suspicious domain patterns
        const suspiciousDomains = [
            /\.test$/i,
            /\.example$/i,
            /\.invalid$/i,
            /\.local$/i,
            /\.localhost$/i,
            /\.fake$/i,
            /\.spam$/i,
            /^test\./i,
            /^example\./i,
            /^demo\./i,
            /^fake\./i,
            /^spam\./i
        ];

        for (let pattern of suspiciousDomains) {
            if (pattern.test(domain)) {
                toast.error("Please use a real email domain, not a test domain");
                return false;
            }
        }

        // Check email length (reasonable limits)
        if (email.length < 5 || email.length > 254) {
            toast.error("Email address length is invalid");
            return false;
        }

        // Check for consecutive dots or special characters
        if (/\.{2,}/.test(email) || /[._%+-]{2,}/.test(email)) {
            toast.error("Email contains invalid consecutive characters");
            return false;
        }

        // Check for valid TLD (top-level domain)
        const tld = domain?.split('.').pop();
        if (!tld || tld.length < 2 || tld.length > 6) {
            toast.error("Email domain format is invalid");
            return false;
        }

        // Check for common real domains (whitelist approach for extra security)
        const commonRealDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
            'icloud.com', 'aol.com', 'protonmail.com', 'mail.com', 'yandex.com',
            'zoho.com', 'fastmail.com', 'tutanota.com', 'gmx.com', 'web.de',
            'freenet.de', 't-online.de', '1und1.de', 'arcor.de', 'vodafone.de',
            'telekom.de', 'o2.de', 'vodafone.com', 'bt.com', 'sky.com',
            'talktalk.com', 'virginmedia.com', 'plusnet.com', 'ee.co.uk',
            'orange.fr', 'free.fr', 'laposte.net', 'wanadoo.fr', 'sfr.fr',
            'bouyguestelecom.fr', 'numericable.fr', 'neuf.fr', 'club-internet.fr',
            'aliceadsl.fr', 'cegetel.net', 'dartybox.com', 'bbox.fr', 'ovh.com',
            'online.fr', 'noos.fr', '9online.fr', 'tiscali.fr', 'libertysurf.fr',
            'infonie.fr', 'worldonline.fr', 'easynet.fr', 'tele2.fr', 'kertel.fr',
            'aol.fr', 'msn.fr', 'hotmail.fr', 'live.fr', 'outlook.fr',
            'gmail.fr', 'yahoo.fr', 'ymail.com', 'rocketmail.com', 'att.net',
            'verizon.net', 'comcast.net', 'charter.net', 'cox.net', 'earthlink.net',
            'juno.com', 'netzero.net', 'optimum.net', 'rr.com', 'sbcglobal.net',
            'suddenlink.net', 'windstream.net', 'frontier.com', 'centurylink.net',
            'qwest.net', 'embarqmail.com', 'bellsouth.net', 'ameritech.net',
            'pacbell.net', 'swbell.net', 'snet.net', 'flash.net', 'mindspring.com',
            'mindspring.net', 'bellsouth.com', 'ameritech.com', 'pacbell.com',
            'swbell.com', 'sbc.com', 'att.com', 'verizon.com', 'comcast.com',
            'charter.com', 'cox.com', 'earthlink.com', 'juno.com', 'netzero.com',
            'optimum.com', 'rr.com', 'sbcglobal.com', 'suddenlink.com',
            'windstream.com', 'frontier.com', 'centurylink.com', 'qwest.com',
            'embarqmail.com', 'bellsouth.com', 'ameritech.com', 'pacbell.com',
            'swbell.com', 'sbc.com', 'att.com', 'verizon.com', 'comcast.com',
            'charter.com', 'cox.com', 'earthlink.com', 'juno.com', 'netzero.com',
            'optimum.com', 'rr.com', 'sbcglobal.com', 'suddenlink.com',
            'windstream.com', 'frontier.com', 'centurylink.com', 'qwest.com'
        ];

        // Allow common real domains and also allow other domains (but with stricter validation)
        if (!commonRealDomains.includes(domain)) {
            // For non-common domains, add extra validation
            if (domain?.includes('test') || domain?.includes('demo') || domain?.includes('fake')) {
                toast.error("Please use a real email address from a legitimate provider");
                return false;
            }
        }

        return true;
    };

    // Powerful name validation function
    const isValidName = (name) => {
        // Check for empty or too short names
        if (!name || name.trim().length < 2) {
            toast.error("Name must be at least 2 characters long");
            return false;
        }

        // Check for suspicious patterns
        const suspiciousNamePatterns = [
            /^test\s/i,
            /^demo\s/i,
            /^example\s/i,
            /^fake\s/i,
            /^spam\s/i,
            /^user\s/i,
            /^guest\s/i,
            /^temp\s/i,
            /^admin\s/i,
            /^anonymous\s/i,
            /^unknown\s/i,
            /^nobody\s/i,
            /^someone\s/i,
            /^anyone\s/i,
            /^everyone\s/i,
            /^123\s/i,
            /^abc\s/i,
            /^xyz\s/i,
            /^qwerty\s/i,
            /^asdf\s/i
        ];

        for (let pattern of suspiciousNamePatterns) {
            if (pattern.test(name)) {
                toast.error("Please enter a real name, not a test or fake name");
                return false;
            }
        }

        // Check for full name requirement (must contain space)
        if (!name.includes(" ")) {
            toast.error("Please enter your full name (first and last name)");
            return false;
        }

        // Check for reasonable name length
        if (name.length > 100) {
            toast.error("Name is too long. Please enter a reasonable name");
            return false;
        }

        // Check for only letters, spaces, hyphens, and apostrophes
        const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
        if (!nameRegex.test(name)) {
            toast.error("Name contains invalid characters. Use only letters, spaces, hyphens, and apostrophes");
            return false;
        }

        // Check for consecutive spaces
        if (/\s{2,}/.test(name)) {
            toast.error("Name contains invalid consecutive spaces");
            return false;
        }

        // Check if name starts or ends with space
        if (name.startsWith(" ") || name.endsWith(" ")) {
            toast.error("Name cannot start or end with spaces");
            return false;
        }

        return true;
    };

    // Powerful subject validation function
    const isValidSubject = (subject) => {
        // Check for empty or too short subjects
        if (!subject || subject.trim().length < 5) {
            toast.error("Subject must be at least 5 characters long");
            return false;
        }

        // Check for suspicious patterns
        const suspiciousSubjectPatterns = [
            /^test\s/i,
            /^demo\s/i,
            /^example\s/i,
            /^fake\s/i,
            /^spam\s/i,
            /^hello\s*$/i,
            /^hi\s*$/i,
            /^hey\s*$/i,
            /^check\s*$/i,
            /^testing\s*$/i,
            /^demo\s*$/i,
            /^sample\s*$/i,
            /^123\s*$/i,
            /^abc\s*$/i,
            /^xyz\s*$/i,
            /^qwerty\s*$/i,
            /^asdf\s*$/i,
            /^password\s*$/i,
            /^email\s*$/i,
            /^message\s*$/i
        ];

        for (let pattern of suspiciousSubjectPatterns) {
            if (pattern.test(subject)) {
                toast.error("Please enter a meaningful subject, not a test or generic subject");
                return false;
            }
        }

        // Check for reasonable subject length
        if (subject.length > 200) {
            toast.error("Subject is too long. Please keep it concise");
            return false;
        }

        // Check for only letters, numbers, spaces, and common punctuation
        const subjectRegex = /^[a-zA-Z0-9\s\-_.,!?()]+$/;
        if (!subjectRegex.test(subject)) {
            toast.error("Subject contains invalid characters. Use only letters, numbers, spaces, and common punctuation");
            return false;
        }

        // Check for consecutive spaces
        if (/\s{2,}/.test(subject)) {
            toast.error("Subject contains invalid consecutive spaces");
            return false;
        }

        // Check if subject starts or ends with space
        if (subject.startsWith(" ") || subject.endsWith(" ")) {
            toast.error("Subject cannot start or end with spaces");
            return false;
        }

        return true;
    };

    // Powerful message validation function
    const isValidMessage = (message) => {
        // Check for empty or too short messages
        if (!message || message.trim().length < 10) {
            toast.error("Message must be at least 10 characters long");
            return false;
        }

        // Check for reasonable message length
        if (message.length > 1000) {
            toast.error("Message must be less than 1000 characters");
            return false;
        }

        // Check for suspicious patterns
        const suspiciousMessagePatterns = [
            /^test\s/i,
            /^demo\s/i,
            /^example\s/i,
            /^fake\s/i,
            /^spam\s/i,
            /^hello\s*$/i,
            /^hi\s*$/i,
            /^hey\s*$/i,
            /^check\s*$/i,
            /^testing\s*$/i,
            /^demo\s*$/i,
            /^sample\s*$/i,
            /^123\s*$/i,
            /^abc\s*$/i,
            /^xyz\s*$/i,
            /^qwerty\s*$/i,
            /^asdf\s*$/i,
            /^password\s*$/i,
            /^email\s*$/i,
            /^message\s*$/i,
            /^this\s+is\s+a\s+test/i,
            /^just\s+testing/i,
            /^demo\s+message/i,
            /^sample\s+text/i,
            /^fake\s+message/i,
            /^spam\s+content/i
        ];

        for (let pattern of suspiciousMessagePatterns) {
            if (pattern.test(message)) {
                toast.error("Please enter a meaningful message, not a test or generic message");
                return false;
            }
        }

        // Check for repetitive characters (spam detection)
        if (/(.)\1{4,}/.test(message)) {
            toast.error("Message contains too many repetitive characters");
            return false;
        }

        // Check for excessive punctuation
        if (/[!?.,;:]{3,}/.test(message)) {
            toast.error("Message contains excessive punctuation");
            return false;
        }

        // Check for excessive capitalization (shouting)
        const upperCaseCount = (message.match(/[A-Z]/g) || []).length;
        const totalLetters = (message.match(/[a-zA-Z]/g) || []).length;
        if (totalLetters > 0 && (upperCaseCount / totalLetters) > 0.7) {
            toast.error("Message contains too much capitalization");
            return false;
        }

        // Check for only valid characters
        const messageRegex = /^[a-zA-Z0-9\s\-_.,!?()@#$%&*+=:;"'<>[\]{}|\\/~`]+$/;
        if (!messageRegex.test(message)) {
            toast.error("Message contains invalid characters");
            return false;
        }

        // Check for consecutive spaces
        if (/\s{3,}/.test(message)) {
            toast.error("Message contains too many consecutive spaces");
            return false;
        }

        // Check if message starts or ends with space
        if (message.startsWith(" ") || message.endsWith(" ")) {
            toast.error("Message cannot start or end with spaces");
            return false;
        }

        // Check for minimum word count (at least 3 words)
        const wordCount = message.trim().split(/\s+/).length;
        if (wordCount < 3) {
            toast.error("Message must contain at least 3 words");
            return false;
        }

        return true;
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
                        placeholder="Your Full Name"
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
