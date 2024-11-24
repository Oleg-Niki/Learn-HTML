// Ensure the game window is hidden on page load
document.addEventListener('DOMContentLoaded', () => {
  const popupGames = document.getElementById('popup-games');
  popupGames.classList.add('hidden'); // Hide games window by default
});

// Global variable to track the highest z-index
let highestZIndex = 10; // Initial z-index for all windows

// Function to bring an element to the front
function bringToFront(element) {
  highestZIndex += 1; // Increment the z-index tracker
  element.style.zIndex = highestZIndex; // Assign the new highest z-index to the element
}

// Toggle Start Menu
function toggleStartMenu() {
  const startMenu = document.getElementById('start-menu');
  startMenu.classList.toggle('hidden');
}

// Navigate to Different Pages
function navigate(page) {
  const contentArea = document.getElementById('window-content'); // Target content area
  const mainContent = document.getElementById('main-content');
  const startMenu = document.getElementById('start-menu'); // Close Start Menu
  
  startMenu.classList.add('hidden'); // Ensure Start Menu closes
  mainContent.classList.remove('hidden'); // Show main content window
  bringToFront(mainContent); // Bring main content to the front
  
  // Center the window
  mainContent.style.top = '50%';
  mainContent.style.left = '50%';
  mainContent.style.transform = 'translate(-50%, -50%)';

  // Load content dynamically based on the selected page
  switch (page) {
    case 'about':
      contentArea.innerHTML = `
        <h1 style="margin-left: 10px;">About Me</h1>
        <p style="margin-left: 10px;">Hello! My name is Oleg Nikitashin. I’m an engineer with a bachelor’s and master’s degree in STEM, currently earning my third STEM degree while specializing in blending mechanical engineering, robotics, and software development. From co-founding an auto parts business to managing construction projects and winning national championships as a race car designer and engineer, I thrive on solving complex challenges with precision and creativity.

Currently, I’m leading AI-driven robotics projects for sustainability and designing interactive exhibits to promote clean energy. Whether on the racetrack, in the lab, or tackling real-world problems, I’m passionate about pushing the boundaries of innovation and engineering.</p>
      `;
      break;

    case 'gallery':
      contentArea.innerHTML = `
        <h1 style="margin-left: 10px;">Project Gallery</h1>
        <p style="margin-left: 10px;">Here you can find my project images and descriptions... IN PROGRESS (This page is currently under construction 🚧. Stay tuned—it’ll be ready by January 2025, right after I conquer my final exams!) </p>
      `;
      break;

    case 'contact':
      contentArea.innerHTML = `
        <h1 style="margin-left: 10px;">Contact</h1>
        <p style="margin-left: 10px;">Email: <a href="mailto:oleg@oleg-nik.com">oleg@oleg-nik.com</a></p>
        <p style="margin-left: 10px;">Phone: +1-650-123-4567</p>
        <p style="margin-left: 10px;">LinkedIn: <a href="https://linkedin.com/in/oleg-nikitashin" target="_blank">linkedin.com/in/oleg-nikitashin</a></p>
      `;
      break;

    default:
      contentArea.innerHTML = `<p>Page not found!</p>`;
  }
}

// Toggle Popup Games Menu
function toggleGames() {
  const popupGames = document.getElementById('popup-games');
  const bsodScreen = document.getElementById('bsod-screen');

  if (!bsodScreen.classList.contains('shown')) {
    // Show BSOD for the first time
    bsodScreen.classList.remove('hidden');
    bsodScreen.classList.add('shown'); // Mark BSOD as shown
    setTimeout(() => {
      bsodScreen.classList.add('hidden');
      popupGames.classList.remove('hidden');
      bringToFront(popupGames);  // Center the games window
      popupGames.style.top = '50%';
      popupGames.style.left = '50%';
      popupGames.style.transform = 'translate(-50%, -50%)';
    }, 1800);
  } else {
    // Normal behavior for subsequent clicks
    popupGames.classList.toggle('hidden');
    bringToFront(popupGames);
  }
}

// Close the Popup Games Menu
function closeGames() {
  const popupGames = document.getElementById('popup-games');
  popupGames.classList.add('hidden'); // Add the hidden class
}

// Minimize, Maximize, and Close Functionality
let isWindowMinimized = false; // Track window state
let isMaximized = false; // Track maximize state

function minimizeWindow() {
  const mainContent = document.getElementById('main-content');
  const minimizedWindows = document.getElementById('minimized-windows');

  // Hide the main content window
  mainContent.classList.add('hidden');

  // Add a taskbar item for the minimized window
  if (!isWindowMinimized) {
    const taskbarItem = document.createElement('div');
    taskbarItem.classList.add('taskbar-item');
    taskbarItem.textContent = 'Window'; // Display name of the window
    taskbarItem.onclick = () => {
      // Restore the window when the taskbar item is clicked
      mainContent.classList.remove('hidden');
      bringToFront(mainContent);
      taskbarItem.remove();
      isWindowMinimized = false;
    };
    minimizedWindows.appendChild(taskbarItem);
    isWindowMinimized = true;
  }
}

function toggleMaximize() {
  const mainContent = document.getElementById('main-content');
  if (isMaximized) {
    mainContent.style.width = '70%';
    mainContent.style.height = '60%';
    mainContent.style.top = '50%';
    mainContent.style.left = '50%';
    mainContent.style.transform = 'translate(-50%, -50%)';
    isMaximized = false;
  } else {
    mainContent.style.width = '100%';
    mainContent.style.height = '100%';
    mainContent.style.top = '0';
    mainContent.style.left = '0';
    mainContent.style.transform = 'none';
    isMaximized = true;
  }
}

function closeWindow() {
  const mainContent = document.getElementById('main-content');
  mainContent.classList.add('hidden');
  isWindowMinimized = false;
}

// Function to make a window draggable
function makeDraggable(element) {
  const dragHandle = element.querySelector('.drag-handle');
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  // Mouse down event
  dragHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;

    // Bring the window to the front
    bringToFront(element);
  });

  // Mouse move event
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      // Allow free movement without constraints
      element.style.left = `${newX}px`;
      element.style.top = `${newY}px`;
    }
  });

  // Mouse up event
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

// Apply draggable functionality to all windows
document.querySelectorAll('.window').forEach((window) => {
  makeDraggable(window);
});

