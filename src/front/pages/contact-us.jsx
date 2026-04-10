import React, { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now: just simulate sending
    console.log("Contact form submitted:", form);

    setStatus("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div style={styles.container}>
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <textarea
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <button type="submit" style={styles.button}>
          Send Message
        </button>
      </form>

      {status && <p style={styles.success}>{status}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    minHeight: "120px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  success: {
    marginTop: "10px",
    color: "green",
  },
};