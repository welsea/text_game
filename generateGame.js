const { Engine, Render, Runner, Bodies, World, Body, Events } = Matter;

const startBtn = document.getElementById('start')
startBtn.addEventListener('click', () => generate())

function generate() {
    // Create engine
    const engine = Engine.create();
    const world = engine.world;

    world.gravity.y = 1; // Earth-like gravity
    const game = document.getElementById('game')
    // Create renderer
    const render = Render.create({
        element: game,
        engine: engine,
        options: {
            width: 1200,
            height: 600,
            wireframes: false // Set to false for better looking objects
        }
    });

    const roof = Bodies.rectangle(600, 0, 1200, 10, { isStatic: true });
    const ground = Bodies.rectangle(600, 600, 1200, 10, { isStatic: true });
    const leftWall = Bodies.rectangle(0, 300, 10, 600, { isStatic: true });
    const rightWall = Bodies.rectangle(1200, 300, 10, 600, { isStatic: true });

    World.add(world,[ground,roof,leftWall,rightWall])
    const jumps = document.querySelectorAll('div.jump')
    const eles = document.querySelectorAll('div.ele')
    const dangers = document.querySelectorAll('div.danger')
    const normal = document.querySelectorAll('div.walk')
    
    
    Matter.Runner.run(engine);
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
}


function getPlatforms(t) {
    const boxes = document.querySelectorAll(`div.${t}`)
    const platforms = boxes.map((item) => {

    })
}