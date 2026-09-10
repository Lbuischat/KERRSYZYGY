// ============================================================
// TERRAIN RULES
// ============================================================
//
// THIS FILE IS THE SOURCE OF TRUTH FOR TERRAIN TILES.
//
// If you want to add another tile later, you add it here.
// You do NOT need to rewrite the terrain generation logic.
//
// Coordinate format:
//   row,column
//
// Example:
//   dirt 1,1 = /gassets/floors/dirt.png
//              using the tile at row 1, column 1.
//
// Directions describe what may be NEXT TO this tile.
//
//   top    = tile immediately above
//   bottom = tile immediately below
//   left   = tile immediately to the left
//   right  = tile immediately to the right
//
// ============================================================


export type TerrainType = 'grass' | 'dirt';


// ============================================================
// TILE ID
// ============================================================
//
// This uniquely identifies one actual sprite.
//
// Example:
//   "dirt:1,1"
//   "grass:2,0"
// ============================================================

export type TileId = `${TerrainType}:${number},${number}`;


// ============================================================
// TILE RULE
// ============================================================

export interface TerrainTileRule {

    id: TileId;

    terrain: TerrainType;

    row: number;

    column: number;

    top: TileId[];

    bottom: TileId[];

    left: TileId[];

    right: TileId[];
}


// ============================================================
// HELPER
// ============================================================
//
// Makes writing rules MUCH easier.
//
// Instead of:
//
//   'dirt:2,2'
//
// we can write:
//
//   D(2, 2)
//
// And instead of:
//
//   'grass:1,1'
//
// we can write:
//
//   G(1, 1)
// ============================================================

const D = (row: number, column: number): TileId =>
    `dirt:${row},${column}`;

const G = (row: number, column: number): TileId =>
    `grass:${row},${column}`;


// ============================================================
// GRASS TILE RULES
// ============================================================

export const GRASS_RULES: TerrainTileRule[] = [

    // ==========================================================
    // GRASS 0,0
    // ==========================================================

    {
        id: G(0, 0),
        terrain: 'grass',
        row: 0,
        column: 0,
        top: [
            D(1, 1),
            D(1, 0),
            G(0, 2)
        ],
        bottom: [],
        left: [],
        right: [],
    },

    // ==========================================================
    // GRASS 0,1
    // ==========================================================

    {
        id: G(1, 0),
        terrain: 'grass',
        row: 1,
        column: 0,
        top: [],
        bottom: [],
        left: [],
        right: [],
    },

    // ==========================================================
    // GRASS 0,2
    // ==========================================================

    {
        id: G(2, 0),
        terrain: 'grass',
        row: 2,
        column: 0,
        top: [],
        bottom: [],
        left: [],
        right: [],
    },

    // ==========================================================
    // GRASS 1,0
    // ==========================================================

    {
        id: G(0, 1),
        terrain: 'grass',
        row: 0,
        column: 1,
        top: [],
        bottom: [],
        left: [],
        right: [],
    },

    // ==========================================================
    // GRASS 1,1
    // ==========================================================

    {
        id: G(1, 1),
        terrain: 'grass',
        row: 1,
        column: 1,
        top: [],
        bottom: [],
        left: [],
        right: [],
    },

    // ==========================================================
    // GRASS 1,2
    // ==========================================================

    {
        id: G(2, 1),
        terrain: 'grass',
        row: 2,
        column: 1,
        top: [],
        bottom: [],
        left: [],
        right: [],
    },

    // ==========================================================
    // GRASS 2,0
    // ==========================================================

    {
        id: G(0, 2),
        terrain: 'grass',
        row: 0,
        column: 2,
        top: [],
        bottom: [],
        left: [],
        right: [],
    },

    // ==========================================================
    // GRASS 2,1
    // ==========================================================

    {
        id: G(1, 2),
        terrain: 'grass',
        row: 1,
        column: 2,
        top: [],
        bottom: [],
        left: [
            G(1, 1),
        ],
        right: [
            D(1, 1)
        ],
    },

    // ==========================================================
    // GRASS 2,2
    // ==========================================================

    {
        id: G(2, 2),
        terrain: 'grass',
        row: 2,
        column: 2,
        top: [],
        bottom: [],
        left: [],
        right: [],
    },
];


// ============================================================
// DIRT TILE RULES
// ============================================================
//
// These are the rules.
//
// IMPORTANT:
// These arrays are ALLOWED NEIGHBORS.
//
// If a tile is NOT in the array, it is NOT allowed there.
// ============================================================


