import { inject } from "@angular/core";
import { signalStore, withMethods, withState } from "@ngrx/signals";
import { MessageService } from "primeng/api";

type AppState = {
  networkError: boolean
}

const initialState: AppState = {
  networkError: false
}

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store, 
    messageService: MessageService = inject(MessageService)
  ) => ({
    showServerError(): void {
      messageService.add({
        severity: 'secondary',
        summary: 'Server Error',
        detail: 'Our server is currently unavailable, please try again later.',
        life: 3000
      })
    }
  }))
)