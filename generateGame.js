const { Engine, Render, Runner, Bodies, World, Body, Events } = Matter;

const testBtn = document.getElementById("test");
testBtn.addEventListener("click", () => generate());

function generate() {
    // Create engine
    const engine = Engine.create();
    const world = engine.world;

    world.gravity.y = 0.6; // Earth-like gravity
    const game = document.getElementById("game");
    game.innerHTML = "";
    // Create renderer
    const render = Render.create({
        element: game,
        engine: engine,
        options: {
            width: 1200,
            height: 360,
            wireframes: false,
            background: "white",
        },
    });

    const ground = Bodies.rectangle(600, 360, 1200, 3, {
        isStatic: true,
        render: {
            fillStyle: "black",
            strokeStyle: "black",
        },
    });
    const roof = Bodies.rectangle(600, 0, 1200, 3, {
        isStatic: true,
        render: {
            fillStyle: "black",
            strokeStyle: "black",
        },
    });
    const leftWall = Bodies.rectangle(0, 180, 3, 360, {
        isStatic: true,
        render: {
            fillStyle: "black",
            strokeStyle: "black",
        },
    });
    const rightWall = Bodies.rectangle(1200, 180, 3, 360, {
        isStatic: true,
        render: {
            fillStyle: "black",
            strokeStyle: "black",
        },
    });

    const finishPoint = Bodies.rectangle(1195, 20, 3, 30, {
        isStatic: true,
        render: {
            fillStyle: "green",
            strokeStyle: "green",
        },
    })

    World.add(world, [ground, roof, leftWall, rightWall, finishPoint]);

    const jumps = getPlatforms("jump", render);
    const eles = getPlatforms("ele", render);
    const dangers = getPlatforms("danger", render);
    const walks = getPlatforms("walk", render);

    const character = Bodies.circle(20, 330, 10, { restitution: 0.5 });
    World.add(world, character);
    World.add(world, jumps);
    World.add(world, eles);
    World.add(world, walks);
    World.add(world, dangers);

    Matter.Runner.run(engine);
    Render.run(render);

    const characterMoveSpeed = 0.005; // Horizontal speed
    const jumpSpeed = -5;           // Jumping velocity
    const superJumpSpeed = -10
    let canJump = false;
    let canSuperJump = false


    // for moving platform
    let isPlatformMoving = false;
    let moveDirection = 1; // 1 for left, -1 for right
    let platformMoveDistance = 0;
    const maxMoveDistance = 100; // How far the platform moves to the left
    let movedDistance = 0; // Distance moved in the current direction
    const moveSpeed = -1; // How fast the platform moves left
    let isCharacterOnPlatform = false; // Track if character is on the moving platform
    // functions
    // Detect collision with the ground, floating platform, or moving platform to allow jumping
    Events.on(engine, 'collisionStart', (event) => {
        event.pairs.forEach(pair => {
            if ((pair.bodyA === ground && pair.bodyB === character) ||
                (pair.bodyA === character && pair.bodyB === ground)) {
                canJump = true;  // The character is on the ground or floating platform
                canSuperJump = false
            }

            if ((walks.includes(pair.bodyA) && pair.bodyB === character) ||
                (pair.bodyA === character && walks.includes(pair.bodyB))) {
                canJump = true
                canSuperJump = false

            }

            if ((jumps.includes(pair.bodyA) && pair.bodyB === character) ||
                (pair.bodyA === character && jumps.includes(pair.bodyB))) {
                canSuperJump = true
            }

            if ((eles.includes(pair.bodyA) && pair.bodyB === character) ||
                (pair.bodyA === character && eles.includes(pair.bodyB))) {
                canJump = true;  // The character is on the moving platform
                canSuperJump = false
                isCharacterOnPlatform = true; // Track that the character is on the moving platform
                if (!isPlatformMoving) {
                    isPlatformMoving = true; // Start moving the platform
                }
            }


            if ((dangers.includes(pair.bodyA) && pair.bodyB === character) ||
                (pair.bodyA === character && dangers.includes(pair.bodyB))) {
                World.remove(world, character);
                game.innerHTML = `
                    <div class="game-over">GAME OVER!</div>
                `
            }

            if ((pair.bodyA===finishPoint && pair.bodyB === character) ||
                (pair.bodyA === character && pair.bodyB===finishPoint)) {
                World.remove(world, character);
                game.innerHTML = `
                    <div class="win">CONGRATULATIONS!</div>
                `
            }


        });
    });

    Events.on(engine, 'collisionEnd', (event) => {
        event.pairs.forEach(pair => {
            if ((eles.includes(pair.bodyA) && pair.bodyB === character) ||
                (pair.bodyA === character && eles.includes(pair.bodyB))) {
                isCharacterOnPlatform = false; // Character left the moving platform

            }

        });
    });

    Events.on(engine, 'beforeUpdate', () => {
        eles.map((item) => {
            // Move the platform
            Body.translate(item, { x: moveDirection * moveSpeed, y: 0 });
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
    })

    // keydown
    let keys = {
        a: false,
        d: false,
        w: false
    };

    document.addEventListener('keydown', (event) => {
        const { key } = event;

        if ((key === 'a' || key === 'A') && !keys.a) {
            keys.a = true;
            Body.applyForce(character, character.position, { x: -characterMoveSpeed, y: 0 });
        }

        if ((key === 'd' || key === 'D') && !keys.d) {
            keys.d = true;
            Body.applyForce(character, character.position, { x: characterMoveSpeed, y: 0 });
        }

        if ((key === 'w' || key === 'W') && canJump && !keys.w) {
            keys.w = true;
            Body.setVelocity(character, { x: character.velocity.x, y: jumpSpeed });
            canJump = false; // Prevent multiple jumps
        }

        if ((key === 'w' || key === 'W') && canSuperJump && !keys.w) {
            keys.w = true;
            Body.setVelocity(character, { x: character.velocity.x, y: superJumpSpeed });
            canJump = false; // Prevent multiple jumps
            canSuperJump = false;
        }
    });

    document.addEventListener('keyup', (event) => {
        const { key } = event;

        if (key === 'a' || key === 'A') {
            keys.a = false;
        }

        if (key === 'd' || key === 'D') {
            keys.d = false;
        }

        if (key === 'w' || key === 'W') {
            keys.w = false;
        }
    });


    const runner = Runner.create();
    Runner.run(runner, engine);
}

const colors = {
    jump: "darkmagenta",
    ele: "darkblue",
    danger: "darkred",
    walk: "black",
};

function getPlatforms(t, render) {
    const boxes = document.querySelectorAll(`div.${t}`);
    const platforms = [];

    boxes.forEach((item) => {
        const id = item.id - 1;
        const y = Math.floor(id / 12) + 0.5;
        const x = (id % 12) + 0.5;
        const text = item.innerText.trim(); // Get the text inside the div

        const platform = Bodies.rectangle(x * 100, y * 30, 100, 20, {
            isStatic: true,
            render: {
                fillStyle: colors[t],
            },
        });

        // Store the text in the platform's custom property
        platform.label = text;
        platforms.push(platform);
        console.log(`id:${id}, x: ${x * 100}, y: ${y * 20}`);
    });
    // Use Render.afterRender to draw the text on the bodies
    Events.on(render, "afterRender", function () {
        const context = render.context;

        platforms.forEach((platform) => {
            const pos = platform.position;
            const label = platform.label || ""; // Retrieve the stored label
            context.font = "12px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText(label, pos.x, pos.y + 5); // Render the text on the body
        });
    });

    return platforms;
}