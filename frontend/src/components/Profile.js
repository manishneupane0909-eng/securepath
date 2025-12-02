import React from "react";
import { motion } from "framer-motion";
import "./Profile.css";

function Profile({ role }) {
  if(role==="admin") {
    return (
      <section className="profile">
        <h2>Admin Profile</h2>
        <div className="profile-card">
          <p><strong>Name:</strong> Bank Admin</p>
          <p><strong>Email:</strong> admin@bank.com</p>
          <p><strong>Role:</strong> Administrator</p>
        </div>
      </section>
    );
  }
  return (
    <motion.section className="profile" initial={{opacity:0}} animate={{opacity:1}}>
      <h2>Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> Jane Doe</p>
        <p><strong>Email:</strong> janedoe@email.com</p>
        <button>Edit</button>
      </div>
    </motion.section>
  )
}
export default Profile;
