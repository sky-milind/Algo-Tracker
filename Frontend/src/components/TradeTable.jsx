import TradeStatusBadge from './TradeStatusBadge';

const TradeTable = ({ trades }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pair</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profit</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {trades && trades.length > 0 ? (
            trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">#{trade.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{trade.user}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{trade.pair}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`font-medium ${trade.type === 'BUY' || trade.type === 'Buy' ? 'text-green-600' : 'text-red-600'}`}>
                    {trade.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{trade.amount || '-'}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`font-semibold ${(trade.profitLoss || trade.profit) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {typeof (trade.profitLoss || trade.profit) === 'number' 
                      ? `$${(trade.profitLoss || trade.profit).toFixed(2)}`
                      : (trade.profitLoss || trade.profit)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <TradeStatusBadge status={trade.status} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-4 py-8 text-center text-sm text-gray-500">
                No trades found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TradeTable;
