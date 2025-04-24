declare module 'geojson' {
  export interface GeoJsonObject { type: string; }
  export type Geometry = Record<string, unknown>;

  export interface Feature<G = Geometry, P = Record<string, unknown>> extends GeoJsonObject {
    geometry: G;
    properties: P;
  }
}
