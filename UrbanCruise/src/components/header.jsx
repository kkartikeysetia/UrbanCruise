import React, { useState } from "react";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Nav,
  Navbar,
  Col,
  Button,
  Dropdown,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

// Icons
import {
  Car,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";

import useAuthentication from "../hooks/useAuthentication";
import { isAdmin } from "../config/general";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(({ UserSlice }) => UserSlice.user);
  const { signOutCall } = useAuthentication();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Sign Out",
      text: "Are you sure you want to sign out of your account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        htmlContainer: "custom-swal-text",
        confirmButton: "custom-swal-confirm",
        cancelButton: "custom-swal-cancel",
        actions: "custom-swal-actions",
      },
      didOpen: (popup) => {
        // Modern popup styling
        popup.style.backgroundColor = isDark ? "#111827" : "#FFFFFF";
        popup.style.border = isDark ? "1px solid #374151" : "1px solid #E5E7EB";
        popup.style.borderRadius = "24px";
        popup.style.boxShadow = isDark
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          : "0 25px 50px -12px rgba(0, 0, 0, 0.15)";
        popup.style.backdropFilter = "blur(20px)";
        popup.style.padding = "32px";

        // Title styling
        const title = popup.querySelector(".swal2-title");
        if (title) {
          title.style.color = isDark ? "#F9FAFB" : "#111827";
          title.style.fontSize = "1.5rem";
          title.style.fontWeight = "700";
          title.style.marginBottom = "16px";
        }

        // Text styling
        const text = popup.querySelector(".swal2-html-container");
        if (text) {
          text.style.color = isDark ? "#9CA3AF" : "#6B7280";
          text.style.fontSize = "1rem";
          text.style.lineHeight = "1.5";
          text.style.marginBottom = "24px";
        }

        // Icon styling
        const icon = popup.querySelector(".swal2-icon");
        if (icon) {
          icon.style.width = "64px";
          icon.style.height = "64px";
          icon.style.margin = "0 auto 24px auto";
          icon.style.borderWidth = "3px";
          icon.style.borderColor = isDark ? "#3B82F6" : "#2563EB";
        }

        // Confirm button styling
        const confirmBtn = popup.querySelector(".swal2-confirm");
        if (confirmBtn) {
          confirmBtn.style.background =
            "linear-gradient(135deg, #EF4444, #DC2626)";
          confirmBtn.style.color = "#FFFFFF";
          confirmBtn.style.border = "none";
          confirmBtn.style.borderRadius = "12px";
          confirmBtn.style.padding = "12px 24px";
          confirmBtn.style.fontSize = "1rem";
          confirmBtn.style.fontWeight = "600";
          confirmBtn.style.transition = "all 0.3s ease";
          confirmBtn.style.boxShadow = "0 4px 14px rgba(239, 68, 68, 0.3)";
          confirmBtn.style.marginRight = "12px";

          confirmBtn.addEventListener("mouseenter", () => {
            confirmBtn.style.transform = "translateY(-1px)";
            confirmBtn.style.boxShadow = "0 6px 20px rgba(239, 68, 68, 0.4)";
          });

          confirmBtn.addEventListener("mouseleave", () => {
            confirmBtn.style.transform = "translateY(0)";
            confirmBtn.style.boxShadow = "0 4px 14px rgba(239, 68, 68, 0.3)";
          });
        }

        // Cancel button styling
        const cancelBtn = popup.querySelector(".swal2-cancel");
        if (cancelBtn) {
          cancelBtn.style.background = isDark ? "#374151" : "#F3F4F6";
          cancelBtn.style.color = isDark ? "#F9FAFB" : "#374151";
          cancelBtn.style.border = isDark
            ? "1px solid #4B5563"
            : "1px solid #D1D5DB";
          cancelBtn.style.borderRadius = "12px";
          cancelBtn.style.padding = "12px 24px";
          cancelBtn.style.fontSize = "1rem";
          cancelBtn.style.fontWeight = "600";
          cancelBtn.style.transition = "all 0.3s ease";

          cancelBtn.addEventListener("mouseenter", () => {
            cancelBtn.style.background = isDark ? "#4B5563" : "#E5E7EB";
            cancelBtn.style.transform = "translateY(-1px)";
          });

          cancelBtn.addEventListener("mouseleave", () => {
            cancelBtn.style.background = isDark ? "#374151" : "#F3F4F6";
            cancelBtn.style.transform = "translateY(0)";
          });
        }

        // Actions container styling
        const actions = popup.querySelector(".swal2-actions");
        if (actions) {
          actions.style.gap = "12px";
          actions.style.marginTop = "24px";
        }
      },
    });

    if (result.isConfirmed) {
      await signOutCall();
      navigate("/");
    }
  };

  const handleHelpButtonClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Need Assistance?",
      text: "Our support team is available 24/7 to help you. Feel free to reach out anytime!",
      icon: "question",
      confirmButtonText: "Got It",
      buttonsStyling: false,
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        htmlContainer: "custom-swal-text",
        confirmButton: "custom-swal-primary",
      },
      didOpen: (popup) => {
        // Modern popup styling
        popup.style.backgroundColor = isDark ? "#111827" : "#FFFFFF";
        popup.style.border = isDark ? "1px solid #374151" : "1px solid #E5E7EB";
        popup.style.borderRadius = "24px";
        popup.style.boxShadow = isDark
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          : "0 25px 50px -12px rgba(0, 0, 0, 0.15)";
        popup.style.backdropFilter = "blur(20px)";
        popup.style.padding = "32px";

        // Title styling
        const title = popup.querySelector(".swal2-title");
        if (title) {
          title.style.color = isDark ? "#F9FAFB" : "#111827";
          title.style.fontSize = "1.5rem";
          title.style.fontWeight = "700";
          title.style.marginBottom = "16px";
        }

        // Text styling
        const text = popup.querySelector(".swal2-html-container");
        if (text) {
          text.style.color = isDark ? "#9CA3AF" : "#6B7280";
          text.style.fontSize = "1rem";
          text.style.lineHeight = "1.5";
          text.style.marginBottom = "24px";
        }

        // Icon styling
        const icon = popup.querySelector(".swal2-icon");
        if (icon) {
          icon.style.width = "64px";
          icon.style.height = "64px";
          icon.style.margin = "0 auto 24px auto";
          icon.style.borderWidth = "3px";
          icon.style.borderColor = isDark ? "#3B82F6" : "#2563EB";
        }

        // Confirm button styling
        const confirmBtn = popup.querySelector(".swal2-confirm");
        if (confirmBtn) {
          confirmBtn.style.background = isDark
            ? "linear-gradient(135deg, #3B82F6, #1D4ED8)"
            : "linear-gradient(135deg, #2563EB, #1D4ED8)";
          confirmBtn.style.color = "#FFFFFF";
          confirmBtn.style.border = "none";
          confirmBtn.style.borderRadius = "12px";
          confirmBtn.style.padding = "12px 24px";
          confirmBtn.style.fontSize = "1rem";
          confirmBtn.style.fontWeight = "600";
          confirmBtn.style.transition = "all 0.3s ease";
          confirmBtn.style.boxShadow = isDark
            ? "0 4px 14px rgba(59, 130, 246, 0.3)"
            : "0 4px 14px rgba(37, 99, 235, 0.3)";

          confirmBtn.addEventListener("mouseenter", () => {
            confirmBtn.style.transform = "translateY(-1px)";
            confirmBtn.style.boxShadow = isDark
              ? "0 6px 20px rgba(59, 130, 246, 0.4)"
              : "0 6px 20px rgba(37, 99, 235, 0.4)";
          });

          confirmBtn.addEventListener("mouseleave", () => {
            confirmBtn.style.transform = "translateY(0)";
            confirmBtn.style.boxShadow = isDark
              ? "0 4px 14px rgba(59, 130, 246, 0.3)"
              : "0 4px 14px rgba(37, 99, 235, 0.3)";
          });
        }

        // Actions container styling
        const actions = popup.querySelector(".swal2-actions");
        if (actions) {
          actions.style.marginTop = "24px";
        }
      },
    });
  };

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/vehicles", name: "Vehicles" },
    { path: "/services", name: "Services" },
    { path: "/contact", name: "Contact" },
  ];

  const navLinkStyle = (isActive, isHovered) => ({
    color: isActive
      ? isDark
        ? "#3B82F6"
        : "#2563EB"
      : isHovered
      ? isDark
        ? "#60A5FA"
        : "#1D4ED8"
      : isDark
      ? "#E5E7EB"
      : "#374151",
    textDecoration: "none",
    padding: "12px 20px",
    borderRadius: "12px",
    fontWeight: isActive ? "600" : "500",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    position: "relative",
    display: "flex",
    alignItems: "center",
    background: isActive
      ? isDark
        ? "rgba(59, 130, 246, 0.1)"
        : "rgba(37, 99, 235, 0.1)"
      : isHovered
      ? isDark
        ? "rgba(59, 130, 246, 0.05)"
        : "rgba(37, 99, 235, 0.05)"
      : "transparent",
  });

  const buttonStyle = (variant = "primary") => ({
    padding: "10px 20px",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "0.95rem",
    border: "none",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background:
      variant === "primary"
        ? isDark
          ? "linear-gradient(135deg, #3B82F6, #1D4ED8)"
          : "linear-gradient(135deg, #2563EB, #1D4ED8)"
        : variant === "secondary"
        ? isDark
          ? "#374151"
          : "#F3F4F6"
        : "transparent",
    color:
      variant === "primary"
        ? "#FFFFFF"
        : variant === "secondary"
        ? isDark
          ? "#F9FAFB"
          : "#374151"
        : isDark
        ? "#E5E7EB"
        : "#6B7280",
    boxShadow:
      variant === "primary"
        ? isDark
          ? "0 4px 14px rgba(59, 130, 246, 0.3)"
          : "0 4px 14px rgba(37, 99, 235, 0.3)"
        : "none",
  });

  return (
    <React.Fragment>
      {!location.pathname.includes("admin") && (
        <header id="header">
          {/* Top Welcome Bar */}
          <Container
            fluid
            className="d-none d-lg-block py-3"
            style={{
              background: isDark
                ? "linear-gradient(135deg, #1F2937, #111827)"
                : "linear-gradient(135deg, #F8FAFC, #E2E8F0)",
              borderBottom: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
            }}
          >
            <Row className="justify-content-center">
              <Col xs={12}>
                <div className="text-center">
                  <h1
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      background: isDark
                        ? "linear-gradient(135deg, #3B82F6, #60A5FA)"
                        : "linear-gradient(135deg, #2563EB, #3B82F6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      margin: "0",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    Welcome to UrbanCruise - Your Premier Vehicle Rental Service
                  </h1>
                </div>
              </Col>
            </Row>
          </Container>

          {/* Main Navigation Bar */}
          <Navbar
            expand="lg"
            className="py-3"
            style={{
              background: isDark
                ? "rgba(17, 24, 39, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              borderBottom: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
              boxShadow: isDark
                ? "0 10px 30px rgba(0, 0, 0, 0.3)"
                : "0 10px 30px rgba(0, 0, 0, 0.1)",
              position: "sticky",
              top: "0",
              zIndex: 1030,
            }}
          >
            <Container fluid className="px-4">
              {/* Logo */}
              <Navbar.Brand
                as={Link}
                to="/"
                className="d-flex align-items-center gap-3"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: isDark
                      ? "linear-gradient(135deg, #3B82F6, #1D4ED8)"
                      : "linear-gradient(135deg, #2563EB, #1D4ED8)",
                    boxShadow: isDark
                      ? "0 8px 20px rgba(59, 130, 246, 0.3)"
                      : "0 8px 20px rgba(37, 99, 235, 0.3)",
                  }}
                >
                  <Car size={24} color="#FFFFFF" />
                </div>
                <span
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "800",
                    background: isDark
                      ? "linear-gradient(135deg, #3B82F6, #60A5FA)"
                      : "linear-gradient(135deg, #2563EB, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-0.025em",
                  }}
                >
                  UrbanCruise
                </span>
              </Navbar.Brand>

              {/* Mobile Toggle */}
              <Button
                className="d-lg-none border-0 p-2"
                onClick={() => setIsNavOpen(!isNavOpen)}
                style={{
                  background: "transparent",
                  color: isDark ? "#E5E7EB" : "#374151",
                }}
              >
                {isNavOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>

              {/* Navigation */}
              <Navbar.Collapse in={isNavOpen}>
                <Nav className="mx-auto d-flex gap-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const isHovered = hoveredNav === item.path;

                    return (
                      <Nav.Link
                        key={item.path}
                        as={NavLink}
                        to={item.path}
                        style={navLinkStyle(isActive, isHovered)}
                        onMouseEnter={() => setHoveredNav(item.path)}
                        onMouseLeave={() => setHoveredNav(null)}
                      >
                        {item.name}
                      </Nav.Link>
                    );
                  })}
                </Nav>

                {/* Right Side Actions */}
                <div className="d-flex align-items-center gap-3">
                  {/* Theme Toggle */}
                  <Button
                    onClick={toggleTheme}
                    className="border-0 p-2"
                    style={{
                      background: isDark ? "#374151" : "#F3F4F6",
                      color: isDark ? "#F9FAFB" : "#374151",
                      borderRadius: "10px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = isDark
                        ? "#4B5563"
                        : "#E5E7EB";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = isDark
                        ? "#374151"
                        : "#F3F4F6";
                    }}
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </Button>

                  {/* Help Button */}
                  <Button
                    onClick={handleHelpButtonClick}
                    className="border-0"
                    style={buttonStyle("secondary")}
                    onMouseEnter={(e) => {
                      e.target.style.background = isDark
                        ? "#4B5563"
                        : "#E5E7EB";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = isDark
                        ? "#374151"
                        : "#F3F4F6";
                    }}
                  >
                    <HelpCircle size={18} />
                    <span className="d-none d-md-inline">Help</span>
                  </Button>

                  {/* User Actions */}
                  {user ? (
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        className="border-0 d-flex align-items-center gap-2"
                        style={buttonStyle("primary")}
                      >
                        <User size={18} />
                        <span className="d-none d-md-inline">
                          {user.name ||
                            (user.email && user.email.split("@")[0]) ||
                            "User"}
                        </span>
                        <ChevronDown size={16} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        style={{
                          background: isDark ? "#1F2937" : "#FFFFFF",
                          border: isDark
                            ? "1px solid #374151"
                            : "1px solid #E5E7EB",
                          borderRadius: "12px",
                          boxShadow: isDark
                            ? "0 20px 40px rgba(0, 0, 0, 0.3)"
                            : "0 20px 40px rgba(0, 0, 0, 0.1)",
                          minWidth: "200px",
                        }}
                      >
                        {isAdmin(user) && (
                          <Dropdown.Item
                            as={Link}
                            to="/admin"
                            className="d-flex align-items-center gap-2 py-2"
                            style={{
                              color: isDark ? "#F9FAFB" : "#374151",
                              textDecoration: "none",
                              borderRadius: "8px",
                              margin: "4px",
                            }}
                          >
                            <Settings size={16} />
                            Admin Panel
                          </Dropdown.Item>
                        )}

                        <Dropdown.Item
                          as={Link}
                          to="/my-rentals"
                          className="d-flex align-items-center gap-2 py-2"
                          style={{
                            color: isDark ? "#F9FAFB" : "#374151",
                            textDecoration: "none",
                            borderRadius: "8px",
                            margin: "4px",
                          }}
                        >
                          <Car size={16} />
                          My Rentals
                        </Dropdown.Item>

                        <Dropdown.Divider
                          style={{
                            borderColor: isDark ? "#374151" : "#E5E7EB",
                            margin: "8px 0",
                          }}
                        />

                        <Dropdown.Item
                          onClick={handleLogout}
                          className="d-flex align-items-center gap-2 py-2"
                          style={{
                            color: "#EF4444",
                            borderRadius: "8px",
                            margin: "4px",
                          }}
                        >
                          <LogOut size={16} />
                          Sign Out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <div className="d-flex gap-2">
                      <Button
                        as={Link}
                        to="/login"
                        className="border-0"
                        style={buttonStyle("secondary")}
                        onMouseEnter={(e) => {
                          e.target.style.background = isDark
                            ? "#4B5563"
                            : "#E5E7EB";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = isDark
                            ? "#374151"
                            : "#F3F4F6";
                        }}
                      >
                        <User size={18} />
                        <span className="d-none d-sm-inline">Sign In</span>
                      </Button>

                      <Button
                        as={Link}
                        to="/sign-up"
                        className="border-0"
                        style={buttonStyle("primary")}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-1px)";
                          e.target.style.boxShadow = isDark
                            ? "0 6px 20px rgba(59, 130, 246, 0.4)"
                            : "0 6px 20px rgba(37, 99, 235, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = isDark
                            ? "0 4px 14px rgba(59, 130, 246, 0.3)"
                            : "0 4px 14px rgba(37, 99, 235, 0.3)";
                        }}
                      >
                        <User size={18} />
                        <span className="d-none d-sm-inline">Sign Up</span>
                      </Button>
                    </div>
                  )}
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      )}
    </React.Fragment>
  );
};

export default Header;
