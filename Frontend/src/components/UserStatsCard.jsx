const UserStatsCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900">{user.name}</h4>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Account Balance</span>
          <span className="text-sm font-semibold text-gray-900">
            ${(user.balance || 0).toLocaleString()}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total P&L</span>
          <span className={`text-sm font-semibold ${(user.totalPL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {(user.totalPL || 0) >= 0 ? '+' : ''}${(user.totalPL || 0).toLocaleString()}
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-500">Total Trades: {user.totalTrades || 0}</span>
          <span className="text-xs text-gray-500">Win Rate: {user.winRate || 0}%</span>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;
