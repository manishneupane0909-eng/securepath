import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://finnhub.io/api/v1/news?category=general&token=d43tvkpr01qge0cviu2gd43tvkpr01qge0cviu30")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
          setError("");
        } else {
          setArticles([]);
          setError("No news available or API error.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error loading news.");
        setLoading(false);
      });
  }, []);

  return (
    <section style={{
      margin:'2em 0',
      padding:'1em',
      background: "linear-gradient(135deg, #f6f7fb 60%, #c7eafd 100%)",
      borderRadius: "14px",
      boxShadow: "0 4px 18px #ccd3de40",
      minHeight: "390px",
      maxHeight: "460px"
    }}>
      <h2 style={{textAlign:"center",marginBottom:"1.1em"}}>Live News Feed</h2>
      {loading && <div>Loading news...</div>}
      {error && <div style={{color:"red",marginBottom:"1em"}}>{error}</div>}
      <div style={{
        maxHeight: "320px",
        overflowY: "auto",
        paddingRight:"6px"
      }}>
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "block"
        }}>
          {articles.map((article, i) => (
            <motion.li
              key={i}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: i*0.09 }}
              variants={{initial: { opacity: 0, y: 25 }, animate: { opacity: 1, y: 0 }}}
              style={{
                marginBottom: "1.25em",
                padding: "1em",
                background: "#fff",
                borderRadius: "9px",
                boxShadow: "0 2px 8px #d8e",
                display: "block"
              }}
            >
              <a href={article.url} target="_blank" rel="noopener" style={{
                fontWeight: "bold", color: "#233", fontSize: "1.1em", textDecoration: "none"
              }}>
                {article.headline}
              </a>
              <div style={{fontSize:"0.85em", color:"gray", margin:"0.2em 0"}}>
                {article.datetime ? new Date(article.datetime*1000).toLocaleString() : ""}
              </div>
              <div style={{fontSize:'0.96em', marginTop:'4px'}}>{article.summary}</div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default NewsFeed;
