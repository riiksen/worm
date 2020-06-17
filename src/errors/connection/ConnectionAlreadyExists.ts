export class ConnectionAlreadyExists extends Error {
  name = 'CONNECTION_ALREADY_EXISTS';

  constructor(name: string) {
    super(`Connection named ${name} is already created`);
  }
}
