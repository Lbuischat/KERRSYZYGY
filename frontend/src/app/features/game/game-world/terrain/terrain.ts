import { Component } from '@angular/core';

import {
  TerrainType,
  TileId,
  TerrainTileRule,
  ALL_TERRAIN_RULES,
  TERRAIN_RULE_LOOKUP,
} from './terrain-rules';


interface Tile {
  x: number;
  y: number;

  id: TileId;
  terrain: TerrainType;

  sheetColumn: number;
  sheetRow: number;
}


@Component({
  selector: 'app-terrain',
  standalone: true,
  templateUrl: './terrain.html',
  styleUrl: './terrain.css',
})
export class Terrain {

  // ==========================================================
  // MAP SETTINGS
  // ==========================================================

  readonly tileSize = 128;

  readonly mapWidth = 20;
  readonly mapHeight = 20;

  readonly debug = true;


  // ==========================================================
  // GENERATED MAP
  // ==========================================================

  tiles: Tile[][] = [];


  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================

  constructor() {
    this.generateMap();
  }


  // ==========================================================
  // GENERATE MAP
  // ==========================================================
  //
  // This is the actual procedural generator.
  //
  // Every cell starts with every available tile.
  //
  // We then repeatedly:
  //
  //   1. Find a cell with the fewest possibilities.
  //   2. Pick one of its possible tiles.
  //   3. Lock that tile into the cell.
  //   4. Propagate its rules to neighboring cells.
  //
  // ==========================================================

  private generateMap(): void {

    // ==========================================================
    // STEP 1: CREATE A SIMPLE CONNECTED DIRT PATH
    // ==========================================================

    const dirtCells = new Set<string>();

    let pathX = Math.floor(this.mapWidth / 2);
    let pathY = 0;

    while (pathY < this.mapHeight) {

      // Make the path 2 tiles wide.
      dirtCells.add(`${pathX},${pathY}`);

      if (pathX + 1 < this.mapWidth) {
        dirtCells.add(`${pathX + 1},${pathY}`);
      }

      // Mostly move downward.
      const roll = Math.random();

      if (roll < 0.65) {
        pathY++;

      } else if (roll < 0.825) {
        pathX--;

      } else {
        pathX++;
      }

      // Keep it inside the map.
      pathX = Math.max(
        1,
        Math.min(
          this.mapWidth - 3,
          pathX
        )
      );
    }


    // ==========================================================
    // STEP 2: BUILD THE MAP
    // ==========================================================

    this.tiles = [];

    for (let y = 0; y < this.mapHeight; y++) {

      const row: Tile[] = [];

      for (let x = 0; x < this.mapWidth; x++) {

        const isDirt =
          dirtCells.has(`${x},${y}`);

        const id: TileId = isDirt
          ? 'dirt:1,1'
          : 'grass:1,1';

        row.push(
          this.makeTile(
            x,
            y,
            id
          )
        );
      }

      this.tiles.push(row);
    }

    // IMPORTANT:
    // Now that the entire terrain grid exists,
    // determine which sprite each cell needs.
    this.updateTileSprites();
  }


  // ==========================================================
  // SOLVE
  // ==========================================================
  //
  // This repeatedly collapses the most constrained cell.
  //
  // ==========================================================

  private solve(
    possibilities: Set<TileId>[][]
  ): boolean {

    const maxAttempts =
      this.mapWidth *
      this.mapHeight *
      10;


    for (
      let attempt = 0;
      attempt < maxAttempts;
      attempt++
    ) {

      // ------------------------------------------------------
      // Find the cell with the fewest possibilities.
      // ------------------------------------------------------

      const cell =
        this.findMostConstrainedCell(
          possibilities
        );


      // ------------------------------------------------------
      // No cell means the map is completely solved.
      // ------------------------------------------------------

      if (!cell) {
        return true;
      }


      const options = [
        ...possibilities[cell.y][cell.x]
      ];


      // ------------------------------------------------------
      // Contradiction.
      // ------------------------------------------------------

      if (options.length === 0) {

        return false;
      }


      // ------------------------------------------------------
      // Pick one possible tile.
      //
      // For now this is random.
      // Later we can add weights.
      // ------------------------------------------------------

      const chosen =
        options[
        Math.floor(
          Math.random() * options.length
        )
        ];


      possibilities[cell.y][cell.x] =
        new Set([chosen]);


      // ------------------------------------------------------
      // Propagate the consequences.
      // ------------------------------------------------------

      const propagated =
        this.propagate(
          possibilities,
          cell.x,
          cell.y
        );


      if (!propagated) {

        return false;
      }
    }


    return false;
  }


