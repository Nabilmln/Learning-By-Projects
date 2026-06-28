const STORAGE_KEY = "stories";

export function loadStories() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveStories(stories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
}
