import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Card,
} from "react-bootstrap";
import {
  Mail,
  Lock,
  User,
  Calendar,
  Phone,
  Home,
  UserPlus,
  Shield,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import useAuthentication from "../../hooks/useAuthentication";

const Signup = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { isLoading, message, signUpCall } = useAuthentication();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    const signupPayload = {
      email,
      password,
      role,
    };

    if (role === "user") {
      signupPayload.name = name;
      signupPayload.age = age;
      signupPayload.mobile = mobile;
      signupPayload.address = address;
    }

    const result = await signUpCall(signupPayload);
    if (result && result.success) {
      navigate("/login");
    }
  };

  const inputStyles = (fieldName) => ({
    backgroundColor: isDark ? "#1F2937" : "#F9FAFB",
    border: `2px solid ${
      focusedField === fieldName
        ? isDark
          ? "#3B82F6"
          : "#2563EB"
        : isDark
        ? "#374151"
        : "#E5E7EB"
    }`,
    borderRadius: "12px",
    padding: "12px 16px 12px 48px",
    fontSize: "1rem",
    color: isDark ? "#F9FAFB" : "#111827",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow:
      focusedField === fieldName
        ? isDark
          ? "0 0 0 3px rgba(59, 130, 246, 0.1)"
          : "0 0 0 3px rgba(37, 99, 235, 0.1)"
        : "none",
  });

  const selectStyles = (fieldName) => ({
    backgroundColor: isDark ? "#1F2937" : "#F9FAFB",
    border: `2px solid ${
      focusedField === fieldName
        ? isDark
          ? "#3B82F6"
          : "#2563EB"
        : isDark
        ? "#374151"
        : "#E5E7EB"
    }`,
    borderRadius: "12px",
    padding: "12px 16px 12px 48px",
    fontSize: "1rem",
    color: isDark ? "#F9FAFB" : "#111827",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow:
      focusedField === fieldName
        ? isDark
          ? "0 0 0 3px rgba(59, 130, 246, 0.1)"
          : "0 0 0 3px rgba(37, 99, 235, 0.1)"
        : "none",
  });

  const textareaStyles = (fieldName) => ({
    backgroundColor: isDark ? "#1F2937" : "#F9FAFB",
    border: `2px solid ${
      focusedField === fieldName
        ? isDark
          ? "#3B82F6"
          : "#2563EB"
        : isDark
        ? "#374151"
        : "#E5E7EB"
    }`,
    borderRadius: "12px",
    padding: "12px 16px 12px 48px",
    fontSize: "1rem",
    color: isDark ? "#F9FAFB" : "#111827",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow:
      focusedField === fieldName
        ? isDark
          ? "0 0 0 3px rgba(59, 130, 246, 0.1)"
          : "0 0 0 3px rgba(37, 99, 235, 0.1)"
        : "none",
    resize: "none",
  });

  const iconContainerStyle = (fieldName) => ({
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color:
      focusedField === fieldName
        ? isDark
          ? "#3B82F6"
          : "#2563EB"
        : isDark
        ? "#9CA3AF"
        : "#6B7280",
    transition: "color 0.3s ease",
    zIndex: 10,
  });

  const iconContainerStyleTextarea = (fieldName) => ({
    position: "absolute",
    left: "16px",
    top: "20px",
    color:
      focusedField === fieldName
        ? isDark
          ? "#3B82F6"
          : "#2563EB"
        : isDark
        ? "#9CA3AF"
        : "#6B7280",
    transition: "color 0.3s ease",
    zIndex: 10,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: isDark ? "#0A0A0A" : "#F8FAFC",
        backgroundImage: isDark
          ? "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)"
          : "radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={7} xl={6}>
            {/* Back Button */}
            <Button
              variant="outline-secondary"
              onClick={() => navigate("/")}
              className="mb-4 d-flex align-items-center gap-2 border-0"
              style={{
                backgroundColor: "transparent",
                color: isDark ? "#9CA3AF" : "#6B7280",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                fontSize: "0.875rem",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = isDark ? "#1F2937" : "#F3F4F6";
                e.target.style.color = isDark ? "#F9FAFB" : "#111827";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = isDark ? "#9CA3AF" : "#6B7280";
              }}
            >
              <ArrowLeft size={16} />
              Back to Home
            </Button>

            <Card
              className="border-0 shadow-lg"
              style={{
                backgroundColor: isDark ? "#111827" : "#FFFFFF",
                borderRadius: "24px",
                backdropFilter: "blur(20px)",
                border: isDark ? "1px solid #1F2937" : "1px solid #E5E7EB",
              }}
            >
              <Card.Body className="p-4 p-md-5">
                {/* Header */}
                <div className="text-center mb-5">
                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "20px",
                      background: isDark
                        ? "linear-gradient(135deg, #3B82F6, #1D4ED8)"
                        : "linear-gradient(135deg, #2563EB, #1D4ED8)",
                      boxShadow: isDark
                        ? "0 20px 40px rgba(59, 130, 246, 0.3)"
                        : "0 20px 40px rgba(37, 99, 235, 0.3)",
                    }}
                  >
                    <UserPlus size={32} color="#FFFFFF" />
                  </div>

                  <h1
                    className="mb-3"
                    style={{
                      fontSize: "2rem",
                      fontWeight: "800",
                      color: isDark ? "#F9FAFB" : "#111827",
                      lineHeight: "1.2",
                    }}
                  >
                    Create Your Account
                  </h1>

                  <p
                    style={{
                      fontSize: "1.1rem",
                      color: isDark ? "#9CA3AF" : "#6B7280",
                      margin: "0",
                      lineHeight: "1.6",
                    }}
                  >
                    Join UrbanCruise today!
                  </p>
                </div>

                {/* Alert */}
                {message && (
                  <Alert
                    variant={message.isError ? "danger" : "success"}
                    className="mb-4"
                    style={{
                      borderRadius: "12px",
                      border: "none",
                      backgroundColor: message.isError
                        ? isDark
                          ? "#991B1B"
                          : "#FEF2F2"
                        : isDark
                        ? "#065F46"
                        : "#F0FDF4",
                      color: message.isError
                        ? isDark
                          ? "#FCA5A5"
                          : "#991B1B"
                        : isDark
                        ? "#6EE7B7"
                        : "#065F46",
                    }}
                  >
                    {message.content}
                  </Alert>
                )}

                {/* Loading State */}
                {isLoading ? (
                  <div className="text-center py-5">
                    <Spinner
                      animation="border"
                      style={{
                        color: isDark ? "#3B82F6" : "#2563EB",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                    <p
                      className="mt-3"
                      style={{
                        color: isDark ? "#9CA3AF" : "#6B7280",
                        fontSize: "1.1rem",
                      }}
                    >
                      Creating account...
                    </p>
                  </div>
                ) : (
                  <Form onSubmit={handleSignup}>
                    {/* Role Selection */}
                    <Form.Group className="mb-4">
                      <Form.Label
                        className="mb-2"
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          color: isDark ? "#F3F4F6" : "#374151",
                        }}
                      >
                        Sign up as
                      </Form.Label>
                      <div className="position-relative">
                        <div style={iconContainerStyle("role")}>
                          <Shield size={20} />
                        </div>
                        <Form.Select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          onFocus={() => setFocusedField("role")}
                          onBlur={() => setFocusedField(null)}
                          required
                          style={selectStyles("role")}
                          className="border-0"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </Form.Select>
                      </div>
                    </Form.Group>

                    {/* Conditional User Fields */}
                    {role === "user" && (
                      <>
                        <Form.Group className="mb-4">
                          <Form.Label
                            className="mb-2"
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              color: isDark ? "#F3F4F6" : "#374151",
                            }}
                          >
                            Full Name
                          </Form.Label>
                          <div className="position-relative">
                            <div style={iconContainerStyle("name")}>
                              <User size={20} />
                            </div>
                            <Form.Control
                              type="text"
                              placeholder="Enter your full name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => setFocusedField(null)}
                              required
                              style={inputStyles("name")}
                              className="border-0"
                            />
                          </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                          <Form.Label
                            className="mb-2"
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              color: isDark ? "#F3F4F6" : "#374151",
                            }}
                          >
                            Age
                          </Form.Label>
                          <div className="position-relative">
                            <div style={iconContainerStyle("age")}>
                              <Calendar size={20} />
                            </div>
                            <Form.Control
                              type="number"
                              placeholder="Enter your age"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              onFocus={() => setFocusedField("age")}
                              onBlur={() => setFocusedField(null)}
                              required
                              style={inputStyles("age")}
                              className="border-0"
                            />
                          </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                          <Form.Label
                            className="mb-2"
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              color: isDark ? "#F3F4F6" : "#374151",
                            }}
                          >
                            Mobile Number
                          </Form.Label>
                          <div className="position-relative">
                            <div style={iconContainerStyle("mobile")}>
                              <Phone size={20} />
                            </div>
                            <Form.Control
                              type="text"
                              placeholder="Enter your mobile number"
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              onFocus={() => setFocusedField("mobile")}
                              onBlur={() => setFocusedField(null)}
                              required
                              style={inputStyles("mobile")}
                              className="border-0"
                            />
                          </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                          <Form.Label
                            className="mb-2"
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              color: isDark ? "#F3F4F6" : "#374151",
                            }}
                          >
                            Address
                          </Form.Label>
                          <div className="position-relative">
                            <div style={iconContainerStyleTextarea("address")}>
                              <Home size={20} />
                            </div>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Enter your address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              onFocus={() => setFocusedField("address")}
                              onBlur={() => setFocusedField(null)}
                              required
                              style={textareaStyles("address")}
                              className="border-0"
                            />
                          </div>
                        </Form.Group>
                      </>
                    )}

                    {/* Email */}
                    <Form.Group className="mb-4">
                      <Form.Label
                        className="mb-2"
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          color: isDark ? "#F3F4F6" : "#374151",
                        }}
                      >
                        Email Address
                      </Form.Label>
                      <div className="position-relative">
                        <div style={iconContainerStyle("email")}>
                          <Mail size={20} />
                        </div>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          required
                          style={inputStyles("email")}
                          className="border-0"
                        />
                      </div>
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-5">
                      <Form.Label
                        className="mb-2"
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          color: isDark ? "#F3F4F6" : "#374151",
                        }}
                      >
                        Password
                      </Form.Label>
                      <div className="position-relative">
                        <div style={iconContainerStyle("password")}>
                          <Lock size={20} />
                        </div>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setFocusedField("password")}
                          onBlur={() => setFocusedField(null)}
                          required
                          style={inputStyles("password")}
                          className="border-0"
                        />
                        <Button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="position-absolute border-0 bg-transparent p-2"
                          style={{
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: isDark ? "#9CA3AF" : "#6B7280",
                            zIndex: 10,
                          }}
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </Button>
                      </div>
                    </Form.Group>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-100 border-0 d-flex align-items-center justify-content-center gap-2"
                      style={{
                        padding: "16px 24px",
                        borderRadius: "12px",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        background: isDark
                          ? "linear-gradient(135deg, #3B82F6, #1D4ED8)"
                          : "linear-gradient(135deg, #2563EB, #1D4ED8)",
                        color: "#FFFFFF",
                        transition: "all 0.3s ease",
                        boxShadow: isDark
                          ? "0 10px 30px rgba(59, 130, 246, 0.3)"
                          : "0 10px 30px rgba(37, 99, 235, 0.3)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = isDark
                          ? "0 15px 40px rgba(59, 130, 246, 0.4)"
                          : "0 15px 40px rgba(37, 99, 235, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = isDark
                          ? "0 10px 30px rgba(59, 130, 246, 0.3)"
                          : "0 10px 30px rgba(37, 99, 235, 0.3)";
                      }}
                    >
                      <UserPlus size={20} />
                      Create Account
                    </Button>
                  </Form>
                )}

                {/* Login Link */}
                <div className="text-center mt-4">
                  <p
                    style={{
                      color: isDark ? "#9CA3AF" : "#6B7280",
                      fontSize: "1rem",
                      margin: "0",
                    }}
                  >
                    Already have an account?{" "}
                    <NavLink
                      to="/login"
                      style={{
                        color: isDark ? "#3B82F6" : "#2563EB",
                        textDecoration: "none",
                        fontWeight: "600",
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = isDark ? "#60A5FA" : "#1D4ED8";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = isDark ? "#3B82F6" : "#2563EB";
                      }}
                    >
                      Sign In
                    </NavLink>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
