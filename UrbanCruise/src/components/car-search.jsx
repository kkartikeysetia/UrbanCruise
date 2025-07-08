import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Search, Car, Bike, ChevronDown } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useTheme } from "../context/ThemeContext";

const CarSearch = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [category, setCategory] = useState("cars");
  const [brands, setBrands] = useState({});
  const [models, setModels] = useState({});
  const [vehicles, setVehicles] = useState({});

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [filteredVehicleIds, setFilteredVehicleIds] = useState([]);

  useEffect(() => {
    const fetchStaticData = async () => {
      const brandsDoc = category === "cars" ? "brands" : "bike-brands";
      const modelsDoc = category === "cars" ? "models" : "bike-models";

      try {
        const brandsSnap = await getDoc(doc(db, "vehicle", brandsDoc));
        const modelsSnap = await getDoc(doc(db, "vehicle", modelsDoc));

        setBrands(brandsSnap.exists() ? brandsSnap.data().brands || {} : {});
        setModels(modelsSnap.exists() ? modelsSnap.data().models || {} : {});
      } catch (error) {
        console.error("Error fetching static data (brands/models):", error);
        setBrands({});
        setModels({});
      }
    };

    fetchStaticData();
  }, [category]);

  useEffect(() => {
    const fetchCategoryVehicles = async () => {
      try {
        const categorySnap = await getDoc(doc(db, "vehicle", category));
        setVehicles(categorySnap.exists() ? categorySnap.data() || {} : {});
      } catch (error) {
        console.error("Error fetching category vehicles:", error);
        setVehicles({});
      }
    };

    setSelectedBrand("");
    setSelectedModel("");
    setSelectedVehicleId("");
    setFilteredVehicleIds([]);

    fetchCategoryVehicles();
  }, [category]);

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setSelectedBrand(value);
    setSelectedModel("");
    setSelectedVehicleId("");
    setFilteredVehicleIds([]);
  };

  const handleModelChange = (e) => {
    const value = e.target.value;
    setSelectedModel(value);
    setSelectedVehicleId("");

    const [modelGroupId] = value.split("_");

    const matches = Object.entries(vehicles)
      .filter(
        ([, vehicle]) =>
          String(vehicle.brandId) === selectedBrand &&
          String(vehicle.modelId) === modelGroupId
      )
      .map(([id]) => id);

    setFilteredVehicleIds(matches);
  };

  const handleVehicleChange = (e) => {
    setSelectedVehicleId(e.target.value);
  };

  const selectedBrandName =
    (brands && brands[selectedBrand]) || "unknown-brand";

  let selectedModelName = "unknown-model";
  if (selectedModel !== "") {
    const [modelGroupId, modelKey] = selectedModel.split("_");
    selectedModelName =
      (models &&
        models[modelGroupId] &&
        models[modelGroupId].models &&
        models[modelGroupId].models[modelKey]) ||
      "unknown-model";
  }

  const CustomSelect = ({ children, ...props }) => (
    <div className="position-relative">
      <Form.Select
        {...props}
        className="form-select-custom border-0"
        style={{
          backgroundColor: isDark ? "#1F2937" : "#F9FAFB",
          color: isDark ? "#F9FAFB" : "#111827",
          fontSize: "1rem",
          fontWeight: "500",
          padding: "0.875rem 2.5rem 0.875rem 1rem",
          borderRadius: "12px",
          boxShadow: isDark
            ? "0 1px 3px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(55, 65, 81, 0.3)"
            : "0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(209, 213, 219, 0.3)",
          transition: "all 0.2s ease",
          appearance: "none",
          backgroundImage: "none",
        }}
      >
        {children}
      </Form.Select>
      <ChevronDown
        size={20}
        className="position-absolute top-50 end-0 translate-middle-y me-3 pointer-events-none"
        style={{ color: isDark ? "#9CA3AF" : "#6B7280" }}
      />
    </div>
  );

  return (
    <div
      className="py-5"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #111827 0%, #1F2937 100%)"
          : "linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)",
      }}
    >
      <Container>
        <div className="text-center mb-5">
          <h2
            className="display-6 fw-bold mb-3"
            style={{
              color: isDark ? "#F9FAFB" : "#111827",
              fontWeight: "700",
            }}
          >
            Find Your Perfect Ride
          </h2>
          <p
            className="lead mb-0"
            style={{
              color: isDark ? "#9CA3AF" : "#6B7280",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Search through our premium collection of vehicles
          </p>
        </div>

        <Card
          className="border-0 shadow-lg"
          style={{
            backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Card.Body className="p-4 p-lg-5">
            <Row className="g-4">
              {/* Vehicle Type Selection */}
              <Col md={6} lg={3}>
                <div className="mb-2">
                  <label
                    className="form-label fw-semibold mb-3"
                    style={{
                      color: isDark ? "#E5E7EB" : "#374151",
                      fontSize: "0.875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.025em",
                    }}
                  >
                    Vehicle Type
                  </label>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    onClick={() => setCategory("cars")}
                    className={`flex-fill d-flex align-items-center justify-content-center gap-2 py-3 rounded-3 border-0 fw-semibold transition-all`}
                    style={{
                      backgroundColor:
                        category === "cars"
                          ? isDark
                            ? "#3B82F6"
                            : "#2563EB"
                          : isDark
                          ? "#374151"
                          : "#F3F4F6",
                      color:
                        category === "cars"
                          ? "#FFFFFF"
                          : isDark
                          ? "#9CA3AF"
                          : "#6B7280",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Car size={18} />
                    Cars
                  </Button>
                  <Button
                    onClick={() => setCategory("bikes")}
                    className={`flex-fill d-flex align-items-center justify-content-center gap-2 py-3 rounded-3 border-0 fw-semibold transition-all`}
                    style={{
                      backgroundColor:
                        category === "bikes"
                          ? isDark
                            ? "#3B82F6"
                            : "#2563EB"
                          : isDark
                          ? "#374151"
                          : "#F3F4F6",
                      color:
                        category === "bikes"
                          ? "#FFFFFF"
                          : isDark
                          ? "#9CA3AF"
                          : "#6B7280",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Bike size={18} />
                    Bikes
                  </Button>
                </div>
              </Col>

              {/* Brand Selection */}
              <Col md={6} lg={3}>
                <div className="mb-2">
                  <label
                    className="form-label fw-semibold mb-3"
                    style={{
                      color: isDark ? "#E5E7EB" : "#374151",
                      fontSize: "0.875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.025em",
                    }}
                  >
                    Brand
                  </label>
                </div>
                <CustomSelect
                  size="lg"
                  value={selectedBrand}
                  onChange={handleBrandChange}
                >
                  <option value="">Choose a Brand</option>
                  {Object.entries(brands).map(([id, name]) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </CustomSelect>
              </Col>

              {/* Model Selection */}
              <Col md={6} lg={3}>
                <div className="mb-2">
                  <label
                    className="form-label fw-semibold mb-3"
                    style={{
                      color: isDark ? "#E5E7EB" : "#374151",
                      fontSize: "0.875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.025em",
                    }}
                  >
                    Model
                  </label>
                </div>
                <CustomSelect
                  size="lg"
                  value={selectedModel}
                  onChange={handleModelChange}
                  disabled={!selectedBrand}
                  style={{
                    opacity: !selectedBrand ? 0.5 : 1,
                    cursor: !selectedBrand ? "not-allowed" : "pointer",
                  }}
                >
                  <option value="">
                    {selectedBrand ? "Choose a Model" : "Select Brand First"}
                  </option>
                  {selectedBrand &&
                    Object.entries(models).flatMap(([groupId, modelData]) => {
                      if (String(modelData.brandId) === selectedBrand) {
                        if (
                          modelData.models &&
                          typeof modelData.models === "object"
                        ) {
                          return Object.entries(modelData.models).map(
                            ([modelKey, modelName]) => (
                              <option
                                key={`${groupId}_${modelKey}`}
                                value={`${groupId}_${modelKey}`}
                              >
                                {modelName}
                              </option>
                            )
                          );
                        }
                      }
                      return [];
                    })}
                </CustomSelect>
              </Col>

              {/* Specific Vehicle Selection */}
              <Col md={6} lg={3}>
                <div className="mb-2">
                  <label
                    className="form-label fw-semibold mb-3"
                    style={{
                      color: isDark ? "#E5E7EB" : "#374151",
                      fontSize: "0.875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.025em",
                    }}
                  >
                    Vehicle
                  </label>
                </div>
                {filteredVehicleIds.length > 1 ? (
                  <CustomSelect
                    size="lg"
                    value={selectedVehicleId}
                    onChange={handleVehicleChange}
                  >
                    <option value="">Choose Specific Vehicle</option>
                    {filteredVehicleIds.map((vehicleId) => (
                      <option key={vehicleId} value={vehicleId}>
                        {(vehicles[vehicleId] && vehicles[vehicleId].name) ||
                          "Vehicle " + vehicleId}
                      </option>
                    ))}
                  </CustomSelect>
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      height: "54px",
                      backgroundColor: isDark ? "#374151" : "#F3F4F6",
                      color: isDark ? "#9CA3AF" : "#6B7280",
                      fontSize: "0.9rem",
                    }}
                  >
                    {!selectedModel ? "Select Model First" : "Auto-selected"}
                  </div>
                )}
              </Col>
            </Row>

            {/* Search Button */}
            <div className="text-center mt-5">
              <Link
                to={
                  selectedVehicleId
                    ? "/" +
                      category +
                      "/" +
                      selectedBrandName.toLowerCase().replace(/\s+/g, "-") +
                      "/" +
                      selectedModelName.toLowerCase().replace(/\s+/g, "-") +
                      "/" +
                      selectedVehicleId
                    : selectedModel && filteredVehicleIds.length === 1
                    ? "/" +
                      category +
                      "/" +
                      selectedBrandName.toLowerCase().replace(/\s+/g, "-") +
                      "/" +
                      selectedModelName.toLowerCase().replace(/\s+/g, "-") +
                      "/" +
                      filteredVehicleIds[0]
                    : "/vehicles"
                }
                className="text-decoration-none"
              >
                <Button
                  size="lg"
                  className="d-inline-flex align-items-center gap-2 fw-semibold px-5 py-3 rounded-3 border-0"
                  style={{
                    backgroundColor: isDark ? "#3B82F6" : "#2563EB",
                    color: "#FFFFFF",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                    boxShadow: isDark
                      ? "0 10px 25px rgba(59, 130, 246, 0.3)"
                      : "0 10px 25px rgba(37, 99, 235, 0.3)",
                    minWidth: "200px",
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
                  <Search size={20} />
                  Search Vehicles
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CarSearch;
