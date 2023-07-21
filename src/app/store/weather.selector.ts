import { select } from "@ngneat/elf";
import { selectAllEntities } from "@ngneat/elf-entities";
import { parseISO } from "date-fns";

import { citiesStore, syncStore } from "./weather.store";

export const cities$ = citiesStore.pipe(
    selectAllEntities(),
);

export const lastSync$ = syncStore.pipe(select(state => typeof state.lastSync === 'string' ? parseISO(state.lastSync as string) : state.lastSync));
export const syncing$ = syncStore.pipe(select(state => state.syncing));
