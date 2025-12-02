import React from 'react';

const RiskHeatmap = ({ transactions }) => {
  // Group transactions by risk level for the heatmap
  const riskLevels = transactions.reduce((acc, t) => {
    const score = t.risk_score || 0;
    if (score > 80) acc.high++;
    else if (score > 40) acc.medium++;
    else acc.low++;
    return acc;
  }, { high: 0, medium: 0, low: 0 });

  const total = transactions.length || 1;
  const getWidth = (count) => `${(count / total) * 100}%`;

  return (
    <div className="w-full bg-gray-100 rounded-xl p-6 shadow-inner">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-600">Low Risk</span>
        <span className="text-sm font-semibold text-gray-600">High Risk</span>
      </div>

      {/* The Heatmap Bar */}
      <div className="h-8 w-full flex rounded-full overflow-hidden">
        <div style={{ width: getWidth(riskLevels.low) }} className="bg-emerald-400 hover:bg-emerald-500 transition-colors duration-300" title={`Low Risk: ${riskLevels.low}`} />
        <div style={{ width: getWidth(riskLevels.medium) }} className="bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300" title={`Medium Risk: ${riskLevels.medium}`} />
        <div style={{ width: getWidth(riskLevels.high) }} className="bg-red-500 hover:bg-red-600 transition-colors duration-300" title={`High Risk: ${riskLevels.high}`} />
      </div>

      <div className="flex justify-between mt-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
          <span>Safe ({riskLevels.low})</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <span>Caution ({riskLevels.medium})</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Danger ({riskLevels.high})</span>
        </div>
      </div>
    </div>
  );
};

export default RiskHeatmap;