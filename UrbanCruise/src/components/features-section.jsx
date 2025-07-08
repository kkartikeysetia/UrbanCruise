import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Shield, Clock, TrendingDown, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const FeaturesSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: "safety",
      icon: Shield,
      title: "Reliable & Secure",
      description:
        "UrbanCruise ensures your journey is safe and secure with meticulously verified vehicles and smart tracking features.",
      color: isDark ? "#10B981" : "#059669",
      bgGradient: "from-emerald-500 to-green-600",
    },
    {
      id: "booking",
      icon: Clock,
      title: "Instant Online Booking",
      description:
        "Book your ideal ride anytime, anywhere with our seamless 24/7 online booking system and intuitive interface.",
      color: isDark ? "#3B82F6" : "#2563EB",
      bgGradient: "from-blue-500 to-indigo-600",
    },
    {
      id: "offers",
      icon: TrendingDown,
      title: "Unbeatable Offers",
      description:
        "Access competitive pricing, exclusive member deals, and unparalleled value for every adventure you plan.",
      color: isDark ? "#F59E0B" : "#D97706",
      bgGradient: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div
      id="features-section"
      className="py-5"
      style={{
        backgroundColor: isDark ? "#0A0A0A" : "#FAFAFA",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container className="py-5">
        {/* Heading Section */}
        <Row className="justify-content-center mb-5">
          <Col lg={10} className="text-center">
            <div className="mb-3">
              <span
                className="badge rounded-pill px-4 py-2 mb-4 d-inline-block"
                style={{
                  backgroundColor: isDark ? "#1F2937" : "#F3F4F6",
                  color: isDark ? "#9CA3AF" : "#6B7280",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Why Choose Us
              </span>
            </div>
            <h1
              className="display-4 fw-bold mb-4"
              style={{
                color: isDark ? "#F9FAFB" : "#111827",
                lineHeight: "1.1",
                fontWeight: "800",
              }}
            >
              Why Choose{" "}
              <span
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, #10B981, #059669)"
                    : "linear-gradient(135deg, #059669, #047857)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                UrbanCruise
              </span>
            </h1>
            <p
              className="lead"
              style={{
                color: isDark ? "#9CA3AF" : "#6B7280",
                fontSize: "1.25rem",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              Discover the unparalleled advantages that make UrbanCruise your
              ultimate choice for seamless and exceptional vehicle rentals.
            </p>
          </Col>
        </Row>

        {/* Features Grid */}
        <Row className="g-4 justify-content-center">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Col xs={12} md={6} lg={4} key={feature.id}>
                <Card
                  className="h-100 border-0 position-relative overflow-hidden"
                  style={{
                    backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                    borderRadius: "20px",
                    boxShadow: isDark
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                      : "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform:
                      hoveredFeature === feature.id
                        ? "translateY(-8px) scale(1.02)"
                        : "translateY(0) scale(1)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  {/* Gradient overlay */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}15, transparent)`,
                      opacity: hoveredFeature === feature.id ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  />

                  <Card.Body className="p-4 p-lg-5 text-center position-relative">
                    {/* Icon Container */}
                    <div
                      className="d-inline-flex align-items-center justify-content-center mb-4 position-relative"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "20px",
                        background: `linear-gradient(135deg, ${feature.color}, ${feature.color}90)`,
                        boxShadow: `0 15px 35px ${feature.color}30`,
                      }}
                    >
                      <IconComponent
                        size={36}
                        color="#FFFFFF"
                        strokeWidth={2}
                      />

                      {/* Floating particles effect */}
                      <div
                        className="position-absolute"
                        style={{
                          top: "-4px",
                          right: "-4px",
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: feature.color,
                          opacity: hoveredFeature === feature.id ? 1 : 0,
                          transform:
                            hoveredFeature === feature.id
                              ? "translate(8px, -8px) scale(1)"
                              : "translate(0, 0) scale(0)",
                          transition: "all 0.3s ease",
                        }}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className="h4 fw-bold mb-3"
                      style={{
                        color: isDark ? "#F9FAFB" : "#111827",
                        fontWeight: "700",
                      }}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="mb-4"
                      style={{
                        color: isDark ? "#D1D5DB" : "#6B7280",
                        lineHeight: "1.6",
                        fontSize: "1rem",
                      }}
                    >
                      {feature.description}
                    </p>

                    {/* Learn More Link */}
                    <div
                      className="d-flex align-items-center justify-content-center gap-2"
                      style={{
                        color: feature.color,
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        opacity: hoveredFeature === feature.id ? 1 : 0,
                        transform:
                          hoveredFeature === feature.id
                            ? "translateY(0)"
                            : "translateY(10px)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Learn more
                      <ChevronRight
                        size={16}
                        style={{
                          transform:
                            hoveredFeature === feature.id
                              ? "translateX(4px)"
                              : "translateX(0)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Bottom CTA Section */}
        <Row className="justify-content-center mt-5 pt-4">
          <Col lg={8} className="text-center">
            <div
              className="p-4 rounded-4"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #1F2937, #111827)"
                  : "linear-gradient(135deg, #F3F4F6, #E5E7EB)",
                border: isDark ? "1px solid #374151" : "1px solid #D1D5DB",
              }}
            >
              <p
                className="mb-0"
                style={{
                  color: isDark ? "#9CA3AF" : "#6B7280",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                }}
              >
                Ready to experience the difference?{" "}
                <span
                  style={{
                    color: isDark ? "#10B981" : "#059669",
                    fontWeight: "600",
                  }}
                >
                  Start your journey today
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeaturesSection;
