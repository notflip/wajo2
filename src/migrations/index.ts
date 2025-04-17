import * as migration_20250417_052421 from './20250417_052421';

export const migrations = [
  {
    up: migration_20250417_052421.up,
    down: migration_20250417_052421.down,
    name: '20250417_052421'
  },
];
