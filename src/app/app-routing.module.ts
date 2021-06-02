import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'verifyemail',
    loadChildren: () => import('./verifyemail/verifyemail.module').then( m => m.VerifyemailPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'searchfilter',
    loadChildren: () => import('./searchfilter/searchfilter.module').then( m => m.SearchfilterPageModule)
  },
  {
    path: 'upcomingevent/:id',
    loadChildren: () => import('./upcoming-event/upcoming-event.module').then( m => m.UpcomingEventPageModule)
  },
  {
    path: 'createaccount',
    loadChildren: () => import('./createaccount/createaccount.module').then( m => m.CreateaccountPageModule)
  },
  {
    path: 'myticket',
    loadChildren: () => import('./myticket/myticket.module').then( m => m.MyticketPageModule)
  },
  {
    path: 'mywallet',
    loadChildren: () => import('./mywallet/mywallet.module').then( m => m.MywalletPageModule)
  },
  {
    path: 'billingaddress',
    loadChildren: () => import('./billingaddress/billingaddress.module').then( m => m.BillingaddressPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'newsfeed',
    loadChildren: () => import('./newsfeed/newsfeed.module').then( m => m.NewsfeedPageModule)
  },
  {
    path: 'newsdetail',
    loadChildren: () => import('./newsdetail/newsdetail.module').then( m => m.NewsdetailPageModule)
  },
  {
    path: 'creditcard',
    loadChildren: () => import('./creditcard/creditcard.module').then( m => m.CreditcardPageModule)
  },
  {
    path: 'congratulations',
    loadChildren: () => import('./congratulations/congratulations.module').then( m => m.CongratulationsPageModule)
  },
  {
    path: 'sendmoney',
    loadChildren: () => import('./sendmoney/sendmoney.module').then( m => m.SendmoneyPageModule)
  },
  {
    path: 'sendmoney2/:number/:cardid',
    loadChildren: () => import('./sendmoney2/sendmoney2.module').then( m => m.Sendmoney2PageModule)
  },
  {
    path: 'sendmoney3',
    loadChildren: () => import('./sendmoney3/sendmoney3.module').then( m => m.Sendmoney3PageModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./qrcode/qrcode.module').then( m => m.QrcodePageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./confirm/confirm.module').then( m => m.ConfirmPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'sorry',
    loadChildren: () => import('./sorry/sorry.module').then( m => m.SorryPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'cardkyc',
    loadChildren: () => import('./cardkyc/cardkyc.module').then( m => m.CardkycPageModule)
  },
  {
    path: 'addmoney/:type',
    loadChildren: () => import('./addmoney/addmoney.module').then( m => m.AddmoneyPageModule)
  },
  {
    path: 'userlist/:number/:cardid',
    loadChildren: () => import('./userlist/userlist.module').then( m => m.UserlistPageModule)
  },
  {
    path: 'userlistforsend/:number',
    loadChildren: () => import('./userlist/userlist.module').then( m => m.UserlistPageModule)
  },
  {
    path: 'reqmoneyuserlist/:number',
    loadChildren: () => import('./reqmoneyuserlist/reqmoneyuserlist.module').then( m => m.ReqmoneyuserlistPageModule)
  },
  {
    path: 'transactionhistory',
    loadChildren: () => import('./transactionhistory/transactionhistory.module').then( m => m.TransactionhistoryPageModule)
  },
  {
    path: 'acceptrej',
    loadChildren: () => import('./acceptrej/acceptrej.module').then( m => m.AcceptrejPageModule)
  },
  {
    path: 'accpetmoneysend',
    loadChildren: () => import('./accpetmoneysend/accpetmoneysend.module').then( m => m.AccpetmoneysendPageModule)
  },
  {
    path: 'qruser/:cardid/:userid',
    loadChildren: () => import('./qruser/qruser.module').then( m => m.QruserPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'applygiftcard',
    loadChildren: () => import('./applygiftcard/applygiftcard.module').then( m => m.ApplygiftcardPageModule)
  },
  {
    path: 'listing',
    loadChildren: () => import('./listing/listing.module').then( m => m.ListingPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'schedulestreaming',
    loadChildren: () => import('./schedulestreaming/schedulestreaming.module').then( m => m.SchedulestreamingPageModule)
  },
  {
    path: 'createevent',
    loadChildren: () => import('./createevent/createevent.module').then( m => m.CreateeventPageModule)
  },
  {
    path: 'eventdetail/:id',
    loadChildren: () => import('./eventdetail/eventdetail.module').then( m => m.EventdetailPageModule)
  },
  {
    path: 'uploadimage',
    loadChildren: () => import('./uploadimage/uploadimage.module').then( m => m.UploadimagePageModule)
  },
  {
    path: 'alleven',
    loadChildren: () => import('./alleven/alleven.module').then( m => m.AllevenPageModule)
  },
  {
    path: 'favevent',
    loadChildren: () => import('./favevent/favevent.module').then( m => m.FaveventPageModule)
  },
  {
    path: 'mycreatedevent',
    loadChildren: () => import('./mycreatedevent/mycreatedevent.module').then( m => m.MycreatedeventPageModule)
  },
  {
    path: 'bookevent/:id/:number',
    loadChildren: () => import('./bookevent/bookevent.module').then( m => m.BookeventPageModule)
  },
  {
    path: 'addbank',
    loadChildren: () => import('./addbank/addbank.module').then( m => m.AddbankPageModule)
  },
  {
    path: 'sendwaltobank',
    loadChildren: () => import('./sendwaltobank/sendwaltobank.module').then( m => m.SendwaltobankPageModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'walletnew',
    loadChildren: () => import('./walletnew/walletnew.module').then( m => m.WalletnewPageModule)
  },
  {
    path: 'transfertobank/:number',
    loadChildren: () => import('./transfertobank/transfertobank.module').then( m => m.TransfertobankPageModule)
  },
  {
    path: 'loadwallet/:number',
    loadChildren: () => import('./loadwallet/loadwallet.module').then( m => m.LoadwalletPageModule)
  },
  {
    path: 'scanqr/:number',
    loadChildren: () => import('./scanqr/scanqr.module').then( m => m.ScanqrPageModule)
  },
  {
    path: 'liveevent/:id',
    loadChildren: () => import('./liveevent/liveevent.module').then( m => m.LiveeventPageModule)
  },
  {
    path: 'bookedevent',
    loadChildren: () => import('./bookedevent/bookedevent.module').then( m => m.BookedeventPageModule)
  },
  {
    path: 'streamingscreen',
    loadChildren: () => import('./streamingscreen/streamingscreen.module').then( m => m.StreamingscreenPageModule)
  },
  {
    path: 'livestreamevent',
    loadChildren: () => import('./livestreamevent/livestreamevent.module').then( m => m.LivestreameventPageModule)
  },
  {
    path: 'termcondition',
    loadChildren: () => import('./termcondition/termcondition.module').then( m => m.TermconditionPageModule)
  },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)
  },
  {
    path: 'qrscanner',
    loadChildren: () => import('./qrscanner/qrscanner.module').then( m => m.QrscannerPageModule)
  },  {
    path: 'historydetail',
    loadChildren: () => import('./historydetail/historydetail.module').then( m => m.HistorydetailPageModule)
  },
  {
    path: 'pending',
    loadChildren: () => import('./pending/pending.module').then( m => m.PendingPageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
