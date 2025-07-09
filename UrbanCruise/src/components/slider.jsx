import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "/bike.jpg",
    title: "Unleash Your Ride",
    tagline: "Experience the thrill of the open road with our premium bikes.",
    buttonText: "Discover Bikes",
    category: "bikes",
    gradient: "from-orange-500 to-red-600",
  },
  {
    image: "/carr.jpg",
    title: "Drive in Style",
    tagline:
      "Your journey, your rules – explore with our luxury and economical cars.",
    buttonText: "Explore Cars",
    category: "cars",
    gradient: "from-blue-600 to-purple-700",
  },
  {
    image: "/scooter.jpg",
    title: "Effortless City Rides",
    tagline: "Navigate urban landscapes with ease on our agile scooters.",
    buttonText: "Find Scooters",
    category: "bikes",
    gradient: "from-green-500 to-teal-600",
  },
];

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const onPrevClick = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const onNextClick = () => {
    setIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleExploreClick = () => {
    navigate("/vehicles");
  };

  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          height: "70vh",
          backgroundColor: isDark ? "#0A0A0A" : "#FAFAFA",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border"
            style={{
              color: isDark ? "#3B82F6" : "#2563EB",
              width: "3rem",
              height: "3rem",
            }}
          />
          <p
            className="mt-3 fw-medium"
            style={{ color: isDark ? "#9CA3AF" : "#6B7280" }}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="position-relative overflow-hidden"
      style={{
        height: "100vh",
        background: isDark
          ? "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)"
          : "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
      }}
    >
      {/* Background Pattern */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${
            isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)"
          } 0%, transparent 50%), 
                      radial-gradient(circle at 80% 20%, ${
                        isDark
                          ? "rgba(168, 85, 247, 0.1)"
                          : "rgba(168, 85, 247, 0.05)"
                      } 0%, transparent 50%)`,
          zIndex: 1,
        }}
      />

      <Container className="h-100 position-relative" style={{ zIndex: 2 }}>
        <Row className="h-100 align-items-center">
          <Col lg={6} className="order-2 order-lg-1">
            <div className="text-start">
              <div className="mb-4">
                <span
                  className="badge px-3 py-2 rounded-pill fw-medium"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(59, 130, 246, 0.1)"
                      : "rgba(59, 130, 246, 0.1)",
                    color: isDark ? "#60A5FA" : "#2563EB",
                    border: isDark
                      ? "1px solid rgba(59, 130, 246, 0.2)"
                      : "1px solid rgba(59, 130, 246, 0.2)",
                  }}
                >
                  Premium Rental Service
                </span>
              </div>

              <h1
                className="display-3 fw-bold mb-4"
                style={{
                  color: isDark ? "#F8FAFC" : "#0F172A",
                  lineHeight: "1.1",
                  background: isDark
                    ? "linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 100%)"
                    : "linear-gradient(135deg, #0F172A 0%, #475569 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {slides[index].title}
              </h1>

              <p
                className="lead mb-5"
                style={{
                  color: isDark ? "#94A3B8" : "#64748B",
                  fontSize: "1.25rem",
                  lineHeight: "1.6",
                  maxWidth: "500px",
                }}
              >
                {slides[index].tagline}
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3">
                <Button
                  onClick={handleExploreClick}
                  className="d-inline-flex align-items-center gap-2 fw-semibold px-4 py-3 rounded-3 border-0"
                  style={{
                    backgroundColor: isDark ? "#3B82F6" : "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                    boxShadow: isDark
                      ? "0 10px 25px rgba(59, 130, 246, 0.3)"
                      : "0 10px 25px rgba(37, 99, 235, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = isDark
                      ? "0 15px 35px rgba(59, 130, 246, 0.4)"
                      : "0 15px 35px rgba(37, 99, 235, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = isDark
                      ? "0 10px 25px rgba(59, 130, 246, 0.3)"
                      : "0 10px 25px rgba(37, 99, 235, 0.3)";
                  }}
                >
                  {slides[index].buttonText}
                  <ArrowRight size={20} />
                </Button>

                <Button
                  variant="outline-primary"
                  className="fw-semibold px-4 py-3 rounded-3"
                  style={{
                    color: isDark ? "#60A5FA" : "#2563EB",
                    borderColor: isDark ? "#3B82F6" : "#2563EB",
                    backgroundColor: "transparent",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = isDark
                      ? "rgba(59, 130, 246, 0.1)"
                      : "rgba(37, 99, 235, 0.1)";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Learn More
                </Button>
              </div>

              {/* Slide Indicators */}
              <div className="d-flex gap-2 mt-5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className="border-0 rounded-pill"
                    style={{
                      width: index === idx ? "32px" : "8px",
                      height: "8px",
                      backgroundColor:
                        index === idx
                          ? isDark
                            ? "#3B82F6"
                            : "#2563EB"
                          : isDark
                          ? "#374151"
                          : "#CBD5E1",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
          </Col>

          <Col lg={6} className="order-1 order-lg-2">
            <div className="position-relative text-center">
              <div
                className="position-relative d-inline-block"
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))",
                }}
              >
                <img
                  src={slides[index].image}
                  alt={slides[index].title}
                  className="img-fluid"
                  style={{
                    maxHeight: "500px",
                    width: "auto",
                    borderRadius: "20px",
                    transition: "all 0.5s ease",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/500x300/cccccc/ffffff?text=Vehicle+Image";
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>

        {/* Navigation Arrows */}
        <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
          <Button
            onClick={onPrevClick}
            className="rounded-circle border-0 d-flex align-items-center justify-content-center"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: isDark
                ? "rgba(30, 41, 59, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              color: isDark ? "#F8FAFC" : "#0F172A",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = isDark
                ? "rgba(30, 41, 59, 0.95)"
                : "rgba(255, 255, 255, 1)";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = isDark
                ? "rgba(30, 41, 59, 0.8)"
                : "rgba(255, 255, 255, 0.9)";
              e.target.style.transform = "scale(1)";
            }}
          >
            <ChevronLeft size={24} />
          </Button>
        </div>

        <div className="position-absolute top-50 end-0 translate-middle-y me-3">
          <Button
            onClick={onNextClick}
            className="rounded-circle border-0 d-flex align-items-center justify-content-center"
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: isDark
                ? "rgba(30, 41, 59, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              color: isDark ? "#F8FAFC" : "#0F172A",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = isDark
                ? "rgba(30, 41, 59, 0.95)"
                : "rgba(255, 255, 255, 1)";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = isDark
                ? "rgba(30, 41, 59, 0.8)"
                : "rgba(255, 255, 255, 0.9)";
              e.target.style.transform = "scale(1)";
            }}
          >
            <ChevronRight size={24} />
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Slider;
