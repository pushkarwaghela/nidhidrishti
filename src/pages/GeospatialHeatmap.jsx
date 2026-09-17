import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { MPLADS_WORKS } from '../data/mockData';
import {
  MapPin,
  Filter,
  Search,
  ShieldAlert,
  Layers,
  Info
} from 'lucide-react';

export default function GeospatialHeatmap({ onSelectWorkForModal }) {
  const mapRef = useRef(null);
  const leafletMapInstance = useRef(null);
  const markersLayerGroup = useRef(null);

  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique states and sectors
  const statesList = ['ALL', ...new Set(MPLADS_WORKS.map(w => w.state))];
  const sectorsList = ['ALL', ...new Set(MPLADS_WORKS.map(w => w.sector))];

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

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current) return;

    if (!leafletMapInstance.current) {
      // Center of India
      const map = L.map(mapRef.current, {
        center: [22.8, 80.5],
        zoom: 5,
        minZoom: 4,
        maxZoom: 16,
        attributionControl: false
      });

      // High-clarity OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      // Attribution
      L.control.attribution({
        position: 'bottomleft',
        prefix: 'Survey of India / OpenStreetMap | MoSPI GIS Cell'
      }).addTo(map);

      markersLayerGroup.current = L.layerGroup().addTo(map);
      leafletMapInstance.current = map;
    }

    return () => {
      // Cleanup on unmount
      if (leafletMapInstance.current) {
        leafletMapInstance.current.remove();
        leafletMapInstance.current = null;
      }
    };
  }, []);

  // Update Markers when filters change
  useEffect(() => {
    if (!leafletMapInstance.current || !markersLayerGroup.current) return;

    markersLayerGroup.current.clearLayers();

    filteredWorks.forEach((work) => {
      const [lat, lon] = work.coordinates;

      // Color mapping
      let colorClass = 'standard';
      let pinColor = '#2E7D32';

      if (work.riskLevel === 'critical') {
        colorClass = 'critical';
        pinColor = '#D32F2F';
      } else if (work.riskLevel === 'warning') {
        colorClass = 'warning';
        pinColor = '#F57C00';
      } else if (work.riskLevel === 'moderate') {
        colorClass = 'moderate';
        pinColor = '#FBC02D';
      }

      // Create custom DivIcon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker-wrapper',
        html: `
          <div class="custom-leaflet-marker ${colorClass}" style="width: 28px; height: 28px; font-size: 11px;">
            ${work.riskScore}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14]
      });

      const marker = L.marker([lat, lon], { icon: customIcon });

      // Build popup content
      const popupHtml = document.createElement('div');
      popupHtml.innerHTML = `
        <div class="map-popup-header" style="background-color: ${work.riskLevel === 'critical' ? '#B71C1C' : '#0B3D67'}">
          <span class="work-id">${work.id}</span>
          <span style="font-size: 10px; text-transform: uppercase; font-weight: 700; background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 2px;">
            Score ${work.riskScore}
          </span>
        </div>
        <div class="map-popup-body">
          <div class="map-popup-field">
            <span class="label">Work Title</span>
            <span class="val" style="font-size: 12px;">${work.title}</span>
          </div>
          <div class="map-popup-field">
            <span class="label">Sector</span>
            <span class="val">${work.sector}</span>
          </div>
          <div class="map-popup-field">
            <span class="label">Hon’ble MP & District</span>
            <span class="val">${work.mpName} (${work.district}, ${work.state})</span>
          </div>
          <div class="map-popup-field">
            <span class="label">Sanction Outlay & Contractor</span>
            <span class="val">₹${work.sanctionedAmountLakhs} L • ${work.contractor}</span>
          </div>
          <div class="map-popup-field">
            <span class="label">Vigilance Trigger</span>
            <div class="trigger-box">${work.triggerReason}</div>
          </div>
          <button id="btn-inspect-${work.id}" class="map-popup-action-btn">
            Inspect Full Audit Dossier
          </button>
        </div>
      `;

      // Attach inspect action
      const inspectBtn = popupHtml.querySelector(`#btn-inspect-${work.id}`);
      if (inspectBtn) {
        inspectBtn.onclick = () => {
          onSelectWorkForModal(work);
        };
      }

      marker.bindPopup(popupHtml);
      markersLayerGroup.current.addLayer(marker);
    });

    // Auto fit bounds if works exist
    if (filteredWorks.length > 0 && leafletMapInstance.current) {
      const bounds = L.latLngBounds(filteredWorks.map(w => w.coordinates));
      leafletMapInstance.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
    }
  }, [filteredWorks, onSelectWorkForModal]);

  return (
    <div className="map-view-container">
      {/* Header Banner */}
      <div className="page-header-banner">
        <div className="page-title-group">
          <h1>Geospatial MPLADS Surveillance & Anomaly Heatmap</h1>
          <p className="page-description">
            Interactive geographical GIS mapping of parliamentary works, geofence asset overlap, and contractor risk clusters.
          </p>
        </div>
        <div style={{ fontSize: '12px', color: '#0B3D67', fontWeight: 600 }}>
          Showing {filteredWorks.length} of {MPLADS_WORKS.length} Audited Works
        </div>
      </div>

      {/* Map Control / Filter Bar */}
      <div className="map-filter-bar">
        <div className="table-search-box">
          <Search size={16} color="#6C7A89" />
          <input
            type="text"
            placeholder="Search by Work ID, MP Name, District, Contractor..."
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
              <option value="critical">Critical (Score 80-100)</option>
              <option value="warning">High Warning (Score 60-79)</option>
              <option value="moderate">Moderate (Score 40-59)</option>
              <option value="standard">Standard / Cleared</option>
            </select>
          </div>

          {(selectedSector !== 'ALL' || selectedRisk !== 'ALL' || selectedState !== 'ALL' || searchQuery !== '') && (
            <button
              type="button"
              className="gov-btn"
              onClick={() => {
                setSelectedSector('ALL');
                setSelectedRisk('ALL');
                setSelectedState('ALL');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Map Canvas Card */}
      <div className="map-canvas-card">
        <div ref={mapRef} className="map-element" />

        {/* Legend Overlay */}
        <div className="map-legend-overlay">
          <div className="legend-title">Risk Severity Index</div>
          <div className="legend-row">
            <span className="legend-color-chip" style={{ backgroundColor: '#D32F2F' }} />
            <span><strong>Critical (80-100)</strong>: Collusion / Ghost Asset</span>
          </div>
          <div className="legend-row">
            <span className="legend-color-chip" style={{ backgroundColor: '#F57C00' }} />
            <span><strong>Warning (60-79)</strong>: Tender Split / Overdue UC</span>
          </div>
          <div className="legend-row">
            <span className="legend-color-chip" style={{ backgroundColor: '#FBC02D' }} />
            <span><strong>Moderate (40-59)</strong>: Volumetric Mismatch</span>
          </div>
          <div className="legend-row">
            <span className="legend-color-chip" style={{ backgroundColor: '#2E7D32' }} />
            <span><strong>Standard (0-39)</strong>: Milestone Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
