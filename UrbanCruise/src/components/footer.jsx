import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { MapPin, Phone, Mail, Send, ExternalLink } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      {!location.pathname.includes("admin") && (
        <footer
          id="footer"
          className="py-5"
          style={{
            backgroundColor: isDark ? "#111827" : "#1F2937",
            color: "#E5E7EB",
            borderTop: isDark ? "1px solid #374151" : "1px solid #374151",
          }}
        >
          <Container className="py-4">
            {/* Hero Section */}
            <Row className="justify-content-center mb-5 pb-4">
              <Col lg={8} className="text-center">
                <h1
                  className="display-5 fw-bold mb-3"
                  style={{
                    background: "linear-gradient(135deg, #10B981, #059669)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: "800",
                  }}
                >
                  Rent Amazing Vehicles
                </h1>
                <p
                  className="lead mb-4"
                  style={{
                    color: "#9CA3AF",
                    fontSize: "1.125rem",
                  }}
                >
                  Your journey, our priority. Experience seamless rentals.
                </p>
                <div
                  className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill"
                  style={{
                    backgroundColor: "#374151",
                    border: "1px solid #4B5563",
                  }}
                >
                  <div
                    className="rounded-circle"
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#10B981",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <span
                    style={{
                      color: "#E5E7EB",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                    }}
                  >
                    Available 24/7
                  </span>
                </div>
              </Col>
            </Row>

            {/* Main Footer Content */}
            <Row className="g-5 mb-5">
              {/* Newsletter Section */}
              <Col md={6} lg={4}>
                <div className="mb-4">
                  <h4
                    className="h5 fw-bold mb-3 d-flex align-items-center gap-2"
                    style={{ color: "#F9FAFB" }}
                  >
                    <Send size={20} style={{ color: "#10B981" }} />
                    Subscribe Now
                  </h4>
                  <p
                    className="mb-4"
                    style={{
                      color: "#9CA3AF",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                    }}
                  >
                    Stay updated with our latest offers and news directly to
                    your inbox.
                  </p>
                </div>

                <Form className="mb-4">
                  <div className="position-relative">
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      className="border-0 pe-5"
                      style={{
                        backgroundColor: "#374151",
                        color: "#E5E7EB",
                        borderRadius: "12px",
                        height: "48px",
                        fontSize: "0.95rem",
                      }}
                    />
                    <Button
                      className="position-absolute top-50 end-0 translate-middle-y me-2 border-0 rounded-2 d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "linear-gradient(135deg, #10B981, #059669)",
                        padding: "0",
                      }}
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </Form>

                {/* Social Links */}
                <div className="d-flex gap-3">
                  {[
                    {
                      Icon: FaGithub,
                      url: "https://github.com/kkartikeysetia",
                      label: "GitHub",
                    },
                    {
                      Icon: FaEnvelope,
                      url: "mailto:Kartikeysetia22@gmail.com",
                      label: "Email",
                    },
                    {
                      Icon: FaLinkedinIn,
                      url: "https://www.linkedin.com/in/kartikey-setia/",
                      label: "LinkedIn",
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-flex align-items-center justify-content-center rounded-3"
                      style={{
                        width: "44px",
                        height: "44px",
                        backgroundColor: "#374151",
                        border: "1px solid #4B5563",
                        color: "#9CA3AF",
                        transition: "all 0.3s ease",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#10B981";
                        e.currentTarget.style.borderColor = "#10B981";
                        e.currentTarget.style.color = "#FFFFFF";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#374151";
                        e.currentTarget.style.borderColor = "#4B5563";
                        e.currentTarget.style.color = "#9CA3AF";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                      title={social.label}
                    >
                      <social.Icon size="1.1em" />
                    </a>
                  ))}
                </div>
              </Col>

              {/* Information Links */}
              <Col md={6} lg={2}>
                <h4
                  className="h6 fw-bold mb-4 text-uppercase"
                  style={{
                    color: "#F9FAFB",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Information
                </h4>
                <ul className="list-unstyled">
                  {[
                    { to: "/about", label: "About Us" },
                    { to: "/services", label: "Our Services" },
                    { to: "/vehicles", label: "Vehicle Fleet" },
                    { to: "/client", label: "Testimonials" },
                  ].map((link, index) => (
                    <li key={index} className="mb-3">
                      <Link
                        to={link.to}
                        className="text-decoration-none d-flex align-items-center gap-2"
                        style={{
                          color: "#9CA3AF",
                          fontSize: "0.95rem",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#10B981";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#9CA3AF";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        <ExternalLink size={14} opacity={0.7} />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>

              {/* Helpful Links */}
              <Col md={6} lg={2}>
                <h4
                  className="h6 fw-bold mb-4 text-uppercase"
                  style={{
                    color: "#F9FAFB",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Helpful Links
                </h4>
                <ul className="list-unstyled">
                  {[
                    { to: "/faq", label: "FAQs" },
                    { to: "/privacy-policy", label: "Privacy Policy" },
                    { to: "/terms-conditions", label: "Terms & Conditions" },
                    { to: "/careers", label: "Careers" },
                  ].map((link, index) => (
                    <li key={index} className="mb-3">
                      <Link
                        to={link.to}
                        className="text-decoration-none d-flex align-items-center gap-2"
                        style={{
                          color: "#9CA3AF",
                          fontSize: "0.95rem",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#10B981";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#9CA3AF";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        <ExternalLink size={14} opacity={0.7} />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>

              {/* Contact Information */}
              <Col md={6} lg={4}>
                <h4
                  className="h6 fw-bold mb-4 text-uppercase"
                  style={{
                    color: "#F9FAFB",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Contact Us
                </h4>

                <div className="mb-4">
                  {[
                    {
                      icon: MapPin,
                      content: "Greater Noida, India",
                      href: "https://www.google.com/maps/search/Greater+Noida,+India",
                      color: "#F59E0B",
                    },
                    {
                      icon: Phone,
                      content: "+91 941XXXXXXX",
                      href: "tel:+91941XXXXXXX",
                      color: "#10B981",
                    },
                    {
                      icon: Mail,
                      content: "UrbanCruise22@gmail.com",
                      href: "mailto:UrbanCruise22@gmail.com",
                      color: "#3B82F6",
                    },
                  ].map((contact, index) => {
                    const IconComponent = contact.icon;
                    return (
                      <div
                        key={index}
                        className="d-flex align-items-start gap-3 mb-3"
                      >
                        <div
                          className="d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            backgroundColor: `${contact.color}20`,
                            border: `1px solid ${contact.color}30`,
                          }}
                        >
                          <IconComponent
                            size={18}
                            color={contact.color}
                            strokeWidth={2}
                          />
                        </div>
                        <div className="pt-1">
                          <a
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                            style={{
                              color: "#D1D5DB",
                              fontSize: "0.95rem",
                              lineHeight: "1.5",
                              transition: "color 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = contact.color;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "#D1D5DB";
                            }}
                          >
                            {contact.content}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Support Badge */}
                <div
                  className="p-3 rounded-3"
                  style={{
                    background: "linear-gradient(135deg, #374151, #1F2937)",
                    border: "1px solid #4B5563",
                  }}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div
                      className="rounded-circle"
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#10B981",
                      }}
                    />
                    <span
                      style={{
                        color: "#F9FAFB",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                      }}
                    >
                      24/7 Customer Support
                    </span>
                  </div>
                  <p
                    className="mb-0"
                    style={{
                      color: "#9CA3AF",
                      fontSize: "0.8rem",
                      lineHeight: "1.4",
                    }}
                  >
                    We're here to help you anytime, anywhere.
                  </p>
                </div>
              </Col>
            </Row>

            {/* Copyright Section */}
            <Row
              className="pt-4 border-top"
              style={{ borderColor: "#374151 !important" }}
            >
              <Col className="text-center">
                <p
                  className="mb-0"
                  style={{
                    color: "#6B7280",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                  }}
                >
                  © {new Date().getFullYear()} UrbanCruise. All Rights Reserved.
                  <span className="mx-2">•</span>
                  Developed & Designed by{" "}
                  <a
                    href="https://github.com/kkartikeysetia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none fw-semibold"
                    style={{
                      color: "#10B981",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#059669";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#10B981";
                    }}
                  >
                    Kartikey
                  </a>
                </p>
              </Col>
            </Row>
          </Container>

          {/* CSS for pulse animation */}
          <style jsx>{`
            @keyframes pulse {
              0%,
              100% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
            }
          `}</style>
        </footer>
      )}
    </>
  );
};

export default Footer;
