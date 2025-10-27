import { useState, useEffect } from "react";

export default function DashboardStats({ petData, selectedPet }) {
  const [stats, setStats] = useState({
    batteryLevel: 0,
    lastUpdate: null,
    activityType: "unknown",
  });

  useEffect(() => {
    if (petData && petData.length > 0) {
      calculateStats(petData);
    }
  }, [petData]);

  const calculateStats = (data) => {
    // Chỉ giữ lại pin và thời gian cập nhật
    setStats({
      batteryLevel: data[0]?.batteryLevel || 0,
      lastUpdate: data[0]?.timestamp,
      activityType: data[0]?.activityType || "unknown",
    });
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

  const ActivityBadge = ({ activityType }) => {
    const activityConfig = {
      resting: {
        color: "bg-green-100 text-green-800",
        icon: "🛌",
        label: "Nghỉ ngơi",
      },
      walking: {
        color: "bg-blue-100 text-blue-800",
        icon: "🚶",
        label: "Đang đi",
      },
      running: {
        color: "bg-red-100 text-red-800",
        icon: "🏃",
        label: "Đang chạy",
      },
      playing: {
        color: "bg-orange-100 text-orange-800",
        icon: "🎾",
        label: "Đang chơi",
      },
      unknown: {
        color: "bg-gray-100 text-gray-800",
        icon: "❓",
        label: "Không xác định",
      },
    };

    const config = activityConfig[activityType] || activityConfig.unknown;

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        <span className="mr-2">{config.icon}</span>
        {config.label}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Pin */}
      <StatCard
        title="Mức pin"
        value={stats.batteryLevel}
        unit="%"
        icon="🔋"
        color="border-yellow-500"
      />

      {/* Trạng thái hoạt động */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
        <div className="flex items-center">
          <div className="text-2xl mr-4">📊</div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500">Trạng thái</h3>
            <div className="mt-2">
              <ActivityBadge activityType={stats.activityType} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
