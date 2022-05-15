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