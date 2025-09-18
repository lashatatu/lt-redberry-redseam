import HeaderComponent from "./Components/HeaderComponent.jsx";
import HeroComponent from "./Components/HeroComponent.jsx";
import React from "react";

function App() {
  const [showRegister, setShowRegister] = React.useState(false);



  return (
    <div>
      <HeaderComponent />
      <HeroComponent showRegister={showRegister} setShowRegister={setShowRegister}/>

    </div>
  );
}

export default App;
