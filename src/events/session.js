export const sessionEvents = {
  login: 'login',
  logout: 'logout',
};

export const buildLoginEvent = (data) => {
  return new CustomEvent(sessionEvents.login, { detail: { data } });
};

export const buildLogoutEvent = () => {
  return new CustomEvent(sessionEvents.logout);
};
