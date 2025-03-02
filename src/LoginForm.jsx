import React, { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [btnMoveHandler, setBtnMoveHandler] = useState(false);
  const [fingerShake, setFingerShake] = useState(false);

  // Handle Input Change and Validate Immediately
  const onchangeHandler = (e) => {
    const { name, value } = e.target;

    // Update formData state
    setFormData((prev) => ({ ...prev, [name]: value }));

    let validationErrors = {};

    if (name === "email") {
      if (!value.trim()) {
        validationErrors.email = "Email is required";
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ) {
        validationErrors.email = "Enter a valid email";
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        validationErrors.password = "Password is required";
      } else if (value.length < 6) {
        validationErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...validationErrors }));
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
      setBtnMoveHandler(true);
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      validationErrors.email = "Enter a valid email";
      setBtnMoveHandler(true);
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
      setBtnMoveHandler(true);
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
      setBtnMoveHandler(true);
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Login Successful!");
      setBtnMoveHandler(false);
    }
  };

  // Handle Button Hover for Invalid Inputs
  const onMouseEnter = () => {
    const randomX = Math.floor(Math.random() * 80 + 1);
    const randomY = Math.floor(Math.floor(Math.random() * 80 + 1));

    // console.log("Random: ", Math.random()* 10+1)
    if (
      !formData.email.trim() ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      setPosition({ x: randomX, y: randomY });
      setBtnMoveHandler(true);
      setFingerShake(true);
      fingerMoveHandler();
      return;
    }

    if (!formData.password.trim() || formData.password.length < 6) {
      setPosition({ x: randomX, y: randomY });
      setBtnMoveHandler(true);
      setFingerShake(true);
      fingerMoveHandler();
      return;
    }

    fingerMoveHandler();
    setBtnMoveHandler(false);
  };

  // finger movement handler
  const fingerMoveHandler = () => {
    setTimeout(() => {
      setFingerShake(false);
    }, 1000);
  };

  // ===================== CSS finger animation ===============
  const fingerStyle = {
    fontSize: "50px",
    display: "inline-block",
    animation: "shake 1s infinite ease-in-out",
  };

  const keyframes = `
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-10px) rotate(-10deg); }
      50% { transform: translateX(10px) rotate(10deg); }
      75% { transform: translateX(-10px) rotate(-10deg); }
      100% { transform: translateX(0); }
    }
  `;

  return (
    <div
      style={{
        marginTop:"100px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // height: "100vh",
        // background: "#f4f4f4",
      }}
    >
      {/* finger animation */} 
        <div style={{visibility:fingerShake?"visible":"hidden", textAlign: "center", marginTop: "50px" }}>
          <style>{keyframes}</style> {/* Injecting keyframes in JSX */}
          <div style={fingerStyle}>☝️</div>
        </div> 
      {/* form */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "300px",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontWeight:"bold" }}>Login</h2>

        {/* Email Input */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="text"
            value={formData.email}
            name="email"
            onChange={onchangeHandler}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {/* {errors.email && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.email}
            </p>
          )} */}
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Password:
          </label>
          <input
            type="password"
            value={formData.password}
            name="password"
            onChange={onchangeHandler}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {/* {errors.password && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.password}
            </p>
          )} */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onMouseEnter={onMouseEnter}
          style={{
            position: btnMoveHandler ? "absolute" : "initial",
            top: position.x + "%",
            left: position.y + "%",

            width: "100px",
            display: "block",
            margin: "auto",
            padding: "10px",
            background: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
