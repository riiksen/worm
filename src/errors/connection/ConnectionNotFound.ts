export class ConnectionNotFound extends Error {
  name = 'CONNECTION_NOT_FOUND';

  constructor(name: string) {
    super(`Unable to find connection named ${name}`);
  }
}