  // ==========================================================
  // FIND MOST CONSTRAINED CELL
  // ==========================================================
  //
  // This is the "lowest entropy" part of WFC.
  //
  // We want to solve cells that have the fewest possibilities
  // first.
  //
  // ==========================================================

  private findMostConstrainedCell(
    possibilities: Set<TileId>[][]
  ): { x: number; y: number } | null {

    let best:
      { x: number; y: number } | null = null;

    let bestCount =
      Number.MAX_SAFE_INTEGER;


    for (let y = 0; y < this.mapHeight; y++) {

      for (let x = 0; x < this.mapWidth; x++) {

        const count =
          possibilities[y][x].size;


        // Already solved.
        if (count <= 1) {
          continue;
        }


        if (count < bestCount) {

          bestCount = count;

          best = {
            x,
            y,
          };
        }
      }
    }


    return best;
  }


  // ==========================================================
  // PROPAGATE
  // ==========================================================
  //
  // This is the important part.
  //
  // If a cell can only contain certain tiles, its neighbors
  // must remove anything that is incompatible with those tiles.
  //
  // That change can then affect THEIR neighbors.
  //
  // So we keep going until nothing changes.
  //
  // ==========================================================

  private propagate(
    possibilities: Set<TileId>[][],
    startX: number,
    startY: number
  ): boolean {

    const queue: Array<{
      x: number;
      y: number;
    }> = [
        {
          x: startX,
          y: startY,
        }
      ];


    while (queue.length > 0) {

      const current =
        queue.shift()!;


      const neighbors = [
        {
          x: current.x,
          y: current.y - 1,
          direction: 'top' as const,
        },

        {
          x: current.x,
          y: current.y + 1,
          direction: 'bottom' as const,
        },

        {
          x: current.x - 1,
          y: current.y,
          direction: 'left' as const,
        },

        {
          x: current.x + 1,
          y: current.y,
          direction: 'right' as const,
        },
      ];


      for (const neighbor of neighbors) {

        // ----------------------------------------------------
        // Outside map.
        // ----------------------------------------------------

        if (
          neighbor.x < 0 ||
          neighbor.x >= this.mapWidth ||
          neighbor.y < 0 ||
          neighbor.y >= this.mapHeight
        ) {
          continue;
        }


        const changed =
          this.filterNeighbor(
            possibilities,
            current.x,
            current.y,
            neighbor.x,
            neighbor.y,
            neighbor.direction
          );


        // ----------------------------------------------------
        // Contradiction.
        // ----------------------------------------------------

        if (
          possibilities[
            neighbor.y
          ][
            neighbor.x
          ].size === 0
        ) {

          return false;
        }


        // ----------------------------------------------------
        // Something changed.
        //
        // That means THIS neighbor may now affect ITS
        // neighbors too.
        // ----------------------------------------------------

        if (changed) {

          queue.push({
            x: neighbor.x,
            y: neighbor.y,
          });
        }
      }
    }


    return true;
  }


  // ==========================================================
  // FILTER NEIGHBOR
  // ==========================================================

