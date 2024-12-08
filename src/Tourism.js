import React from "react";
import "./TourismFrames.css";
import ap from "./ap.jpg";
import tn from "./tamil_nadu.jpg"
import tg from "./telangana.jpg"
import kl from "./kerala.jpg"
import ka from "./karnataka.jpg"
import un from "./unesco.jpg"
import Tourism_Navbar from "./Tourism_Navbar.js";


function TourismFrames() {
  const redirect = (url) => {
    window.location.href = url;
  };

  return (
    <div>
    <Tourism_Navbar />
    <div className="tourism-container">
      {/* Andhra Pradesh Frame */}
      <div className="tourism-frame" onClick={() => redirect('https://remarkable-vacherin-45345e.netlify.app')}>
        <img src={ap} alt="Andhra Pradesh" className="tourism-frame-img" />
        <div className="tourism-frame-info">
          <h3>Andhra Pradesh</h3>
          <p>Explore the rich culture, scenic beaches, and historical monuments.</p>
        </div>
      </div>

      {/* Tamil Nadu Frame */}
      <div className="tourism-frame" onClick={() => redirect('https://capable-pothos-317538.netlify.app')}>
        <img src={tn} alt="Tamil Nadu" className="tourism-frame-img" />
        <div className="tourism-frame-info">
          <h3>Tamil Nadu</h3>
          <p>Visit ancient temples, beautiful hill stations, and vibrant cities.</p>
        </div>
      </div>

      {/* Telangana Frame */}
      <div className="tourism-frame" onClick={() => redirect('https://melodious-sopapillas-493eaf.netlify.app')}>
        <img src={tg} alt="Telangana" className="tourism-frame-img" />
        <div className="tourism-frame-info">
          <h3>Telangana</h3>
          <p>Discover the historic sites, palaces, and vibrant culture of Telangana.</p>
        </div>
      </div>

      {/* Kerala Frame */}
      <div className="tourism-frame" onClick={() => redirect('https://willowy-fairy-61f2b2.netlify.app')}>
        <img src={kl} alt="Kerala" className="tourism-frame-img" />
        <div className="tourism-frame-info">
          <h3>Kerala</h3>
          <p>Experience Kerala’s backwaters, beaches, and lush landscapes.</p>
        </div>
      </div>

      {/* Karnataka Frame */}
      <div className="tourism-frame" onClick={() => redirect('https://graceful-parfait-cb89fa.netlify.app')}>
        <img src={ka} alt="Karnataka" className="tourism-frame-img" />
        <div className="tourism-frame-info">
          <h3>Karnataka</h3>
          <p>Explore Karnataka's diverse culture, ancient ruins, and scenic beauty.</p>
        </div>
      </div>
      {/*UNESCO World Heritage sites*/}
      <div className="tourism-frame" onClick={() => redirect('https://stupendous-gumdrop-c80fc8.netlify.app')}>
        <img src={un} alt="Karnataka" className="tourism-frame-img" />
        <div className="tourism-frame-info">
          <h3>UNESCO World Heritage sites</h3>
          <p>Explore the natural and cultural sites that are considered to be of "Outstanding Universal Value" and are protected for future generations</p>
        </div>
      </div>
    </div></div>
  );
}

export default TourismFrames;
