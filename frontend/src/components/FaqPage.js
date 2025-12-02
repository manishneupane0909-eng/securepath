import React from "react";

const faqs = [
  {
    q: "How does SecurePath detect fraud?",
    a: "We use pattern analysis to flag abnormal activity in real time."
  },
  {
    q: "Is my data private and secure?",
    a: "Yes. All data is encrypted and used only for fraud protection."
  },
  {
    q: "What should I do if I receive a fraud alert?",
    a: "Review the transaction. Contact support if it's not yours."
  }
];

const FaqPage = () => (
  <section style={{
    margin: '2em auto',
    padding: '2em 0',
    maxWidth: '800px'
  }}>
    <h1 style={{ textAlign: "center", marginBottom: "2em" }}>Frequently Asked Questions</h1>
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "2em"
    }}>
      {faqs.map(({q, a}) => (
        <div
          key={q}
          style={{
            background: "#fff",
            borderRadius: "14px",
            boxShadow: "0 3px 18px #ccd3de40",
            padding: "1.4em 1.6em"
          }}
        >
          <h3 style={{ marginBottom: ".6em", fontWeight: "bold" }}>{q}</h3>
          <div style={{ fontSize: "1.07em", color: "#233" }}>{a}</div>
        </div>
      ))}
    </div>
  </section>
);

export default FaqPage;
