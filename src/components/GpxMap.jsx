import { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import * as toGeoJSON from '@tmcw/togeojson';

export default function GpxMap({ src }) {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [error, setError] = useState(null);
    // Store the dynamically imported modules
    const modulesRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const [
                    { MapContainer, TileLayer, GeoJSON, useMap },
                    L
                ] = await Promise.all([
                    import('react-leaflet'),
                    import('leaflet')
                ]);

                if (!mounted) return;

                // Fix default icons which is a common issue in Leaflet + bundlers
                // We only do this once preferably, but here inside effect is safe
                // @ts-ignore
                delete L.Icon.Default.prototype._getIconUrl;

                const markerIcon2x = (await import('leaflet/dist/images/marker-icon-2x.png')).default;
                const markerIcon = (await import('leaflet/dist/images/marker-icon.png')).default;
                const markerShadow = (await import('leaflet/dist/images/marker-shadow.png')).default;

                L.Icon.Default.mergeOptions({
                    iconRetinaUrl: markerIcon2x.src || markerIcon2x,
                    iconUrl: markerIcon.src || markerIcon,
                    shadowUrl: markerShadow.src || markerShadow
                });

                modulesRef.current = { MapContainer, TileLayer, GeoJSON, useMap, L };
                setIsLoaded(true);
            } catch (err) {
                console.error("Failed to load map modules:", err);
                if (mounted) setError(err.message);
            }
        })();

        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        if (!src) return;
        fetch(src)
            .then((response) => {
                if (!response.ok) throw new Error(`Failed to fetch GPX file: ${response.statusText}`);
                return response.text();
            })
            .then((str) => {
                const parser = new DOMParser();
                const gpx = parser.parseFromString(str, 'text/xml');
                const converted = toGeoJSON.gpx(gpx);
                setGeoJsonData(converted);
            })
            .catch((err) => {
                console.error('Error loading GPX:', err);
                setError(err.message);
            });
    }, [src]);

    if (error) return <div className="text-red-500">Error loading map: {error}</div>;
    if (!src) return <div>No GPX file provided.</div>;
    if (!isLoaded || !modulesRef.current) return <div style={{ height: '400px', width: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Map...</div>;

    const { MapContainer, TileLayer, GeoJSON, useMap, L } = modulesRef.current;

    // Inner component to handle map bounds
    const MapBounds = ({ geoJsonData }) => {
        const map = useMap();
        useEffect(() => {
            if (geoJsonData && map) {
                const leafletGeoJson = L.geoJSON(geoJsonData);
                const bounds = leafletGeoJson.getBounds();
                if (bounds.isValid()) {
                    map.fitBounds(bounds, { padding: [50, 50] });
                }
            }
        }, [geoJsonData, map]);
        return null;
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <div style={{ height: '400px', width: '100%' }}>
                <MapContainer
                    center={[0, 0]}
                    zoom={2}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {geoJsonData && <GeoJSON data={geoJsonData} style={{ color: 'blue', weight: 4 }} />}
                    {geoJsonData && <MapBounds geoJsonData={geoJsonData} />}
                </MapContainer>
            </div>
            <div style={{ marginTop: '0.5rem', textAlign: 'right', fontFamily: 'sans-serif', fontSize: '0.85rem' }}>
                <a href={src} download style={{ color: '#0066cc', textDecoration: 'none' }}>Download GPX Track</a>
            </div>
        </div>
    );
}
