import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Card,
  Badge,
} from "react-bootstrap";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Fuel,
  Gauge,
  Settings,
  Car,
  CreditCard,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useSelector } from "react-redux";
import {
  fetchBrands,
  fetchModels,
  fetchVehicles,
  fetchLocations,
} from "../hooks/useFetchData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { addDoc, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useTheme } from "../context/ThemeContext";

const VehicleDetail = () => {
  const user = useSelector(({ UserSlice }) => UserSlice.user);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { category, vehicleBrand, vehicleModel, vehicleId } = useParams();
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState(null);
  const [brands, setBrands] = useState(null);
  const [models, setModels] = useState(null);
  const [locations, setLocations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [selectedLocations, setSelectedLocations] = useState({
    pickup: "",
    dropoff: "",
  });
  const [rentDate, setRentDate] = useState({
    start: getDateByInputFormat(),
    end: getDateByInputFormat(1),
  });

  const [reservationCompleted, setReservationCompleted] = useState(false);

  function getDateByInputFormat(dayOffset = 0, date = null) {
    const currentDate = date ? new Date(date) : new Date();
    if (dayOffset === 0) return currentDate.toISOString().split("T")[0];
    const offsetDate = new Date(currentDate);
    offsetDate.setDate(currentDate.getDate() + dayOffset);
    return offsetDate.toISOString().split("T")[0];
  }

  function getRentalDays() {
    const start = new Date(rentDate.start);
    const end = new Date(rentDate.end);
    if (start.getTime() > end.getTime()) {
      return 0;
    }
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const getEffectiveStockCount = (vehicleData) => {
    if (!vehicleData) return 0;
    if (vehicleData.vehicleCount !== undefined) {
      return vehicleData.vehicleCount;
    }
    if (category === "cars" && vehicleData.carCount !== undefined) {
      return vehicleData.carCount;
    }
    if (category === "bikes" && vehicleData.bikeCount !== undefined) {
      return vehicleData.bikeCount;
    }
    return vehicleData.stockCount || 0;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const singularCategory = category.slice(0, -1);

        const [
          fetchedBrands,
          fetchedModels,
          fetchedVehiclesCollection,
          fetchedLocations,
        ] = await Promise.all([
          fetchBrands(singularCategory),
          fetchModels(singularCategory),
          fetchVehicles(category),
          fetchLocations(),
        ]);

        const specificVehicle = fetchedVehiclesCollection
          ? fetchedVehiclesCollection[vehicleId]
          : null;

        setBrands(fetchedBrands);
        setModels(fetchedModels);
        setVehicles(specificVehicle);
        setLocations(fetchedLocations);

        if (!specificVehicle) {
          console.warn(
            "WARN (VehicleDetail): Vehicle data for ID",
            vehicleId,
            "not found in category",
            category
          );
          setFetchError(`The selected ${singularCategory} was not found.`);
        }
      } catch (error) {
        console.error("Error fetching data in VehicleDetail:", error);
        setFetchError(
          `Failed to load ${category.slice(
            0,
            -1
          )} details. Please check your internet connection and try again.`
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, [vehicleId, category]);

  const handleReserveButtonClick = async () => {
    if (!(user && user.email)) {
      Swal.fire({
        title: "Authentication Required",
        text: "Please log in to make a reservation.",
        icon: "info",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    if (!vehicles) {
      Swal.fire({
        icon: "error",
        title: `${category.slice(0, -1)} not found!`,
        text: `This ${category.slice(0, -1)} doesn't exist in our records.`,
      });
      return;
    }

    if (Object.values(selectedLocations).some((v) => v === "")) {
      const message = Object.values(selectedLocations).every((v) => v === "")
        ? "Please choose locations!"
        : selectedLocations.pickup === ""
        ? "Please choose a pick-up location!"
        : "Please choose a drop-off location!";
      Swal.fire({ title: message, icon: "warning" });
      return;
    }

    if (getRentalDays() <= 0) {
      Swal.fire({
        title: "Please select valid rental dates!",
        icon: "warning",
      });
      return;
    }

    if (getEffectiveStockCount(vehicles) <= 0) {
      Swal.fire({
        title: "Out of Stock",
        text: `This ${category.slice(
          0,
          -1
        )} is currently not available for rent.`,
        icon: "warning",
      });
      return;
    }

    const amount = (vehicles.pricePerDay || 500) * getRentalDays() * 100;

    const options = {
      key: "rzp_test_d1fqVsre2AEPX4",
      amount,
      currency: "INR",
      name: "UrbanCruise Rentals",
      description: `${category.slice(0, -1)} Reservation Payment`,
      handler: async function (response) {
        try {
          // Verify user is still authenticated
          if (!user || !user.email) {
            throw new Error("User authentication lost during payment process");
          }

          console.log("Payment successful, processing reservation...");
          console.log("User:", user.email);
          console.log("User UID:", user.uid);
          console.log("Vehicle ID:", vehicleId);
          console.log("Category:", category);

          // Check Firebase Auth state
          const currentUser = auth.currentUser;
          console.log(
            "Firebase Auth Current User:",
            currentUser ? currentUser.email : "No user"
          );
          console.log(
            "Firebase Auth Token exists:",
            currentUser ? "Yes" : "No"
          );

          const singularCategory = category.slice(0, -1);
          const vehicleDocRef = doc(db, "vehicle", category);

          console.log("Attempting to read vehicle collection...");
          const currentVehiclesCollectionSnap = await getDoc(vehicleDocRef);

          if (!currentVehiclesCollectionSnap.exists()) {
            throw new Error("Vehicle collection not found in Firestore!");
          }
          const currentVehiclesCollectionData =
            currentVehiclesCollectionSnap.data();
          const currentVehicleData = currentVehiclesCollectionData[vehicleId];

          if (!currentVehicleData) {
            throw new Error("Specific vehicle not found in the collection!");
          }

          const updatedVehicleData = { ...currentVehicleData };

          if (updatedVehicleData.vehicleCount !== undefined) {
            updatedVehicleData.vehicleCount = Math.max(
              0,
              (updatedVehicleData.vehicleCount || 1) - 1
            );
          } else if (
            category === "cars" &&
            updatedVehicleData.carCount !== undefined
          ) {
            updatedVehicleData.carCount = Math.max(
              0,
              (updatedVehicleData.carCount || 1) - 1
            );
          } else if (
            category === "bikes" &&
            updatedVehicleData.bikeCount !== undefined
          ) {
            updatedVehicleData.bikeCount = Math.max(
              0,
              (updatedVehicleData.bikeCount || 1) - 1
            );
          } else {
            updatedVehicleData.stockCount = Math.max(
              0,
              (updatedVehicleData.stockCount || 1) - 1
            );
          }

          const newCollectionData = {
            ...currentVehiclesCollectionData,
            [vehicleId]: updatedVehicleData,
          };

          console.log("Attempting to update vehicle collection...");
          await setDoc(vehicleDocRef, newCollectionData);
          console.log("Vehicle collection updated successfully");

          setVehicles(updatedVehicleData);

          const reservationData = {
            reservationOwner: user.email,
            vehicleId,
            vehicleBrand: vehicleBrand,
            vehicleModel: vehicleModel,
            category: singularCategory,
            startDate: rentDate.start,
            endDate: rentDate.end,
            pickupLocation: selectedLocations.pickup,
            dropoffLocation: selectedLocations.dropoff,
            paymentId: response.razorpay_payment_id,
            timestamp: new Date(),
            totalAmount: amount / 100,
          };

          console.log("Attempting to create rental record...");
          await addDoc(collection(db, "rentals"), reservationData);
          console.log("Rental record created successfully");

          setReservationCompleted(true);

          Swal.fire(
            "Reservation Successful",
            `Your ${singularCategory} has been reserved!`,
            "success"
          );
        } catch (err) {
          console.error("Error after payment:", err);

          let errorMessage =
            "Reservation failed after payment. Please try again.";

          // Provide more specific error messages
          if (err.code === "permission-denied") {
            errorMessage =
              "Permission denied. Please ensure you are logged in and try again.";
          } else if (err.code === "unavailable") {
            errorMessage =
              "Service temporarily unavailable. Please try again in a moment.";
          } else if (err.message.includes("permission")) {
            errorMessage =
              "Database permission error. Please contact support if this persists.";
          }

          Swal.fire("Error", errorMessage, "error");
        }
      },
      prefill: {
        name: user.displayName || "Customer",
        email: user.email,
      },
      theme: {
        color: isDark ? "#3B82F6" : "#2563EB",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const vehicle = vehicles;
  const singularCategoryPrefix = category.slice(0, -1);

  const vehicleBrandName =
    brands && vehicle
      ? brands[`${singularCategoryPrefix}-${String(vehicle.brandId)}`]
      : vehicleBrand;
  const vehicleModelName =
    models &&
    vehicle &&
    models[`${singularCategoryPrefix}-${String(vehicle.brandId)}`] &&
    models[`${singularCategoryPrefix}-${String(vehicle.brandId)}`][
      String(vehicle.modelId)
    ]
      ? (
          models[`${singularCategoryPrefix}-${String(vehicle.brandId)}`][
            String(vehicle.modelId)
          ] || vehicleModel
        ).toUpperCase()
      : (vehicleModel || "").toUpperCase();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "500px" }}
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
              Loading {category.slice(0, -1)} details...
            </p>
          </div>
        </div>
      );
    }

    if (fetchError) {
      return (
        <div className="text-center py-5">
          <p className="text-danger fw-bold fs-5">{fetchError}</p>
          <Button
            onClick={() => navigate(-1)}
            className="mt-3"
            style={{
              backgroundColor: isDark ? "#374151" : "#F3F4F6",
              color: isDark ? "#E5E7EB" : "#374151",
              border: "none",
            }}
          >
            Go Back
          </Button>
        </div>
      );
    }

    if (!vehicle) {
      return (
        <div className="text-center py-5">
          <p className="text-danger fw-bold fs-5">
            This {category.slice(0, -1)} was not found!
          </p>
          <Button
            onClick={() => navigate(-1)}
            className="mt-3"
            style={{
              backgroundColor: isDark ? "#374151" : "#F3F4F6",
              color: isDark ? "#E5E7EB" : "#374151",
              border: "none",
            }}
          >
            Go Back
          </Button>
        </div>
      );
    }

    const currentStock = getEffectiveStockCount(vehicle);
    const isAvailable = currentStock > 0;
    const totalAmount = (vehicle.pricePerDay || 500) * getRentalDays();

    return (
      <div>
        {/* Header with Breadcrumb */}
        <div className="mb-4">
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            className="d-flex align-items-center gap-2 p-0 mb-3 text-decoration-none"
            style={{
              color: isDark ? "#9CA3AF" : "#6B7280",
              fontSize: "0.875rem",
            }}
          >
            <ArrowLeft size={16} />
            Back to vehicles
          </Button>

          <div className="d-flex align-items-center gap-2 mb-2">
            <Badge
              className="px-3 py-2"
              style={{
                backgroundColor: isDark
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(37, 99, 235, 0.1)",
                color: isDark ? "#60A5FA" : "#2563EB",
                border: isDark
                  ? "1px solid rgba(59, 130, 246, 0.2)"
                  : "1px solid rgba(37, 99, 235, 0.2)",
                borderRadius: "8px",
                fontSize: "0.75rem",
                fontWeight: "500",
              }}
            >
              {category === "cars" ? "Car" : "Bike"}
            </Badge>
            <Badge
              className="px-3 py-2"
              style={{
                backgroundColor: isAvailable
                  ? isDark
                    ? "rgba(16, 185, 129, 0.1)"
                    : "rgba(16, 185, 129, 0.1)"
                  : isDark
                  ? "rgba(239, 68, 68, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
                color: isAvailable
                  ? isDark
                    ? "#34D399"
                    : "#059669"
                  : isDark
                  ? "#F87171"
                  : "#DC2626",
                border: isAvailable
                  ? isDark
                    ? "1px solid rgba(16, 185, 129, 0.2)"
                    : "1px solid rgba(16, 185, 129, 0.2)"
                  : isDark
                  ? "1px solid rgba(239, 68, 68, 0.2)"
                  : "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "8px",
                fontSize: "0.75rem",
                fontWeight: "500",
              }}
            >
              {isAvailable ? `${currentStock} Available` : "Out of Stock"}
            </Badge>
          </div>

          <h1
            className="fw-bold mb-1"
            style={{
              color: isDark ? "#F9FAFB" : "#111827",
              fontSize: "2.5rem",
              lineHeight: "1.2",
            }}
          >
            {vehicleBrandName} {vehicleModelName}
          </h1>
        </div>

        <Row className="g-4">
          {/* Vehicle Image */}
          <Col lg={6}>
            <Card
              className="border-0 overflow-hidden"
              style={{
                backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                borderRadius: "20px",
                boxShadow: isDark
                  ? "0 10px 25px rgba(0, 0, 0, 0.3)"
                  : "0 10px 25px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  height: "400px",
                  backgroundColor: isDark ? "#111827" : "#F9FAFB",
                  position: "relative",
                }}
              >
                <LazyLoadImage
                  src={vehicle.image}
                  alt={`${vehicleBrandName} ${vehicleModelName}`}
                  className="w-100 h-100"
                  effect="blur"
                  style={{
                    objectFit: "contain",
                    borderRadius: "20px",
                  }}
                  placeholderSrc="https://placehold.co/600x400/cccccc/ffffff?text=Loading..."
                />

                {/* Price Badge on Image */}
                <div className="position-absolute bottom-0 start-0 m-4">
                  <Badge
                    className="px-3 py-2 fw-bold"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(59, 130, 246, 0.9)"
                        : "rgba(37, 99, 235, 0.9)",
                      color: "#FFFFFF",
                      borderRadius: "12px",
                      fontSize: "1rem",
                    }}
                  >
                    ₹{vehicle.pricePerDay || 500}/day
                  </Badge>
                </div>
              </div>
            </Card>
          </Col>

          {/* Vehicle Details & Booking Form */}
          <Col lg={6}>
            {/* Vehicle Specifications */}
            <Card
              className="border-0 mb-4"
              style={{
                backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                borderRadius: "16px",
                boxShadow: isDark
                  ? "0 4px 6px rgba(0, 0, 0, 0.3)"
                  : "0 4px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Card.Body className="p-4">
                <h5
                  className="fw-bold mb-3"
                  style={{ color: isDark ? "#F9FAFB" : "#111827" }}
                >
                  Specifications
                </h5>

                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2">
                      <Fuel
                        size={18}
                        style={{ color: isDark ? "#60A5FA" : "#2563EB" }}
                      />
                      <div>
                        <div
                          style={{
                            color: isDark ? "#9CA3AF" : "#6B7280",
                            fontSize: "0.75rem",
                          }}
                        >
                          Fuel Type
                        </div>
                        <div
                          style={{
                            color: isDark ? "#E5E7EB" : "#374151",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                          }}
                        >
                          {vehicle.fuelType || "Petrol"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2">
                      <Gauge
                        size={18}
                        style={{ color: isDark ? "#60A5FA" : "#2563EB" }}
                      />
                      <div>
                        <div
                          style={{
                            color: isDark ? "#9CA3AF" : "#6B7280",
                            fontSize: "0.75rem",
                          }}
                        >
                          Engine
                        </div>
                        <div
                          style={{
                            color: isDark ? "#E5E7EB" : "#374151",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                          }}
                        >
                          {vehicle.engineSize || "N/A"} cc
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2">
                      <Settings
                        size={18}
                        style={{ color: isDark ? "#60A5FA" : "#2563EB" }}
                      />
                      <div>
                        <div
                          style={{
                            color: isDark ? "#9CA3AF" : "#6B7280",
                            fontSize: "0.75rem",
                          }}
                        >
                          Gearbox
                        </div>
                        <div
                          style={{
                            color: isDark ? "#E5E7EB" : "#374151",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                          }}
                        >
                          {vehicle.gearbox || "Manual"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="d-flex align-items-center gap-2">
                      <Car
                        size={18}
                        style={{ color: isDark ? "#60A5FA" : "#2563EB" }}
                      />
                      <div>
                        <div
                          style={{
                            color: isDark ? "#9CA3AF" : "#6B7280",
                            fontSize: "0.75rem",
                          }}
                        >
                          Body Type
                        </div>
                        <div
                          style={{
                            color: isDark ? "#E5E7EB" : "#374151",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                          }}
                        >
                          {vehicle.bodyType || "Standard"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Booking Form */}
            <Card
              className="border-0"
              style={{
                backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                borderRadius: "16px",
                boxShadow: isDark
                  ? "0 4px 6px rgba(0, 0, 0, 0.3)"
                  : "0 4px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Card.Body className="p-4">
                <h5
                  className="fw-bold mb-4 d-flex align-items-center gap-2"
                  style={{ color: isDark ? "#F9FAFB" : "#111827" }}
                >
                  <Calendar size={20} />
                  Book Your Ride
                </h5>

                {/* Date Selection */}
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <label
                      className="form-label fw-semibold mb-2"
                      style={{
                        color: isDark ? "#D1D5DB" : "#374151",
                        fontSize: "0.875rem",
                      }}
                    >
                      Start Date
                    </label>
                    <Form.Control
                      type="date"
                      value={rentDate.start}
                      onChange={(e) =>
                        setRentDate({ ...rentDate, start: e.target.value })
                      }
                      min={getDateByInputFormat()}
                      style={{
                        backgroundColor: isDark ? "#374151" : "#F9FAFB",
                        color: isDark ? "#F9FAFB" : "#111827",
                        border: isDark
                          ? "1px solid #4B5563"
                          : "1px solid #D1D5DB",
                        borderRadius: "12px",
                        padding: "0.75rem",
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <label
                      className="form-label fw-semibold mb-2"
                      style={{
                        color: isDark ? "#D1D5DB" : "#374151",
                        fontSize: "0.875rem",
                      }}
                    >
                      End Date
                    </label>
                    <Form.Control
                      type="date"
                      value={rentDate.end}
                      onChange={(e) =>
                        setRentDate({ ...rentDate, end: e.target.value })
                      }
                      min={rentDate.start}
                      style={{
                        backgroundColor: isDark ? "#374151" : "#F9FAFB",
                        color: isDark ? "#F9FAFB" : "#111827",
                        border: isDark
                          ? "1px solid #4B5563"
                          : "1px solid #D1D5DB",
                        borderRadius: "12px",
                        padding: "0.75rem",
                      }}
                    />
                  </Col>
                </Row>

                {/* Location Selection */}
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <label
                      className="form-label fw-semibold mb-2 d-flex align-items-center gap-2"
                      style={{
                        color: isDark ? "#D1D5DB" : "#374151",
                        fontSize: "0.875rem",
                      }}
                    >
                      <MapPin size={16} />
                      Pick-up Location
                    </label>
                    <Form.Select
                      value={selectedLocations.pickup}
                      onChange={(e) =>
                        setSelectedLocations({
                          ...selectedLocations,
                          pickup: e.target.value,
                        })
                      }
                      style={{
                        backgroundColor: isDark ? "#374151" : "#F9FAFB",
                        color: isDark ? "#F9FAFB" : "#111827",
                        border: isDark
                          ? "1px solid #4B5563"
                          : "1px solid #D1D5DB",
                        borderRadius: "12px",
                        padding: "0.75rem",
                      }}
                    >
                      <option value="">Choose pick-up location</option>
                      {locations &&
                        Object.entries(locations).map(([id, location]) => (
                          <option key={id} value={location}>
                            {location}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                  <Col md={6}>
                    <label
                      className="form-label fw-semibold mb-2 d-flex align-items-center gap-2"
                      style={{
                        color: isDark ? "#D1D5DB" : "#374151",
                        fontSize: "0.875rem",
                      }}
                    >
                      <MapPin size={16} />
                      Drop-off Location
                    </label>
                    <Form.Select
                      value={selectedLocations.dropoff}
                      onChange={(e) =>
                        setSelectedLocations({
                          ...selectedLocations,
                          dropoff: e.target.value,
                        })
                      }
                      style={{
                        backgroundColor: isDark ? "#374151" : "#F9FAFB",
                        color: isDark ? "#F9FAFB" : "#111827",
                        border: isDark
                          ? "1px solid #4B5563"
                          : "1px solid #D1D5DB",
                        borderRadius: "12px",
                        padding: "0.75rem",
                      }}
                    >
                      <option value="">Choose drop-off location</option>
                      {locations &&
                        Object.entries(locations).map(([id, location]) => (
                          <option key={id} value={location}>
                            {location}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                </Row>

                {/* Rental Summary */}
                <div
                  className="p-4 mb-4"
                  style={{
                    backgroundColor: isDark ? "#111827" : "#F9FAFB",
                    borderRadius: "12px",
                    border: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
                  }}
                >
                  <h6
                    className="fw-bold mb-3"
                    style={{ color: isDark ? "#F9FAFB" : "#111827" }}
                  >
                    Rental Summary
                  </h6>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span
                      style={{
                        color: isDark ? "#9CA3AF" : "#6B7280",
                        fontSize: "0.875rem",
                      }}
                    >
                      <Clock size={16} className="me-1" />
                      Duration: {getRentalDays()} day
                      {getRentalDays() !== 1 ? "s" : ""}
                    </span>
                    <span
                      style={{
                        color: isDark ? "#E5E7EB" : "#374151",
                        fontWeight: "500",
                      }}
                    >
                      ₹{vehicle.pricePerDay || 500} × {getRentalDays()}
                    </span>
                  </div>

                  <hr
                    style={{
                      borderColor: isDark ? "#374151" : "#E5E7EB",
                      margin: "0.75rem 0",
                    }}
                  />

                  <div className="d-flex justify-content-between align-items-center">
                    <span
                      className="fw-bold"
                      style={{
                        color: isDark ? "#F9FAFB" : "#111827",
                        fontSize: "1.125rem",
                      }}
                    >
                      Total Amount
                    </span>
                    <span
                      className="fw-bold"
                      style={{
                        color: isDark ? "#60A5FA" : "#2563EB",
                        fontSize: "1.25rem",
                      }}
                    >
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>

                {/* Reserve Button */}
                <Button
                  onClick={handleReserveButtonClick}
                  disabled={!isAvailable || reservationCompleted}
                  className="w-100 d-flex align-items-center justify-content-center gap-2 fw-bold py-3 border-0"
                  style={{
                    backgroundColor:
                      isAvailable && !reservationCompleted
                        ? isDark
                          ? "#3B82F6"
                          : "#2563EB"
                        : isDark
                        ? "#4B5563"
                        : "#9CA3AF",
                    color: "#FFFFFF",
                    borderRadius: "12px",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (isAvailable && !reservationCompleted) {
                      e.target.style.backgroundColor = isDark
                        ? "#2563EB"
                        : "#1D4ED8";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isAvailable && !reservationCompleted) {
                      e.target.style.backgroundColor = isDark
                        ? "#3B82F6"
                        : "#2563EB";
                    }
                  }}
                >
                  {reservationCompleted ? (
                    <>
                      <CheckCircle size={20} />
                      Reservation Completed
                    </>
                  ) : !isAvailable ? (
                    "Not Available"
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Reserve Now - ₹{totalAmount}
                    </>
                  )}
                </Button>

                {isAvailable && !reservationCompleted && (
                  <p
                    className="text-center mt-3 mb-0"
                    style={{
                      color: isDark ? "#9CA3AF" : "#6B7280",
                      fontSize: "0.875rem",
                    }}
                  >
                    Secure payment powered by Razorpay
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: isDark ? "#0A0A0A" : "#F9FAFB",
        minHeight: "100vh",
        transition: "background-color 0.3s ease",
      }}
    >
      <Container className="py-5">{renderContent()}</Container>
    </div>
  );
};

export default VehicleDetail;
