// Example WASM Game Integration
// This shows how to integrate your WASM game with the hosting page

// Example for Emscripten-generated games
var Module = {
    preRun: [],
    postRun: [],
    print: function(text) {
        console.log('Game output:', text);
    },
    printErr: function(text) {
        console.error('Game error:', text);
    },
    canvas: (function() {
        var canvas = document.getElementById('gameCanvas');
        
        // Resize canvas for high DPI displays
        canvas.addEventListener("webglcontextlost", function(e) {
            alert('WebGL context lost. You will need to reload the page.');
            e.preventDefault();
        }, false);
        
        return canvas;
    })(),
    setStatus: function(text) {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.innerHTML = text;
        }
        console.log('Status:', text);
    },
    totalDependencies: 0,
    monitorRunDependencies: function(left) {
        this.totalDependencies = Math.max(this.totalDependencies, left);
        Module.setStatus(left ? 
            'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 
            'All downloads complete.');
    }
};

// Set up loading status
Module.setStatus('Downloading...');
window.onerror = function() {
    Module.setStatus('Exception thrown, see JavaScript console');
    Module.setStatus = function(text) {
        if (text) Module.printErr('[post-exception status] ' + text);
    };
};

// Example integration for Unity WebGL
function unityShowBanner(msg, type) {
    function updateBannerVisibility() {
        // Handle Unity loading messages
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.innerHTML = msg;
        }
    }
    updateBannerVisibility();
}

// Example integration for Godot
var godotConfig = {
    'executable': 'game',
    'mainPack': 'game.pck',
    'locale': 'en',
    'canvas': document.getElementById('gameCanvas'),
    'canvasResizePolicy': 1, // Adaptive
    'onExecute': function(path, args) {
        console.log('Godot executing:', path, args);
    },
    'onExit': function(code) {
        console.log('Godot exited with code:', code);
    }
};

// Generic WASM loader function
async function loadWasmGame() {
    try {
        // Try different game types
        
        // 1. Try Emscripten-style game
        if (await checkFileExists('game.js')) {
            console.log('Loading Emscripten game...');
            const script = document.createElement('script');
            script.src = 'game.js';
            document.head.appendChild(script);
            return;
        }
        
        // 2. Try Unity WebGL
        if (await checkFileExists('Build/game.loader.js')) {
            console.log('Loading Unity WebGL game...');
            const script = document.createElement('script');
            script.src = 'Build/game.loader.js';
            script.onload = function() {
                createUnityInstance(document.querySelector("#gameCanvas"), {
                    dataUrl: "Build/game.data",
                    frameworkUrl: "Build/game.framework.js",
                    codeUrl: "Build/game.wasm",
                });
            };
            document.head.appendChild(script);
            return;
        }
        
        // 3. Try Godot
        if (await checkFileExists('game.js') && await checkFileExists('game.pck')) {
            console.log('Loading Godot game...');
            const engine = new Engine(godotConfig);
            engine.startGame();
            return;
        }
        
        // 4. Try custom WASM with loader
        if (await checkFileExists('game.wasm')) {
            console.log('Loading custom WASM game...');
            const loader = new WasmGameLoader('gameCanvas');
            const success = await loader.loadGame('game.wasm', 'game-loader.js');
            
            if (success) {
                // Start game loop
                loader.init();
                
                let lastTime = 0;
                function gameLoop(currentTime) {
                    const deltaTime = currentTime - lastTime;
                    lastTime = currentTime;
                    
                    loader.update(deltaTime);
                    loader.render();
                    
                    requestAnimationFrame(gameLoop);
                }
                
                requestAnimationFrame(gameLoop);
            }
            return;
        }
        
        // No game files found, show demo
        console.log('No game files found, showing demo');
        showDemoGame();
        
    } catch (error) {
        console.error('Error loading game:', error);
        showDemoGame();
    }
}

async function checkFileExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

function showDemoGame() {
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.innerHTML = 'Demo mode: Add your WASM game files to load your actual game';
    }
    
    // This will be handled by the main game.html file
    if (typeof startDemoGame === 'function') {
        startDemoGame();
    }
}

// Auto-load when page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWasmGame);
} else {
    loadWasmGame();
}
