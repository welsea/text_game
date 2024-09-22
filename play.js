// Matter.js module aliases


// Create engine
const engine = Engine.create();
const world = engine.world;

// Set gravity
world.gravity.y = 1; // Earth-like gravity
const game = document.getElementById('game')
// Create renderer
const render = Render.create({
    element: game,
    engine: engine,
    options: {
        width: 1000,
        height: 500,
        wireframes: false // Set to false for better looking objects
    }
});

// Create boundaries (walls and ground)
const ground = Bodies.rectangle(500, 500, 1000, 20, { isStatic: true });
const leftWall = Bodies.rectangle(0, 300, 20, 600, { isStatic: true });
const rightWall = Bodies.rectangle(1000, 300, 20, 600, { isStatic: true });
// Create a static floating platform (like ground)
const floatingPlatform = Bodies.rectangle(200, 400, 300, 20, { isStatic: true });
// const superJumpPlatform = Bodies.rectangle()

// Create a moving platform
let movingPlatform = Bodies.rectangle(600, 300, 200, 20, { isStatic: true });

// Add the ground, walls, floating, and moving platform to the world
World.add(world, [ground, leftWall, rightWall, floatingPlatform, movingPlatform]);

// Create a character (ball)
const character = Bodies.circle(400, 200, 20, { restitution: 0.5 });
World.add(world, character);

// Flag to track if the moving platform should move
let isPlatformMoving = false;
let moveDirection = 1; // 1 for left, -1 for right
let platformMoveDistance = 0;
const maxMoveDistance = 150; // How far the platform moves to the left
let movedDistance = 0; // Distance moved in the current direction
const moveSpeed = -2; // How fast the platform moves left
let isCharacterOnPlatform = false; // Track if character is on the moving platform

// Run the engine and renderer
Matter.Runner.run(engine);
Render.run(render);

// Handle keyboard inputs for moving the character
const characterMoveSpeed = 0.01; // Horizontal speed
const jumpSpeed = -10;           // Jumping velocity
const superJumpSpeed = -12
let canJump = false;
let canSuperJump = false

// Detect collision with the ground, floating platform, or moving platform to allow jumping
Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach(pair => {
        if ((pair.bodyA === ground && pair.bodyB === character) ||
            (pair.bodyA === character && pair.bodyB === ground)) {
            canJump = true;  // The character is on the ground or floating platform
        }

        // Check if character is on the moving platform
        if ((pair.bodyA === movingPlatform && pair.bodyB === character) ||
            (pair.bodyA === character && pair.bodyB === movingPlatform)) {
            canJump = true;  // The character is on the moving platform
            isCharacterOnPlatform = true; // Track that the character is on the moving platform
            if (!isPlatformMoving) {
                isPlatformMoving = true; // Start moving the platform
            }
        }

        // super jump
        if ((pair.bodyA === floatingPlatform && pair.bodyB === character) ||
            (pair.bodyA === character && pair.bodyB === floatingPlatform)) {
            canSuperJump = true
        }
    });
});

// Detect when character leaves the moving platform
Events.on(engine, 'collisionEnd', (event) => {
    event.pairs.forEach(pair => {
        if ((pair.bodyA === movingPlatform && pair.bodyB === character) ||
            (pair.bodyA === character && pair.bodyB === movingPlatform)) {
            isCharacterOnPlatform = false; // Character left the moving platform
        }
    });
});

// Listen for keydown events
document.addEventListener('keydown', (event) => {
    const { key } = event;

    if (key === 'ArrowLeft') {
        Body.applyForce(character, character.position, { x: -characterMoveSpeed, y: 0 });
    }

    if (key === 'ArrowRight') {
        Body.applyForce(character, character.position, { x: characterMoveSpeed, y: 0 });
    }

    if (key === 'ArrowUp' && canJump) {
        Body.setVelocity(character, { x: character.velocity.x, y: jumpSpeed });
        canJump = false; // Prevent multiple jumps
    }

    if (key === 'ArrowUp' && canSuperJump) {
        Body.setVelocity(character, { x: character.velocity.x, y: superJumpSpeed });
        canJump = false; // Prevent multiple jumps
        canSuperJump = false
    }
});

// Update the moving platform each frame
Events.on(engine, 'beforeUpdate', () => {
    // Move the platform
    Body.translate(movingPlatform, { x: moveDirection * moveSpeed, y: 0 });
    movedDistance += Math.abs(moveDirection * moveSpeed);
    // Check if the platform should change direction
    if (movedDistance >= maxMoveDistance) {
        moveDirection *= -1; // Reverse the direction
        movedDistance = 0; // Reset the moved distance
    }
    if (isCharacterOnPlatform) {
        // Move the character along with the platform
        Body.translate(character, { x: moveDirection * moveSpeed, y: 0 });
    }
});

// Automatically run the physics simulation
const runner = Runner.create();
Runner.run(runner, engine);