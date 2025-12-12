// script.js

(() => {
    let highestZIndex = 10;
    let bsodShown = false;
    const openWindows = new Set();
    const maximizedWindows = new Set();
    const PAGE_ICONS = {
        about: "about-icon.png",
        gallery: "gallery-icon.png",
        contact: "contact-icon.png",
    };

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
        initQuickLaunch();
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
                const action = item.dataset.action;
                const target = item.dataset.open;
                if (action) {
                    handleStartAction(action);
                } else {
                    handleOpenTarget(target);
                }
                startMenu.classList.add("hidden");
            });
        });
    }

    function initQuickLaunch() {
        const quickButtons = document.querySelectorAll(".quick-button");
        quickButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const action = btn.dataset.action;
                handleQuickAction(action);
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

        // Otherwise it's a standalone content window
        openContentWindow(target);
    }

    function handleQuickAction(action) {
        const startMenu = document.getElementById("start-menu");
        if (startMenu) {
            startMenu.classList.add("hidden");
        }

        switch (action) {
            case "minimize-all":
                minimizeAllWindows();
                break;
            case "open-ie":
                openInternetExplorerWindow();
                break;
            case "email":
                openEmailClient();
                break;
            default:
                break;
        }
    }

    function handleStartAction(action) {
        switch (action) {
            case "windows-update":
                // Open external site in a new tab/window
                window.open("https://www.nikitashin.com", "_blank", "noopener");
                break;
            case "shutdown":
                // Attempt to close the tab if permitted; otherwise hide all windows
                shutdownAll();
                break;
            default:
                break;
        }
    }
    /* --------------------------------------------------
     * Content Windows (About / Gallery / Contact)
     * -------------------------------------------------- */

    function openContentWindow(pageKey) {
        const page = PAGES[pageKey];
        if (!page) return;

        const windowId = `window-${pageKey}`;
        let windowEl = document.getElementById(windowId);

        if (!windowEl) {
            windowEl = createContentWindow(windowId, pageKey, page);
            document.body.appendChild(windowEl);
            wireWindowControls(windowEl);
        } else {
            const contentArea = windowEl.querySelector(".window-body");
            if (contentArea) {
                contentArea.innerHTML = `
          <h1>${page.title}</h1>
          ${page.html}
        `;
            }
        }

        showWindow(windowEl);
        centerWindow(windowEl, true);
    }

    function createContentWindow(id, pageKey, page) {
        const icon = PAGE_ICONS[pageKey] || "about-icon.png";
        const section = document.createElement("section");
        section.id = id;
        section.className = "window window--primary hidden";
        section.setAttribute("role", "dialog");
        section.setAttribute("aria-modal", "false");
        section.setAttribute("aria-labelledby", `${id}-title`);

        section.innerHTML = `
      <header class="window-titlebar drag-handle">
        <div class="window-titlebar-left">
          <img src="${icon}" alt="" class="window-title-icon" aria-hidden="true">
          <span id="${id}-title" class="window-title">
            ${page.title}
          </span>
        </div>
        <div class="window-titlebar-controls">
          <button type="button" class="window-control window-control--minimize" data-action="minimize" data-target="${id}" aria-label="Minimize">
            _
          </button>
          <button type="button" class="window-control window-control--maximize" data-action="maximize" data-target="${id}" aria-label="Maximize">
            ▢
          </button>
          <button type="button" class="window-control window-control--close" data-action="close" data-target="${id}" aria-label="Close">
            X
          </button>
        </div>
      </header>
      <div class="window-body">
        <h1>${page.title}</h1>
        ${page.html}
      </div>
    `;

        return section;
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
                showWindow(gamesWindow);
                centerWindow(gamesWindow, false);
            }, 1800);
        } else {
            // Next times: just toggle window
            const isHidden = gamesWindow.classList.contains("hidden") || gamesWindow.style.display === "none";
            if (isHidden) {
                showWindow(gamesWindow);
                centerWindow(gamesWindow, false);
            } else {
                hideWindow(gamesWindow);
            }
        }
    }

    /* --------------------------------------------------
     * Window Controls (minimize / maximize / close)
     * -------------------------------------------------- */

    function initWindowControls() {
        wireWindowControls(document);
    }

    function wireWindowControls(container) {
        const controls = container.querySelectorAll(".window-control");
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
                        toggleMaximize(targetId);
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
        if (!windowEl) return;

        hideWindow(windowEl);
        renderTaskbarButtons();
    }

    function minimizeAllWindows() {
        const windows = document.querySelectorAll(".window:not(.hidden)");
        windows.forEach((win) => {
            if (win.id) {
                minimizeWindow(win.id);
            }
        });
    }

    function toggleMaximize(targetId) {
        const windowEl = document.getElementById(targetId);
        if (!windowEl) return;

        if (maximizedWindows.has(targetId)) {
            // Restore to centered defaults
            maximizedWindows.delete(targetId);
            centerWindow(windowEl, windowEl.classList.contains("window--primary"));
        } else {
            maximizedWindows.add(targetId);
            windowEl.style.top = "0";
            windowEl.style.left = "0";
            windowEl.style.width = "100%";
            windowEl.style.height = "100%";
            windowEl.style.transform = "none";
        }

        bringToFront(windowEl);
    }

    function closeWindow(targetId) {
        const windowEl = document.getElementById(targetId);
        if (!windowEl) return;
        hideWindow(windowEl);
        openWindows.delete(targetId);
        renderTaskbarButtons();

        // Reset position so next open recenters
        windowEl.style.top = "50%";
        windowEl.style.left = "50%";
        windowEl.style.width = "";
        windowEl.style.height = "";
        windowEl.style.transform = "translate(-50%, -50%)";
    }

    /* --------------------------------------------------
     * Z-index / Position / Dragging
     * -------------------------------------------------- */

    function bringToFront(element) {
        highestZIndex += 1;
        element.style.zIndex = String(highestZIndex);
    }

    function showWindow(windowEl) {
        windowEl.classList.remove("hidden");
        windowEl.style.display = "";
        bringToFront(windowEl);
        if (windowEl.id) {
            openWindows.add(windowEl.id);
            renderTaskbarButtons();
        }
    }

    function hideWindow(windowEl) {
        windowEl.classList.add("hidden");
        windowEl.style.display = "none";
    }

    function renderTaskbarButtons() {
        const minimizedArea = document.getElementById("minimized-windows");
        if (!minimizedArea) return;
        minimizedArea.innerHTML = "";

        const entries = [];
        openWindows.forEach((id) => {
            const windowEl = document.getElementById(id);
            if (windowEl) {
                const titleEl = windowEl.querySelector(".window-title");
                const title = titleEl ? titleEl.textContent.trim() : "Window";
                const hidden =
                    windowEl.classList.contains("hidden") ||
                    windowEl.style.display === "none";
                entries.push({ id, title, hidden });
            }
        });

        const counts = entries.reduce((acc, { title }) => {
            acc[title] = (acc[title] || 0) + 1;
            return acc;
        }, {});

        entries.forEach(({ id, title, hidden }) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "taskbar-item";
            btn.dataset.restore = id;
            const suffix = counts[title] > 1 ? ` (${counts[title]})` : "";
            btn.textContent = `${title}${suffix}`;

            btn.addEventListener("click", () => {
                const targetWindow = document.getElementById(id);
                if (!targetWindow) return;
                const isHidden =
                    targetWindow.classList.contains("hidden") ||
                    targetWindow.style.display === "none";
                if (isHidden) {
                    showWindow(targetWindow);
                    centerWindow(
                        targetWindow,
                        targetWindow.classList.contains("window--primary")
                    );
                } else {
                    minimizeWindow(id);
                }
                renderTaskbarButtons();
            });

            minimizedArea.appendChild(btn);
        });
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
            // Ignore clicks on window control buttons so they don't initiate drag
            if (e.target.closest(".window-control")) {
                return;
            }

            const handle = e.target.closest(".drag-handle");
            if (!handle) return;

            const windowEl = handle.closest(".window");
            if (!windowEl) return;

            // Convert current transform-based centering to absolute coords for dragging
            const rect = windowEl.getBoundingClientRect();
            const absLeft = rect.left + window.scrollX;
            const absTop = rect.top + window.scrollY;
            windowEl.style.left = `${absLeft}px`;
            windowEl.style.top = `${absTop}px`;
            windowEl.style.transform = "none";

            dragState.active = true;
            dragState.windowEl = windowEl;
            dragState.offsetX = e.clientX - absLeft;
            dragState.offsetY = e.clientY - absTop;
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

    function openInternetExplorerWindow() {
        const ieWindow = document.getElementById("popup-ie");
        if (!ieWindow) return;
        showWindow(ieWindow);
        bringToFront(ieWindow);
        centerWindow(ieWindow, false);
    }

    function openEmailClient() {
        window.location.href = "mailto:nikitashin.ov@gmail.com";
    }

    function shutdownAll() {
        const windows = document.querySelectorAll(".window");
        windows.forEach((win) => hideWindow(win));
        openWindows.clear();
        renderTaskbarButtons();
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
