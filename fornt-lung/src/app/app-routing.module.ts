import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'checkLung' , component:TestComponent}
 
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
