export const navigationEvents = {
  changePage: 'changePage',
};

export const buildChangePageEvent = (page) => {
  return new CustomEvent(navigationEvents.changePage, { detail: { page } });
};
