import { Routes } from '@angular/router';

import { Home } from './components/home/home';

import { Login } from './components/login/login';

import { Register } from './components/register/register';

import { EventList } from './components/events/event-list/event-list';

import { EventForm } from './components/events/event-form/event-form';

import { SessionList } from './components/sessions/session-list/session-list';

import { SessionForm } from './components/sessions/session-form/session-form';

import { SpeakerList } from './components/speakers/speaker-list/speaker-list';

import { SpeakerForm } from './components/speakers/speaker-form/speaker-form';

import { UserList } from './components/users/user-list/user-list';

import { AdminDashboard } from './components/admin/admin-dashboard/admin-dashboard';

import { ParticipantDashboard } from './components/participant/participant-dashboard/participant-dashboard';

import { MySessions } from './components/participant/my-sessions/my-sessions';

import { authGuard } from './guards/auth-guard';

import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: Home
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  // EVENTS

  {
    path: 'events',
    component: EventList,
    canActivate: [authGuard]
  },

  {
    path: 'events/create',
    component: EventForm,
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'events/edit/:id',
    component: EventForm,
    canActivate: [authGuard, adminGuard]
  },

  // SESSIONS

  {
    path: 'sessions',
    component: SessionList,
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'sessions/create',
    component: SessionForm,
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'sessions/edit/:id',
    component: SessionForm,
    canActivate: [authGuard, adminGuard]
  },

  // SPEAKERS

  {
    path: 'speakers',
    component: SpeakerList,
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'speakers/create',
    component: SpeakerForm,
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'speakers/edit/:id',
    component: SpeakerForm,
    canActivate: [authGuard, adminGuard]
  },

  // USERS

  {
    path: 'users',
    component: UserList,
    canActivate: [authGuard, adminGuard]
  },

  // DASHBOARDS

  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'participant-dashboard',
    component: ParticipantDashboard,
    canActivate: [authGuard]
  },

  // PARTICIPANT

  {
    path: 'my-sessions',
    component: MySessions,
    canActivate: [authGuard]
  },

  // FALLBACK

  {
    path: '**',
    redirectTo: 'home'
  }
];