export const DIRT_RULES: TerrainTileRule[] = [


    // ==========================================================
    // DIRT 0,0
    // ==========================================================

    {
        id: D(0, 0),
        terrain: 'dirt',
        row: 0,
        column: 0,

        top: [
            D(2, 2),
            D(1, 2),
            D(0, 2),
            G(1, 0),
            G(1, 1),
        ],

        bottom: [
            D(0, 1),
            D(0, 2),
            G(2, 2),
        ],

        left: [
            D(2, 0),
            D(2, 1),
            D(2, 2),
            G(1, 1),
        ],

        right: [
            D(1, 0),
            D(2, 0),
            G(1, 2),
            G(2, 2),
        ],
    },


    // ==========================================================
    // DIRT 0,1
    // ==========================================================

    {
        id: D(1, 0),
        terrain: 'dirt',
        row: 1,
        column: 0,

        top: [
            D(0, 2),
            D(1, 2),
            D(2, 2),
            G(1, 1),
            G(1, 0),
        ],

        bottom: [
            D(1, 1),
            D(1, 2),
            G(0, 0),
            G(1, 0),
            G(2, 0),
        ],

        left: [
            D(1, 0),
            D(0, 0),
            G(2, 1),
            G(0, 2),
        ],

        right: [
            D(1, 0),
            D(2, 0),
            G(1, 2),
            G(2, 2),
        ],
    },


    // ==========================================================
    // DIRT 0,2
    // ==========================================================

    {
        id: D(2, 0),
        terrain: 'dirt',
        row: 2,
        column: 0,

        top: [
            D(0, 2),
            D(1, 2),
            D(2, 2),
            G(1, 0),
            G(1, 1),
        ],

        bottom: [
            D(2, 1),
            D(2, 2),
            G(0, 1),
            G(0, 2),
        ],

        left: [
            D(1, 0),
            D(0, 0),
            G(1, 2),
            G(0, 2),
        ],

        right: [
            D(0, 0),
            D(0, 1),
            D(0, 2),
            G(2, 1),
            G(1, 1),
        ],
    },


    // ==========================================================
    // DIRT 1,0
    // ==========================================================

    {
        id: D(0, 1),
        terrain: 'dirt',
        row: 0,
        column: 1,

        top: [
            D(0, 0),
            D(1, 0),
            G(2, 0),
            G(2, 1),
        ],

        bottom: [
            D(0, 2),
            D(0, 1),
            G(2, 1),
            G(2, 2),
        ],

        left: [
            D(2, 0),
            D(2, 1),
            D(2, 2),
            G(0, 1),
            G(1, 1),
        ],

        right: [
            D(2, 1),
            G(0, 0),
            G(0, 1),
            G(0, 2),
        ],
    },


    // ==========================================================
    // DIRT 1,1
    // ==========================================================

    {
        id: D(1, 1),
        terrain: 'dirt',
        row: 1,
        column: 1,

        top: [
            D(1, 0),
            D(1, 1),
            G(1, 2),
            G(2, 2),
            G(0, 2),
        ],

        bottom: [
            D(1, 2),
            D(1, 1),
            G(1, 0),
            G(0, 0),
            G(2, 0),
        ],

        left: [
            D(0, 1),
            G(2, 0),
            G(2, 1),
            G(2, 2),
        ],

        right: [
            D(2, 1),
            G(0, 0),
            G(0, 1),
            G(0, 2),
        ],
    },


    // ==========================================================
    // DIRT 1,2
    // ==========================================================

    {
        id: D(2, 1),
        terrain: 'dirt',
        row: 2,
        column: 1,

        top: [
            D(2, 0),
            D(2, 1),
            G(0, 0),
            G(0, 1),
        ],

        bottom: [
            D(2, 2),
            D(2, 1),
            G(0, 1),
            G(0, 2),
        ],

        left: [
            D(1, 1),
            D(0, 1),
            G(2, 0),
            G(2, 1),
            G(2, 2),
        ],

        right: [
            D(0, 0),
            D(0, 1),
            D(0, 2),
            G(1, 1),
            G(2, 1),
        ],
    },


    // ==========================================================
    // DIRT 2,0
    // ==========================================================

    {
        id: D(0, 2),
        terrain: 'dirt',
        row: 0,
        column: 2,

        top: [
            D(0, 1),
            D(0, 0),
            G(2, 0),
            G(2, 1),
        ],

        bottom: [
            D(0, 0),
            D(1, 0),
            D(2, 0),
            G(1, 1),
            G(1, 2),
        ],

        left: [
            D(2, 0),
            D(2, 1),
            D(2, 2),
            G(1, 1),
            G(0, 1),
        ],

        right: [
            D(1, 2),
            D(2, 2),
            G(1, 0),
            G(2, 0),
        ],
    },


    // ==========================================================
    // DIRT 2,1
    // ==========================================================

    {
        id: D(1, 2),
        terrain: 'dirt',
        row: 1,
        column: 2,

        top: [
            D(1, 1),
            D(1, 0),
            G(0, 2),
            G(1, 2),
            G(2, 2),
        ],

        bottom: [
            D(0, 0),
            D(1, 0),
            D(2, 0),
            G(1, 1),
            G(1, 2),
        ],

        left: [
            D(0, 2),
            D(1, 2),
            G(0, 0),
            G(1, 0),
        ],

        right: [
            D(2, 2),
            D(1, 2),
            G(1, 0),
            G(2, 0),
        ],
    },


    // ==========================================================
    // DIRT 2,2
    // ==========================================================

    {
        id: D(2, 2),
        terrain: 'dirt',
        row: 2,
        column: 2,

        top: [
            D(2, 0),
            D(2, 1),
            G(0, 0),
            G(0, 1),
        ],

        bottom: [
            D(0, 0),
            D(1, 0),
            D(2, 0),
            G(1, 1),
            G(1, 2),
        ],

        left: [
            D(0, 2),
            D(1, 2),
            G(0, 0),
            G(1, 0),
        ],

        right: [
            D(0, 0),
            D(1, 1),
            G(0, 2),
            G(1, 1),
            G(2, 1),
        ],
    },
];

