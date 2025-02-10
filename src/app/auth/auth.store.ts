import _ from 'lodash'
import { produce } from 'immer'
import { computed, inject } from '@angular/core'
import { Router } from '@angular/router'
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'


import { AuthService } from './auth.service'
import { LoginDto } from './login/login.dto'
import { finalize, tap } from 'rxjs'

export type LoginState = {
  loading: boolean,
  success: boolean,
  message: string
}

type AuthState = {
  login: LoginState,
  accessToken: string,
  refreshToken: string
}

const initialState: AuthState = {
  login: { loading: false, success: false, message: "" },
  accessToken: _.defaultTo(localStorage.getItem("accessToken"), ""),
  refreshToken: _.defaultTo(localStorage.getItem("refreshToken"), "")
}

export const AuthStore = signalStore(
  { providedIn: 'root'},
  withState(initialState),
  withComputed((state) => ({
    isLoginError: computed(
      () => !state.login.success() && !_.isEmpty(state.login.message())
    ),
    isAuthenticated: computed(
      () => !_.isEmpty(state.accessToken())
    )
  })),
  withMethods((
    store, 
    service: AuthService = inject(AuthService),
    router: Router = inject(Router)
  ) => ({
    submit(login: LoginDto): void {
      patchState(store, (state) => {
        return produce(state, (draft) => {
          draft.login.loading = true
          draft.login.success = false
          draft.login.message = ""
        })
      })

      service
      .login(login)
      .pipe(
        finalize(() => 
          patchState(store, (state) => {
            return produce(state, (draft) => {
              draft.login.loading = false
            })
          })
        ),
      )
      .subscribe(res => {
        if (!res.success || !res.data) {
          patchState(store, (state) => {
            return produce(state, (draft) => {
              draft.login.success = false
              draft.login.message = res.message
            })
          })
          return
        }

        const { accessToken, refreshToken } = res.data 

        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        patchState(store, (state) => {
          return produce(state, (draft) => {
            draft.accessToken = accessToken
            draft.refreshToken = refreshToken
            draft.login.success = true
            draft.login.message = res.message
          })
        })

        router.navigate(["dashboard"])
      })
    },
    logout: () => {
      localStorage.clear()

      patchState(store, (state) => {
        return produce(state, (draft) => {
          draft.accessToken = ""
          draft.refreshToken = ""
        })
      })
      
      router.navigate([''])
    },
    refresh: () => {
      return service.refresh(store.refreshToken()).pipe(
        tap((res) => {
          if (!res.success) {
            return
          }

          const { accessToken, refreshToken } = res.data 

          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', refreshToken)
          
          patchState(store, (state) => {
            return produce(state, (draft) => {
              draft.accessToken = res.data.accessToken
              draft.refreshToken = res.data.refreshToken
            })
          })
        })
      )
    }
  })
))