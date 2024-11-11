import { Component, input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  name = input.required<string>();
  size = input<string>('2');

  getUserInitials() {
    return this.name().charAt(0).toUpperCase();
  }
}