  private filterNeighbor(
    possibilities: Set<TileId>[][],

    currentX: number,
    currentY: number,

    neighborX: number,
    neighborY: number,

    direction:
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
  ): boolean {

    const currentOptions =
      possibilities[
      currentY
      ][
      currentX
      ];


    const neighborOptions =
      possibilities[
      neighborY
      ][
      neighborX
      ];


    const allowed =
      new Set<TileId>();


    // ========================================================
    // FIND EVERY TILE THE NEIGHBOR COULD USE
    // ========================================================
    //
    // A neighbor is allowed if AT LEAST ONE possible tile in
    // the current cell explicitly allows it.
    //
    // ========================================================

    for (
      const currentId
      of currentOptions
    ) {

      const rule =
        TERRAIN_RULE_LOOKUP.get(
          currentId
        );


      if (!rule) {
        continue;
      }


      let allowedByCurrent:
        TileId[];


      switch (direction) {

        case 'top':

          // Neighbor is ABOVE current.
          allowedByCurrent =
            rule.top;

          break;


        case 'bottom':

          // Neighbor is BELOW current.
          allowedByCurrent =
            rule.bottom;

          break;


        case 'left':

          // Neighbor is LEFT of current.
          allowedByCurrent =
            rule.left;

          break;


        case 'right':

          // Neighbor is RIGHT of current.
          allowedByCurrent =
            rule.right;

          break;
      }


      for (
        const tileId
        of allowedByCurrent
      ) {

        allowed.add(tileId);
      }
    }


    // ========================================================
    // REMOVE INVALID NEIGHBOR OPTIONS
    // ========================================================

    let changed = false;


    for (
      const neighborId
      of [...neighborOptions]
    ) {

      if (
        !allowed.has(neighborId)
      ) {

        neighborOptions.delete(
          neighborId
        );

        changed = true;
      }
    }


    return changed;
  }


  // ==========================================================
  // CREATE TILE
  // ==========================================================

  private makeTile(
    x: number,
    y: number,
    id: TileId
  ): Tile {

    const rule =
      TERRAIN_RULE_LOOKUP.get(id);

    if (!rule) {
      throw new Error(
        `No terrain rule exists for tile "${id}".`
      );
    }

    const match = id.match(
      /^(grass|dirt):(\d+),(\d+)$/
    );

    if (!match) {
      throw new Error(
        `Invalid terrain tile ID: "${id}"`
      );
    }

    // Tile IDs are formatted as terrain:row,column.
    // The row controls the vertical sprite position and the
    // column controls the horizontal sprite position.
    const sheetRow =
      Number(match[2]);

    const sheetColumn =
      Number(match[3]);

    return {
      x,
      y,
      id,
      terrain: rule.terrain,
      sheetColumn,
      sheetRow,
    };
  }


  // ==========================================================
  // FALLBACK MAP
  // ==========================================================
  //
  // If the manually-authored rules produce a contradiction,
  // don't crash the entire game.
  //
  // ==========================================================

  private createFallbackMap(): void {

    this.tiles = [];


    for (let y = 0; y < this.mapHeight; y++) {

      const row: Tile[] = [];


      for (let x = 0; x < this.mapWidth; x++) {

        row.push(
          this.makeTile(
            x,
            y,
            'grass:1,1'
          )
        );
      }


      this.tiles.push(row);
    }
  }


  // ==========================================================
  // TERRAIN LOOKUP
  // ==========================================================

  getTerrainAt(
    x: number,
    y: number
  ): TerrainType | null {

    if (
      x < 0 ||
      x >= this.mapWidth ||
      y < 0 ||
      y >= this.mapHeight
    ) {

      return null;
    }


    return this.tiles[y][x].terrain;
  }


  // ==========================================================
  // UPDATE ALL TILE SPRITES
  // ==========================================================

  private updateTileSprites(): void {

    for (let y = 0; y < this.mapHeight; y++) {

      for (let x = 0; x < this.mapWidth; x++) {

        const tile = this.tiles[y][x];

        const sprite = this.getTileSprite(x, y);

        tile.sheetColumn = sprite.column;
        tile.sheetRow = sprite.row;
      }
    }
  }

  // ==========================================================
  // GET SPRITE
  // ==========================================================
  //
  // Coordinate convention:
  //
  //     row,column
  //
  // So:
  //
  //   0,0 = row 0, column 0
  //   0,1 = row 0, column 1
  //   0,2 = row 0, column 2
  //
  // The renderer then converts that to:
  //
  //   sheetColumn
  //   sheetRow
  //
  // ==========================================================

