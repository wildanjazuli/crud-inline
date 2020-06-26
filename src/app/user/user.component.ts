import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[];
  selectedUser: User = { id: null, username: null, fullname: null, password: null };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.readUser().subscribe((user: User[]) => {
      this.users = user;
      console.log(this.users);
    })
  }

  createOrUpdateUser(form) {
    if (this.selectedUser && this.selectedUser.id) {
      form.value.id = this.selectedUser.id;
      this.apiService.updateUser(form.value).subscribe((user: User) => {
        console.log("User updated", user);
      });
    }
    else {

      this.apiService.createUser(form.value).subscribe((user: User) => {
        this.users.push(user);
        console.log("User created, ", user);
      });
    }

  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  deleteUser(id) {
    this.apiService.deleteUser(id).subscribe((user: User) => {
      let test = this.users.indexOf(id);
      this.users.splice(this.users.indexOf(id), 1);
      console.log("User deleted, ", id, user, User, this.users, test);
    });
  }

}
