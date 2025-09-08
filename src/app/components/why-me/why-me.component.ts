import { Component } from '@angular/core';
@Component({
  selector: 'app-why-me',
  standalone: true,
  imports: [],
  templateUrl: './why-me.component.html',
  styleUrl: './why-me.component.css'
})
export class WhyMeComponent {
  toggleFlip(event: Event) {
    const card = (event.currentTarget as HTMLElement);
    // Toggle "flipped" only on mobile / touch devices
    if (window.innerWidth < 992) { // Bootstrap lg breakpoint
      card.classList.toggle('flipped');
    }
  }

}
