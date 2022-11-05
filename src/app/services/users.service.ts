import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  token: string;

  constructor( private afs: AngularFirestore) {
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



}

