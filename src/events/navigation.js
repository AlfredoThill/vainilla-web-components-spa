export const navigationEvents = {
  changePage: 'changePage',
};

export const buildChangePageEvent = (path, data) => {
  return new CustomEvent(navigationEvents.changePage, { detail: { path, data } });
};
