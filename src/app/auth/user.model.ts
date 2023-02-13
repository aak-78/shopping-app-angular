export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    console.log(this._token);
    if (
      !this._token ||
      !this._tokenExpirationDate ||
      this._tokenExpirationDate < new Date()
    ) {
      return null;
    }
    return this._token;
  }
}
