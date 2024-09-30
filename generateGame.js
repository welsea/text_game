const { Engine, Render, Runner, Bodies, World, Body, Events } = Matter;

const startBtn = document.getElementById('start')
startBtn.addEventListener('click', () => generate())

function generate() {
    // Create engine
    const engine = Engine.create();
    const world = engine.world;

    world.gravity.y = 1; // Earth-like gravity
    const game = document.getElementById('game')
    game.innerHTML = ''
    // Create renderer
    const render = Render.create({
        element: game,
        engine: engine,
        options: {
            width: 1200,
            height: 400,
            wireframes: false,
            background: 'white'
        }
    });

    const ground = Bodies.rectangle(400, 0, 1200, 10, {
        isStatic: true, render: {
            fillStyle: 'white',
            strokeStyle: 'black',
        }
    });
    const roof = Bodies.rectangle(0, 400, 1200, 10, {
        isStatic: true, render: {
            fillStyle: 'white',
            strokeStyle: 'black',
        }
    });
    const leftWall = Bodies.rectangle(0, 200, 10, 400, {
        isStatic: true, render: {
            fillStyle: 'white',
            strokeStyle: 'black',
        }
    });
    const rightWall = Bodies.rectangle(1200, 200, 10, 400, {
        isStatic: true, render: {
            fillStyle: 'white',
            strokeStyle: 'black',
        }
    });

    World.add(world, [ground, roof, leftWall, rightWall])

    const jumps = getPlatforms('jump', render);
    const eles = getPlatforms('ele', render)
    const dangers = getPlatforms('danger', render)
    const walks = getPlatforms('walk', render)

    World.add(world, jumps)
    World.add(world, eles)
    World.add(world, walks)
    World.add(world, dangers)


    Matter.Runner.run(engine);
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
}

const colors = {
    jump: 'darkmagenta',
    ele: 'darkblue',
    danger: 'darkred',
    walk: 'black'
}

function getPlatforms(t, render) {
    const boxes = document.querySelectorAll(`div.${t}`)
    const platforms = []

    boxes.forEach((item) => {
        const id = item.id
        const y = Math.floor(id / 12) + 0.5
        const x = id % 12 + 0.5
        const text = item.innerText.trim(); // Get the text inside the div

        const platform = Bodies.rectangle(x * 100, y * 20, 100, 20, {
            isStatic: true, render: {
                fillStyle: colors[t]
            }
        });

        // Store the text in the platform's custom property
        platform.label = text;

        platforms.push(platform)
        console.log(`id:${id}, x: ${x * 100}, y: ${y * 20}`)
    })

    // Use Render.afterRender to draw the text on the bodies
    Events.on(render, 'afterRender', function () {
        const context = render.context;

        platforms.forEach((platform) => {
            const pos = platform.position;
            const label = platform.label || ''; // Retrieve the stored label
            context.font = '15px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText(label, pos.x, pos.y + 5); // Render the text on the body
        });
    });

    return platforms;
}
