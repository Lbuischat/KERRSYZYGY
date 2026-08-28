import { Component } from '@angular/core';

type TerrainType = 'grass' | 'dirt';

interface Tile {
  x: number;
  y: number;
  terrain: TerrainType;

  sheetColumn: number;
  sheetRow: number;
}

type CornerPattern = {
  TL: TerrainType;
  TR: TerrainType;
  BL: TerrainType;
  BR: TerrainType;
};

@Component({
  selector: 'app-terrain',
  standalone: true,
  templateUrl: './terrain.html',
  styleUrl: './terrain.css',
})
export class Terrain {

  readonly tileSize = 128;
  readonly debug = true;

  readonly mapWidth = 20;
  readonly mapHeight = 20;

  tiles: Tile[][] = [];


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor() {
    this.generateTestFloor();
  }


  // =========================================================
  // GENERATE TEST FLOOR
  // =========================================================

  private generateTestFloor(): void {

    // -------------------------------------------------------
    // CREATE GRASS WORLD
    // -------------------------------------------------------

    for (let y = 0; y < this.mapHeight; y++) {

      const row: Tile[] = [];

      for (let x = 0; x < this.mapWidth; x++) {

        row.push({
          x,
          y,
          terrain: 'grass',

          sheetColumn: 1,
          sheetRow: 1,
        });

      }

      this.tiles.push(row);
    }


    // -------------------------------------------------------
    // MAIN DIRT PATH
    // -------------------------------------------------------

    let pathX = Math.floor(this.mapWidth / 2);
    let pathY = 0;

    const pathLength = this.mapHeight + 8;

    for (let i = 0; i < pathLength; i++) {

      this.paintDirt(pathX, pathY);
      this.paintDirt(pathX - 1, pathY);
      this.paintDirt(pathX + 1, pathY);

      const random = Math.random();

      if (random < 0.65) {

        pathY++;

      } else if (random < 0.825) {

        pathX--;

      } else {

        pathX++;
      }

      pathX = Math.max(
        2,
        Math.min(this.mapWidth - 3, pathX)
      );

      pathY = Math.min(
        this.mapHeight - 1,
        pathY
      );
    }


    // -------------------------------------------------------
    // SECOND BRANCH
    // -------------------------------------------------------

    let branchX = Math.floor(this.mapWidth / 2);
    let branchY = Math.floor(this.mapHeight * 0.45);

    for (let i = 0; i < 8; i++) {

      this.paintDirt(branchX, branchY);
      this.paintDirt(branchX + 1, branchY);
      this.paintDirt(branchX, branchY + 1);

      if (Math.random() < 0.5) {

        branchX++;

      } else {

        branchX--;
      }

      branchX = Math.max(
        2,
        Math.min(this.mapWidth - 3, branchX)
      );

      branchY++;

      if (branchY >= this.mapHeight) {
        break;
      }
    }


    // -------------------------------------------------------
    // CALCULATE SPRITES
    // -------------------------------------------------------

    this.updateTileSprites();
  }


  // =========================================================
  // PAINT DIRT
  // =========================================================

  private paintDirt(
    x: number,
    y: number
  ): void {

    if (
      x < 0 ||
      x >= this.mapWidth ||
      y < 0 ||
      y >= this.mapHeight
    ) {
      return;
    }

    this.tiles[y][x].terrain = 'dirt';
  }


  // =========================================================
  // UPDATE ALL TILE SPRITES
  // =========================================================

  private updateTileSprites(): void {

    for (let y = 0; y < this.mapHeight; y++) {

      for (let x = 0; x < this.mapWidth; x++) {

        const tile = this.tiles[y][x];

        const sprite =
          this.getTileSprite(x, y);

        tile.sheetColumn = sprite.column;
        tile.sheetRow = sprite.row;
      }
    }
  }


  // =========================================================
  // GET TERRAIN
  // =========================================================

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


  // =========================================================
  // GET TILE SPRITE
  // =========================================================
  //
  // IMPORTANT:
  //
  // We are NOT trying to guess the sprite from
  // "up/down/left/right".
  //
  // Instead, each tile looks at the four 2x2 regions
  // surrounding its four corners.
  //
  // This lets the actual terrain arrangement determine
  // which sprite is appropriate.
  //
  // =========================================================

