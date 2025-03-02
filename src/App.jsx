import React from "react";
import LoginForm from "./LoginForm"; 


// Using MouseTracker
function App() {
  return (
    <>
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          background: "#f0f0f0",
          overflow: "hidden",
          transition: "1s ease-in",
        }}
      >
        <LoginForm />
      </div>
    </>
  );
}

export default App;
