import React from "react";
import { Container } from "react-bootstrap";
import Slider from "../components/slider";
import CarSearch from "../components/car-search";
import CarOffers from "../components/car-offers";
import FeaturesSection from "../components/features-section";
import CustomerReview from "../components/customer-reviews";
import ContactSection from "../components/contact-section";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      id="homepage"
      style={{
        backgroundColor: isDark ? "#0A0A0A" : "#FAFAFA",
        minHeight: "100vh",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Hero Section */}
      <section className="hero-section">
        <Slider />
      </section>

      {/* Search Section */}
      <section
        className="search-section py-5"
        style={{
          backgroundColor: isDark ? "#111111" : "#FFFFFF",
          borderTop: isDark ? "1px solid #222" : "1px solid #E5E7EB",
        }}
      >
        <Container>
          <CarSearch />
        </Container>
      </section>

      {/* Vehicles Section */}
      <section
        className="vehicles-section py-5"
        style={{
          backgroundColor: isDark ? "#0A0A0A" : "#F9FAFB",
        }}
      >
        <Container>
          <div className="text-center mb-5">
            <h2
              className="display-5 fw-bold mb-3"
              style={{
                color: isDark ? "#F9FAFB" : "#111827",
                fontWeight: "700",
              }}
            >
              Our Fleet
            </h2>
            <p
              className="lead"
              style={{
                color: isDark ? "#9CA3AF" : "#6B7280",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Discover our premium collection of vehicles for every journey
            </p>
          </div>
          <CarOffers />
        </Container>
      </section>

      {/* Features Section */}
      <section
        className="features-section py-5"
        style={{
          backgroundColor: isDark ? "#111111" : "#FFFFFF",
        }}
      >
        <Container>
          <FeaturesSection />
        </Container>
      </section>

      {/* Reviews Section */}
      <section
        className="reviews-section py-5"
        style={{
          backgroundColor: isDark ? "#0A0A0A" : "#F9FAFB",
        }}
      >
        <Container>
          <CustomerReview />
        </Container>
      </section>

      {/* Contact Section */}
      <section
        className="contact-section py-5"
        style={{
          backgroundColor: isDark ? "#111111" : "#FFFFFF",
          borderTop: isDark ? "1px solid #222" : "1px solid #E5E7EB",
        }}
      >
        <Container>
          <ContactSection />
        </Container>
      </section>
    </div>
  );
};

export default Home;