  private getTileSprite(
    x: number,
    y: number
  ): {
    column: number;
    row: number;
  } {

    const terrain =
      this.tiles[y][x].terrain;


    // -------------------------------------------------------
    // Read the four corner patterns.
    // -------------------------------------------------------

    const topLeft =
      this.getCornerPattern(
        x,
        y,
        'TL'
      );

    const topRight =
      this.getCornerPattern(
        x,
        y,
        'TR'
      );

    const bottomLeft =
      this.getCornerPattern(
        x,
        y,
        'BL'
      );

    const bottomRight =
      this.getCornerPattern(
        x,
        y,
        'BR'
      );


    // -------------------------------------------------------
    // Determine whether each quarter belongs to this tile.
    //
    // A quarter belongs to this terrain when the majority
    // of the 2x2 cells around that corner are this terrain.
    //
    // TIES ARE RESOLVED IN FAVOR OF THE ACTUAL TILE.
    //
    // This prevents isolated weird pixels from changing the
    // entire transition.
    // -------------------------------------------------------

    const TL =
      this.cornerBelongsToTerrain(
        topLeft,
        terrain
      );

    const TR =
      this.cornerBelongsToTerrain(
        topRight,
        terrain
      );

    const BL =
      this.cornerBelongsToTerrain(
        bottomLeft,
        terrain
      );

    const BR =
      this.cornerBelongsToTerrain(
        bottomRight,
        terrain
      );


    const key =
      `${TL ? 1 : 0}` +
      `${TR ? 1 : 0}` +
      `${BL ? 1 : 0}` +
      `${BR ? 1 : 0}`;


    // -------------------------------------------------------
    // EXACT SPRITESHEET RULES
    //
    // These are based directly on the sheet information
    // you gave me.
    //
    // The key describes WHICH QUARTERS contain THIS TILE'S
    // terrain.
    //
    // -------------------------------------------------------

    const spriteMap: Record<
      string,
      {
        column: number;
        row: number;
      }
    > = {

      // -----------------------------------------------------
      // ALL FOUR QUARTERS
      // -----------------------------------------------------

      '1111': {
        column: 1,
        row: 1,
      },


      // -----------------------------------------------------
      // TOP EDGE
      // -----------------------------------------------------

      '1100': {
        column: 1,
        row: 0,
      },


      // -----------------------------------------------------
      // BOTTOM EDGE
      // -----------------------------------------------------

      '0011': {
        column: 1,
        row: 2,
      },


      // -----------------------------------------------------
      // LEFT EDGE
      // -----------------------------------------------------

      '1010': {
        column: 0,
        row: 1,
      },


      // -----------------------------------------------------
      // RIGHT EDGE
      // -----------------------------------------------------

      '0101': {
        column: 2,
        row: 1,
      },


      // -----------------------------------------------------
      // TOP-LEFT CORNER
      // -----------------------------------------------------

      '1000': {
        column: 0,
        row: 0,
      },


      // -----------------------------------------------------
      // TOP-RIGHT CORNER
      // -----------------------------------------------------

      '0100': {
        column: 2,
        row: 0,
      },


      // -----------------------------------------------------
      // BOTTOM-LEFT CORNER
      // -----------------------------------------------------

      '0010': {
        column: 0,
        row: 2,
      },


      // -----------------------------------------------------
      // BOTTOM-RIGHT CORNER
      // -----------------------------------------------------

      '0001': {
        column: 2,
        row: 2,
      },
    };


    // -------------------------------------------------------
    // EXACT MATCH
    // -------------------------------------------------------

    const exactSprite =
      spriteMap[key];

    if (exactSprite) {
      return exactSprite;
    }


    // -------------------------------------------------------
    // IMPOSSIBLE / DIAGONAL PATTERNS
    //
    // The spritesheet does not contain every possible
    // combination of four quarters.
    //
    // The missing patterns are:
    //
    // 1011
    // 1101
    // 0111
    // 1110
    // 1001
    // 0110
    //
    // These occur at complicated corners / tiny diagonal
    // transitions.
    //
    // We choose the closest valid sprite instead of
    // returning the center blindly.
    // -------------------------------------------------------

    return this.getClosestSprite(key, spriteMap);
  }


  // =========================================================
  // GET 2x2 CORNER PATTERN
  // =========================================================

