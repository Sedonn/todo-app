/** @fileoverview Store that controls current authenticated user. */

import { action, computed, makeObservable, observable } from 'mobx';
import Cookie from 'js-cookie';

const TOKEN_COOKIE_NAME = 'token';
const LOGIN_COOKIE_NAME = 'login';

class UserStore {
  @observable token?: string;
  @observable login?: string;

  constructor() {
    makeObservable(this);

    this.token = Cookie.get(TOKEN_COOKIE_NAME);
    this.login = Cookie.get(LOGIN_COOKIE_NAME);
  }

  /** Verify that is current user is authorized. */
  @computed
  get isAuthenticated() {
    return Boolean(this.token) && Boolean(this.login);
  }

  /**
   * Save the user data to store and cookie files.
   * @param userToken
   * @param userLogin
   */
  @action
  save(token: string, login: string) {
    Cookie.set(TOKEN_COOKIE_NAME, token);
    Cookie.set(LOGIN_COOKIE_NAME, login);

    this.token = token;
    this.login = login;
  }

  /** Logout the user and delete all auth cookies. */
  @action
  logout() {
    Cookie.remove(TOKEN_COOKIE_NAME);
    Cookie.remove(LOGIN_COOKIE_NAME);

    this.token = undefined;
    this.login = undefined;
  }
}

export default UserStore;
