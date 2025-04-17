import * as migration_20250417_053733 from './20250417_053733';
import * as migration_20250417_054626 from './20250417_054626';

export const migrations = [
  {
    up: migration_20250417_053733.up,
    down: migration_20250417_053733.down,
    name: '20250417_053733',
  },
  {
    up: migration_20250417_054626.up,
    down: migration_20250417_054626.down,
    name: '20250417_054626'
  },
];
