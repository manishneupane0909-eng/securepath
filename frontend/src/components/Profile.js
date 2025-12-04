import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Profile.css";

export default function Profile({ role }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    job: "",
    industry: "",
    securityLevel: "",
    profileImage: null,
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userProfile"));
    if (data) {
      setProfile(data);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profileImage: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (role === "admin") {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Admin Profile</h2>
        <div className="space-y-2 text-cyber-text-secondary">
          <p><strong className="text-white">Name:</strong> Bank Admin</p>
          <p><strong className="text-white">Email:</strong> admin@bank.com</p>
          <p><strong className="text-white">Role:</strong> Administrator</p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 rounded-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Edit Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <label className="cursor-pointer inline-block">
            <div className="relative">
              <img
                src={
                  profile.profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-cyber-primary/30 mx-auto hover:border-cyber-primary transition-colors"
              />
              <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 bg-cyber-primary text-black px-3 py-1 rounded-full text-xs font-bold">
                Change Photo
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["name", "Full Name"],
            ["email", "Email Address"],
            ["phone", "Phone Number"],
            ["country", "Country"],
            ["job", "Job Title"],
            ["industry", "Industry"],
            ["securityLevel", "Security Awareness Level"],
          ].map(([key, label]) => (
            <div key={key} className={key === "industry" || key === "securityLevel" ? "md:col-span-2" : ""}>
              <label className="block text-sm font-semibold text-cyber-text-secondary mb-2">
                {label}
              </label>
              <input
                type="text"
                name={key}
                value={profile[key] || ""}
                onChange={handleChange}
                required={key !== "industry" && key !== "securityLevel"}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-cyber-text-muted focus:outline-none focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-all"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-cyber-primary text-black font-bold rounded-lg hover:bg-cyber-primary/90 shadow-neon-cyan transition-all hover:scale-[1.02] active:scale-[0.98] mt-6"
        >
          Save Changes
        </button>

        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-cyber-success/20 border border-cyber-success/30 rounded-lg text-cyber-success text-center font-bold"
          >
            ✔ Profile updated successfully!
          </motion.div>
        )}
      </form>
    </motion.section>
  );
}
