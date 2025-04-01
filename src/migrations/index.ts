import * as migration_20250401_094621 from './20250401_094621';

export const migrations = [
  {
    up: migration_20250401_094621.up,
    down: migration_20250401_094621.down,
    name: '20250401_094621'
  },
];
