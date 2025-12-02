import React, { useState } from 'react';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    // Optionally send to backend/API or emulated send here
  };

  return (
    <section style={{ marginTop: '2em', maxWidth: '400px' }}>
      <h2>Contact Us</h2>
      {sent ? <div>Thank you for reaching out! We'll get back to you soon.</div> :
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Your Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{marginBottom: "1em", width: "100%", padding:"0.5em"}}/>
        <textarea placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} required style={{marginBottom: "1em", width: "100%", padding:"0.5em", minHeight: "70px"}}/>
        <button type="submit" style={{padding:"0.6em 1em"}}>Send</button>
      </form>}
    </section>
  );
};
export default ContactUs;
