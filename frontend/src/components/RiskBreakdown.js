const risks = [
  { factor: "Phishing Email Opened", impact: "High", date: "Oct 25" },
  { factor: "Password Updated", impact: "Low", date: "Oct 26" },
  { factor: "Login From New Device", impact: "Medium", date: "Oct 28" }
];

const RiskBreakdown = () => (
  <section style={{margin:"2em 0"}}>
    <h2>Risk Score Breakdown</h2>
    <table style={{width:'100%',background:'#fff',borderRadius:"8px",boxShadow:"0 4px 8px #ccc"}}>
      <thead>
        <tr>
          <th>Factor</th>
          <th>Impact</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {risks.map((r,i) => (
          <tr key={i}>
            <td>{r.factor}</td>
            <td>{r.impact}</td>
            <td>{r.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
export default RiskBreakdown;
