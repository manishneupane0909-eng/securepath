import React from 'react';

// Emoji for icons—can replace with SVGs for even more polish!
const AboutUs = () => (
  <section style={{
    display: "flex",
    gap: "2em",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "2em 0"
  }}>
    {/* About Us Card */}
    <div style={{
      background: "#fff",
      borderRadius: "18px",
      boxShadow: "0 4px 24px #bdd6ea60",
      padding: "2em",
      minWidth: 300,
      maxWidth: 380,
      flex: "1 1 340px",
      textAlign: "center"
    }}>
      <div style={{fontSize: "2.4em"}}>🔒</div>
      <h2>About Us</h2>
      <p style={{fontWeight:"bold", color:"#2a5395"}}>Your Security, Our Mission</p>
      <p>
        At SecurePath, we exist to help you navigate the digital financial world with confidence and peace of mind. Our team of fraud fighters, data scientists, and customer advocates work together to detect threats and stop cybercrime before it affects real people. With a dedication to transparency, innovation, and service, we strive to make fraud prevention simple, accessible, and always effective for anyone who trusts us to protect their assets.
      </p>
    </div>

    {/* What We Do Card */}
    <div style={{
      background: "#f9fafb",
      borderRadius: "18px",
      boxShadow: "0 4px 20px #dfefff40",
      padding: "2em",
      minWidth: 300,
      maxWidth: 380,
      flex: "1 1 340px",
      textAlign: "center"
    }}>
      <div style={{fontSize:"2.3em"}}>⚡</div>
      <h2>What We Do</h2>
      <p style={{fontWeight:"bold", color: "#23b997"}}>Always Watching, Instantly Alerting</p>
      <p>
        Using real-time data and powerful machine learning, SecurePath detects risks where others can’t. Our dashboard shows you every alert, every suspicious login, every flagged transaction—instantly and clearly. Upload your data to analyze, see fraud trends across accounts, or get a proactive breakdown of your risk factors. With SecurePath, you control your safety and get help from smart alerts every step of the way.
      </p>
    </div>

    {/* How We Help You Card */}
    <div style={{
      background: "#fff",
      borderRadius: "18px",
      boxShadow: "0 4px 24px #ffd60050",
      padding: "2em",
      minWidth: 300,
      maxWidth: 380,
      flex: "1 1 340px",
      textAlign: "center"
    }}>
      <div style={{fontSize:"2.3em"}}>💡</div>
      <h2>How We Help You</h2>
      <p style={{fontWeight:"bold", color:"#ffbe00"}}>Stay Informed, Stay Protected</p>
      <p>
        SecurePath gives you all the tools and guidance needed to keep your money safe. We provide industry news, fraud tips, risk self-checks, and a dedicated support team to answer your questions. Our vision is to empower everyone to spot fraud before it happens and respond with confidence. Together, we’re building a safer future in digital finance—one secure account at a time.
      </p>
    </div>
  </section>
);

export default AboutUs;
