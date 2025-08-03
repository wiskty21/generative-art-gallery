# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a generative art gallery featuring three interactive visualizations built with p5.js and Processing. The project is designed to run in a web browser using p5.js, with Processing versions also available for desktop use.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:8080)
npm start

# Alternative with file watching
npm run dev
```

## Architecture

### Core Implementation Structure

The project uses a unified architecture where all three generative art pieces are integrated into a single `sketch.js` file:

1. **Mode Switching System**: The `currentMode` global variable controls which visualization is active
2. **Shared Canvas**: All sketches share the same 800x800 canvas element
3. **Mode-Specific Variables**: Each mode has its own set of global variables (particles, waves, tree parameters)

### Key Functions

- `changeMode(mode)`: Switches between the three visualization modes
- `initializeSketch()`: Reinitializes variables based on current mode
- `draw()`: Main p5.js loop that delegates to mode-specific draw functions

### Visualization Modes

1. **flow_field**: Particle system following Perlin noise flow field
2. **wave_interference**: Multiple wave sources creating interference patterns
3. **recursive_tree**: Fractal tree with wind simulation

### File Organization

- **Web Version (Primary)**: `index.html`, `sketch.js` - Single integrated p5.js implementation
- **Legacy Standalone Files**: `flow_field.js`, `wave_interference.js`, `recursive_tree.js` - Individual p5.js sketches (not actively used)
- **Processing Versions**: `*.pde` files - Original Processing implementations for desktop IDE

## Important Implementation Details

### Canvas Management
- Canvas is created once and attached to `#canvas-container` div
- Mode switches preserve the canvas but reinitialize all state

### Color Modes
- Flow Field uses RGB mode
- Wave Interference and Recursive Tree use HSB mode
- Color mode switches happen during `initializeSketch()`

### Performance Considerations
- Wave Interference uses a 4-pixel resolution grid for performance
- Flow Field maintains a particle limit through user interaction
- Recursive Tree depth is controlled by `minLength` parameter

## GitHub Pages Deployment

The project is designed to be deployed directly to GitHub Pages. The `index.html` file serves as the entry point with all necessary p5.js scripts loaded via CDN.