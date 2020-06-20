import { BaseAdapter } from './base';

export class DummyAdapter extends BaseAdapter {
  /* eslint-disable @typescript-eslint/no-empty-function */
  async connect(): Promise<void> {}

  async disconnect(): Promise<void> {}

  async reconnect(): Promise<void> {}
  /* eslint-enable @typescript-eslint/no-empty-function */
}
