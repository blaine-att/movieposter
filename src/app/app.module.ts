import { NgModule, LOCALE_ID } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../admin/about/about';
import { PopoverPage } from '../admin/about-popover/about-popover';
import { AccountPage } from '../admin/account/account';
import { LoginPage } from '../admin/login/login';
import { MapPage } from '../admin/map/map';
import { SchedulePage } from '../admin/schedule/schedule';
import { ScheduleFilterPage } from '../admin/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../admin/session-detail/session-detail';
import { SignupPage } from '../admin/signup/signup';
import { SpeakerDetailPage } from '../admin/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../admin/speaker-list/speaker-list';
import { TabsPage } from '../admin/tabs/tabs';
import { TutorialPage } from '../admin/tutorial/tutorial';
import { SupportPage } from '../admin/support/support';
import { MrtdataPage } from '../admin/mrtdata/mrtdata';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { MovieData } from '../providers/movie-data';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { TinymceModule } from 'angular2-tinymce';
import { JsonpModule } from '@angular/http';
import { NgCalendarModule  } from 'ionic2-calendar';

import { ChatBubble } from '../admin/components/chatBubble/chatBubble';

import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { ShowTimesPage } from '../pages/showtimes/showtimes';
import { ApiaiService } from "./services/apiai.service";
import { RatingsPage } from "../pages/ratings/ratings";
import { TicketsPage } from "../pages/tickets/tickets";
import { TrailerPage } from "../pages/trailer/trailer";
import { ActorsPage } from "../pages/actors/actors";
import { ImdbPage } from "../pages/imdb/imdb";

export const firebaseConfig = {
    apiKey: "AIzaSyDQ1wWxzlqkGMuB6bL4bQmeyVH7-OfDgzM",
    authDomain: "bravehackers17.firebaseapp.com",
    databaseURL: "https://bravehackers17.firebaseio.com",
    storageBucket: "bravehackers17.appspot.com",
    messagingSenderId: "236868911507"
};

@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    MrtdataPage,
    ChatBubble,
    SupportPage,

     
    HomePage,
    MenuPage,
    ShowTimesPage,
    ImdbPage,
    RatingsPage,
    TicketsPage,
    TrailerPage, 
    ActorsPage
  ],
  imports: [      
    NgCalendarModule,
    IonicModule.forRoot(ConferenceApp),
		IonicStorageModule.forRoot(),
    TinymceModule.withConfig({
    }),
    JsonpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    MrtdataPage,
    HomePage,
    MenuPage,
    
    HomePage,
    MenuPage,
    ShowTimesPage,
    ImdbPage,
    RatingsPage,
    TicketsPage,
    TrailerPage, 
    ActorsPage
  ],
  providers: [
    ConferenceData,
    UserData,
    MovieData,
    InAppBrowser,
    ApiaiService,
    SplashScreen,
    { provide: LOCALE_ID, useValue: undefined }
  ]
})
export class AppModule { }
