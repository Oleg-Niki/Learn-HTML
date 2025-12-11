// script.js

(() => {
    let highestZIndex = 10;
    let bsodShown = false;
    let isMainMaximized = false;

    const PAGES = {
        about: {
            title: "About Me",
            html: `
        <p>
          I’m Oleg, an international engineering student and robotics technician based in the Bay Area. With a background in computer science, racing, and sustainability projects, I like turning complex ideas into practical, efficient systems. When I’m not in class or at work, I’m usually building robots, tuning race cars, or designing interactive exhibits that make technology easier to understand.
        </p>
        
      `,
        },
        gallery: {
            title: "Project Gallery",
            html: `
        <p>
          Here you’ll soon find a curated gallery of my projects: race car builds,
          robotics systems, sustainability exhibits, and more.
        </p>
        <p>
          This section is under construction 🚧 and will be updated after finals
          season. Come back in early 2025 for a proper portfolio of photos and
          build notes.
        </p>
      `,
        },
        contact: {
            title: "Contact",
            html: `
        <p>You can reach me here:</p>
        <p>
          Email:
          <a href="mailto:oleg@oleg-nik.com">oleg@oleg-nik.com</a>
        </p>
        <p>
          LinkedIn:
          <a href="https://www.linkedin.com/in/oleg-nikitashin-2b038a20a/"
             target="_blank" rel="noopener noreferrer">
            linkedin.com/in/oleg-nikitashin-2b038a20a
          </a>
        </p>
      `,
        },
    };

    document.addEventListener("DOMContentLoaded", init);

    function init() {
        // Ensure games window starts hidden (defensive)
        const popupGames = document.getElementById("popup-games");
        if (popupGames) {
            popupGames.classList.add("hidden");
        }

        initDesktopIcons();
        initStartMenu();
        initWindowControls();
        initGlobalClickHandlers();
        initClock();
        initDragging();
    }

    /* --------------------------------------------------
     * Desktop / Start Menu
     * -------------------------------------------------- */

    function initDesktopIcons() {
        const icons = document.querySelectorAll(".desktop-icon");
        icons.forEach((icon) => {
            icon.addEventListener("click", (e) => {
                e.preventDefault();
                const target = icon.dataset.open;
                handleOpenTarget(target);
            });
        });
    }

    function initStartMenu() {
        const startButton = document.getElementById("start-button");
        const startMenu = document.getElementById("start-menu");

        if (!startButton || !startMenu) return;

        startButton.addEventListener("click", (e) => {
            e.stopPropagation();
            startMenu.classList.toggle("hidden");
        });

        // Items inside Start menu
        const items = startMenu.querySelectorAll(".start-menu-item");
        items.forEach((item) => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                const target = item.dataset.open;
                handleOpenTarget(target);
                startMenu.classList.add("hidden");
            });
        });
    }

    function initGlobalClickHandlers() {
        const startMenu = document.getElementById("start-menu");
        const startButton = document.getElementById("start-button");

        // Click outside Start menu closes it
        document.addEventListener("click", (e) => {
            if (!startMenu || !startButton) return;
            const clickedInsideMenu = startMenu.contains(e.target);
            const clickedStartButton = startButton.contains(e.target);
            if (!clickedInsideMenu && !clickedStartButton) {
                startMenu.classList.add("hidden");
            }
        });
    }

    function handleOpenTarget(target) {
        if (!target) return;

        if (target === "games") {
            openGamesWindow();
            return;
        }

        // Otherwise it's a page for the main window
        openMainWindowWithPage(target);
    }

    /* --------------------------------------------------
     * Main Window Content (About / Gallery / Contact)
     * -------------------------------------------------- */

    function openMainWindowWithPage(pageKey) {
        const page = PAGES[pageKey];
        if (!page) return;

        const windowEl = document.getElementById("main-content");
        const contentArea = document.getElementById("main-window-content");
        const titleSpan = document.getElementById("main-window-title");

        if (!windowEl || !contentArea) return;

        windowEl.classList.remove("hidden");
        bringToFront(windowEl);

        if (!isMainMaximized) {
            centerWindow(windowEl, true);
        }

        if (titleSpan) {
            titleSpan.textContent = `Oleg – ${page.title}`;
        }
        contentArea.innerHTML = `
      <h1>${page.title}</h1>
      ${page.html}
    `;
    }

    /* --------------------------------------------------
     * Games Window + BSOD
     * -------------------------------------------------- */

    function openGamesWindow() {
        const gamesWindow = document.getElementById("popup-games");
        const bsodScreen = document.getElementById("bsod-screen");
        if (!gamesWindow || !bsodScreen) return;

        if (!bsodShown) {
            // First time: show BSOD, then open window
            bsodShown = true;
            bsodScreen.classList.remove("hidden");
            bsodScreen.classList.add("shown");

            setTimeout(() => {
                bsodScreen.classList.add("hidden");
                gamesWindow.classList.remove("hidden");
                bringToFront(gamesWindow);
                centerWindow(gamesWindow, false);
            }, 1800);
        } else {
            // Next times: just toggle window
            gamesWindow.classList.toggle("hidden");
            if (!gamesWindow.classList.contains("hidden")) {
                bringToFront(gamesWindow);
            }
        }
    }

    /* --------------------------------------------------
     * Window Controls (minimize / maximize / close)
     * -------------------------------------------------- */

    function initWindowControls() {
        const controls = document.querySelectorAll(".window-control");
        controls.forEach((control) => {
            control.addEventListener("click", (e) => {
                e.stopPropagation();
                const action = control.dataset.action;
                const targetId = control.dataset.target;

                if (!action || !targetId) return;

                switch (action) {
                    case "minimize":
                        minimizeWindow(targetId);
                        break;
                    case "maximize":
                        // Currently only main window has maximize button
                        toggleMainMaximize(targetId);
                        break;
                    case "close":
                        closeWindow(targetId);
                        break;
                }
            });
        });
    }

    function minimizeWindow(targetId) {
        const windowEl = document.getElementById(targetId);
        const minimizedArea = document.getElementById("minimized-windows");
        if (!windowEl || !minimizedArea) return;

        windowEl.classList.add("hidden");

        // Create a taskbar button if not already present
        let existing = minimizedArea.querySelector(
            `[data-restore="${targetId}"]`
        );
        if (!existing) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "taskbar-item";
            btn.dataset.restore = targetId;

            const windowTitle = windowEl.querySelector(".window-title");
            btn.textContent = windowTitle ?
                windowTitle.textContent :
                "Window";

            btn.addEventListener("click", () => {
                // Toggle show/hide on click
                const targetWindow = document.getElementById(targetId);
                if (!targetWindow) return;
                const hidden = targetWindow.classList.toggle("hidden");
                if (!hidden) {
                    bringToFront(targetWindow);
                }
            });

            minimizedArea.appendChild(btn);
        }
    }

    function toggleMainMaximize(targetId) {
        const windowEl = document.getElementById(targetId);
        if (!windowEl) return;

        if (isMainMaximized) {
            // Restore default centered size
            centerWindow(windowEl, true);
            isMainMaximized = false;
        } else {
            // Maximize to full viewport
            windowEl.style.top = "0";
            windowEl.style.left = "0";
            windowEl.style.width = "100%";
            windowEl.style.height = "100%";
            windowEl.style.transform = "none";
            isMainMaximized = true;
        }

        bringToFront(windowEl);
    }

    function closeWindow(targetId) {
        const windowEl = document.getElementById(targetId);
        if (!windowEl) return;
        windowEl.classList.add("hidden");
    }

    /* --------------------------------------------------
     * Z-index / Position / Dragging
     * -------------------------------------------------- */

    function bringToFront(element) {
        highestZIndex += 1;
        element.style.zIndex = String(highestZIndex);
    }

    function centerWindow(windowEl, isPrimary) {
        // Basic defaults – can be adjusted in CSS as well
        if (isPrimary) {
            windowEl.style.width = "70%";
            windowEl.style.height = "60%";
        }
        windowEl.style.top = "50%";
        windowEl.style.left = "50%";
        windowEl.style.transform = "translate(-50%, -50%)";
    }

    function initDragging() {
        const dragState = {
            active: false,
            windowEl: null,
            offsetX: 0,
            offsetY: 0,
        };

        document.addEventListener("mousedown", (e) => {
            const handle = e.target.closest(".drag-handle");
            if (!handle) return;

            const windowEl = handle.closest(".window");
            if (!windowEl) return;

            dragState.active = true;
            dragState.windowEl = windowEl;
            dragState.offsetX = e.clientX - windowEl.offsetLeft;
            dragState.offsetY = e.clientY - windowEl.offsetTop;

            // Once user drags, remove centering transform
            windowEl.style.transform = "none";
            bringToFront(windowEl);
        });

        document.addEventListener("mousemove", (e) => {
            if (!dragState.active || !dragState.windowEl) return;

            const x = e.clientX - dragState.offsetX;
            const y = e.clientY - dragState.offsetY;

            dragState.windowEl.style.left = `${x}px`;
            dragState.windowEl.style.top = `${y}px`;
        });

        document.addEventListener("mouseup", () => {
            dragState.active = false;
            dragState.windowEl = null;
        });
    }

    /* --------------------------------------------------
     * Clock
     * -------------------------------------------------- */

    function initClock() {
        const clockEl = document.getElementById("taskbar-clock");
        if (!clockEl) return;

        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            clockEl.textContent = timeString;
        }

        updateClock();
        setInterval(updateClock, 60 * 1000); // update every minute
    }
})();