import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  createCoordinates,
} from "@vnedyalk0v/react19-simple-maps";
import { destinations, type Destination } from "./destinations";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function WorldMap() {
  const [active, setActive] = useState<Destination | null>(null);

  return (
    <main className="flex min-h-dvh flex-col items-center gap-8 px-4 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-rose-800 tracking-tight">
        Nuestro Mundo
      </h1>
      <p className="text-rose-600/80 text-lg">
        {destinations.length} destinos por descubrir juntos
      </p>

      <section className="w-full max-w-4xl rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 130,
            center: createCoordinates(20, 20),
          }}
          width={800}
          height={450}
          className="w-full h-auto"
        >
          <ZoomableGroup>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#fce7f3"
                    stroke="#fda4af"
                    strokeWidth={0.5}
                    style={{
                      hover: { fill: "#fbcfe8" },
                      pressed: { fill: "#f9a8d4" },
                    }}
                  />
                ))
              }
            </Geographies>

            {destinations.map((dest, i) => (
              <Marker
                key={dest.name}
                coordinates={dest.coordinates}
                onMouseEnter={() => setActive(dest)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(dest)}
              >
                {/* Pulse ring */}
                <circle
                  r={6}
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth={1.5}
                  opacity={0.6}
                  className="animate-pulse-soft origin-center"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
                {/* Dot */}
                <circle
                  r={4}
                  fill="#f43f5e"
                  stroke="#fff"
                  strokeWidth={1.5}
                  className="animate-dot-appear origin-center"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </section>

      <div
        aria-live="polite"
        className="h-12 flex items-center justify-center text-center"
      >
        {active ? (
          <p className="text-rose-700 text-lg font-medium animate-fade-in">
            {active.name}
            {active.note && (
              <span className="text-rose-500/70 ml-2">— {active.note}</span>
            )}
          </p>
        ) : (
          <p className="text-rose-400 text-sm">
            Pasa el ratón por un destino
          </p>
        )}
      </div>
    </main>
  );
}
