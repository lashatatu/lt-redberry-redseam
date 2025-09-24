import HeroComponent from "./Components/HeroComponent.jsx";
import  { useState } from "react";

function App() {
  const [showRegister, setShowRegister] = useState(false);



  return (
    <div>
      <HeroComponent showRegister={showRegister} setShowRegister={setShowRegister}/>
    </div>
  );
}

export default App;
