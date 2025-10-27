import { useState, useEffect } from "react";

export default function DashboardStats({ petData, selectedPet }) {
  const [stats, setStats] = useState({
    totalDistance: 0,
    avgSpeed: 0,
    activityDistribution: {},
    batteryLevel: 0,
    lastUpdate: null,
  });

  useEffect(() => {
    if (petData && petData.length > 0) {
      calculateStats(petData);
    }
  }, [petData]);

  const calculateStats = (data) => {
    // Tính tổng quãng đường
    let totalDistance = 0;
    for (let i = 1; i < data.length; i++) {
      const dist = calculateDistance(
        data[i - 1].latitude,
        data[i - 1].longitude,
        data[i].latitude,
        data[i].longitude
      );
      totalDistance += dist;
    }

    // Phân bố hoạt động
    const activityDist = {};
    data.forEach((item) => {
      activityDist[item.activityType] =
        (activityDist[item.activityType] || 0) + 1;
    });

    // Tốc độ trung bình
    const avgSpeed =
      data.reduce((sum, item) => sum + (item.speed || 0), 0) / data.length;

    setStats({
      totalDistance: totalDistance * 1000, // Convert to meters
      avgSpeed,
      activityDistribution: activityDist,
      batteryLevel: data[0]?.batteryLevel || 0,
      lastUpdate: data[0]?.timestamp,
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const StatCard = ({ title, value, unit, icon, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
      <div className="flex items-center">
        <div className="text-2xl mr-4">{icon}</div>
        <div>
          <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">
            {value}{" "}
            {unit && <span className="text-sm font-normal">{unit}</span>}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard
        title="Tổng quãng đường"
        value={stats.totalDistance.toFixed(0)}
        unit="m"
        icon="🛣️"
        color="border-blue-500"
      />

      <StatCard
        title="Tốc độ trung bình"
        value={stats.avgSpeed.toFixed(1)}
        unit="m/s"
        icon="⚡"
        color="border-green-500"
      />

      <StatCard
        title="Pin"
        value={stats.batteryLevel}
        unit="%"
        icon="🔋"
        color="border-yellow-500"
      />

      <StatCard
        title="Cập nhật"
        value={
          stats.lastUpdate
            ? new Date(stats.lastUpdate).toLocaleTimeString()
            : "N/A"
        }
        icon="🕐"
        color="border-purple-500"
      />
    </div>
  );
}
