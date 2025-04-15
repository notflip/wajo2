import * as migration_20250401_094621 from './20250401_094621';
import * as migration_20250415_170730 from './20250415_170730';

export const migrations = [
  {
    up: migration_20250401_094621.up,
    down: migration_20250401_094621.down,
    name: '20250401_094621',
  },
  {
    up: migration_20250415_170730.up,
    down: migration_20250415_170730.down,
    name: '20250415_170730'
  },
];
