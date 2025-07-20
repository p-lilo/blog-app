import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router";
import firebase from "../firebase";

function Register() {
  const auth = firebase.auth;
  const db = firebase.db;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date(),
      });

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-purple-300">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
       
        <button
          className="absolute left-4 top-4 text-purple-600 hover:text-purple-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>

        <h2 className="text-3xl font-bold text-center mb-6 text-purple-700"> Sign Up</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="name"
            className="input input-bordered w-full bg-purple-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="email"
            className="input input-bordered w-full bg-purple-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            className="input input-bordered w-full bg-purple-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
          >
            create account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
