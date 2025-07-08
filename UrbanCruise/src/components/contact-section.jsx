import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";
import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Headphones,
} from "lucide-react";

const ContactSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [hoveredInput, setHoveredInput] = useState(null);

  const loadingContent = (
    <div className="text-center py-5">
      <Spinner
        animation="border"
        role="status"
        style={{
          color: isDark ? "#10B981" : "#059669",
          width: "3rem",
          height: "3rem",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p
        className="mt-3 fw-medium"
        style={{ color: isDark ? "#9CA3AF" : "#6B7280" }}
      >
        Sending your message...
      </p>
    </div>
  );

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await addDoc(collection(db, "forms"), formData);
      setIsLoading(false);
      Swal.fire({
        title: "Message Sent!",
        text: "Your message has been successfully delivered. We'll get back to you soon!",
        icon: "success",
        customClass: {
          popup: isDark ? "swal2-dark-mode-popup" : "",
          title: isDark ? "swal2-dark-mode-title" : "",
          htmlContainer: isDark ? "swal2-dark-mode-text" : "",
          confirmButton: isDark ? "swal2-dark-mode-confirm-button" : "",
        },
      });
      setFormData({});
      event.target.reset();
    } catch (err) {
      console.error("Error sending message:", err);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
        customClass: {
          popup: isDark ? "swal2-dark-mode" : "",
        },
      });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Greater Noida, India",
      color: isDark ? "#F59E0B" : "#D97706",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 941XXXXXXX",
      color: isDark ? "#10B981" : "#059669",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "UrbanCruise22@gmail.com",
      color: isDark ? "#3B82F6" : "#2563EB",
    },
    {
      icon: Clock,
      title: "Support Hours",
      content: "24/7 Available",
      color: isDark ? "#8B5CF6" : "#7C3AED",
    },
  ];

  return (
    <div
      id="contact-section"
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
                Contact Us
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
              Get In{" "}
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
                Touch
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
              We would love to hear from you! Send us a message and we will get
              back to you as soon as possible.
            </p>
          </Col>
        </Row>

        <Row className="g-5 justify-content-center align-items-start">
          {/* Contact Information */}
          <Col lg={5}>
            <div className="mb-5">
              <h3
                className="h4 fw-bold mb-4"
                style={{
                  color: isDark ? "#F9FAFB" : "#111827",
                }}
              >
                Contact Information
              </h3>
              <Row className="g-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Col xs={12} sm={6} lg={12} key={index}>
                      <div className="d-flex align-items-start gap-3">
                        <div
                          className="d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            backgroundColor: `${info.color}20`,
                            border: `1px solid ${info.color}30`,
                          }}
                        >
                          <IconComponent
                            size={20}
                            color={info.color}
                            strokeWidth={2}
                          />
                        </div>
                        <div>
                          <h5
                            className="mb-1 fw-semibold"
                            style={{
                              color: isDark ? "#F9FAFB" : "#111827",
                              fontSize: "1rem",
                            }}
                          >
                            {info.title}
                          </h5>
                          <p
                            className="mb-0"
                            style={{
                              color: isDark ? "#9CA3AF" : "#6B7280",
                              fontSize: "0.9rem",
                            }}
                          >
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>

            {/* Additional Info Card */}
            <Card
              className="border-0"
              style={{
                backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                borderRadius: "20px",
                boxShadow: isDark
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: isDark
                        ? "linear-gradient(135deg, #10B981, #059669)"
                        : "linear-gradient(135deg, #059669, #047857)",
                    }}
                  >
                    <Headphones size={20} color="#FFFFFF" strokeWidth={2} />
                  </div>
                  <div>
                    <h5
                      className="mb-1 fw-bold"
                      style={{
                        color: isDark ? "#F9FAFB" : "#111827",
                        fontSize: "1.1rem",
                      }}
                    >
                      Quick Support
                    </h5>
                    <p
                      className="mb-0"
                      style={{
                        color: isDark ? "#9CA3AF" : "#6B7280",
                        fontSize: "0.875rem",
                      }}
                    >
                      Need immediate assistance?
                    </p>
                  </div>
                </div>
                <p
                  className="mb-0"
                  style={{
                    color: isDark ? "#D1D5DB" : "#374151",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  Our customer support team is available 24/7 to help you with
                  any questions or concerns.
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col lg={6}>
            <Card
              className="border-0"
              style={{
                backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                borderRadius: "24px",
                boxShadow: isDark
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Body className="p-4 p-lg-5">
                {!isLoading ? (
                  <Form onSubmit={handleContactSubmit}>
                    <Row className="g-4">
                      <Col xs={12}>
                        <div className="position-relative">
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            onChange={handleFormChange}
                            required
                            className="border-0 ps-5"
                            style={{
                              backgroundColor: isDark ? "#374151" : "#F9FAFB",
                              color: isDark ? "#F9FAFB" : "#111827",
                              borderRadius: "16px",
                              height: "56px",
                              fontSize: "1rem",
                              transition: "all 0.3s ease",
                              boxShadow:
                                hoveredInput === "name"
                                  ? `0 0 0 3px ${
                                      isDark ? "#10B98120" : "#05966920"
                                    }`
                                  : "none",
                            }}
                            value={formData.name || ""}
                            onFocus={() => setHoveredInput("name")}
                            onBlur={() => setHoveredInput(null)}
                          />
                          <User
                            size={20}
                            className="position-absolute top-50 translate-middle-y ms-3"
                            style={{
                              color: isDark ? "#9CA3AF" : "#6B7280",
                              left: "8px",
                            }}
                          />
                        </div>
                      </Col>

                      <Col xs={12}>
                        <div className="position-relative">
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            onChange={handleFormChange}
                            required
                            className="border-0 ps-5"
                            style={{
                              backgroundColor: isDark ? "#374151" : "#F9FAFB",
                              color: isDark ? "#F9FAFB" : "#111827",
                              borderRadius: "16px",
                              height: "56px",
                              fontSize: "1rem",
                              transition: "all 0.3s ease",
                              boxShadow:
                                hoveredInput === "email"
                                  ? `0 0 0 3px ${
                                      isDark ? "#10B98120" : "#05966920"
                                    }`
                                  : "none",
                            }}
                            value={formData.email || ""}
                            onFocus={() => setHoveredInput("email")}
                            onBlur={() => setHoveredInput(null)}
                          />
                          <Mail
                            size={20}
                            className="position-absolute top-50 translate-middle-y ms-3"
                            style={{
                              color: isDark ? "#9CA3AF" : "#6B7280",
                              left: "8px",
                            }}
                          />
                        </div>
                      </Col>

                      <Col xs={12}>
                        <div className="position-relative">
                          <Form.Control
                            type="tel"
                            name="phone"
                            placeholder="Your Phone Number"
                            onChange={handleFormChange}
                            required
                            className="border-0 ps-5"
                            style={{
                              backgroundColor: isDark ? "#374151" : "#F9FAFB",
                              color: isDark ? "#F9FAFB" : "#111827",
                              borderRadius: "16px",
                              height: "56px",
                              fontSize: "1rem",
                              transition: "all 0.3s ease",
                              boxShadow:
                                hoveredInput === "phone"
                                  ? `0 0 0 3px ${
                                      isDark ? "#10B98120" : "#05966920"
                                    }`
                                  : "none",
                            }}
                            value={formData.phone || ""}
                            onFocus={() => setHoveredInput("phone")}
                            onBlur={() => setHoveredInput(null)}
                          />
                          <Phone
                            size={20}
                            className="position-absolute top-50 translate-middle-y ms-3"
                            style={{
                              color: isDark ? "#9CA3AF" : "#6B7280",
                              left: "8px",
                            }}
                          />
                        </div>
                      </Col>

                      <Col xs={12}>
                        <div className="position-relative">
                          <Form.Control
                            as="textarea"
                            name="message"
                            rows={5}
                            placeholder="Your Message"
                            onChange={handleFormChange}
                            required
                            className="border-0 ps-5 pt-4"
                            style={{
                              backgroundColor: isDark ? "#374151" : "#F9FAFB",
                              color: isDark ? "#F9FAFB" : "#111827",
                              borderRadius: "16px",
                              fontSize: "1rem",
                              resize: "none",
                              transition: "all 0.3s ease",
                              boxShadow:
                                hoveredInput === "message"
                                  ? `0 0 0 3px ${
                                      isDark ? "#10B98120" : "#05966920"
                                    }`
                                  : "none",
                            }}
                            value={formData.message || ""}
                            onFocus={() => setHoveredInput("message")}
                            onBlur={() => setHoveredInput(null)}
                          />
                          <MessageSquare
                            size={20}
                            className="position-absolute ms-3"
                            style={{
                              color: isDark ? "#9CA3AF" : "#6B7280",
                              left: "8px",
                              top: "20px",
                            }}
                          />
                        </div>
                      </Col>

                      <Col xs={12}>
                        <Button
                          type="submit"
                          className="w-100 border-0 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                          style={{
                            height: "56px",
                            borderRadius: "16px",
                            background: isDark
                              ? "linear-gradient(135deg, #10B981, #059669)"
                              : "linear-gradient(135deg, #059669, #047857)",
                            fontSize: "1.1rem",
                            boxShadow: isDark
                              ? "0 15px 35px #10B98130"
                              : "0 15px 35px #05966930",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = isDark
                              ? "0 20px 40px #10B98140"
                              : "0 20px 40px #05966940";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = isDark
                              ? "0 15px 35px #10B98130"
                              : "0 15px 35px #05966930";
                          }}
                        >
                          <Send size={20} />
                          Send Message
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                ) : (
                  loadingContent
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactSection;
