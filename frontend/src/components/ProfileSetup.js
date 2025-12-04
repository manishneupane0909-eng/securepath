import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ProfileSetup({ onComplete }) {
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
    localStorage.setItem("profileCompleted", "true");
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.form
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass-panel w-full max-w-md p-8 rounded-2xl border border-cyber-primary/30 shadow-neon-cyan"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Complete Your Profile
        </h2>

        <div className="text-center mb-6">
          <label className="cursor-pointer inline-block">
            <div className="w-24 h-24 rounded-full bg-cyber-primary/10 border-2 border-cyber-primary/30 flex items-center justify-center overflow-hidden hover:border-cyber-primary transition-colors">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-cyber-text-muted text-sm">Upload</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="space-y-4">
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "text" },
            { label: "Country", name: "country", type: "text" },
            { label: "Your Job", name: "job", type: "text" },
            { label: "Industry", name: "industry", type: "text" },
            { label: "Security Level", name: "securityLevel", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-cyber-text-secondary mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={profile[field.name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-cyber-text-muted focus:outline-none focus:border-cyber-primary focus:ring-2 focus:ring-cyber-primary/20 transition-all"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 px-6 bg-cyber-primary text-black font-bold rounded-lg hover:bg-cyber-primary/90 shadow-neon-cyan transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Save Profile
        </button>
      </motion.form>
    </motion.div>
  );
}

