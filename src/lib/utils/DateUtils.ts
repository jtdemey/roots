export const formatTime = (gt: string, includeWeekday = false) => {
  const s = gt.split(' ');
  const d = s[0] === 'Sat' ? `${s[0]}urday ` : `${s[0]}day `;
  const pa = s[0] === 'Sat' ? 'PM' : 'AM';
  let t = s[4];
  if(t[0] == '0') {
    t = t.slice(1, t.length);
  }
  return includeWeekday ? d + t : `${t} ${pa}`;
};

export const getTimeFromTick = (tick: number): string => {
  const s = new Date(1987, 11, 12, 9, 44, 8, 0);
  s.setSeconds(1 * s.getSeconds() + Math.floor(tick / 2));
  return s.toString();
};
