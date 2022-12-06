import type { ILocaleProgressionStatus } from "$lib/data/world/LocaleProgressionStatuses";

export interface MapImage {
  path: string;
  progressionStatus: ILocaleProgressionStatus;
  scale: number;
  x: number;
  y: number;
  zIndex?: number;
}
