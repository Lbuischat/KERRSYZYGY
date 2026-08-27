import { Component } from '@angular/core';

interface GrassTile {
  row: number;
  variation: number;
}

@Component({
  selector: 'app-terrain',
  standalone: true,
  templateUrl: './terrain.html',
  styleUrl: './terrain.css',
})
export class Terrain {
  readonly tileSize = 128;

  readonly mapWidth = 20;
  readonly mapHeight = 20;

  // =========================================================
  // GRASS SETTINGS
  // =========================================================

  // Highest variation number that currently exists.
  //
  // You currently have:
  // 0,0.png
  // 0,1.png
  // 0,2.png
  // ...
  // 0,8.png
  //
  // When you create 0,9.png, change this to 9.
  // When you create 0,10.png, change this to 10.
  // =========================================================
  readonly maxGrassVariation = 8;

  tiles: GrassTile[][] = [];

  constructor() {
    this.generateGrass();
  }

  private generateGrass(): void {
    for (let y = 0; y < this.mapHeight; y++) {
      // =====================================================
      // DIRT LAYER
      // =====================================================

      const dirtRow: GrassTile[] = [];

      for (let x = 0; x < this.mapWidth; x++) {
        dirtRow.push({
          row: 1,

          // Only 1,0 and 1,1 exist right now.
          variation: Math.floor(Math.random() * 2),
        });
      }

      this.tiles.push(dirtRow);

      // =====================================================
      // GRASS LAYER
      // =====================================================

      const grassRow: GrassTile[] = [];

      for (let x = 0; x < this.mapWidth; x++) {
        let variation: number;

        if (x === 0) {
          variation = Math.floor(Math.random() * (this.maxGrassVariation + 1));
        } else {
          const previousVariation = grassRow[x - 1].variation;

          variation = this.getCompatibleVariation(previousVariation);
        }

        grassRow.push({
          row: 0,
          variation,
        });
      }

      this.tiles.push(grassRow);
    }
  }

  private getCompatibleVariation(previousVariation: number): number {
    const possibleVariations: number[] = [];

    for (let variation = 0; variation <= this.maxGrassVariation; variation++) {
      const difference = Math.abs(variation - previousVariation);

      // Only allow neighboring variations
      if (difference <= 1) {
        possibleVariations.push(variation);
      }
    }

    return possibleVariations[Math.floor(Math.random() * possibleVariations.length)];
  }

  getTilePath(tile: GrassTile): string {
    if (tile.row === 1) {
      return `/gassets/floors/dirt/${tile.row},${tile.variation}.png`;
    }

    return `/gassets/floors/grass/${tile.row},${tile.variation}.png`;
  }

  getTileTop(tile: GrassTile, y: number): number {
    // Each pair of rows is one terrain section:
    //
    // row 1 = dirt
    // row 0 = grass
    //
    // Both need to occupy the same 128px vertical space.

    const terrainY = Math.floor(y / 2) * this.tileSize;

    if (tile.row === 1) {
      // Move dirt upward so it sits underneath the grass.
      return terrainY - 17;
    }

    // Grass sits normally.
    return terrainY;
  }

  getTileZIndex(tile: GrassTile): number {
    if (tile.row === 1) {
      return 1;
    }

    return 2;
  }
}
