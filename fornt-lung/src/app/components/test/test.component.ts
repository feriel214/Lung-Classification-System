import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


 

  constructor(private imageClassificationService: ServiceService, public router: Router) {}
  ngOnInit(): void {

    Swal.fire({
      title: "We Care",
      html: `<p>Hey, Upload your file in the form below and get the result<p><img src="assets/img/result.gif" alt="Your Image" style="width: 70%;">`,
      width: 600,
      padding: '3em',
      showConfirmButton: false,
      timer: 2500,
    });
    
  }

  myFile: any;
  uploadedImage: string | undefined;


  selectFile(event: any){
    this.myFile = event.target.files[0];  
  }

  async onUpload(): Promise<void> {
    if (this.myFile) {
      const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif','jfif'];
      const fileExtension = this.getFileExtension(this.myFile.name);
  
      if (allowedExtensions.includes(fileExtension.toLowerCase())) {
        try {
          const response = await this.imageClassificationService.classifyImage(this.myFile);
          console.log('Classified result:', response.class);
          this.uploadedImage = URL.createObjectURL(this.myFile);
        
          let illnessColor = "#716add"; // Default color

          if (response.class === "COVID") {
            illnessColor = "red";
          } else if (response.class === "NORMAL") {
            illnessColor = "green";
          } else if (response.class === "PNEUMONIA") {
            illnessColor = "red";
          }
          
          Swal.fire({
            title: `Illness is: ${response.class}`,
            width: 600,
            timer: 3000,
            padding: "3em",
            color: illnessColor,
            background: "#fff url(assets/img/trees.gif)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("assets/img/result.gif")
              center left
              no-repeat
            `
          });
          
         // this.router.navigate(['/']);
          // Handle the response as needed
        } catch (error) {
          console.error('Error:', error);
          // Handle the error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while processing the file. Please try again!',
          });
        }
      } else {
        // Show error message for invalid file extension
        Swal.fire({
          icon: 'error',
          title: 'Invalid File',
          text: 'Please upload a file with a valid extension (png, jpg, jpeg, gif).',
        });
      }
    } else {
      console.warn('No file selected');
    }
  }
  
  private getFileExtension(fileName: string): string {
    return fileName.split('.').pop() || '';
  }
  



}
