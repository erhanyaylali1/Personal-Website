'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { send } from 'emailjs-com';

const Contact = () => {
  const [width, setWidth] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const infos = {
      from_name: name,
      to_name: 'Erhan Yaylali',
      message: content,
      reply_to: email,
    };

    const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || '';
    const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || '';
    const userId = process.env.NEXT_PUBLIC_EMAIL_USER_ID || '';

    send(serviceId, templateId, infos, userId)
      .then(() => {
        alert('Email Sent Successfully!');
        setName('');
        setEmail('');
        setContent('');
      })
      .catch(() => {
        alert('Email Could not be Sent!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container id="Contact">
      <FormContainer>
        <FormWrapper onSubmit={sendEmail}>
          <ContactHeader>
            <ContactIcon>📧</ContactIcon>
            <ContactTitle style={{ fontSize: width < 450 ? '25px' : '35px' }}>
              Contact Me
            </ContactTitle>
          </ContactHeader>

          <FormField>
            <FormLabel>Name Surname</FormLabel>
            <FormInput
              type="text"
              placeholder="Your Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>

          <FormField>
            <FormLabel>Email Address</FormLabel>
            <FormInput
              type="email"
              placeholder="Your Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>

          <FormField>
            <FormLabel>Message</FormLabel>
            <FormTextarea
              placeholder="Your Message"
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
              rows={5}
            />
          </FormField>

          <SendButton
            type="submit"
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </SendButton>
        </FormWrapper>
      </FormContainer>

      <ContactInfoContainer>
        <ContactInfo style={{ fontSize: width < 450 ? '12px' : '16px' }}>
          📧 E-Mail: erhanyaylali9@gmail.com
        </ContactInfo>
        <ContactInfo style={{ fontSize: width < 450 ? '12px' : '16px' }}>
          ☎️ Mobile Phone: +90 533 501 08 95
        </ContactInfo>
      </ContactInfoContainer>

      <SocialsContainer>
        <SocialLinks>
          <SocialLink
            href="mailto:erhanyaylali9@gmail.com"
            title="Send me an email"
          >
            <SocialIcon>📧</SocialIcon>
            <SocialLabel>GMAIL</SocialLabel>
          </SocialLink>

          <SocialLink
            href="https://www.linkedin.com/in/erhanyaylali/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit my LinkedIn profile"
          >
            <SocialIcon>💼</SocialIcon>
            <SocialLabel>LinkedIn</SocialLabel>
          </SocialLink>

          <SocialLink
            href="https://github.com/erhanyaylali1/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit my GitHub profile"
          >
            <SocialIcon>🐙</SocialIcon>
            <SocialLabel>Github</SocialLabel>
          </SocialLink>
        </SocialLinks>
      </SocialsContainer>
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  min-height: 95vh;
  background-color: #3d138d;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 80px 20px 40px;
  gap: 40px;

  @media (max-width: 768px) {
    padding: 100px 20px 40px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
`;

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
`;

const ContactIcon = styled.div`
  font-size: 32px;
  color: white;
`;

const ContactTitle = styled.h2`
  color: white;
  margin: 0;
  font-weight: 600;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormLabel = styled.label`
  color: white;
  font-size: 16px;
  font-weight: 500;
`;

const FormInput = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1aa39c;
    box-shadow: 0 0 0 3px rgba(26, 163, 156, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const FormTextarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  color: #333;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1aa39c;
    box-shadow: 0 0 0 3px rgba(26, 163, 156, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SendButton = styled.button`
  padding: 12px 24px;
  background-color: #1aa39c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;

  &:hover:not(:disabled) {
    background-color: #148a82;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 163, 156, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: 600px) {
    align-self: center;
    width: 100%;
  }
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  text-align: center;
`;

const ContactInfo = styled.p`
  color: white;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const SocialsContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 20px;
  }
`;

const SocialLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #bbb;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1.3rem;

  &:hover {
    color: white;
    transform: scale(1.1);
  }

  i {
    margin-right: 0 !important;
  }
`;

const SocialIcon = styled.span`
  font-size: 28px;
  display: inline-block;
`;

const SocialLabel = styled.p`
  margin: 0;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
`;