  private getTileSprite(
    x: number,
    y: number
  ): {
    column: number;
    row: number;
  } {

    const terrain = this.tiles[y][x].terrain;

    const opposite: TerrainType =
      terrain === 'grass'
        ? 'dirt'
        : 'grass';

    // ========================================================
    // CHECK FOUR NEIGHBORS
    // ========================================================

    const up =
      this.getTerrainAt(x, y - 1) === opposite;

    const down =
      this.getTerrainAt(x, y + 1) === opposite;

    const left =
      this.getTerrainAt(x - 1, y) === opposite;

    const right =
      this.getTerrainAt(x + 1, y) === opposite;

    // ========================================================
    // NO OPPOSITE NEIGHBORS
    //
    // Completely solid tile.
    //
    // row 1, column 1
    // ========================================================

    if (!up && !down && !left && !right) {

      return {
        row: 1,
        column: 1,
      };
    }

    // ========================================================
    // ONE-SIDE TRANSITIONS
    // ========================================================

    // Opposite terrain ABOVE
    //
    // row 0, column 1
    if (
      up &&
      !down &&
      !left &&
      !right
    ) {

      return {
        row: 0,
        column: 1,
      };
    }

    // Opposite terrain BELOW
    //
    // row 2, column 1
    if (
      down &&
      !up &&
      !left &&
      !right
    ) {

      return {
        row: 2,
        column: 1,
      };
    }

    // Opposite terrain LEFT
    //
    // row 1, column 0
    if (
      left &&
      !up &&
      !down &&
      !right
    ) {

      return {
        row: 1,
        column: 0,
      };
    }

    // Opposite terrain RIGHT
    //
    // row 1, column 2
    if (
      right &&
      !up &&
      !down &&
      !left
    ) {

      return {
        row: 1,
        column: 2,
      };
    }

    // ========================================================
    // TWO-SIDE CORNERS
    // ========================================================

    // ABOVE + LEFT
    //
    // row 0, column 0
    if (
      up &&
      left &&
      !right &&
      !down
    ) {

      return {
        row: 0,
        column: 0,
      };
    }

    // ABOVE + RIGHT
    //
    // row 0, column 2
    if (
      up &&
      right &&
      !left &&
      !down
    ) {

      return {
        row: 0,
        column: 2,
      };
    }

    // BELOW + LEFT
    //
    // row 2, column 0
    if (
      down &&
      left &&
      !right &&
      !up
    ) {

      return {
        row: 2,
        column: 0,
      };
    }

    // BELOW + RIGHT
    //
    // row 2, column 2
    if (
      down &&
      right &&
      !left &&
      !up
    ) {

      return {
        row: 2,
        column: 2,
      };
    }

    // ========================================================
    // THREE OR FOUR SIDES
    //
    // Your current 3x3 sheet doesn't have dedicated sprites
    // for these configurations.
    //
    // Use the solid tile for now.
    //
    // This is intentional: we are testing the normal path
    // boundaries first.
    // ========================================================

    return {
      row: 1,
      column: 1,
    };
  }


  // ==========================================================
  // SPRITESHEET PATH
  // ==========================================================

  getSheetPath(
    tile: Tile
  ): string {

    return `/gassets/floors/${tile.terrain}.png`;
  }


  // ==========================================================
  // SPRITESHEET POSITION
  // ==========================================================

  getBackgroundPosition(
    tile: Tile
  ): string {

    return `-${tile.sheetColumn * this.tileSize}px -${tile.sheetRow * this.tileSize}px`;
  }


  // ==========================================================
  // DEBUG
  // ==========================================================

  getNeighborDebug(
    tile: Tile
  ): string {

    const x = tile.x;
    const y = tile.y;


    return [

      this.tiles[y - 1]?.[x]
        ? '↑'
        : '·',

      this.tiles[y + 1]?.[x]
        ? '↓'
        : '·',

      this.tiles[y]?.[x - 1]
        ? '←'
        : '·',

      this.tiles[y]?.[x + 1]
        ? '→'
        : '·',

    ].join('');
  }
}