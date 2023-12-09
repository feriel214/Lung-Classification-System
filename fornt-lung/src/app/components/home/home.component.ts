import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    Swal.fire({
      title: "We Care",
      html: `<p>  We prioritize your well-being, recognizing that good health is the foundation for a fulfilling life. Our commitment extends beyond mere services; it's a dedication to empowering you with the knowledge and support necessary for a healthy and vibrant lifestyle.<p><img src="assets/img/kalthoum.gif" alt="Your Image" style="width: 70%;">`,
      width: 600,
      padding: '3em',
      showConfirmButton: false,
      timer: 3500,
    });
  }


}
