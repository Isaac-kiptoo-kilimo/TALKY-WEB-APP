import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interface/user';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {


  transform(users: User[], username: string): User[] {
    if (!users || username == '') {
      return users
    };
    const filtered: User[] = [];
    for (let user of users) {
      if (user.username.toLowerCase().includes(username.toLowerCase())) {
        filtered.push(user)
      }
    }
    return filtered;
  }

}
