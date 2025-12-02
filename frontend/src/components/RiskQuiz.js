import React, { useState } from 'react';

const questions = [
  { q: "Do you reuse passwords?", risk: "Medium" },
  { q: "Have you clicked links in suspicious emails?", risk: "High" },
  { q: "Do you use two-factor authentication?", risk: "Low" }
];

const RiskQuiz = () => {
  const [score, setScore] = useState(null);
  const [checked, setChecked] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = "Low";
    if (checked[0]) result = "Medium";
    if (checked[1]) result = "High";
    setScore(result);
  };

  return (
    <section style={{margin:'2em 0'}}>
      <h2>Self-Assessment: Is your account at risk?</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, i) => (
          <label key={i} style={{display:'block'}}>
            <input type="checkbox" checked={checked[i] || false}
                   onChange={e=>setChecked({...checked,[i]:e.target.checked})} />
            {q.q}
          </label>
        ))}
        <button type="submit" style={{marginTop:'1em'}}>Check My Risk</button>
      </form>
      {score && <div>Your risk is: <b>{score}</b></div>}
    </section>
  );
};
export default RiskQuiz;
