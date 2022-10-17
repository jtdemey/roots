import type { MapImage } from "../../../models/ui/MapImage";

interface IMapImages {
  [key: string]: MapImage;
}

const f = (x: number, y: number, scale: number): MapImage => ({
  x,
  y,
  scale,
  progressionStatus: 0
});

export const MapImages: IMapImages = {
  car: f(0, 0, 0)
};
