/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { reviewsData } from "../DATA/data.jsx";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const CustomerReview = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [index, setIndex] = useState(0);

  // Group reviews in pairs for display
  const groupedReviews = [];
  for (let i = 0; i < reviewsData.length; i += 2) {
    groupedReviews.push(reviewsData.slice(i, i + 2));
  }

  const totalSlides = groupedReviews.length;

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const onPrevClick = () => {
    const newIndex = index === 0 ? totalSlides - 1 : index - 1;
    setIndex(newIndex);
  };

  const onNextClick = () => {
    const newIndex = index === totalSlides - 1 ? 0 : index + 1;
    setIndex(newIndex);
  };

  return (
    <div
      id="customer-reviews"
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
                Testimonials
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
              What Our{" "}
              <span
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, #3B82F6, #1D4ED8)"
                    : "linear-gradient(135deg, #2563EB, #1D4ED8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Customers Say
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
              Hear directly from our satisfied clients about their UrbanCruise
              experience.
            </p>
          </Col>
        </Row>

        {/* Reviews Carousel */}
        <Row className="justify-content-center">
          <Col lg={11} xl={10}>
            <div className="position-relative">
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                controls={false}
                indicators={false}
                interval={5000}
                pause="hover"
                wrap={true}
                className="testimonial-carousel"
                style={{ overflow: "hidden" }}
              >
                {groupedReviews.map((reviewPair, slideIndex) => (
                  <Carousel.Item key={slideIndex}>
                    <Row className="g-4 justify-content-center">
                      {reviewPair.map((review, reviewIndex) => (
                        <Col
                          key={reviewIndex}
                          xs={12}
                          md={6}
                          className="d-flex"
                        >
                          <Card
                            className="h-100 border-0 w-100 position-relative overflow-hidden"
                            style={{
                              backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                              borderRadius: "24px",
                              boxShadow: isDark
                                ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                                : "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                              transition: "all 0.3s ease",
                            }}
                          >
                            {/* Gradient overlay */}
                            <div
                              className="position-absolute top-0 start-0 w-100 h-100"
                              style={{
                                background: isDark
                                  ? "linear-gradient(135deg, #3B82F620, transparent)"
                                  : "linear-gradient(135deg, #2563EB10, transparent)",
                                zIndex: 1,
                              }}
                            />

                            <Card.Body
                              className="p-4 p-lg-5 position-relative"
                              style={{ zIndex: 2 }}
                            >
                              {/* Quote Icon */}
                              <div className="mb-4">
                                <div
                                  className="d-inline-flex align-items-center justify-content-center"
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "16px",
                                    background: isDark
                                      ? "linear-gradient(135deg, #3B82F6, #1D4ED8)"
                                      : "linear-gradient(135deg, #2563EB, #1D4ED8)",
                                    boxShadow: isDark
                                      ? "0 15px 35px #3B82F630"
                                      : "0 15px 35px #2563EB30",
                                  }}
                                >
                                  <Quote size={24} color="#FFFFFF" />
                                </div>
                              </div>

                              {/* Star Rating */}
                              <div className="mb-3 d-flex gap-1">
                                {[...Array(review.customerStar || 5)].map(
                                  (_, i) => (
                                    <Star
                                      key={i}
                                      size={20}
                                      fill="#FCD34D"
                                      color="#FCD34D"
                                    />
                                  )
                                )}
                              </div>

                              {/* Review Text */}
                              <blockquote
                                className="mb-4"
                                style={{
                                  fontSize: "1.125rem",
                                  lineHeight: "1.7",
                                  color: isDark ? "#E5E7EB" : "#374151",
                                  fontStyle: "italic",
                                  margin: "0",
                                }}
                              >
                                "{review.review}"
                              </blockquote>

                              {/* Customer Info */}
                              <div className="d-flex align-items-center gap-3">
                                <div
                                  className="rounded-circle overflow-hidden flex-shrink-0"
                                  style={{
                                    width: "56px",
                                    height: "56px",
                                    border: `3px solid ${
                                      isDark ? "#374151" : "#E5E7EB"
                                    }`,
                                  }}
                                >
                                  <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-100 h-100"
                                    style={{
                                      objectFit: "cover",
                                      objectPosition: "center",
                                    }}
                                    onError={(e) => {
                                      e.target.src =
                                        "https://via.placeholder.com/56x56/3B82F6/FFFFFF?text=" +
                                        review.name.charAt(0);
                                    }}
                                  />
                                </div>
                                <div>
                                  <h5
                                    className="mb-1 fw-bold"
                                    style={{
                                      color: isDark ? "#F9FAFB" : "#111827",
                                      fontSize: "1.1rem",
                                    }}
                                  >
                                    {review.name}
                                  </h5>
                                  <p
                                    className="mb-0"
                                    style={{
                                      color: isDark ? "#9CA3AF" : "#6B7280",
                                      fontSize: "0.875rem",
                                    }}
                                  >
                                    Verified Customer
                                  </p>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Carousel.Item>
                ))}
              </Carousel>

              {/* Custom Navigation Buttons */}
              {totalSlides > 1 && (
                <>
                  <Button
                    onClick={onPrevClick}
                    className="position-absolute top-50 start-0 translate-middle-y border-0 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "56px",
                      height: "56px",
                      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                      color: isDark ? "#E5E7EB" : "#374151",
                      boxShadow: isDark
                        ? "0 15px 35px rgba(0, 0, 0, 0.3)"
                        : "0 15px 35px rgba(0, 0, 0, 0.1)",
                      transform: "translateX(-50%) translateY(-50%)",
                      left: "-28px",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
                      zIndex: 10,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = isDark
                        ? "#374151"
                        : "#F3F4F6";
                      e.target.style.transform =
                        "translateX(-50%) translateY(-50%) scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = isDark
                        ? "#1F2937"
                        : "#FFFFFF";
                      e.target.style.transform =
                        "translateX(-50%) translateY(-50%) scale(1)";
                    }}
                  >
                    <ChevronLeft size={24} strokeWidth={2} />
                  </Button>

                  <Button
                    onClick={onNextClick}
                    className="position-absolute top-50 end-0 translate-middle-y border-0 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "56px",
                      height: "56px",
                      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                      color: isDark ? "#E5E7EB" : "#374151",
                      boxShadow: isDark
                        ? "0 15px 35px rgba(0, 0, 0, 0.3)"
                        : "0 15px 35px rgba(0, 0, 0, 0.1)",
                      transform: "translateX(50%) translateY(-50%)",
                      right: "-28px",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${isDark ? "#374151" : "#E5E7EB"}`,
                      zIndex: 10,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = isDark
                        ? "#374151"
                        : "#F3F4F6";
                      e.target.style.transform =
                        "translateX(50%) translateY(-50%) scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = isDark
                        ? "#1F2937"
                        : "#FFFFFF";
                      e.target.style.transform =
                        "translateX(50%) translateY(-50%) scale(1)";
                    }}
                  >
                    <ChevronRight size={24} strokeWidth={2} />
                  </Button>
                </>
              )}

              {/* Dots Indicator */}
              {totalSlides > 1 && (
                <div className="d-flex justify-content-center mt-4 gap-2">
                  {groupedReviews.map((_, slideIndex) => (
                    <button
                      key={slideIndex}
                      onClick={() => setIndex(slideIndex)}
                      className="border-0 rounded-pill"
                      style={{
                        width: index === slideIndex ? "32px" : "12px",
                        height: "12px",
                        backgroundColor:
                          index === slideIndex
                            ? isDark
                              ? "#3B82F6"
                              : "#2563EB"
                            : isDark
                            ? "#374151"
                            : "#D1D5DB",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Bottom Stats Section */}
        <Row className="justify-content-center mt-5 pt-4">
          <Col lg={8}>
            <Row className="g-4 text-center">
              {[
                { number: "10,000+", label: "Happy Customers" },
                { number: "4.9/5", label: "Average Rating" },
                { number: "99%", label: "Satisfaction Rate" },
              ].map((stat, statIndex) => (
                <Col xs={4} key={statIndex}>
                  <div
                    className="p-3 rounded-3"
                    style={{
                      background: isDark
                        ? "linear-gradient(135deg, #1F2937, #111827)"
                        : "linear-gradient(135deg, #F3F4F6, #E5E7EB)",
                      border: isDark
                        ? "1px solid #374151"
                        : "1px solid #D1D5DB",
                    }}
                  >
                    <h3
                      className="mb-1 fw-bold"
                      style={{
                        color: isDark ? "#3B82F6" : "#2563EB",
                        fontSize: "1.5rem",
                      }}
                    >
                      {stat.number}
                    </h3>
                    <p
                      className="mb-0"
                      style={{
                        color: isDark ? "#9CA3AF" : "#6B7280",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerReview;
