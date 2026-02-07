import { type Coordinates, createCoordinates } from "@vnedyalk0v/react19-simple-maps";

export interface Destination {
  name: string;
  coordinates: Coordinates;
  note?: string;
}

export const destinations: Destination[] = [
  { name: "Copenhagen", coordinates: createCoordinates(12.5683, 55.6761), note: "Nyhavn & hygge" },
  { name: "Barcelona", coordinates: createCoordinates(2.1734, 41.3851), note: "Casa nostra" },
  { name: "Santiago de Chile", coordinates: createCoordinates(-70.6693, -33.4489), note: "La cordillera" },
  { name: "Tokyo", coordinates: createCoordinates(139.6917, 35.6895), note: "Sakura & ramen" },
  { name: "Seoul", coordinates: createCoordinates(126.9780, 37.5665), note: "K-culture" },
  { name: "Cairo", coordinates: createCoordinates(31.2357, 30.0444), note: "Las pirámides" },
];
