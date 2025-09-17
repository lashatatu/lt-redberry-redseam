import React, { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import HeaderComponent from "./Components/HeaderComponent.jsx";
import LogInComponent from "./Components/LogInComponent.jsx";

function App() {


  return (
    <div className="min-h-screen">
      {/* Left side - Hero Image */}
      <HeaderComponent />
      {/* Login Form */}
      <LogInComponent />

    </div>
  );
}

export default App;
