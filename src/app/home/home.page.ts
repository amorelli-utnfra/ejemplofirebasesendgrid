import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular/providers/modal-controller';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonModal) modal: IonModal;
  
  users: {mail: string, state: string}[] = [];
  userMail: string;

  constructor(private userService: UsersService) {
    this.getUsers();
  }

  createUser() {
    this.userService.createUser(this.userMail)
    .then(response => console.log(response));
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<User>>;
    if (ev.detail.role === 'confirm') {
      
      this.createUser();
    }
  }

  getUsers() {
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users;
    });
  }

}
