import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { MPLADS_WORKS, I18N_STRINGS } from '../data/mockData';
import {
  MapPin,
  Filter,
  Search,
  ShieldAlert,
  Layers,
  Info,
  Radio,
  Maximize2
} from 'lucide-react';

export default function GeospatialHeatmap({ onSelectWorkForModal, lang = 'en' }) {
  const mapRef = useRef(null);
  const leafletMapInstance = useRef(null);
  const markersLayerGroup = useRef(null);
  const bufferLayerGroup = useRef(null);
  const currentTileLayer = useRef(null);

  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMapLayer, setActiveMapLayer] = useState('carto'); // 'carto' | 'osm' | 'satellite'
  const [showCollisionBuffers, setShowCollisionBuffers] = useState(true);

  const t = I18N_STRINGS[lang] || I18N_STRINGS.en;

  // Extract unique states and sectors
  const statesList = ['ALL', ...new Set(MPLADS_WORKS.map(w => w.state))];
  const sectorsList = ['ALL', ...new Set(MPLADS_WORKS.map(w => w.sector))];

  // Quick jump presets
  const quickJumpChips = [
    { label: 'All India', coords: [22.8, 80.5], zoom: 5 },
    { label: 'Varanasi, UP', coords: [25.3176, 82.9739], zoom: 12 },
    { label: 'Patna Sahib, BR', coords: [25.5941, 85.1376], zoom: 12 },
    { label: 'Baramati, MH', coords: [18.5204, 73.8567], zoom: 11 },
    { label: 'Sambalpur, OR', coords: [21.4669, 83.9812], zoom: 11 },
    { label: 'South 24 Parganas, WB', coords: [22.1965, 88.2014], zoom: 11 }
  ];

  // Filter works
  const filteredWorks = MPLADS_WORKS.filter((work) => {
    const matchesSector = selectedSector === 'ALL' || work.sector === selectedSector;
    const matchesRisk = selectedRisk === 'ALL' || work.riskLevel === selectedRisk;
    const matchesState = selectedState === 'ALL' || work.state === selectedState;
    const matchesSearch = searchQuery.trim() === '' ||
      work.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.mpName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.contractor.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSector && matchesRisk && matchesState && matchesSearch;
  });

  // Layer URL mapping
  const TILE_LAYERS = {
    carto: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: 'CartoDB / OpenStreetMap | MoSPI GIS Cell'
    },
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: 'OpenStreetMap contributors | Survey of India'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'ESRI World Imagery / ISRO Bhuvan'
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current) return;

    if (!leafletMapInstance.current) {
      const map = L.map(mapRef.current, {
        center: [22.8, 80.5],
        zoom: 5,
        minZoom: 4,
        maxZoom: 18,
        attributionControl: false
      });

      currentTileLayer.current = L.tileLayer(TILE_LAYERS.carto.url, {
        maxZoom: 18,
        subdomains: 'abcd'
      }).addTo(map);

      L.control.attribution({
        position: 'bottomleft',
        prefix: 'Survey of India / NIC GIS Cell'
      }).addTo(map);

      bufferLayerGroup.current = L.layerGroup().addTo(map);
      markersLayerGroup.current = L.layerGroup().addTo(map);
      leafletMapInstance.current = map;
    }

    return () => {
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, []);

  // Update Basemap Layer when activeMapLayer changes
  useEffect(() => {
    if (!leafletMapInstance.current) return;
    if (currentTileLayer.current) {
      leafletMapInstance.current.removeLayer(currentTileLayer.current);
    }
    const layerConfig = TILE_LAYERS[activeMapLayer] || TILE_LAYERS.carto;
    currentTileLayer.current = L.tileLayer(layerConfig.url, {
      maxZoom: 18,
      subdomains: 'abcd'
    }).addTo(leafletMapInstance.current);
  }, [activeMapLayer]);

  // Update Markers & Collision Buffers when filteredWorks change
  useEffect(() => {
    if (!leafletMapInstance.current || !markersLayerGroup.current || !bufferLayerGroup.current) return;

    markersLayerGroup.current.clearLayers();
    bufferLayerGroup.current.clearLayers();

    filteredWorks.forEach((work) => {
      const [lat, lon] = work.coordinates;

      let colorClass = 'standard';
      let strokeColor = '#2E7D32';

      if (work.riskLevel === 'critical') {
        colorClass = 'critical';
        strokeColor = '#D32F2F';
      } else if (work.riskLevel === 'warning') {
        colorClass = 'warning';
        strokeColor = '#F57C00';
      } else if (work.riskLevel === 'moderate') {
        colorClass = 'moderate';
        strokeColor = '#FBC02D';
      }

      // Draw 50m collision buffer rings for critical works
      if (showCollisionBuffers && (work.riskLevel === 'critical' || work.triggerReason.toLowerCase().includes('duplicate') || work.triggerReason.toLowerCase().includes('overlap'))) {
        const circle = L.circle([lat, lon], {
          radius: 600, // scaled visually for map view
          color: strokeColor,
          weight: 2,
          opacity: 0.8,
          fillColor: strokeColor,
          fillOpacity: 0.15,
          dashArray: '4, 4'
        });
        circle.bindTooltip(`50m GIS Geofence Buffer: Asset #${work.id}`, { permanent: false, direction: 'top' });
        bufferLayerGroup.current.addLayer(circle);
      }

      // Custom DivIcon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker-wrapper',
        html: `
          <div class="custom-leaflet-marker ${colorClass}" style="width: 30px; height: 30px; font-size: 11px; font-weight: 700; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
            ${work.riskScore}
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15]
      });

      const marker = L.marker([lat, lon], { icon: customIcon });

      // Popup DOM content
      const popupHtml = document.createElement('div');
      popupHtml.innerHTML = `
        <div class="map-popup-header" style="background-color: ${work.riskLevel === 'critical' ? '#B71C1C' : '#0B3D67'}; padding: 10px 14px;">
          <span class="work-id" style="color: #FFF; font-weight: 700;">${work.id}</span>
          <span style="font-size: 10px; text-transform: uppercase; font-weight: 700; background: rgba(255,255,255,0.25); color: #FFF; padding: 2px 8px; border-radius: 3px;">
            Score ${work.riskScore}/100
          </span>
        </div>
        <div class="map-popup-body" style="padding: 12px 14px;">
          <div class="map-popup-field">
            <span class="label">Work Title:</span>
            <span class="val" style="font-size: 12px; font-weight: 600; color: #1C2430;">${work.title}</span>
          </div>
          <div class="map-popup-field">
            <span class="label">Sector:</span>
            <span class="val">${work.sector}</span>
          </div>
          <div class="map-popup-field">
            <span class="label">Hon’ble MP & District:</span>
            <span class="val">${work.mpName} (${work.district}, ${work.state})</span>
          </div>
          <div class="map-popup-field">
            <span class="label">Financial Outlay:</span>
            <span class="val">₹${work.sanctionedAmountLakhs} Lakhs (${work.disbursedPercent}% Disbursed / ${work.physicalProgressPercent}% Physical)</span>
          </div>
          <div class="map-popup-field">
            <span class="label">Contractor:</span>
            <span class="val">${work.contractor} (${work.contractorGstin})</span>
          </div>
          <div class="map-popup-field">
            <span class="label">AI Vigilance Reason:</span>
            <div class="trigger-box" style="margin-top: 4px; padding: 6px 8px; background: #FFEBEE; border-left: 3px solid #D32F2F; color: #C62828; font-size: 11.5px; border-radius: 2px;">
              ${work.triggerReason}
            </div>
          </div>
          <button id="btn-inspect-${work.id}" class="map-popup-action-btn" style="width: 100%; margin-top: 10px; padding: 7px; background: #0B3D67; color: white; border: none; border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 12px;">
            Inspect Forensic Dossier & Take Action
          </button>
        </div>
      `;

      const inspectBtn = popupHtml.querySelector(`#btn-inspect-${work.id}`);
      if (inspectBtn) {
        inspectBtn.onclick = () => {
          onSelectWorkForModal(work);
        };
      }

      marker.bindPopup(popupHtml);
      markersLayerGroup.current.addLayer(marker);
    });

    if (filteredWorks.length > 0 && leafletMapInstance.current && searchQuery !== '') {
      const bounds = L.latLngBounds(filteredWorks.map(w => w.coordinates));
      leafletMapInstance.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 });
    }
  }, [filteredWorks, onSelectWorkForModal, showCollisionBuffers, searchQuery]);

  const handleQuickJump = (chip) => {
    if (leafletMapInstance.current) {
      leafletMapInstance.current.setView(chip.coords, chip.zoom, { animate: true });
    }
  };

  return (
    <div className="map-view-container">
      {/* Header Banner */}
      <div className="page-header-banner">
        <div className="page-title-group">
          <h1>{t.navHeatmap}</h1>
          <p className="page-description">
            Interactive geographical GIS mapping of parliamentary works across India with multi-factor risk scores, geofence collision buffers, and contractor cluster alerts.
          </p>
        </div>
        <div style={{ fontSize: '12.5px', color: '#0B3D67', fontWeight: 700 }}>
          {lang === 'hi' ? `प्रदर्शित: ${filteredWorks.length} / ${MPLADS_WORKS.length} कार्य` : `Showing ${filteredWorks.length} of ${MPLADS_WORKS.length} Audited Works`}
        </div>
      </div>

      {/* Quick Constituency Jump Chips */}
      <div className="quick-jump-strip">
        <span className="jump-label">Quick Jump to Constituency:</span>
        {quickJumpChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            className="jump-chip-btn"
            onClick={() => handleQuickJump(chip)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Filter and Layer Controls */}
      <div className="map-filter-bar">
        <div className="table-search-box" style={{ minWidth: '280px' }}>
          <Search size={16} color="#6C7A89" />
          <input
            type="text"
            placeholder="Search by Work ID, MP, District, Contractor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="table-filter-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#4A5568' }}>State:</span>
            <select
              className="gov-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {statesList.map((st) => (
                <option key={st} value={st}>
                  {st === 'ALL' ? 'All Indian States / UTs' : st}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#4A5568' }}>Sector:</span>
            <select
              className="gov-select"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
            >
              {sectorsList.map((sec) => (
                <option key={sec} value={sec}>
                  {sec === 'ALL' ? 'All Priority Sectors' : sec}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#4A5568' }}>Risk Tier:</span>
            <select
              className="gov-select"
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
            >
              <option value="ALL">All Risk Tiers</option>
              <option value="critical">Critical (80-100)</option>
              <option value="warning">High Warning (60-79)</option>
              <option value="moderate">Moderate (40-59)</option>
              <option value="standard">Standard / Cleared</option>
            </select>
          </div>

          {/* Collision Buffer Toggle */}
          <button
            type="button"
            className={`gov-btn ${showCollisionBuffers ? 'active-filter' : ''}`}
            onClick={() => setShowCollisionBuffers(!showCollisionBuffers)}
            title="Toggle 50m geofence asset collision rings"
          >
            <Radio size={14} />
            <span>50m Geofence Collision Buffers: {showCollisionBuffers ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Map Canvas with Floating Basemap Switcher & Legend */}
      <div className="map-canvas-card">
        <div ref={mapRef} className="map-element" />

        {/* Floating Basemap Selector */}
        <div className="map-basemap-selector">
          <span className="basemap-title">Basemap:</span>
          <button
            type="button"
            className={`basemap-btn ${activeMapLayer === 'carto' ? 'active' : ''}`}
            onClick={() => setActiveMapLayer('carto')}
          >
            Clean GIS
          </button>
          <button
            type="button"
            className={`basemap-btn ${activeMapLayer === 'osm' ? 'active' : ''}`}
            onClick={() => setActiveMapLayer('osm')}
          >
            Street View
          </button>
          <button
            type="button"
            className={`basemap-btn ${activeMapLayer === 'satellite' ? 'active' : ''}`}
            onClick={() => setActiveMapLayer('satellite')}
          >
            Satellite (ISRO/ESRI)
          </button>
        </div>

        {/* Legend Overlay */}
        <div className="map-legend-overlay">
          <div className="legend-title">Risk Severity Index (AI Score)</div>
          <div className="legend-row">
            <span className="legend-color-chip" style={{ backgroundColor: '#D32F2F' }} />
            <span><strong>Critical (80-100)</strong>: Ghost / Suspended Tax</span>
          </div>
          <div className="legend-row">
            <span className="legend-color-chip" style={{ backgroundColor: '#F57C00' }} />
            <span><strong>Warning (60-79)</strong>: Tender Split / Overdue UC</span>
          </div>
          <div className="legend-row">
            <span className="legend-color-chip" style={{ backgroundColor: '#FBC02D' }} />
            <span><strong>Moderate (40-59)</strong>: Scope Variance</span>
          </div>
          <div className="legend-row">
            <span className="legend-color-chip" style={{ backgroundColor: '#2E7D32' }} />
            <span><strong>Standard (0-39)</strong>: Verified & Cleared</span>
          </div>
        </div>
      </div>
    </div>
  );
}
