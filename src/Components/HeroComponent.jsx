import React from "react";
import HeroImageComponent from "./HeroImageComponent.jsx";
import LogInComponent from "./LogInComponent.jsx";

const HeroComponent = () => {

  return (
    <div className='min-h-screen flex'>
      <HeroImageComponent />
      <LogInComponent />
    </div>
  );
};

export default HeroComponent;
