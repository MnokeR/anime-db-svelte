const year = new Date().getFullYear();
const years = [];
for (let i = year + 1; i >= 1940; i--) {
  years.push({ label: String(i), value: i });
}
export const selectYears = [{ label: "Year", items: years }];

type year = keyof typeof selectYears;

export const selectSeason = [
  {
    label: "Season",
    items: [
      { label: "Winter", value: "WINTER" },
      { label: "Spring", value: "SPRING" },
      { label: "Summer", value: "SUMMER" },
      { label: "Fall", value: "FALL" },
    ],
  },
];

export const mediaType = [
  {
    label: "Type",
    items: [
      { label: "Anime", value: "ANIME" },
      { label: "Manga", value: "MANGA" },
    ],
  },
];
