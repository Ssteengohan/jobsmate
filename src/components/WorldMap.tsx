import React from 'react';
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps';
import type { RSMFeature } from 'react-simple-maps';

// Use a TopoJSON source for the world map for better quality
const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

// Define connection points for different regions
const connectionPoints: { name: string; coordinates: [number, number]; color: string }[] = [
  { name: 'North America', coordinates: [-100, 41], color: '#4dabf7' },
  { name: 'South America', coordinates: [-60, -20], color: '#4dabf7' },
  { name: 'Europe', coordinates: [15, 52], color: 'var(--primary-gold)' },
  { name: 'Africa', coordinates: [20, 5], color: 'var(--primary-gold)' },
  { name: 'Asia', coordinates: [100, 40], color: '#4dabf7' },
  { name: 'Australia', coordinates: [135, -25], color: 'var(--primary-gold)' },
];

// Define connections between regions
const connections = [
  { from: [0], to: [2, 4] }, // North America to Europe and Asia
  { from: [1], to: [3] }, // South America to Africa
  { from: [2], to: [3, 4] }, // Europe to Africa and Asia
  { from: [4], to: [5] }, // Asia to Australia
  { from: [3], to: [5] }, // Africa to Australia
];

interface WorldMapProps {
  className?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ className }) => {
  return (
    <div className={className}>
      <ComposableMap
        projection="geoEquirectangular"
        projectionConfig={{
          scale: 170,
        }}
      >
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0" stopColor="#4dabf7" />
            <stop offset="0.3" stopColor="#74c0fc" />
            <stop offset="0.5" stopColor="var(--primary-gold)" />
            <stop offset="0.7" stopColor="#74c0fc" />
            <stop offset="1" stopColor="#4dabf7" />
          </linearGradient>
        </defs>

        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: RSMFeature[] }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="transparent"
                stroke="#4dabf7"
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>

        {/* Connection Lines */}
        {connections.map((connection, i) =>
          connection.from.flatMap((fromIndex) =>
            connection.to.map((toIndex, j) => (
              <Line
                key={`connection-${i}-${j}`}
                from={connectionPoints[fromIndex].coordinates}
                to={connectionPoints[toIndex].coordinates}
                stroke="url(#connectionGradient)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray="5,3"
              />
            )),
          ),
        )}

        {/* Markers at connection points */}
        {connectionPoints.map((point, i) => (
          <Marker key={`marker-${i}`} coordinates={point.coordinates}>
            <circle r={5} fill={point.color} className="pulse-circle" />
          </Marker>
        ))}
      </ComposableMap>

      <style jsx global>{`
        .pulse-circle {
          animation: pulse 3s infinite;
        }

        @keyframes pulse {
          0% {
            r: 3.5;
          }
          50% {
            r: 5.5;
          }
          100% {
            r: 3.5;
          }
        }
      `}</style>
    </div>
  );
};

export default WorldMap;
