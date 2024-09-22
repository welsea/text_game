// const { Engine, Render, Runner, Bodies, World, Body, Events } = Matter;

const startBtn = document.getElementById('start')
startBtn.addEventListener('click', () => generate())

function generate() {
    // Create engine
    // const engine = Engine.create();
    // const world = engine.world;

    // world.gravity.y = 1; // Earth-like gravity
    // const game = document.getElementById('game')
    // // Create renderer
    // const render = Render.create({
    //     element: game,
    //     engine: engine,
    //     options: {
    //         width: 1200,
    //         height: 800,
    //         wireframes: false // Set to false for better looking objects
    //     }
    // });
    const jumps=document.querySelectorAll('div.jump')
    const eles=document.querySelectorAll('div.ele')
    const dangers=document.querySelectorAll('div.danger')
    const normal=document.querySelectorAll('div.walk')
    

}


function getPlatforms(t){
    const boxes=document.querySelectorAll(`div.${t}`)
    const platforms=boxes.map((item)=>{
        
    })
}