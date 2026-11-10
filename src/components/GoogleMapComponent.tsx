// Source: Google Maps Platform Code Assist
import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from '@vis.gl/react-google-maps';
import { Tour, Waypoint } from '../types/tour';
import { Locate, Navigation, Play, Pause, FastForward, RotateCcw } from 'lucide-react';

interface GoogleMapComponentProps {
  apiKey: string;
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

// Sub-component that manages map overlays, camera panning, and route polyline
const MapOverlaysAndController: React.FC<{
  activeTour: Tour | null;
  activeWaypoint: Waypoint | null;
  userLocation: { lat: number; lng: number } | null;
}> = ({ activeTour, activeWaypoint, userLocation }) => {
  const map = useMap();
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  // Update Route Polyline
  useEffect(() => {
    if (!map) return;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    if (activeTour && activeTour.waypoints.length > 1) {
      const path = activeTour.waypoints.map((wp) => ({ lat: wp.lat, lng: wp.lng }));
      const polyline = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#1e5e7f',
        strokeOpacity: 0.95,
        strokeWeight: 5,
        map,
      });
      polylineRef.current = polyline;

      // Fit bounds to tour if initial load
      const bounds = new google.maps.LatLngBounds();
      path.forEach((pt) => bounds.extend(pt));
      map.fitBounds(bounds, 50);
    }

    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [map, activeTour]);

  // Update Geofence Circle around user
  useEffect(() => {
    if (!map || !userLocation) return;

    const radius = activeWaypoint?.triggerRadiusMeters || 70;

    if (!circleRef.current) {
      circleRef.current = new google.maps.Circle({
        map,
        center: userLocation,
        radius,
        strokeColor: '#389ac3', // teal/cyan
        strokeOpacity: 0.85,
        strokeWeight: 2,
        fillColor: '#1e5e7f',
        fillOpacity: 0.18,
      });
    } else {
      circleRef.current.setCenter(userLocation);
      circleRef.current.setRadius(radius);
    }

    return () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    };
  }, [map, userLocation, activeWaypoint]);

  // Smooth pan to active waypoint when selected
  useEffect(() => {
    if (!map || !activeWaypoint) return;
    map.panTo({ lat: activeWaypoint.lat, lng: activeWaypoint.lng });
  }, [map, activeWaypoint]);

  return null;
};

export const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  apiKey,
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
  const initialCenter = useMemo(() => {
    return {
      lat: activeWaypoint?.lat || activeTour?.waypoints[0]?.lat || 41.8902,
      lng: activeWaypoint?.lng || activeTour?.waypoints[0]?.lng || 12.4922,
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] bg-[#080d14] overflow-hidden">
      <APIProvider apiKey={apiKey} libraries={['marker', 'geometry']}>
        <Map
          id="almagora-google-map"
          mapId="DEMO_MAP_ID"
          defaultCenter={initialCenter}
          defaultZoom={16}
          gestureHandling="greedy"
          disableDefaultUI={false}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Overlays (Polyline & Geofence circle) */}
          <MapOverlaysAndController
            activeTour={activeTour}
            activeWaypoint={activeWaypoint}
            userLocation={userLocation}
          />

          {/* Monument Waypoints as Advanced Markers */}
          {activeTour?.waypoints.map((wp, index) => {
            const isSelected = activeWaypoint?.id === wp.id;
            return (
              <AdvancedMarker
                key={wp.id}
                position={{ lat: wp.lat, lng: wp.lng }}
                onClick={() => onSelectWaypoint(wp)}
                title={wp.name}
              >
                <div className="relative group cursor-pointer">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-transform duration-200 ${
                      isSelected
                        ? 'bg-[#1e5e7f] text-white scale-125 ring-4 ring-[#79c3e6]/50 ring-offset-2 ring-offset-[#080d14] animate-pulse'
                        : 'bg-[#0e1722] border-2 border-[#1e5e7f] text-[#79c3e6] hover:scale-110'
                    }`}
                  >
                    <span>{index + 1}</span>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#080d14]/90 text-[10px] font-medium text-stone-200 px-2 py-0.5 rounded shadow pointer-events-none backdrop-blur-xs border border-[#1e5e7f]/30">
                    {wp.name.length > 20 ? wp.name.slice(0, 18) + '...' : wp.name}
                  </div>
                </div>
              </AdvancedMarker>
            );
          })}

          {/* Live User GPS Pulsing Radar Marker */}
          {userLocation && (
            <AdvancedMarker
              position={{ lat: userLocation.lat, lng: userLocation.lng }}
              zIndex={1000}
              title="La tua posizione attuale"
            >
              <div className="relative flex items-center justify-center pointer-events-none">
                <span className="absolute w-8 h-8 rounded-full bg-[#389ac3]/40 animate-ping"></span>
                <span className="absolute w-12 h-12 rounded-full bg-[#1e5e7f]/25"></span>
                <div className="w-5 h-5 rounded-full bg-[#79c3e6] border-2 border-white shadow-lg relative z-10"></div>
                <div className="absolute -top-3 w-0 h-0 border-x-4 border-x-transparent border-b-6 border-b-[#79c3e6]"></div>
              </div>
            </AdvancedMarker>
          )}
        </Map>
      </APIProvider>

      {/* GPS Walk Simulation Panel */}
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
              <span>Prossima Tappa GPS</span>
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
