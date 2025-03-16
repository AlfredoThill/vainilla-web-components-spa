import { buildLoginEvent, buildLogoutEvent, sessionEvents } from '../events/session.js';

class SessionService {
  #loggedIn = false;
  #email;
  #name;

  #logInSideEffects = [];
  #logOutSideEffects = [];

  constructor() {
    document.addEventListener(sessionEvents.login, (event) => {
      for (let sideEffect of this.#logInSideEffects) {
        try {
          sideEffect(event);
        } catch (error) {
          console.error(error);
        }
      }
    });

    document.addEventListener(sessionEvents.logout, () => {
      for (let sideEffect of this.#logOutSideEffects) {
        try {
          sideEffect();
        } catch (error) {
          console.error(error);
        }
      }
    });
  }

  subscribeToLogin(sideEffect) {
    this.#logInSideEffects.push(sideEffect);
  }
  desubscribeFromLogin(sideEffect) {
    this.#logInSideEffects = this.#logInSideEffects.filter((se) => se !== sideEffect);
  }

  subscribeToLogout(sideEffect) {
    this.#logOutSideEffects.push(sideEffect);
  }
  desubscribeFromLogout(sideEffect) {
    this.#logOutSideEffects = this.#logOutSideEffects.filter((se) => se !== sideEffect);
  }

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