// ============================================================
// ALL TERRAIN RULES
// ============================================================
//
// GRASS AND DIRT ARE EQUAL.
//
// Each tile has its own rules.
// Grass does NOT inherit from dirt.
// Dirt does NOT inherit from grass.
//
// The generator simply sees one pool:
//
//     grass:0,0
//     grass:0,1
//     ...
//     dirt:0,0
//     dirt:0,1
//     ...
//
// And checks the adjacency rules of those individual tiles.
// ============================================================

export const ALL_TERRAIN_RULES: TerrainTileRule[] = [
    ...GRASS_RULES,
    ...DIRT_RULES,
];

// ============================================================
// LOOKUP
// ============================================================

export const TERRAIN_RULE_LOOKUP =
    new Map<TileId, TerrainTileRule>(
        ALL_TERRAIN_RULES.map(rule => [
            rule.id,
            rule,
        ])
    );

// ============================================================
// BIDIRECTIONAL RULE HELPER
// ============================================================

function addNeighbor(
    rule: TerrainTileRule,
    direction: 'top' | 'bottom' | 'left' | 'right',
    neighbor: TileId,
): void {

    const list = rule[direction];

    if (!list.includes(neighbor)) {
        list.push(neighbor);
    }
}

function addBidirectionalRule(
    a: TileId,
    direction: 'top' | 'bottom' | 'left' | 'right',
    b: TileId,
): void {

    const ruleA =
        TERRAIN_RULE_LOOKUP.get(a);

    const ruleB =
        TERRAIN_RULE_LOOKUP.get(b);

    if (!ruleA || !ruleB) {
        return;
    }

    switch (direction) {

        case 'top':

            addNeighbor(
                ruleA,
                'top',
                b
            );

            addNeighbor(
                ruleB,
                'bottom',
                a
            );

            break;

        case 'bottom':

            addNeighbor(
                ruleA,
                'bottom',
                b
            );

            addNeighbor(
                ruleB,
                'top',
                a
            );

            break;

        case 'left':

            addNeighbor(
                ruleA,
                'left',
                b
            );

            addNeighbor(
                ruleB,
                'right',
                a
            );

            break;

        case 'right':

            addNeighbor(
                ruleA,
                'right',
                b
            );

            addNeighbor(
                ruleB,
                'left',
                a
            );

            break;
    }
}

// ============================================================
// NORMALIZE ALL RULES
// ============================================================
//
// IMPORTANT:
//
// This now processes BOTH Grass AND Dirt.
//
// If:
//
//     Grass A -> Dirt B
//
// then:
//
//     Dirt B -> Grass A
//
// automatically.
//
// Same thing for Grass -> Grass
// and Dirt -> Dirt.
//
// ============================================================

for (const rule of ALL_TERRAIN_RULES) {

    for (const neighbor of rule.top) {

        addBidirectionalRule(
            rule.id,
            'top',
            neighbor
        );
    }

    for (const neighbor of rule.bottom) {

        addBidirectionalRule(
            rule.id,
            'bottom',
            neighbor
        );
    }

    for (const neighbor of rule.left) {

        addBidirectionalRule(
            rule.id,
            'left',
            neighbor
        );
    }

    for (const neighbor of rule.right) {

        addBidirectionalRule(
            rule.id,
            'right',
            neighbor
        );
    }
}

// ============================================================
// FINAL VALIDATION
// ============================================================

function validateRules(): void {

    for (const rule of ALL_TERRAIN_RULES) {

        const directions: Array<
            [
                'top' | 'bottom' | 'left' | 'right',
                'bottom' | 'top' | 'right' | 'left'
            ]
        > = [

            ['top', 'bottom'],
            ['bottom', 'top'],
            ['left', 'right'],
            ['right', 'left'],

        ];

        for (
            const [direction, opposite]
            of directions
        ) {

            for (
                const neighborId
                of rule[direction]
            ) {

                const neighborRule =
                    TERRAIN_RULE_LOOKUP.get(
                        neighborId
                    );

                if (!neighborRule) {

                    throw new Error(
                        `Terrain rule references missing tile: ${neighborId}`
                    );
                }

                if (
                    !neighborRule[opposite]
                        .includes(rule.id)
                ) {

                    throw new Error(
                        `Terrain rule contradiction: ` +
                        `${rule.id} allows ${neighborId} ` +
                        `to its ${direction}, ` +
                        `but ${neighborId} does not allow ` +
                        `${rule.id} to its ${opposite}.`
                    );
                }
            }
        }
    }
}

validateRules();
