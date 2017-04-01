import { CalendarPage } from './../../pages/calendar/calendar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConferenceData } from './../../providers/conference-data';
import { UserData } from './../../providers/user-data';
import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ApiaiService } from '../../app/services/apiai.service';
//import { TdatasalesService } from '../../app/services/tdatasales.service';
//import { TdataserviceService } from '../../app/services/tdataservice.service';
//import { HelpcenterService } from '../../app/services/helpcenter.service';
import { ChatBubble } from '../components/chatBubble/chatBubble';

import { Events, MenuController, NavController, Nav, Platform } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { AboutPage } from '../../admin/about/about';
import { AccountPage } from '../../admin/account/account';
import { LoginPage } from '../../admin/login/login';
import { MapPage } from '../../admin/map/map';
//import { SignupPage } from '../../admin/signup/signup' 
import { TabsPage } from '../../admin/tabs/tabs';
import { TutorialPage } from '../../admin/tutorial/tutorial';
import { SchedulePage } from '../../admin/schedule/schedule';
import { SpeakerListPage } from '../../admin/speaker-list/speaker-list';
import { SupportPage } from '../../admin/support/support';


export interface PageInterface {
    title: string;
    component: any;
    icon: string;
    logsOut?: boolean;
    logsIn?: boolean;
    index?: number;
    tabComponent?: any;
}

//declare var SpeechRecognition: any;
//declare var platform: any;
declare var webkitSpeechRecognition: any;

@Component({
    selector: 'mrtdata',
    templateUrl: 'mrtdata.html',
  providers: [ApiaiService]

})

export class MrtdataPage {
    messages: any;
    chatBox: String;
    recognition: any;
    buttonLabel: String;
    buttonColor: String;
    myMap: any;

    // List of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    appPages: PageInterface[] = [
        { title: 'Schedule', component: TabsPage, tabComponent: SchedulePage, icon: 'calendar' },
        { title: 'Calendar', component: CalendarPage, icon: 'calendar' },
        //{ title: 'Demo', component: HomePage, icon: 'calendar' },
        { title: 'Movies', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'videocam' },
        { title: 'Theaters', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map' },
        { title: 'Posters', component: TabsPage, tabComponent: SpeakerListPage, index: 3, icon: 'film' },
        { title: 'About', component: TabsPage, tabComponent: AboutPage, index: 4, icon: 'information-circle' }
    ];
    loggedInPages: PageInterface[] = [
        { title: 'Account', component: AccountPage, icon: 'person' },
        { title: 'Support', component: SupportPage, icon: 'help' },
        { title: 'Logout', component: TabsPage, icon: 'log-out', logsOut: true }
    ];
    loggedOutPages: PageInterface[] = [
        { title: 'Login', component: LoginPage, icon: 'log-in', logsIn: true },
        { title: 'Support', component: SupportPage, icon: 'help' }
        //{ title: 'Signup', component: SignupPage, icon: 'person-add' }
    ];

    constructor(
        public navCtrl: NavController,
        public platform: Platform,
        private apiaiService: ApiaiService,
        private cdRef: ChangeDetectorRef,
        public events: Events,
        public userData: UserData,
        public menu: MenuController,
        public confData: ConferenceData,
        public storage: Storage,
        public nav: NavController,
        public splashScreen: SplashScreen
    ) {
        this.messages = [];
        this.chatBox = '';
        this.buttonLabel = 'START TALKING';
        this.buttonColor = 'secondary';
        this.myMap = new Map();
        
    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });

    this.listenToLoginEvents();
    }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }


    startRecognition() {
        this.platform.ready().then(() => {

            this.recognition = new webkitSpeechRecognition();
            //this.recognition = new SpeechRecognition();
            this.recognition.lang = 'en-US';
            this.recognition.onnomatch = (event => {
                //this.showAlert('No match found.');
            });
            this.recognition.onerror = (event => {
                //this.showAlert('Error happens.');
            });
            this.recognition.onresult = (event => {
                if (event.results.length > 0) {
                    console.log('Output STT: ', event.results[0][0].transcript);
                    this.loadWords(event.results[0][0].transcript);
                }
                // this.stopRecognition();
            });
            this.recognition.start();
        });
    }

    loadWords(dati: string) {
        this.ask(dati);
    }

    switchRecognition() {
        if (this.recognition) {
            this.buttonLabel = 'START TALKING';
            this.buttonColor = 'secondary';
            this.stopRecognition();
        } else {
            this.buttonLabel = 'STOP TALKING';
            this.buttonColor = 'danger';
            this.startRecognition();
        }
    }

    stopRecognition() {
        if (this.recognition) {
            this.recognition.stop();
            this.recognition = null;
        }
    }

    ngOnInit() {
        console.log("OnInit Ran...");
        //load Map
        this.loadMap();
    }

    ask(text: any) {
        var sendmsg = {
            content: text,
            position: 'left',
            picture: '../../assets/img/me.JPG',
            img: '',
            article: '',
            name: ''
        }
        this.messages.push(sendmsg)
        this.apiaiService.send(text).subscribe(response => {
            var getmsg = {
                content: response.result.speech,
                position: 'right',
                picture: '../../assets/img/usher2.png',
                img: '',
                article: '',
                name: ''
            }
            console.log(response);
            if (response.result.action == 'show-trailer') {
                // show trailer
                this.messages.push(getmsg);
                this.cdRef.detectChanges();
            }
            else if (response.result.action == 'show-review') {
                // show review
                this.messages.push(getmsg);
                this.cdRef.detectChanges();
            }
            else if (response.result.action == 'show-tickets') {
                //show tickets
                this.messages.push(getmsg);
                this.cdRef.detectChanges();
            }
            else {
                this.messages.push(getmsg);
                this.cdRef.detectChanges();
            }
        });
        this.chatBox = "";
    }



    loadMap() {
        //   this.myMap.set('Topic261','Billing - Want to pay bill');


    }

    isActive(page: PageInterface) {
        let childNav = this.nav.getActiveChildNav();

        // Tabs are a special case because they have their own navigation
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            return;
        }

        if (this.nav.getActive() && this.nav.getActive().component === page.component) {
            return 'primary';
        }
        return;
    }

    openTutorial() {
        this.nav.setRoot(TutorialPage);
    }

    openPage(page: PageInterface) {
        // the nav component was found using @ViewChild(Nav)
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            this.nav.setRoot(page.component, { tabIndex: page.index }).catch(() => {
                console.log("Didn't set nav root");
            });
        } else {
            this.nav.setRoot(page.component).catch(() => {
                console.log("Didn't set nav root");
            });
        }

        if (page.logsOut === true) {
            setTimeout(() => {
                this.userData.logout();
            }, 1000);
        }

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
    .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
            this.nav.setRoot( TabsPage ) ;
        } else {
            this.nav.setRoot( TutorialPage );
        }
        this.nav.setRoot( SpeakerListPage );
    })
    }
}