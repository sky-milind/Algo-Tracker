const UserStatsCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white text-xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="border-r border-gray-200">
          <p className="text-xs text-gray-500 uppercase mb-1">Total Trades</p>
          <p className="text-xl font-bold text-gray-900">{user.totalTrades}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase mb-1">Win Rate</p>
          <p className="text-xl font-bold text-green-600">{user.winRate}%</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Account Balance</span>
          <span className="text-lg font-semibold text-gray-900">${user.balance.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">Total P&L</span>
          <span className={`text-lg font-semibold ${user.totalPL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {user.totalPL >= 0 ? '+' : ''}${user.totalPL.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;
