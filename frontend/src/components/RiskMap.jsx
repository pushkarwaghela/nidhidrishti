import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { AlertCircle, IndianRupee, ShieldAlert, MapPin } from 'lucide-react';

// Custom SVG Leaflet Marker Icons
const createCustomIcon = (severity, riskScore) => {
  let color = '#10B981'; // Emerald
  if (severity === 'Critical') color = '#EF4444'; // Red
  else if (severity === 'Warning') color = '#F59E0B'; // Amber
  else if (severity === 'Moderate') color = '#3B82F6'; // Blue

  const isCritical = severity === 'Critical';

  const svgHtml = `
    <div style="position: relative; width: 28px; height: 28px;">
      ${isCritical ? `<div style="position: absolute; width: 36px; height: 36px; top: -4px; left: -4px; border-radius: 50%; background: ${color}; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
      <div style="
        width: 28px; 
        height: 28px; 
        border-radius: 50%; 
        background: ${color}; 
        border: 2px solid #FFFFFF; 
        box-shadow: 0 4px 10px rgba(0,0,0,0.5); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        color: white; 
        font-weight: bold; 
        font-size: 11px;
      ">
        ${Math.round(riskScore)}
      </div>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

export default function RiskMap({ works, onSelectWork }) {
  const defaultCenter = [20.5937, 78.9629]; // India Centroid Bounding Box

  const worksWithCoords = (works || []).filter(w => w.latitude && w.longitude);

  return (
    <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 px-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            National Geospatial MPLADS Risk Heatmap
          </h3>
          <p className="text-xs text-slate-400">
            Real-time geospatial plotting of {worksWithCoords.length} sanctioned projects across parliamentary districts
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-slate-300">Critical Risk (&ge;75)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-slate-300">Warning (45-74)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-300">Standard (&lt;45)</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full h-[550px] rounded-lg overflow-hidden border border-slate-800 relative z-0">
        <MapContainer
          center={defaultCenter}
          zoom={5}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {worksWithCoords.map((work) => (
            <Marker
              key={work.work_id}
              position={[work.latitude, work.longitude]}
              icon={createCustomIcon(work.severity, work.risk_score)}
            >
              <Popup className="leaflet-popup-dark">
                <div className="p-1 space-y-2 max-w-xs">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-700 pb-2">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold">{work.work_id}</span>
                      <h4 className="text-xs font-bold text-white line-clamp-2">{work.work_name}</h4>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full text-white ${
                      work.severity === 'Critical' ? 'bg-rose-600' :
                      work.severity === 'Warning' ? 'bg-amber-600' : 'bg-emerald-600'
                    }`}>
                      Score {Math.round(work.risk_score)}
                    </span>
                  </div>

                  <div className="text-[11px] space-y-1 text-slate-300">
                    <p><strong className="text-slate-400">Sector:</strong> {work.category}</p>
                    <p><strong className="text-slate-400">MP:</strong> {work.mp_name} ({work.constituency})</p>
                    <p><strong className="text-slate-400">District:</strong> {work.nodal_district}, {work.state}</p>
                    <p><strong className="text-slate-400">Sanctioned:</strong> ₹{work.sanctioned_amount.toLocaleString('en-IN')}</p>
                    <p><strong className="text-slate-400">Contractor:</strong> {work.contractor_name}</p>
                  </div>

                  {work.primary_trigger !== 'None' && (
                    <div className="p-1.5 bg-rose-950/40 border border-rose-800/40 rounded text-[10px] text-rose-300">
                      <strong>Trigger:</strong> {work.primary_trigger}
                    </div>
                  )}

                  <button
                    onClick={() => onSelectWork(work.work_id)}
                    className="w-full mt-2 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-[11px] rounded transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShieldAlert className="w-3 h-3" />
                    View AI Audit Breakdown
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
