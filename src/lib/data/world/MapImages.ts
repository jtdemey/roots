import type { MapImage } from "../../../models/ui/MapImage";

interface IMapImages {
  [key: string]: MapImage;
}

const f = (path: string, x: number, y: number, scale: number): MapImage => ({
  path,
  x,
  y,
  scale,
  progressionStatus: 0
});

export const MapImages: IMapImages = {
  car: f(
    "M 3.9150701,157.06189 33.773386,220.67415 97.097769,196.42188 168.811,162.89274 206.07187,142.86786 174.28409,76.317861 135.06996,91.142612 64.417162,123.78628 Z",
    0,
    0,
    0
  )
};
