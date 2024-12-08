import React from 'react';
import './TouristPlace.css';

const TouristPlace = () => {
  return (
    <div className="tourist-place">
      <header className="header">
        <h1>Mysuru Palace</h1>
        <p>A Royal Heritage in Karnataka</p>
      </header>

      <section className="description">
        <h2>About Mysuru Palace</h2>
        <p>
          Mysuru Palace, also known as the Amba Vilas Palace, is one of the most magnificent buildings in India.
          Located in the heart of Mysuru, it is a blend of Indo-Saracenic architecture. The palace is known for
          its intricate craftsmanship, historical significance, and the famous Dussehra celebrations.
        </p>
      </section>

      <section className="hotels">
        <h2>Nearby Hotels</h2>
        <ul>
          <li><strong>Radisson Blu Plaza Hotel:</strong> A luxury stay with modern amenities.</li>
          <li><strong>Royal Orchid Metropole:</strong> A heritage hotel offering premium services.</li>
          <li><strong>Sandesh The Prince:</strong> Convenient and comfortable for family stays.</li>
        </ul>
      </section>

      <section className="cuisine">
        <h2>Local Cuisine</h2>
        <ul>
          <li><strong>Mysore Pak:</strong> A famous sweet originating from Mysuru.</li>
          <li><strong>Ragi Mudde:</strong> A traditional finger millet dish.</li>
          <li><strong>Mysore Masala Dosa:</strong> A spicy twist to the classic dosa.</li>
        </ul>
      </section>

      <footer className="footer">
        <p>Plan your trip to Mysuru Palace and explore the heritage and flavors of Karnataka!</p>
      </footer>
    </div>
  );
};

export default TouristPlace;
