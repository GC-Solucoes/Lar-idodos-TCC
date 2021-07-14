export class User {
  constructor(
      public id?: number,
      public  username?: string,
      public email?: string,
      public jwtToken?: string,
      public password?: string,
      public confirmarPassword?: string
  ) {}
}
