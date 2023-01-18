import got, { Got, SearchParameters } from "got";
import { DanbooruEnv, RequestMethods } from "./types";
import type { OptionsOfJSONResponseBody } from "got/dist/source/types";

export type GetRequestOptions = {
  route: string;
  searchParams?: SearchParameters;
};

export class DanbooruJS {
  public readonly env: DanbooruEnv = {
    api_url: "https://danbooru.donmai.us/",
  };
  private _got: Got = got;

  public constructor() {}

  get gotInstance(): Got {
    return this._got;
  }

  public setApiUrl(api_url: string) {
    this.env.api_url = api_url;
    return this;
  }

  public setLogin(login: string, key: string) {
    this.env.auth = { login, key };
    return this;
  }

  public async get(options: GetRequestOptions) {
    return this.request(RequestMethods.GET, options.route, options.searchParams);
  }

  public async request(method: RequestMethods, route: string, searchParams?: SearchParameters) {
    const options = {
      method,
      searchParams,
    } as OptionsOfJSONResponseBody;

    if (this.env.auth) {
      options.username = this.env.auth.login;
      options.password = this.env.auth.key;
    }

    return this._got(new URL(route + ".json", this.env.api_url), options).json();
  }
}
