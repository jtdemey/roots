export interface ILocaleProgressionStatus {
  color: string;
}

interface ILocaleProgressionStatuses {
  [key: string]: ILocaleProgressionStatus;
}

const f = (color: string): ILocaleProgressionStatus => ({ color });

export const LocaleProgressionStatuses: ILocaleProgressionStatuses = {
  complete: f("hsl(75, 40%, 40%)"),
  hazard: f("hsl(0, 40%, 40%)"),
  unvisited: f("hsl(120, 4%, 30%)"),
  visited: f("hsl(210, 40%, 40%)")
};
