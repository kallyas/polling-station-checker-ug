import { useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Paper,
  Chip,
  useTheme,
  Grow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WcIcon from "@mui/icons-material/Wc";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DomainIcon from "@mui/icons-material/Domain";
import MapIcon from "@mui/icons-material/Map";
import DirectionsIcon from "@mui/icons-material/Directions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const InfoItem = ({ icon, label, value, isHighlighted = false, sx = {} }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 1,
        px: isHighlighted ? 2 : 1,
        borderRadius: 1,
        bgcolor: isHighlighted
          ? theme.palette.mode === "dark"
            ? "rgba(252, 220, 4, 0.15)"
            : "rgba(252, 220, 4, 0.1)"
          : "transparent",
        border: isHighlighted ? 1 : 0,
        borderColor: "warning.light",
        ...sx,
      }}
    >
      <List disablePadding dense>
        <ListItem disablePadding disableGutters>
          <ListItemIcon
            sx={{
              minWidth: 32,
              color: isHighlighted ? "warning.main" : "primary.main",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 500, fontSize: "0.75rem" }}
              >
                {label}
              </Typography>
            }
            secondary={
              <Typography
                variant="body1"
                sx={{ fontWeight: isHighlighted ? 700 : 500, mt: -0.5 }}
              >
                {value || "N/A"}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

function MapComponent({ pollingStation, district, parish }) {
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [loadingUserLocation, setLoadingUserLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [pollingStationLocation, setPollingStationLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [showPlaces, setShowPlaces] = useState(false);
  const mapRef = useRef(null);
  const searchQuery = `${pollingStation}, ${parish}, ${district}, Uganda`;

  // Load Google Maps script dynamically
  useEffect(() => {
    // This is a mock API key for demonstration - in a real app, use your actual API key
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    googleMapScript.id = "google-maps-script";

    googleMapScript.onload = () => {
      setMapLoaded(true);
    };

    // Only load the script if it doesn't exist
    if (
      !document.getElementById("google-maps-script") &&
      !window.google?.maps
    ) {
      document.head.appendChild(googleMapScript);
    } else if (window.google?.maps) {
      setMapLoaded(true);
    }

    return () => {
      // Cleanup script if component unmounts
      const scriptTag = document.getElementById("google-maps-script");
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, []);

  // Initialize map once script is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    // Default center at Uganda
    const defaultCenter = { lat: 0.3476, lng: 32.5825 };

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 15,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: window.google.maps.ControlPosition.TOP_RIGHT,
      },
    });

    setMap(mapInstance);

    // Initialize Geocoder and search for polling station
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        setPollingStationLocation({
          lat: location.lat(),
          lng: location.lng(),
        });

        // Center map on polling station
        mapInstance.setCenter(location);

        // Add marker for polling station
        const pollingMarker = new window.google.maps.Marker({
          position: location,
          map: mapInstance,
          title: pollingStation,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });

        // Add info window for polling station
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 8px; font-size: 16px;">${pollingStation}</h3>
              <p style="margin: 0; font-size: 14px;">${parish}, ${district}</p>
            </div>
          `,
        });

        pollingMarker.addListener("click", () => {
          infoWindow.open(mapInstance, pollingMarker);
        });

        // Open info window by default
        infoWindow.open(mapInstance, pollingMarker);

        setMarker(pollingMarker);
      } else {
        console.error("Geocode was not successful:", status);
        setLocationError(
          "Unable to find the polling station location on the map"
        );
      }

      setLoading(false);
    });
  }, [mapLoaded, searchQuery, pollingStation, parish, district]);

  // Find nearby places
  const findNearbyPlaces = () => {
    if (!map || !pollingStationLocation) return;

    setShowPlaces(true);

    const placesService = new window.google.maps.places.PlacesService(map);
    const request = {
      location: pollingStationLocation,
      radius: "1000",
      type: [
        "store",
        "restaurant",
        "bank",
        "gas_station",
        "hospital",
        "pharmacy",
      ],
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setNearbyPlaces(results.slice(0, 5)); // Limit to 5 places

        // Add markers for nearby places
        results.slice(0, 5).forEach((place) => {
          const placeMarker = new window.google.maps.Marker({
            position: place.geometry.location,
            map,
            title: place.name,
            icon: {
              url: place.icon,
              scaledSize: new window.google.maps.Size(24, 24),
            },
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px;">
                <h3 style="margin: 0 0 8px; font-size: 16px;">${place.name}</h3>
                <p style="margin: 0; font-size: 14px;">${place.vicinity}</p>
                <p style="margin: 4px 0 0; font-size: 14px;">Rating: ${
                  place.rating || "N/A"
                }</p>
              </div>
            `,
          });

          placeMarker.addListener("click", () => {
            infoWindow.open(map, placeMarker);
          });
        });
      }
    });
  };

  const getUserLocation = () => {
    setLoadingUserLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoadingUserLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userLoc);

        // If map is loaded, add marker for user location
        if (map) {
          // Remove previous user marker if exists
          if (window.userLocationMarker) {
            window.userLocationMarker.setMap(null);
          }

          // Add new user marker
          window.userLocationMarker = new window.google.maps.Marker({
            position: userLoc,
            map: map,
            title: "Your Location",
            animation: window.google.maps.Animation.DROP,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(40, 40),
            },
          });

          // If polling station location is available, draw route
          if (pollingStationLocation) {
            calculateAndDrawRoute(userLoc, pollingStationLocation);
          }
        }

        setLoadingUserLocation(false);
      },
      (error) => {
        setLocationError("Unable to retrieve your location: " + error.message);
        setLoadingUserLocation(false);
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: true }
    );
  };

  const calculateAndDrawRoute = (origin, destination) => {
    if (!map) return;

    // Remove previous directions if any
    if (window.directionsRenderer) {
      window.directionsRenderer.setMap(null);
    }

    // Create new directions renderer
    window.directionsRenderer = new window.google.maps.DirectionsRenderer({
      map,
      suppressMarkers: true, // Don't replace our custom markers
      polylineOptions: {
        strokeColor: "#4285F4",
        strokeWeight: 5,
        strokeOpacity: 0.8,
      },
    });

    // Create directions service
    const directionsService = new window.google.maps.DirectionsService();

    // Request directions
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      },
      (response, status) => {
        if (status === "OK") {
          window.directionsRenderer.setDirections(response);

          // Extract distance and duration from response
          const route = response.routes[0];
          const leg = route.legs[0];

          // Show distance and duration
          // You could display this information in the UI
          console.log(`Distance: ${leg.distance.text}`);
          console.log(`Duration: ${leg.duration.text}`);
        } else {
          setLocationError("Directions request failed due to " + status);
        }
      }
    );
  };

  const getGoogleMapsDirectionsUrl = () => {
    if (!pollingStationLocation) return "#";

    const destination = `${pollingStationLocation.lat},${pollingStationLocation.lng}`;
    const origin = userLocation
      ? `${userLocation.lat},${userLocation.lng}`
      : "";

    return `https://www.google.com/maps/dir/?api=1&destination=${destination}&origin=${origin}&travelmode=driving`;
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 350,
          borderRadius: 1,
          overflow: "hidden",
          mt: 2,
          boxShadow: 2,
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            ref={mapRef}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 1,
            }}
          />
        )}
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<MapIcon />}
          component="a"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            searchQuery
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
        >
          View in Google Maps
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          startIcon={
            loadingUserLocation ? (
              <CircularProgress size={20} />
            ) : (
              <MyLocationIcon />
            )
          }
          onClick={getUserLocation}
          disabled={loadingUserLocation || !mapLoaded}
          size="small"
        >
          {userLocation ? "Update My Location" : "Get My Location"}
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<DirectionsIcon />}
          component="a"
          href={getGoogleMapsDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          disabled={!pollingStationLocation}
          size="small"
        >
          Get Google Directions
        </Button>

        <Button
          variant="outlined"
          color="info"
          startIcon={<LocationOnIcon />}
          onClick={findNearbyPlaces}
          disabled={!pollingStationLocation || showPlaces}
          size="small"
        >
          Find Nearby Places
        </Button>
      </Box>

      {locationError && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {locationError}
        </Typography>
      )}

      {userLocation && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Your location: {userLocation.lat.toFixed(6)},{" "}
          {userLocation.lng.toFixed(6)}
        </Typography>
      )}

      {nearbyPlaces.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            Nearby Places:
          </Typography>
          <Grid container spacing={1}>
            {nearbyPlaces.map((place, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {place.photos && place.photos[0] ? (
                    <img
                      src={place.photos[0].getUrl({
                        maxWidth: 50,
                        maxHeight: 50,
                      })}
                      alt={place.name}
                      style={{ width: 40, height: 40, borderRadius: 4 }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        bgcolor: "primary.light",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <LocationOnIcon sx={{ color: "white" }} />
                    </Box>
                  )}
                  <Box>
                    <Typography variant="body2" fontWeight="bold" noWrap>
                      {place.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {place.vicinity}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}

function VoterInfoCard({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState("details");

  if (!data) return null;

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grow in={true} timeout={800}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          maxWidth: 800,
          mx: "auto",
          position: "relative",
        }}
        component={motion.div}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Top accent bar */}
        <Box sx={{ height: 8, bgcolor: "primary.main", width: "100%" }} />

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography
              variant="h5"
              component="h3"
              fontWeight={700}
              color="primary.main"
            >
              Voter Details
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Polling Station - Most important info highlighted at the top */}
          <Box sx={{ mb: 3 }}>
            <InfoItem
              icon={<LocationOnIcon />}
              label="Polling Station"
              value={data.pollingStation}
              isHighlighted={true}
              sx={{
                borderRadius: 2,
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 0 15px rgba(252, 220, 4, 0.1)"
                    : "0 0 15px rgba(252, 220, 4, 0.3)",
              }}
            />
          </Box>

          {/* Accordions for Organization */}
          <Accordion
            expanded={expanded === "details"}
            onChange={handleAccordionChange("details")}
            elevation={0}
            sx={{
              "&:before": { display: "none" },
              borderRadius: 1,
              overflow: "hidden",
              mb: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ bgcolor: "background.default" }}
            >
              <Typography fontWeight={600}>Personal Information</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 1, pb: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<PersonIcon />}
                    label="Names"
                    value={data.names}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<CalendarMonthIcon />}
                    label="Date of Birth"
                    value={data.dateOfBirth}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<WcIcon />}
                    label="Gender"
                    value={data.gender === "F" ? "Female" : "Male"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<HowToVoteIcon />}
                    label="Voter ID Number"
                    value={data.voterIdentificationNumber}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "location"}
            onChange={handleAccordionChange("location")}
            elevation={0}
            sx={{
              "&:before": { display: "none" },
              borderRadius: 1,
              overflow: "hidden",
              mb: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              sx={{ bgcolor: "background.default" }}
            >
              <Typography fontWeight={600}>Location Details</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 1, pb: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<HomeIcon />}
                    label="Village"
                    value={data.village}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<LocationCityIcon />}
                    label="District"
                    value={data.district}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<DomainIcon />}
                    label="Electoral Area"
                    value={data.electoralArea}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem
                    icon={<ApartmentIcon />}
                    label="Sub-County"
                    value={data.subCounty}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InfoItem
                    icon={<HomeIcon />}
                    label="Parish"
                    value={data.parish}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "map"}
            onChange={handleAccordionChange("map")}
            elevation={0}
            sx={{
              "&:before": { display: "none" },
              borderRadius: 1,
              overflow: "hidden",
              mb: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
              sx={{ bgcolor: "background.default" }}
            >
              <Typography fontWeight={600}>Polling Station Map</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MapComponent
                pollingStation={data.pollingStation}
                district={data.district}
                parish={data.parish}
              />
            </AccordionDetails>
          </Accordion>

          {data.source === "cache" && (
            <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
              <Chip
                label="Served from cache"
                color="success"
                size="small"
                variant="outlined"
              />
            </Box>
          )}
        </Box>
      </Paper>
    </Grow>
  );
}

export default VoterInfoCard;