  private getCornerPattern(
    x: number,
    y: number,
    corner:
      | 'TL'
      | 'TR'
      | 'BL'
      | 'BR'
  ): CornerPattern {

    let cells: [
      [number, number],
      [number, number],
      [number, number],
      [number, number]
    ];


    switch (corner) {

      case 'TL':

        cells = [
          [x - 1, y - 1],
          [x,     y - 1],
          [x - 1, y],
          [x,     y],
        ];

        break;


      case 'TR':

        cells = [
          [x,     y - 1],
          [x + 1, y - 1],
          [x,     y],
          [x + 1, y],
        ];

        break;


      case 'BL':

        cells = [
          [x - 1, y],
          [x,     y],
          [x - 1, y + 1],
          [x,     y + 1],
        ];

        break;


      case 'BR':

        cells = [
          [x,     y],
          [x + 1, y],
          [x,     y + 1],
          [x + 1, y + 1],
        ];

        break;
    }


    return {
      TL: this.getTerrainAt(
        cells[0][0],
        cells[0][1]
      ) ?? 'grass',

      TR: this.getTerrainAt(
        cells[1][0],
        cells[1][1]
      ) ?? 'grass',

      BL: this.getTerrainAt(
        cells[2][0],
        cells[2][1]
      ) ?? 'grass',

      BR: this.getTerrainAt(
        cells[3][0],
        cells[3][1]
      ) ?? 'grass',
    };
  }


  // =========================================================
  // CORNER TERRAIN DECISION
  // =========================================================

  private cornerBelongsToTerrain(
    pattern: CornerPattern,
    terrain: TerrainType
  ): boolean {

    let count = 0;

    if (pattern.TL === terrain) {
      count++;
    }

    if (pattern.TR === terrain) {
      count++;
    }

    if (pattern.BL === terrain) {
      count++;
    }

    if (pattern.BR === terrain) {
      count++;
    }


    // -------------------------------------------------------
    // 3 or 4 = definitely ours.
    // -------------------------------------------------------

    if (count >= 3) {
      return true;
    }


    // -------------------------------------------------------
    // 0 or 1 = definitely opposite.
    // -------------------------------------------------------

    if (count <= 1) {
      return false;
    }


    // -------------------------------------------------------
    // Exactly 2 = tie.
    //
    // The center tile itself determines the tie.
    // -------------------------------------------------------

    return true;
  }


  // =========================================================
  // FIND CLOSEST VALID SPRITE
  // =========================================================

  private getClosestSprite(
    key: string,
    spriteMap: Record<
      string,
      {
        column: number;
        row: number;
      }
    >
  ): {
    column: number;
    row: number;
  } {

    let bestKey = '1111';
    let bestDifference = Infinity;


    for (const candidateKey of Object.keys(spriteMap)) {

      let difference = 0;

      for (let i = 0; i < 4; i++) {

        if (
          key[i] !== candidateKey[i]
        ) {
          difference++;
        }
      }


      if (
        difference <
        bestDifference
      ) {

        bestDifference = difference;
        bestKey = candidateKey;
      }
    }


    return spriteMap[bestKey];
  }


  // =========================================================
  // SPRITESHEET PATH
  // =========================================================

  getSheetPath(
    tile: Tile
  ): string {

    return `/gassets/floors/${tile.terrain}.png`;
  }


  // =========================================================
  // SPRITESHEET POSITION
  // =========================================================

  getBackgroundPosition(
    tile: Tile
  ): string {

    return `
      -${tile.sheetColumn * this.tileSize}px
      -${tile.sheetRow * this.tileSize}px
    `;
  }


  // =========================================================
  // DEBUG
  // =========================================================

  getNeighborDebug(
    tile: Tile
  ): string {

    const x = tile.x;
    const y = tile.y;

    const opposite =
      tile.terrain === 'grass'
        ? 'dirt'
        : 'grass';


    const isOpposite = (
      checkX: number,
      checkY: number
    ): boolean => {

      return this.getTerrainAt(
        checkX,
        checkY
      ) === opposite;
    };


    const up =
      isOpposite(x, y - 1);

    const down =
      isOpposite(x, y + 1);

    const left =
      isOpposite(x - 1, y);

    const right =
      isOpposite(x + 1, y);


    return [
      up ? '↑' : '·',
      down ? '↓' : '·',
      left ? '←' : '·',
      right ? '→' : '·',
    ].join('');
  }
}