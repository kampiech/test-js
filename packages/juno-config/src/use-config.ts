import {config, loadConfig as _loadConfig} from '@app-config/main';
import { join } from 'path';

export function useConfig<T>(): T {
  return config as T;
}

export const loadConfig = async () => {
  await _loadConfig({
    directory: join(process.cwd(), '.juno/')
  });
};
