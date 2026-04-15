import React, { useState, useEffect } from "react";

// moufdi did this for the dynamic API URL 
const API_URL = "/api/admin/messages";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // moufdi did this for simple admin password protection
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");
  const ADMIN_PASSWORD = "1234"; 

  // moufdi did this for handling reply text states dynamically for each message
  const [replyTexts, setReplyTexts] = useState({});

  useEffect(() => {
    if (isAuth) fetchMessages();
  }, [isAuth]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // moufdi did this for the login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuth(true);
    } else {
      alert("Wrong password");
    }
  };

  // moufdi did this for deleting a message and updating the UI without reloading
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  // moufdi did this for sending the reply via Web3Forms
  const handleReply = async (email, id) => {
    const text = replyTexts[id];
    if (!text) return alert("Type a reply first");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "3145a675-e182-4f1d-8143-f07f5cebc238", // moufdi did this for the Web3Forms key
          subject: "Reply from Yellow Pages Admin",
          from_name: "Yellow Pages Admin",
          to: email, 
          message: text
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        alert("Reply sent successfully!");
        setReplyTexts({ ...replyTexts, [id]: "" }); // clear the input
      } else {
        alert(data.message || "Failed to send.");
      }
    } catch (err) {
      alert("Network error.");
    }
  };

  // moufdi did this for the password screen
  if (!isAuth) {
    return (
      <div style={styles.container}>
        <form onSubmit={handleLogin} style={styles.loginBox}>
          <h3>Admin Login</h3>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.btn}>
            Enter
          </button>
        </form>
      </div>
    );
  }

  if (loading)
    return (
      <div style={styles.container}>
        <p>Loading messages...</p>
      </div>
    );
  if (error)
    return (
      <div style={styles.container}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Incoming Messages</h2>

      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div style={styles.cardContainer}>
          {messages.map((msg) => (
            // moufdi did this for a clean card layout instead of a table so replies fit better
            <div key={msg.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <strong>{msg.name}</strong> ({msg.email})
                {/* moufdi did this for the delete button */}
                <button
                  onClick={() => handleDelete(msg.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
              <p style={styles.msgText}>{msg.message}</p>

              {/* moufdi did this for the reply section */}
              <div style={styles.replyContainer}>
                <textarea
                  placeholder="Type your reply..."
                  value={replyTexts[msg.id] || ""}
                  onChange={(e) =>
                    setReplyTexts({ ...replyTexts, [msg.id]: e.target.value })
                  }
                  style={styles.replyInput}
                />
                <button
                  onClick={() => handleReply(msg.email, msg.id)}
                  style={styles.replyBtn}
                >
                  Send Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// moufdi did this for clean styling for the new layout
const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
  },
  loginBox: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    gap: "10px",
    marginTop: "100px",
  },
  input: { padding: "10px", fontSize: "16px" },
  btn: {
    padding: "10px",
    backgroundColor: "#333",
    color: "#FFD700",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  header: {
    color: "#333",
    borderBottom: "2px solid #FFD700",
    paddingBottom: "10px",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#555",
    marginBottom: "10px",
  },
  msgText: { color: "#333", margin: "0 0 15px 0" },
  replyContainer: { display: "flex", gap: "10px" },
  replyInput: {
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  replyBtn: {
    padding: "8px 15px",
    backgroundColor: "#FFD700",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteBtn: {
    padding: "5px 10px",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AdminMessages;