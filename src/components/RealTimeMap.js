import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix cho marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons cho từng trạng thái
const activityIcons = {
  resting: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  walking: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  running: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  playing: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
};

export default function RealTimeMap({ petData, selectedPet }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [path, setPath] = useState([]);
  const mapRef = useRef();

  // Cập nhật vị trí real-time
  useEffect(() => {
    if (petData && petData.length > 0) {
      const latestData = petData[0];
      const newPosition = [latestData.latitude, latestData.longitude];

      setCurrentPosition(newPosition);
      setPath((prev) => [...prev.slice(-50), newPosition]); // Giữ 50 điểm gần nhất

      // Tự động pan map đến vị trí mới
      if (mapRef.current) {
        mapRef.current.setView(newPosition, 16);
      }
    }
  }, [petData]);

  if (!currentPosition) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang chờ dữ liệu vị trí...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={currentPosition}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Vẽ đường đi */}
        {path.length > 1 && (
          <Polyline positions={path} color="#3B82F6" weight={4} opacity={0.7} />
        )}

        {/* Marker hiện tại */}
        {currentPosition && (
          <Marker
            position={currentPosition}
            icon={
              activityIcons[petData[0]?.activityType] || activityIcons.resting
            }
          >
            <Popup>
              <div className="text-sm">
                <strong>{selectedPet?.name || "Pet"}</strong>
                <br />
                📍 {currentPosition[0].toFixed(6)},{" "}
                {currentPosition[1].toFixed(6)}
                <br />
                🏃 {petData[0]?.activityType || "unknown"}
                <br />⚡ {petData[0]?.batteryLevel || "N/A"}%
                <br />
                🕐 {new Date(petData[0]?.timestamp).toLocaleTimeString()}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Vùng an toàn (radius 100m) */}
        <CircleMarker
          center={currentPosition}
          radius={100}
          color="#10B981"
          fillColor="#10B981"
          fillOpacity={0.1}
          weight={2}
        />
      </MapContainer>
    </div>
  );
}
