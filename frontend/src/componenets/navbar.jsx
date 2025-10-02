import React from "react";

function Navbar() {
  return (
    <nav style={{
      backgroundColor: "blue",
      display: "flex",
      justifyContent: "space-between", // content at both ends
      alignItems: "center",
      padding: "10px 20px",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
    }}>
      {/* Left Side Content */}
      <div style={{ color: "white", fontWeight: "bold" }}>MyLogo</div>

      {/* Right Side Content */}
      <div>
        <button style={{ marginLeft: "10px", color: "white", background: "transparent", border: "none" }}>About</button>
        <button style={{ marginLeft: "10px", color: "white", background: "transparent", border: "none" }}>Contact</button>
      </div>
    </nav>
  );
}

export default Navbar;