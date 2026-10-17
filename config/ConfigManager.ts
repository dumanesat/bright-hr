import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'dotenv';

export type TestEnvironment = 'dev' | 'test' | 'staging' | 'prod';
export interface EnvironmentConfig {
  readonly environment: TestEnvironment;
  readonly baseURL: string;
  readonly username: string;
  readonly password: string;
}

export class ConfigManager {
  private static configuration: EnvironmentConfig;

  public static getConfig(): EnvironmentConfig {
    if (this.configuration) return this.configuration;
    const selected = (process.env.TEST_ENV ?? 'test').trim().toLowerCase();
    if (!['dev', 'test', 'staging', 'prod'].includes(selected)) {
      throw new Error('Invalid TEST_ENV. Allowed values: dev, test, staging, prod.');
    }
    const file = resolve(__dirname, '..', `.env.${selected}`);
    // Use a complete injected configuration OR a single file, never merge them.
    const injected = !!process.env.CI || process.env.BASE_URL !== undefined || process.env.PASSWORD !== undefined;
    if (!injected && !existsSync(file)) throw new Error(`Missing .env.${selected}. Copy .env.example and configure it.`);
    const values = injected ? process.env : parse(readFileSync(file));
    for (const key of ['BASE_URL', 'USERNAME', 'PASSWORD']) {
      if (!values[key]?.trim()) throw new Error(`Missing ${key} for ${selected.toUpperCase()} (${injected ? 'process environment' : `.env.${selected}`}).`);
    }
    const baseURL = values.BASE_URL!;
    try {
      if (!['http:', 'https:'].includes(new URL(baseURL).protocol)) throw new Error();
    } catch {
      throw new Error(`BASE_URL must be a valid HTTP(S) URL for ${selected.toUpperCase()}.`);
    }
    if (selected === 'prod') {
      const testFile = resolve(__dirname, '..', '.env.test');
      const sandbox = process.env.SANDBOX_BASE_URL ?? (!process.env.CI && existsSync(testFile) ? parse(readFileSync(testFile)).BASE_URL : undefined);
      if (!sandbox || new URL(baseURL).href !== new URL(sandbox).href) {
        throw new Error('Real PROD employee creation is disabled. Explicit approval and a protected production workflow are required before enabling it. PROD currently supports the TEST sandbox simulation only.');
      }
    }
    this.configuration = Object.freeze({ environment: selected as TestEnvironment, baseURL, username: values.USERNAME!, password: values.PASSWORD! });
    return this.configuration;
  }
}
