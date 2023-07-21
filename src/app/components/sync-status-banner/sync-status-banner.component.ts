import { Component } from '@angular/core';
import { format } from 'date-fns';
import { map } from 'rxjs';
import { lastSync$, syncing$ } from 'src/app/store/weather.selector';

@Component({
  selector: 'app-sync-status-banner',
  templateUrl: './sync-status-banner.component.html',
  styleUrls: ['./sync-status-banner.component.css']
})
export class SyncStatusBannerComponent {
  public lastSync$ = lastSync$.pipe(
    map(lastSync => {
      return lastSync ? format(lastSync, 'PPp') : '-';
    }),
  );

  public isSyncing$ = syncing$;
}
