const StatCard = ({ title, value, change, changeType, icon: Icon, trend, color = 'blue' }) => {
  const isPositive = trend?.isPositive || changeType === 'positive';
  const isNegative = changeType === 'negative';
  const changeValue = trend?.value || change;
  
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    red: 'bg-red-100 text-red-600'
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {changeValue && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  isPositive
                    ? 'text-green-600'
                    : isNegative
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {isPositive && '↑ '}
                {isNegative && '↓ '}
                {changeValue}%
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="ml-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color] || colorClasses.blue}`}>
              <Icon size={24} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
