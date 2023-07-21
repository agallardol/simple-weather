import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import {
  excludeKeys,
  localStorageStrategy,
  persistState,
} from '@ngneat/elf-persist-state';

import { City } from '../models/city.model';
import { DEFAULT_CITIES } from '../utils/city-data';

export const citiesStore = createStore(
  { name: 'cities' },
  withEntities<City>({ initialValue: Array.from(DEFAULT_CITIES.values()) }),
);

export const syncStore = createStore(
  { name: 'sync' },
  withProps<{ lastSync: Date | null, syncing: boolean }>({ lastSync: null, syncing: false })
);

export const persistCities = persistState(citiesStore, {
  key: 'cities',
  storage: localStorageStrategy,
});

export const persistSync = persistState(syncStore, {
  key: 'sync',
  storage: localStorageStrategy,
  source: () => syncStore.pipe(excludeKeys(['syncing'])),
});
