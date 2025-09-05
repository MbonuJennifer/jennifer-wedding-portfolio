import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ContactComponent } from './pages/contact/contact.component';
import { Wedding1Component } from './pages/wedding-samples/wedding1/wedding1.component';
import { Wedding2Component } from './pages/wedding-samples/wedding2/wedding2.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'portfolio', component: PortfolioComponent, title: 'Wedding Website Specailist | My works'},
    {path: 'contact', component: ContactComponent, title: 'Wedding Website Specailist | Contact Me'},
    { path: '**', redirectTo: '', pathMatch: 'full' },
    {path: 'wedding/1', component: Wedding1Component},
    {path: 'wedding/2', component: Wedding2Component},
];
