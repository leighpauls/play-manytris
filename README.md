# WebAssembly Game Host

A complete GitHub Pages hosting solution for WebAssembly games with automatic game detection and loading.

## 🎮 Features

- ✅ **Universal WASM game support** (Emscripten, Unity WebGL, Godot, Rust, etc.)
- ✅ **Automatic game detection** and loading
- ✅ **Proper WASM MIME types** and optimization
- ✅ **Game controls** (start, pause, reset, fullscreen)
- ✅ **Responsive design** with dark gaming theme
- ✅ **Keyboard shortcuts** (Space to play/pause, F11 for fullscreen)
- ✅ **Demo mode** when no game files are present

## 🚀 Quick Setup

### 1. Download & Deploy
1. Download the hosting files (zip package)
2. Create a new GitHub repository
3. Upload all files to your repository
4. Enable GitHub Pages in repository Settings

### 2. Add Your Game
Upload your WASM game files to the repository:

**For Emscripten games:**
```
├── game.html          # Game hosting page
├── game.js            # Emscripten JavaScript
├── game.wasm          # Your compiled game
└── game.data          # Game assets (if any)
```

**For Unity WebGL:**
```
├── game.html          # Game hosting page
└── Build/
    ├── game.loader.js
    ├── game.framework.js
    ├── game.data
    └── game.wasm
```

**For Godot:**
```
├── game.html          # Game hosting page
├── game.js            # Godot JavaScript
├── game.wasm          # Godot WASM
└── game.pck           # Game package
```

**For Custom WASM:**
```
├── game.html          # Game hosting page
├── game.wasm          # Your WASM binary
├── game-loader.js     # Loader utility
└── assets/            # Game assets
```

### 3. Access Your Game
Your game will be live at: `https://yourusername.github.io/your-repo-name/game.html`

## 📁 File Structure

- **`game.html`** - Main game hosting page with controls
- **`game-loader.js`** - Universal WASM game loader utility
- **`example-game.js`** - Integration examples for different frameworks
- **`.htaccess`** - WASM MIME types and performance optimization
- **`_config.yml`** - Jekyll configuration for GitHub Pages

## 🎯 Supported Game Frameworks

### Emscripten (C/C++)
```bash
emcc game.cpp -o game.js -s USE_SDL=2 -s WASM=1
```

### Unity WebGL
Export your Unity project as WebGL build and upload the `Build/` folder.

### Godot
Export your Godot project as HTML5 and upload the generated files.

### Rust (wasm-pack)
```bash
wasm-pack build --target web
```

### AssemblyScript
```bash
asc game.ts --outFile game.wasm --bindings esm
```

## 🎮 Game Controls

- **Start Button** - Load and start the game
- **Pause/Resume** - Pause or resume gameplay
- **Reset** - Restart the game
- **Fullscreen** - Toggle fullscreen mode
- **Space** - Play/pause shortcut
- **F11** - Fullscreen shortcut
- **Ctrl+R** - Reset shortcut

## 🔧 Customization

### Modify Game Canvas Size
Edit `game.html` and change the canvas dimensions:
```html
<canvas id="gameCanvas" width="1024" height="768"></canvas>
```

### Add Custom Loading Screen
Modify the `updateStatus()` function in `game.html` to customize loading messages.

### Configure Game-Specific Settings
Edit `example-game.js` to add your game's specific configuration.

## 🚨 Troubleshooting

**Game not loading?**
- Ensure your `.wasm` and `.js` files are in the repository
- Check browser console for error messages
- Verify HTTPS is being used (required for WASM)

**Performance issues?**
- Enable compression in your build process
- Optimize WASM binary size using tools like `wasm-opt`
- Use browser dev tools to profile performance

**CORS errors?**
- Ensure all assets are served from the same domain
- Check that `.htaccess` file is properly configured

**Unity WebGL not working?**
- Make sure you have the complete `Build/` folder
- Check Unity's compression settings (disable if having issues)

## 🎨 Customization Examples

### Change Theme Colors
Edit the CSS variables in `game.html`:
```css
:root {
    --primary-color: #007bff;
    --background-color: #1a1a1a;
    --surface-color: #2a2a2a;
}
```

### Add Game-Specific UI
You can add custom UI elements by modifying the `.game-container` section in `game.html`.

## 📊 Performance Tips

1. **Optimize WASM size**: Use `wasm-opt -O3 game.wasm -o game.wasm`
2. **Enable compression**: The `.htaccess` file automatically enables gzip
3. **Use appropriate canvas size**: Match your game's native resolution
4. **Preload assets**: Load critical assets during the loading screen
5. **Profile regularly**: Use browser dev tools to identify bottlenecks

## 🔗 Useful Links

- [Emscripten Documentation](https://emscripten.org/docs/)
- [Unity WebGL Documentation](https://docs.unity3d.com/Manual/webgl.html)
- [Godot HTML5 Export](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html)
- [WebAssembly MDN Guide](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 📄 License

This hosting solution is provided as-is for educational and commercial use. Feel free to modify and distribute.
