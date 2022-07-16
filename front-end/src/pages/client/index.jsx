import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Index = () => {
  let navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="motion">
          <h1>Welcome to Workout Day Gym!</h1>
          <h2>Ready to build your body with us?</h2>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="btn-1"
          >
            Login
          </button>
        </div>
      </header>
      <section className="services">
        <h1>Our services</h1>
        <h2>Let us help you to reach your fitness goal.</h2>
        <ul className="service-cards">
          <li className="service-card">
            <h3>Our products</h3>
            <FontAwesomeIcon
              icon={solid("box")}
              size="5x"
              className="service-icon"
            />
            <p>
              We have a wide range of products to choose from, including
              equipments, fitness meals, lessons and more.
            </p>
            <button
              onClick={() => {
                navigate("/shopping");
              }}
              className="btn-2"
            >
              Shop now
            </button>
          </li>
          <li className="service-card">
            <h3>Track Progress</h3>
            <FontAwesomeIcon
              icon={solid("chart-line")}
              size="5x"
              className="service-icon"
            />
            <p>Keep track of your progress and plan your next move.</p>
            <button
              onClick={() => {
                navigate("/fitnessProfiles");
              }}
              className="btn-2"
            >
              Check my profile
            </button>
          </li>
          <li className="service-card">
            <h3>Get a Coach</h3>
            <FontAwesomeIcon
              icon={solid("calendar-alt")}
              size="5x"
              className="service-icon"
            />
            <p>
              Make appointments with one of our coaches to get safe and
              efficient training.
            </p>
            <button
              className="btn-2"
              onClick={() => {
                navigate("/appointments");
              }}
            >
              Make appointments
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Index;
