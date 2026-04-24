/**
 * Pure projection + path-generation helpers for GeoMap.
 *
 * Two projections supported: equirectangular (plate-carrée) and
 * spherical Web Mercator (Y clipped). Path generation handles
 * antimeridian wraparound by breaking polygons that span > 180° lon.
 */

export type Projection = 'equirectangular' | 'mercator';
export type LonLat = [number, number];
export type Ring = LonLat[];

export interface ProjectorOpts {
  width: number;
  height: number;
  projection: Projection;
  /** Mercator clipping latitude (default 75) */
  mercatorClip?: number;
}

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

export function makeProjector({ width, height, projection, mercatorClip = 75 }: ProjectorOpts) {
  const mercY = (lat: number) => {
    const phi = (clamp(lat, -mercatorClip, mercatorClip) * Math.PI) / 180;
    return Math.log(Math.tan(Math.PI / 4 + phi / 2));
  };
  const mMax = mercY(mercatorClip);
  const mMin = mercY(-mercatorClip);

  return function project(lat: number, lon: number) {
    const x = ((lon + 180) / 360) * width;
    let y: number;
    if (projection === 'mercator') {
      const m = mercY(lat);
      y = (1 - (m - mMin) / (mMax - mMin)) * height;
    } else {
      y = ((90 - lat) / 180) * height;
    }
    return { x, y };
  };
}

export type Project = ReturnType<typeof makeProjector>;

/** Convert a single ring of [lon, lat] pairs to SVG subpath, splitting at the antimeridian. */
export function ringToPath(ring: Ring, project: Project): string {
  if (ring.length === 0) return '';
  let path = '';
  let prevLon = ring[0][0];
  for (let i = 0; i < ring.length; i++) {
    const [lon, lat] = ring[i];
    const p = project(lat, lon);
    if (i === 0 || Math.abs(lon - prevLon) > 180) {
      path += ` M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    } else {
      path += ` L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    }
    prevLon = lon;
  }
  return path + ' Z';
}

/** Convert a GeoJSON geometry (Polygon | MultiPolygon | LineString | MultiLineString) to one SVG d-string. */
export function geometryToPath(geom: any, project: Project): string {
  if (!geom) return '';
  if (geom.type === 'Polygon') {
    return (geom.coordinates as Ring[]).map((r) => ringToPath(r, project)).join('');
  }
  if (geom.type === 'MultiPolygon') {
    return (geom.coordinates as Ring[][])
      .flatMap((poly) => poly.map((r) => ringToPath(r, project)))
      .join('');
  }
  if (geom.type === 'LineString') {
    const ring = geom.coordinates as Ring;
    let d = '';
    let prevLon = ring[0][0];
    for (let i = 0; i < ring.length; i++) {
      const [lon, lat] = ring[i];
      const p = project(lat, lon);
      if (i === 0 || Math.abs(lon - prevLon) > 180) d += ` M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      else d += ` L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      prevLon = lon;
    }
    return d;
  }
  return '';
}

/** Largest ring centroid (rough). Used to anchor country labels. */
export function geometryCenter(geom: any): LonLat | null {
  let largest: Ring | null = null;
  let largestArea = 0;
  const consider = (ring: Ring) => {
    if (!ring.length) return;
    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
    for (const [lon, lat] of ring) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
    const area = (maxLon - minLon) * (maxLat - minLat);
    if (area > largestArea) { largestArea = area; largest = ring; }
  };
  if (geom.type === 'Polygon') (geom.coordinates as Ring[]).forEach(consider);
  if (geom.type === 'MultiPolygon') (geom.coordinates as Ring[][]).forEach((p) => p.forEach(consider));
  if (!largest) return null;
  let sx = 0, sy = 0;
  for (const [lon, lat] of largest as Ring) { sx += lon; sy += lat; }
  return [sx / (largest as Ring).length, sy / (largest as Ring).length];
}
