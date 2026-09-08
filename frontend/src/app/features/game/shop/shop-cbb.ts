import {
  Component,
  OnDestroy,
  afterNextRender
} from '@angular/core';

interface ShopStar {
  left: number;
  top: number;
  size: number;
  opacity: number;
}

@Component({
  selector: 'app-shop-cbb',
  standalone: true,
  templateUrl: './shop-cbb.html',
  styleUrl: './shop-cbb.css'
})
export class ShopCbb implements OnDestroy {
  shopStars: ShopStar[] = [];

  constructor() {
    afterNextRender(() => {
      this.createShopStars();
    });
  }

  private createShopStars(): void {
    this.shopStars = Array.from({ length: 100 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() < 0.9 ? 1 : 2,
      opacity: 0.08 + Math.random() * 0.18
    }));
  }

  ngOnDestroy(): void {
    // No requestAnimationFrame to clean up.
    // Celestial movement is handled entirely by CSS.
  }
}