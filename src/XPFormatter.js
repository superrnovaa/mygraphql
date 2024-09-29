export function formatXP(xp, decimalPlaces) {
    if (xp >= 1000000) {
      return `${(xp / 1000000).toFixed(decimalPlaces)}MB`;
    } else if (xp >= 1000) {
      return `${(xp / 1000).toFixed(decimalPlaces)}kB`;
    } else {
      return xp.toFixed(decimalPlaces);
    }
  }