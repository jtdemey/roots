export const applyColorPrefix = (
  text: string,
  lineColor: { color: string; prefix: string }
): string => `${lineColor.prefix}${text}`;

export const shiftLightness = (hsl: string, amount: number): string =>
  hsl
    .split(",")
    .map((str: string, i: number) => {
      if (i === 2) {
        const lightness = parseInt(str);
        return ` ${lightness + amount}%)`;
      }
      return str;
    })
    .join(",");
