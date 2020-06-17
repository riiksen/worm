export interface Driver {

  /**
   * Creates database connection
   * Depending on the driver it may create connection pool
   */
  connect(): Promise<void>;

  /**
   * Closes database connection
   */
  close(): Promise<void>;
}
