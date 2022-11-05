import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  token: string;

  constructor( private afs: AngularFirestore,
    private http: HttpClient) {
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
   }

   getUsers() {
     return this.usersCollection.valueChanges();
   }



  createUser(mail: string) {

    let id = this.afs.createId();

    let data = {
      id: id,
      mail: mail,
      state: "Pendiente",
    }

    return this.afs.collection("users").doc(id).set(data);

  }

  sendMail(userId: string) {
    let body = {
      personalizations: [
        {
          from: {
            email: 'duenolacomanda@gmail.com',
            name: 'Dueño'
          },
          to: [
            {
              email: 'augustomorelli206@gmail.com',
              name: 'Janice Doe'
            }
          ],
          bcc: []
        }
      ],
      from: {
        email: 'duenolacomanda@gmail.com',
        name: 'Example Order Confirmation'
      },
      subject: 'Prueba',
      content: [
        {
          type: 'text/html',
          value: '<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>'
        }
      ],
      }

      let headers : HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer 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')

    return this.http.post("https://api.sendgrid.com/v3/mail/send", body, {headers});
  }



}


// "Bearer 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"