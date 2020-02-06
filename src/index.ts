/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as uuid from 'uuid'
import { Client, Config as ClientConfig } from '@textile/threads-client'
import { ThreadsConfig } from './ThreadsConfig'
import * as pack from '../package.json'

export { ThreadsConfig }

export type Config = {
  token: string
  deviceId: string
  dev?: boolean
  apiScheme?: string
  api?: string
  sessionPort?: number
  threadsPort?: number
}
export class API {
  /**
   * version is the release version.
   */
  public static version(): string {
    return pack.version
  }

  /**
   * threadsConfig is the (private) threads config.
   */
  private _threadsConfig: ThreadsConfig

  /**
   * threadsClient is the (private) threads client.
   */
  private _threadsClient?: Client

  constructor(config: Config) {
    this._threadsConfig =
      config.dev == false
        ? new ThreadsConfig(
          config.token,
          config.deviceId,
          config.apiScheme !== null ? config.apiScheme : 'https',
          config.api !== null ? config.api : 'cloud.textile.io',
          config.sessionPort !== null ? config.sessionPort : 8006,
          config.threadsPort !== null ? config.threadsPort : 6007
        ) : new ThreadsConfig(
          config.token,
          config.deviceId,
          config.apiScheme !== null ? config.apiScheme : 'http',
          config.api !== null ? config.api : '127.0.0.1',
          config.sessionPort !== null ? config.sessionPort : 8006,
          config.threadsPort !== null ? config.threadsPort : 6007
        );
  }

  async start() {
    this._threadsConfig.start()
  }

  get threadsClient(): Client {
    if (!this._threadsClient) {
      this._threadsClient = new Client(this._threadsConfig)
    }
    return this._threadsClient
  }
  get threadsConfig(): Config {
    return this._threadsConfig
  }
}

// eslint-disable-next-line import/no-default-export
export default API
