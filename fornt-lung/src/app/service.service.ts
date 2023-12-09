import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://127.0.0.1:5000/symptoms'; // Update with your Flask API endpoint

  constructor(private http: HttpClient) {}

  classifyImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl, formData).toPromise();
  }
  test( file: any ){

    return  this.http.post(this.apiUrl,file);
 
   }
 
}
