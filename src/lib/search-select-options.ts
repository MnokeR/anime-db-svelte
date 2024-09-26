const year = new Date().getFullYear();
const years = [];
for (let i = year; i > 1940; i--) {
  years.push({ label: i, value: String(i) });
}
export const selectYears = years;
