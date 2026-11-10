import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Tour, Waypoint } from '../types/tour';
import { Locate, Navigation, Play, Pause, FastForward, RotateCcw } from 'lucide-react';

interface MapComponentProps {
  activeTour: Tour | null;
  activeWaypoint: Waypoint | null;
  userLocation: { lat: number; lng: number } | null;
  onSelectWaypoint: (wp: Waypoint) => void;
  onUserLocationChange: (loc: { lat: number; lng: number }) => void;
  isSimulatingWalk: boolean;
  onToggleSimulateWalk: () => void;
  simulationSpeed: number;
  onChangeSimulationSpeed: (speed: number) => void;
  onResetSimulation: () => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  activeTour,
  activeWaypoint,
  userLocation,
  onSelectWaypoint,
  onUserLocationChange,
  isSimulatingWalk,
  onToggleSimulateWalk,
  simulationSpeed,
  onChangeSimulationSpeed,
  onResetSimulation,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const userMarkerRef = useRef<L.Marker | null>(null);
  const geofenceCircleRef = useRef<L.Circle | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);

  const [mapReady, setMapReady] = useState(false);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialLat = activeWaypoint?.lat || activeTour?.waypoints[0]?.lat || 41.8902;
    const initialLng = activeWaypoint?.lng || activeTour?.waypoints[0]?.lng || 12.4922;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 16,
      zoomControl: false,
    });

    // Elegant CartoDB Dark Matter / Positron tiles for high-end cartography
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    mapInstanceRef.current = map;
    setMapReady(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Route Polyline and Monument Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady || !activeTour) return;
    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};
    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }

    const latLngs: L.LatLngTuple[] = activeTour.waypoints.map((wp) => [wp.lat, wp.lng]);

    // Draw route polyline with gradient style
    if (latLngs.length > 1) {
      const polyline = L.polyline(latLngs, {
        color: '#1e5e7f',
        weight: 4,
        opacity: 0.9,
        dashArray: '6, 8',
      }).addTo(map);
      routePolylineRef.current = polyline;
    }

    // Add monument markers
    activeTour.waypoints.forEach((wp, index) => {
      const isSelected = activeWaypoint?.id === wp.id;
      const html = `
        <div class="relative group cursor-pointer">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform duration-200 ${
            isSelected
              ? 'bg-[#1e5e7f] text-white scale-125 ring-4 ring-[#79c3e6]/50 ring-offset-2 ring-offset-[#080d14] animate-pulse'
              : 'bg-[#0e1722] border-2 border-[#1e5e7f] text-[#79c3e6] hover:scale-110'
          }">
            <span>${index + 1}</span>
          </div>
          <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#080d14]/90 text-[10px] font-medium text-stone-200 px-2 py-0.5 rounded shadow pointer-events-none backdrop-blur-xs border border-[#1e5e7f]/30">
            ${wp.name.length > 20 ? wp.name.slice(0, 18) + '...' : wp.name}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-monument-icon',
        html,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const marker = L.marker([wp.lat, wp.lng], { icon: customIcon }).addTo(map);
      marker.on('click', () => {
        onSelectWaypoint(wp);
      });
      markersRef.current[wp.id] = marker;
    });

    // Fit map bounds to show full tour if no waypoint specifically selected
    if (latLngs.length > 0) {
      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 17 });
    }
  }, [activeTour, mapReady]);

  // Update Highlighted Waypoint
  useEffect(() => {
    if (!mapInstanceRef.current || !activeWaypoint) return;
    const map = mapInstanceRef.current;
    map.panTo([activeWaypoint.lat, activeWaypoint.lng], { animate: true, duration: 0.8 });
  }, [activeWaypoint]);

  // Update User GPS Marker and Geofence Circle
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady || !userLocation) return;
    const map = mapInstanceRef.current;

    const userHtml = `
      <div class="relative flex items-center justify-center">
        <span class="absolute w-8 h-8 rounded-full bg-[#389ac3]/30 animate-ping"></span>
        <span class="absolute w-12 h-12 rounded-full bg-[#1e5e7f]/15"></span>
        <div class="w-5 h-5 rounded-full bg-[#79c3e6] border-2 border-white shadow-md relative z-10"></div>
        <div class="absolute -top-3 w-0 h-0 border-x-4 border-x-transparent border-b-6 border-b-[#79c3e6]"></div>
      </div>
    `;

    const userIcon = L.divIcon({
      className: 'custom-user-icon',
      html: userHtml,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    if (!userMarkerRef.current) {
      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 1000,
      }).addTo(map);
    } else {
      userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
    }

    // Geofence trigger radius circle
    const triggerRadius = activeWaypoint?.triggerRadiusMeters || 70;
    if (!geofenceCircleRef.current) {
      geofenceCircleRef.current = L.circle([userLocation.lat, userLocation.lng], {
        radius: triggerRadius,
        color: '#389ac3',
        fillColor: '#1e5e7f',
        fillOpacity: 0.15,
        weight: 1.5,
        dashArray: '3, 4',
      }).addTo(map);
    } else {
      geofenceCircleRef.current.setLatLng([userLocation.lat, userLocation.lng]);
      geofenceCircleRef.current.setRadius(triggerRadius);
    }
  }, [userLocation, activeWaypoint, mapReady]);

  const handleCenterUser = () => {
    if (!mapInstanceRef.current || !userLocation) return;
    mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 17, { animate: true });
  };

  return (
    <div className="relative w-full h-full min-h-[380px] bg-[#080d14] overflow-hidden">
      {/* Leaflet map container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Map Navigation & Simulation Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleCenterUser}
          title="Centra su di me"
          className="w-11 h-11 bg-[#0c141d]/90 text-stone-100 hover:text-[#79c3e6] hover:bg-[#152332] border border-[#1e5e7f]/40 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-md transition-colors"
        >
          <Locate className="w-5 h-5 text-[#79c3e6]" />
        </button>

        {activeTour && (
          <button
            onClick={() => {
              if (activeWaypoint && mapInstanceRef.current) {
                mapInstanceRef.current.setView([activeWaypoint.lat, activeWaypoint.lng], 17, {
                  animate: true,
                });
              }
            }}
            title="Mostra tappa attiva"
            className="w-11 h-11 bg-[#0c141d]/90 text-stone-100 hover:text-[#79c3e6] hover:bg-[#152332] border border-[#1e5e7f]/40 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-md transition-colors"
          >
            <Navigation className="w-5 h-5 text-[#79c3e6]" />
          </button>
        )}
      </div>

      {/* GPS Walk Simulation Panel (Simulazione Camminata lungo il percorso) */}
      <div className="absolute top-4 left-4 z-10 bg-[#0c141d]/90 border border-[#1e5e7f]/40 rounded-xl p-2.5 backdrop-blur-md shadow-xl flex items-center gap-2 max-w-[calc(100vw-6rem)]">
        <button
          onClick={onToggleSimulateWalk}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            isSimulatingWalk
              ? 'bg-[#1e5e7f] text-white shadow-md'
              : 'bg-[#121c27] text-stone-200 hover:bg-[#1a293a]'
          }`}
        >
          {isSimulatingWalk ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>In cammino...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simula Camminata GPS</span>
            </>
          )}
        </button>

        {isSimulatingWalk && (
          <div className="flex items-center gap-1 bg-[#080d14]/70 px-2 py-1 rounded-md border border-[#1e5e7f]/30">
            <FastForward className="w-3 h-3 text-[#79c3e6]" />
            <button
              onClick={() => {
                const speeds = [1, 2, 4];
                const nextIdx = (speeds.indexOf(simulationSpeed) + 1) % speeds.length;
                onChangeSimulationSpeed(speeds[nextIdx]);
              }}
              className="text-[11px] font-mono text-[#79c3e6] font-bold"
            >
              {simulationSpeed}x
            </button>
          </div>
        )}

        <button
          onClick={onResetSimulation}
          title="Ripristina inizio percorso"
          className="p-1.5 text-stone-400 hover:text-stone-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Current Waypoint Distance HUD banner */}
      {activeWaypoint && userLocation && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-xs z-10 bg-[#080d14]/92 border border-[#1e5e7f]/50 rounded-xl p-3 backdrop-blur-md shadow-2xl flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-[#79c3e6] font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#79c3e6] animate-ping"></span>
              <span>Prossima Tappa</span>
            </div>
            <div className="text-sm font-semibold text-stone-100 truncate">
              {activeWaypoint.name}
            </div>
            <div className="text-xs text-stone-400">
              Raggio audio attivo: {activeWaypoint.triggerRadiusMeters} metri
            </div>
          </div>
          <button
            onClick={() => onSelectWaypoint(activeWaypoint)}
            className="shrink-0 px-2.5 py-1.5 bg-[#1e5e7f] hover:bg-[#287096] text-white border border-[#389ac3]/30 rounded-lg text-xs font-semibold transition-colors"
          >
            Ascolta
          </button>
        </div>
      )}
    </div>
  );
};
