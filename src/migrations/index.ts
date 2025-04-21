import * as migration_20250417_053733 from './20250417_053733';
import * as migration_20250417_054626 from './20250417_054626';
import * as migration_20250417_140709 from './20250417_140709';
import * as migration_20250418_125516 from './20250418_125516';
import * as migration_20250421_071432 from './20250421_071432';

export const migrations = [
  {
    up: migration_20250417_053733.up,
    down: migration_20250417_053733.down,
    name: '20250417_053733',
  },
  {
    up: migration_20250417_054626.up,
    down: migration_20250417_054626.down,
    name: '20250417_054626',
  },
  {
    up: migration_20250417_140709.up,
    down: migration_20250417_140709.down,
    name: '20250417_140709',
  },
  {
    up: migration_20250418_125516.up,
    down: migration_20250418_125516.down,
    name: '20250418_125516',
  },
  {
    up: migration_20250421_071432.up,
    down: migration_20250421_071432.down,
    name: '20250421_071432'
  },
];
