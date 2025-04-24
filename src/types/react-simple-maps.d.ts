declare module 'react-simple-maps' {
  import React from 'react';
  import type { Feature, Geometry } from 'geojson';

  // Rich map feature with optional RSM key
  export type RSMFeature = Feature<Geometry, Record<string, unknown>> & { rsmKey?: string };

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: { scale: number; [key: string]: unknown };
    children?: React.ReactNode;
  }
  export const ComposableMap: React.FC<ComposableMapProps>;

  export interface GeographiesProps {
    geography: string | object;
    children: (args: { geographies: RSMFeature[] }) => React.ReactNode;
  }
  export const Geographies: React.FC<GeographiesProps>;

  export interface GeographyProps {
    geography: RSMFeature;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    key?: string | number;
  }
  export const Geography: React.FC<GeographyProps>;

  export interface LineProps {
    from: [number, number];
    to: [number, number];
    stroke?: string;
    strokeWidth?: number;
    strokeLinecap?: string;
    strokeDasharray?: string;
    key?: string | number;
  }
  export const Line: React.FC<LineProps>;

  export interface MarkerProps {
    coordinates: [number, number];
    key?: string | number;
    children?: React.ReactNode;
  }
  export const Marker: React.FC<MarkerProps>;
}
