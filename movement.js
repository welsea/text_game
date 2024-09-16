// Select the character element
const character = document.getElementById('character');
let posX = 50;
let posY = 50;
const stepSize = 10;

// Move the character based on arrow keys
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      posY -= stepSize;
      break;
    case 'ArrowDown':
      posY += stepSize;
      break;
    case 'ArrowLeft':
      posX -= stepSize;
      break;
    case 'ArrowRight':
      posX += stepSize;
      break;
  }

  // Move the character by updating its CSS position
  character.style.left = `${posX}px`;
  character.style.top = `${posY}px`;
});

// Simple collision detection between character and platforms
const platforms = document.querySelectorAll('.platform');

function checkCollisions() {
  platforms.forEach(platform => {
    const platformRect = platform.getBoundingClientRect();
    const charRect = character.getBoundingClientRect();

    if (
      charRect.right > platformRect.left &&
      charRect.left < platformRect.right &&
      charRect.bottom > platformRect.top &&
      charRect.top < platformRect.bottom
    ) {
      // Example effect: Jump
      posY -= 50;
      character.style.top = `${posY}px`;
    }
  });
}

// Use requestAnimationFrame to continuously check for collisions
function gameLoop() {
  checkCollisions();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
