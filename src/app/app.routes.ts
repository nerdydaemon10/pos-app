import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { GuestGuard } from './auth/guest.guard';

export const routes: Routes = [
  {
    path: "",
    canActivate: [GuestGuard],
    loadChildren: () => import("./auth/auth.routes").then(r => r.authRoutes)
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import("./dashboard/dashboard.routes").then(r => r.dashboardRoutes)
  }
];
