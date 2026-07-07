import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit api starting point")

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
  name,
  email,
  password
});

      alert("User registered successfully!");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register Page</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;