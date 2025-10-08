import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      if (data.user) {
        await createProfile(data.user);
        setMessage("Sign up successful! Please sign in.");
        setIsSignUp(false);
      }
    }
  }

  async function createProfile(user) {
    const { error } = await supabase.from("profiles").insert([
      {
        id: user.id,
        email: user.email,
        role: "user",
      },
    ]);
    if (error) console.error("Error creating profile:", error);
  }

  async function handleSignIn(e) {
    e.preventDefault();
    setMessage("Signing in...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      const role = await createProfileIfMissing(data.user.id, data.user.email);
      localStorage.setItem("role", role);
      setMessage("Signed in successfully!");
      if (role === "admin") navigate("/admin");
      else navigate("/");
    }
  }

  async function createProfileIfMissing(userId, userEmail) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error && error.code === "PGRST116") {
        await supabase.from("profiles").insert([
          { id: userId, email: userEmail, role: "user" },
        ]);

        const { data: newData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userId)
          .single();

        return newData?.role || "user";
      }

      if (error) {
        console.error("Error fetching role:", error);
        return "user";
      }

      return data?.role || "user";
    } catch (err) {
      console.error("Error in createProfileIfMissing:", err);
      return "user";
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
        </form>

        <p className="toggle-text">
          {isSignUp
            ? "Already have an account?"
            : "New here? Create an account!"}{" "}
          <span onClick={() => { setIsSignUp(!isSignUp); setMessage(""); }}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>

        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
}
