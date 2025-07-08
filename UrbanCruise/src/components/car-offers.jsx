/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Spinner,
  Form,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useTheme } from "../context/ThemeContext";
import {
  Filter,
  Car,
  Bike,
  ChevronRight,
  Star,
  MapPin,
  Fuel,
  Calendar,
  Users,
  ArrowRight,
} from "lucide-react";

/**
 * Modern Vehicle Card Component
 */
function VehicleCard({ vehicle, brand, model, category, theme, vehicleId }) {
  const isDark = theme === "dark";
  const urlBrand = brand.toLowerCase().replace(/\s+/g, "-");
  const urlModel = model.toLowerCase().replace(/\s+/g, "-");

  const getStockCount = (vehicleData, categoryType) => {
    if (!vehicleData) return 0;
    if (categoryType === "car" && vehicleData.carCount !== undefined)
      return vehicleData.carCount;
    if (categoryType === "bike" && vehicleData.bikeCount !== undefined)
      return vehicleData.bikeCount;
    if (vehicleData.vehicleCount !== undefined) return vehicleData.vehicleCount;
    return vehicleData.stockCount !== undefined ? vehicleData.stockCount : 0;
  };

  const currentStock = getStockCount(vehicle, category);
  const isAvailable = currentStock > 0;

  return (
    <div
      className="h-100"
      style={{
        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
        borderRadius: "16px",
        border: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: isDark
          ? "0 4px 6px rgba(0, 0, 0, 0.3)"
          : "0 4px 6px rgba(0, 0, 0, 0.05)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 20px 25px rgba(0, 0, 0, 0.4)"
          : "0 20px 25px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 4px 6px rgba(0, 0, 0, 0.3)"
          : "0 4px 6px rgba(0, 0, 0, 0.05)";
      }}
    >
      {/* Image Section */}
      <div
        className="position-relative"
        style={{
          height: "220px",
          backgroundColor: isDark ? "#111827" : "#F9FAFB",
          borderBottom: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
        }}
      >
        <LazyLoadImage
          src={vehicle.image}
          className="w-100 h-100"
          effect="blur"
          alt={`${brand} ${model}`}
          placeholderSrc="https://placehold.co/400x250/cccccc/ffffff?text=Loading..."
          style={{
            objectFit: "cover",
            borderRadius: "15px 15px 0 0",
          }}
        />

        {/* Availability Badge */}
        <div className="position-absolute top-0 end-0 m-3">
          <Badge
            className="px-3 py-2 fw-semibold"
            style={{
              backgroundColor: isAvailable
                ? isDark
                  ? "#059669"
                  : "#10B981"
                : isDark
                ? "#DC2626"
                : "#EF4444",
              color: "#FFFFFF",
              borderRadius: "8px",
              fontSize: "0.75rem",
            }}
          >
            {isAvailable ? `${currentStock} Available` : "Out of Stock"}
          </Badge>
        </div>

        {/* Price Badge */}
        <div className="position-absolute bottom-0 start-0 m-3">
          <Badge
            className="px-3 py-2 fw-bold"
            style={{
              backgroundColor: isDark
                ? "rgba(59, 130, 246, 0.9)"
                : "rgba(37, 99, 235, 0.9)",
              color: "#FFFFFF",
              borderRadius: "8px",
              fontSize: "0.875rem",
            }}
          >
            ₹{vehicle.pricePerDay || 500}/day
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="mb-3">
          <h3
            className="fw-bold mb-1"
            style={{
              color: isDark ? "#F9FAFB" : "#111827",
              fontSize: "1.25rem",
              lineHeight: "1.4",
            }}
          >
            {brand}
          </h3>
          <p
            className="mb-2"
            style={{
              color: isDark ? "#60A5FA" : "#2563EB",
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            {model}
          </p>
        </div>

        {/* Vehicle Details */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-3 mb-2">
            <div className="d-flex align-items-center gap-1">
              <Fuel
                size={16}
                style={{ color: isDark ? "#9CA3AF" : "#6B7280" }}
              />
              <span
                style={{
                  color: isDark ? "#D1D5DB" : "#374151",
                  fontSize: "0.875rem",
                }}
              >
                {vehicle.fuelType || "Petrol"}
              </span>
            </div>
            {vehicle.engineSize && (
              <div className="d-flex align-items-center gap-1">
                <span
                  style={{
                    color: isDark ? "#D1D5DB" : "#374151",
                    fontSize: "0.875rem",
                  }}
                >
                  {vehicle.engineSize}cc
                </span>
              </div>
            )}
          </div>

          {vehicle.bodyType && (
            <div className="d-flex align-items-center gap-1 mb-2">
              <Car
                size={16}
                style={{ color: isDark ? "#9CA3AF" : "#6B7280" }}
              />
              <span
                style={{
                  color: isDark ? "#D1D5DB" : "#374151",
                  fontSize: "0.875rem",
                }}
              >
                {vehicle.bodyType}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link
          to={`/${category}s/${urlBrand}/${urlModel}/${vehicleId}`}
          className="text-decoration-none"
        >
          <Button
            disabled={!isAvailable}
            className="w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold py-3 border-0"
            style={{
              backgroundColor: isAvailable
                ? isDark
                  ? "#3B82F6"
                  : "#2563EB"
                : isDark
                ? "#4B5563"
                : "#9CA3AF",
              color: "#FFFFFF",
              borderRadius: "12px",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              opacity: isAvailable ? 1 : 0.6,
              cursor: isAvailable ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => {
              if (isAvailable) {
                e.target.style.backgroundColor = isDark ? "#2563EB" : "#1D4ED8";
              }
            }}
            onMouseLeave={(e) => {
              if (isAvailable) {
                e.target.style.backgroundColor = isDark ? "#3B82F6" : "#2563EB";
              }
            }}
          >
            {isAvailable ? "Rent Now" : "Not Available"}
            {isAvailable && <ArrowRight size={18} />}
          </Button>
        </Link>
      </div>
    </div>
  );
}

/**
 * Modern Filter Component
 */
function FilterSection({
  theme,
  activeType,
  currentBodyTypeOptions,
  fuelTypeOptions,
  selectedBodyType,
  selectedFuelType,
  setSelectedBodyType,
  setSelectedFuelType,
  applyFilters,
  clearAllFilters,
  showFilterDropdown,
  setShowFilterDropdown,
}) {
  const isDark = theme === "dark";

  return (
    <div className="position-relative">
      <Button
        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
        className="d-flex align-items-center gap-2 px-4 py-3 border-0 fw-semibold"
        style={{
          backgroundColor: isDark ? "#374151" : "#F3F4F6",
          color: isDark ? "#E5E7EB" : "#374151",
          borderRadius: "12px",
          transition: "all 0.2s ease",
        }}
      >
        <Filter size={18} />
        Filters
      </Button>

      {showFilterDropdown && (
        <div
          className="position-absolute mt-2 p-4 shadow-lg"
          style={{
            top: "100%",
            right: "0",
            minWidth: "300px",
            backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
            border: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
            borderRadius: "16px",
            zIndex: 1000,
          }}
        >
          <h6
            className="fw-bold mb-3"
            style={{ color: isDark ? "#F9FAFB" : "#111827" }}
          >
            Filter Vehicles
          </h6>

          <div className="mb-3">
            <label
              className="form-label fw-semibold mb-2"
              style={{
                color: isDark ? "#D1D5DB" : "#374151",
                fontSize: "0.875rem",
              }}
            >
              Body Type
            </label>
            <Form.Select
              value={selectedBodyType}
              onChange={(e) => setSelectedBodyType(e.target.value)}
              style={{
                backgroundColor: isDark ? "#374151" : "#F9FAFB",
                color: isDark ? "#F9FAFB" : "#111827",
                border: isDark ? "1px solid #4B5563" : "1px solid #D1D5DB",
                borderRadius: "8px",
                fontSize: "0.875rem",
              }}
            >
              {currentBodyTypeOptions.map((option) => (
                <option key={option} value={option === "All" ? "" : option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </div>

          <div className="mb-4">
            <label
              className="form-label fw-semibold mb-2"
              style={{
                color: isDark ? "#D1D5DB" : "#374151",
                fontSize: "0.875rem",
              }}
            >
              Fuel Type
            </label>
            <Form.Select
              value={selectedFuelType}
              onChange={(e) => setSelectedFuelType(e.target.value)}
              style={{
                backgroundColor: isDark ? "#374151" : "#F9FAFB",
                color: isDark ? "#F9FAFB" : "#111827",
                border: isDark ? "1px solid #4B5563" : "1px solid #D1D5DB",
                borderRadius: "8px",
                fontSize: "0.875rem",
              }}
            >
              {fuelTypeOptions.map((option) => (
                <option key={option} value={option === "All" ? "" : option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </div>

          <div className="d-flex gap-2">
            <Button
              onClick={applyFilters}
              className="flex-fill fw-semibold py-2 border-0"
              style={{
                backgroundColor: isDark ? "#3B82F6" : "#2563EB",
                color: "#FFFFFF",
                borderRadius: "8px",
                fontSize: "0.875rem",
              }}
            >
              Apply
            </Button>
            <Button
              onClick={clearAllFilters}
              className="flex-fill fw-semibold py-2"
              style={{
                backgroundColor: "transparent",
                color: isDark ? "#9CA3AF" : "#6B7280",
                border: isDark ? "1px solid #4B5563" : "1px solid #D1D5DB",
                borderRadius: "8px",
                fontSize: "0.875rem",
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Main CarOffers Component
 */
function CarOffers() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme === "dark";

  const [activeType, setActiveType] = useState("car");
  const [cars, setCars] = useState({});
  const [bikes, setBikes] = useState({});
  const [brands, setBrands] = useState({});
  const [models, setModels] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedBodyType, setSelectedBodyType] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [appliedBodyType, setAppliedBodyType] = useState("");
  const [appliedFuelType, setAppliedFuelType] = useState("");

  const [showAllVehicles, setShowAllVehicles] = useState(
    location.pathname === "/vehicles" || location.pathname === "/all-offers"
  );

  const vehicleCategories = [
    { name: "Cars", value: "car", icon: <Car size={20} /> },
    { name: "Bikes", value: "bike", icon: <Bike size={20} /> },
  ];

  const carBodyTypeOptions = [
    "All",
    "SUV",
    "Sedan",
    "Hatchback",
    "Convertible",
  ];
  const bikeBodyTypeOptions = [
    "All",
    "Regular",
    "Sports",
    "Naked",
    "Cruiser",
    "Off-road",
  ];
  const fuelTypeOptions = ["All", "Petrol", "Diesel", "Electric"];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setFetchError(null);

      try {
        const [
          fetchedCarBrandsSnap,
          fetchedBikeBrandsSnap,
          fetchedCarModelsSnap,
          fetchedBikeModelsSnap,
          fetchedCars,
          fetchedBikes,
        ] = await Promise.all([
          getDoc(doc(db, "vehicle", "brands")),
          getDoc(doc(db, "vehicle", "bike-brands")),
          getDoc(doc(db, "vehicle", "models")),
          getDoc(doc(db, "vehicle", "bike-models")),
          getDoc(doc(db, "vehicle", "cars")),
          getDoc(doc(db, "vehicle", "bikes")),
        ]);

        const allFetchedBrands = {};

        // Process car brands
        if (fetchedCarBrandsSnap.exists()) {
          const brandsData = fetchedCarBrandsSnap.data().brands;
          if (brandsData && typeof brandsData === "object") {
            Object.entries(brandsData).forEach(([brandId, brandName]) => {
              allFetchedBrands[`car-${String(brandId)}`] = brandName;
            });
          }
        }

        // Process bike brands
        if (fetchedBikeBrandsSnap.exists()) {
          const bikeBrandsData = fetchedBikeBrandsSnap.data().brands;
          if (bikeBrandsData && typeof bikeBrandsData === "object") {
            Object.entries(bikeBrandsData).forEach(([brandId, brandName]) => {
              allFetchedBrands[`bike-${String(brandId)}`] = brandName;
            });
          }
        }

        setBrands(allFetchedBrands);

        // Process models
        const combinedModels = {};
        const processModelsData = (snap, categoryPrefix) => {
          if (snap.exists()) {
            const rawModelsForCategory = snap.data().models;
            if (
              rawModelsForCategory &&
              typeof rawModelsForCategory === "object"
            ) {
              Object.entries(rawModelsForCategory).forEach(
                ([modelGroupId, modelGroup]) => {
                  if (
                    modelGroup &&
                    typeof modelGroup === "object" &&
                    modelGroup.brandId !== undefined
                  ) {
                    const prefixedKey = `${categoryPrefix}-${String(
                      modelGroup.brandId
                    )}`;
                    combinedModels[prefixedKey] = modelGroup;
                  }
                }
              );
            }
          }
        };

        processModelsData(fetchedCarModelsSnap, "car");
        processModelsData(fetchedBikeModelsSnap, "bike");
        setModels(combinedModels);

        // Set vehicle data
        setCars(fetchedCars.exists() ? fetchedCars.data() : {});
        setBikes(fetchedBikes.exists() ? fetchedBikes.data() : {});
      } catch (error) {
        console.error("Error fetching data:", error);
        setFetchError("Failed to load vehicles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    setAppliedBodyType(selectedBodyType);
    setAppliedFuelType(selectedFuelType);
    setShowFilterDropdown(false);
  };

  const clearAllFilters = () => {
    setSelectedBodyType("");
    setSelectedFuelType("");
    setAppliedBodyType("");
    setAppliedFuelType("");
  };

  const handleShowAllClick = () => {
    setShowAllVehicles(true);
  };

  const handleTabChange = (type) => {
    setActiveType(type);
    clearAllFilters();
    if (
      !(
        location.pathname === "/vehicles" || location.pathname === "/all-offers"
      )
    ) {
      setShowAllVehicles(false);
    } else {
      setShowAllVehicles(true);
    }
  };

  // Get current data
  const currentData = activeType === "car" ? cars : bikes;
  const currentBodyTypeOptions =
    activeType === "car" ? carBodyTypeOptions : bikeBodyTypeOptions;

  // Filter items
  const filteredItems = Object.entries(currentData).filter(([, vehicle]) => {
    const bodyTypeMatch =
      !appliedBodyType || vehicle.bodyType === appliedBodyType;
    const fuelTypeMatch =
      !appliedFuelType || vehicle.fuelType === appliedFuelType;
    return bodyTypeMatch && fuelTypeMatch;
  });

  const maxItems = isMobile ? 6 : 9;
  const itemsToShow = showAllVehicles
    ? filteredItems
    : filteredItems.slice(0, maxItems);
  const shouldShowViewMoreButton =
    !showAllVehicles && filteredItems.length > maxItems;

  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center py-5"
        style={{
          minHeight: "400px",
          backgroundColor: isDark ? "#0A0A0A" : "#F9FAFB",
        }}
      >
        <div className="text-center">
          <Spinner
            animation="border"
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
            Loading vehicles...
          </p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div
        className="text-center py-5"
        style={{
          backgroundColor: isDark ? "#0A0A0A" : "#F9FAFB",
        }}
      >
        <p className="text-danger fw-bold" style={{ fontSize: "1.1rem" }}>
          {fetchError}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: isDark ? "#0A0A0A" : "#F9FAFB",
        transition: "background-color 0.3s ease",
      }}
    >
      <Container className="py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h2
            className="display-5 fw-bold mb-3"
            style={{
              color: isDark ? "#F9FAFB" : "#111827",
              fontWeight: "700",
            }}
          >
            Our Premium Fleet
          </h2>
          <p
            className="lead mb-0"
            style={{
              color: isDark ? "#9CA3AF" : "#6B7280",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Choose from our collection of premium cars and bikes
          </p>
        </div>

        {/* Category Tabs and Filters */}
        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
          {/* Category Tabs */}
          <div className="d-flex gap-2">
            {vehicleCategories.map((category) => (
              <Button
                key={category.value}
                onClick={() => handleTabChange(category.value)}
                className={`d-flex align-items-center gap-2 px-4 py-3 fw-semibold border-0`}
                style={{
                  backgroundColor:
                    activeType === category.value
                      ? isDark
                        ? "#3B82F6"
                        : "#2563EB"
                      : isDark
                      ? "#374151"
                      : "#F3F4F6",
                  color:
                    activeType === category.value
                      ? "#FFFFFF"
                      : isDark
                      ? "#9CA3AF"
                      : "#6B7280",
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                }}
              >
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>

          {/* Filter Component */}
          <FilterSection
            theme={theme}
            activeType={activeType}
            currentBodyTypeOptions={currentBodyTypeOptions}
            fuelTypeOptions={fuelTypeOptions}
            selectedBodyType={selectedBodyType}
            selectedFuelType={selectedFuelType}
            setSelectedBodyType={setSelectedBodyType}
            setSelectedFuelType={setSelectedFuelType}
            applyFilters={applyFilters}
            clearAllFilters={clearAllFilters}
            showFilterDropdown={showFilterDropdown}
            setShowFilterDropdown={setShowFilterDropdown}
          />
        </div>

        {/* Vehicle Grid */}
        {itemsToShow.length === 0 ? (
          <div className="text-center py-5">
            <p
              style={{
                color: isDark ? "#9CA3AF" : "#6B7280",
                fontSize: "1.1rem",
              }}
            >
              No vehicles found matching your criteria.
            </p>
          </div>
        ) : (
          <>
            <Row className="g-4">
              {itemsToShow.map(([vehicleId, vehicle]) => {
                const originalBrandId = String(vehicle.brandId);
                const originalModelId = String(vehicle.modelId);
                const prefixedBrandKey = `${activeType}-${originalBrandId}`;

                const brand = brands[prefixedBrandKey] || "Unknown Brand";
                let modelName = "Unknown Model";

                const brandModels = models[prefixedBrandKey];
                if (
                  brandModels &&
                  typeof brandModels === "object" &&
                  brandModels.models
                ) {
                  const foundModel = brandModels.models[originalModelId];
                  if (foundModel) {
                    modelName = foundModel;
                  }
                }

                return (
                  <Col xs={12} sm={6} lg={4} key={vehicleId}>
                    <VehicleCard
                      vehicle={vehicle}
                      brand={brand}
                      model={modelName}
                      category={activeType}
                      theme={theme}
                      vehicleId={vehicleId}
                    />
                  </Col>
                );
              })}
            </Row>

            {/* View More Button */}
            {shouldShowViewMoreButton && (
              <div className="text-center mt-5">
                <Button
                  onClick={handleShowAllClick}
                  className="d-inline-flex align-items-center gap-2 fw-semibold px-5 py-3 border-0"
                  style={{
                    backgroundColor: "transparent",
                    color: isDark ? "#60A5FA" : "#2563EB",
                    border: isDark ? "2px solid #60A5FA" : "2px solid #2563EB",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = isDark
                      ? "rgba(96, 165, 250, 0.1)"
                      : "rgba(37, 99, 235, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  View All {activeType === "car" ? "Cars" : "Bikes"}
                  <ChevronRight size={20} />
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default CarOffers;
