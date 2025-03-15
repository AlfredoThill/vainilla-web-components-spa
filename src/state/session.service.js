import { buildLoginEvent, buildLogoutEvent } from '../events/session.js';

class SessionService {
  #loggedIn = false;
  #email;
  #name;

  constructor() {}

  get loggedIn() {
    return this.#loggedIn;
  }

  setSessionData({ email, name }) {
    this.#email = email;
    this.#name = name;
    this.#loggedIn = true;
    this.emitLoginEvent();
  }

  getSessionData() {
    return { email: this.#email, name: this.#name };
  }

  clearSessionData() {
    this.#email = null;
    this.#name = null;
    this.#loggedIn = false;
    this.emitLogoutEvent();
  }

  emitLoginEvent() {
    document.dispatchEvent(buildLoginEvent(this.getSessionData()));
  }

  emitLogoutEvent() {
    document.dispatchEvent(buildLogoutEvent());
  }
}

const session = new SessionService();

export default session;
