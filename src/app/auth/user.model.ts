export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
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
// export class User {
//   constructor(

//     private localId:	string, //	The uid of the current user.
//     public email:	string, //	The email of the account.
//     private emailVerified:	boolean, //	Whether or not the account's email has been verified.
//     public displayName:	string, //	The display name for the account.
//     private providerUserInfo: [{
//       providerId: string,
//       federatedId: string,
//     }], //	List of all linked provider objects which contain "providerId" and "federatedId".
//     public photoUrl:	string, //	The photo Url for the account.
//     private passwordHash:	string, //	Hash version of password.
//     private passwordUpdatedAt:	number, //	The timestamp, in milliseconds, that the account password was last changed.
//     private validSince:	string, //	The timestamp, in seconds, which marks a boundary, before which Firebase ID token are considered revoked.
//     public disabled:	boolean, //	Whether the account is disabled or not.
//     private lastLoginAt:	string, //	The timestamp, in milliseconds, that the account last logged in at.
//     public createdAt:	string, //	The timestamp, in milliseconds, that the account was created at.
//     private customAuth:	boolean //	Whether the account is authenticated by the developer.
//   ) {}
// }
