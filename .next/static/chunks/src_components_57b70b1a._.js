(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/P5Canvas.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>P5Canvas
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function P5Canvas(param) {
    let { mode } = param;
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentScriptRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const loadedScriptsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const p5ScriptRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "P5Canvas.useEffect": ()=>{
            if (!containerRef.current || "object" === 'undefined') return;
            // Complete cleanup function
            const performCompleteCleanup = {
                "P5Canvas.useEffect.performCompleteCleanup": ()=>{
                    // Clean up existing p5 instance
                    if (typeof window.remove === 'function') {
                        window.remove();
                    }
                    // Remove current p5 instance cache - more aggressive cleanup
                    if (typeof window.currentP5Instance !== 'undefined' && window.currentP5Instance) {
                        try {
                            if (typeof window.currentP5Instance.remove === 'function') {
                                window.currentP5Instance.remove();
                            }
                            window.currentP5Instance = undefined;
                            delete window.currentP5Instance;
                        } catch (e) {
                            console.warn('Could not clean current p5 instance:', e);
                        }
                    }
                    // Force stop all p5 animations and clean up any remaining instances
                    try {
                        // Stop all animation loops
                        if (typeof window.noLoop === 'function') {
                            window.noLoop();
                        }
                        // Clean up any p5 instances that might be running
                        const possibleP5Instances = [
                            '_p5instance',
                            '_instance',
                            'p5Instance'
                        ];
                        possibleP5Instances.forEach({
                            "P5Canvas.useEffect.performCompleteCleanup": (name)=>{
                                if (typeof window[name] !== 'undefined' && window[name]) {
                                    try {
                                        const instance = window[name];
                                        if (typeof instance.remove === 'function') {
                                            instance.remove();
                                        }
                                        window[name] = undefined;
                                        delete window[name];
                                    } catch (e) {
                                        console.warn("Could not clean ".concat(name, ":"), e);
                                    }
                                }
                            }
                        }["P5Canvas.useEffect.performCompleteCleanup"]);
                    } catch (e) {
                        console.warn('Could not stop all animations:', e);
                    }
                    // Remove all tracked scripts (but keep p5.js library)
                    loadedScriptsRef.current.forEach({
                        "P5Canvas.useEffect.performCompleteCleanup": (script)=>{
                            try {
                                if (script.parentNode && script !== p5ScriptRef.current) {
                                    document.head.removeChild(script);
                                }
                            } catch (e) {
                                console.warn('Could not remove script:', e);
                            }
                        }
                    }["P5Canvas.useEffect.performCompleteCleanup"]);
                    loadedScriptsRef.current.clear();
                    // Keep p5.js in tracking if it exists
                    if (p5ScriptRef.current) {
                        loadedScriptsRef.current.add(p5ScriptRef.current);
                    }
                    // Remove current script reference
                    if (currentScriptRef.current) {
                        try {
                            if (currentScriptRef.current.parentNode) {
                                document.head.removeChild(currentScriptRef.current);
                            }
                        } catch (e) {
                            console.warn('Could not remove current script:', e);
                        }
                        currentScriptRef.current = null;
                    }
                    // Comprehensive p5.js global variables cleanup
                    try {
                        const allP5Globals = [
                            // Gray-Scott specific
                            'gsGrid',
                            'gsNextGrid',
                            'gsWidth',
                            'gsHeight',
                            'gsFeedRate',
                            'gsKillRate',
                            'gsDiffusionA',
                            'gsDiffusionB',
                            'gsDt',
                            'updateGrayScottParameter',
                            // Flow Field specific
                            'particles',
                            'flowField',
                            'fieldSize',
                            'noiseScale',
                            'flowForce',
                            // Wave Interference specific
                            'waves',
                            'waveAmplitude',
                            'waveFrequency',
                            'damping',
                            // Recursive Tree specific
                            'windStrength',
                            'branchAngle',
                            'minLength',
                            // Common p5.js globals
                            'setup',
                            'draw',
                            'preload',
                            'windowResized',
                            'mousePressed',
                            'mouseDragged',
                            'keyPressed',
                            'keyReleased',
                            'touchStarted',
                            'touchMoved',
                            'touchEnded',
                            // Animation frame functions
                            'noLoop',
                            'loop',
                            'redraw',
                            'frameCount',
                            'deltaTime',
                            // Instance and cache variables
                            'currentP5Instance',
                            'flowFieldSketch',
                            'Particle',
                            // Canvas elements cache
                            '_p5Canvas',
                            '_defaultCanvas',
                            // Sketch-specific markers and functions
                            'grayScottSketch',
                            'harmonicWavesSketch',
                            'waveInterferenceSketch',
                            'mandelbrotSketch',
                            'ornsteinUhlenbeckSketch',
                            'polarRoseSketch',
                            'noiseFieldSculptureSketch',
                            'recursiveTreeSketch',
                            'perlinLandscapeSketch',
                            'boidsSketch',
                            'lissajousSketch',
                            // Sketch control functions
                            'updateHarmonicWavesParameter',
                            'updateWaveInterferenceParameter',
                            'updateGrayScottParameter',
                            'updateMandelbrotParameter',
                            'updateOrnsteinUhlenbeckParameter',
                            'updatePolarRoseParameter',
                            'updateNoiseFieldSculptureParameter',
                            'updateRecursiveTreeParameter',
                            'updatePerlinLandscapeParameter',
                            'updateBoidsParameter',
                            'updateLissajousParameter',
                            // Class definitions
                            'Boid'
                        ];
                        allP5Globals.forEach({
                            "P5Canvas.useEffect.performCompleteCleanup": (varName)=>{
                                try {
                                    if (typeof window[varName] !== 'undefined') {
                                        window[varName] = undefined;
                                        delete window[varName];
                                    }
                                } catch (e) {
                                // Some properties cannot be deleted, that's okay
                                }
                            }
                        }["P5Canvas.useEffect.performCompleteCleanup"]);
                    } catch (e) {
                        console.warn('Could not clean all global variables:', e);
                    }
                    // Force garbage collection hint (if available)
                    if (typeof window.gc === 'function') {
                        window.gc();
                    }
                }
            }["P5Canvas.useEffect.performCompleteCleanup"];
            // Perform cleanup
            performCompleteCleanup();
            // Clear container and remove all canvas elements
            const container = containerRef.current;
            container.innerHTML = '';
            // Remove any existing canvas elements from document
            const existingCanvases = document.querySelectorAll('canvas, #p5-canvas-container');
            existingCanvases.forEach({
                "P5Canvas.useEffect": (canvas)=>{
                    try {
                        if (canvas.parentNode) {
                            canvas.parentNode.removeChild(canvas);
                        }
                    } catch (e) {
                        console.warn('Could not remove canvas element:', e);
                    }
                }
            }["P5Canvas.useEffect"]);
            // Load appropriate sketch script
            const getSketchPath = {
                "P5Canvas.useEffect.getSketchPath": (mode)=>{
                    const basePath = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : '';
                    switch(mode){
                        case 'gray_scott':
                            return "".concat(basePath, "/sketches/gray-scott.js");
                        case 'flow_field':
                            return "".concat(basePath, "/sketches/flow-field.js");
                        case 'wave_interference':
                            return "".concat(basePath, "/sketches/wave-interference.js");
                        case 'recursive_tree':
                            return "".concat(basePath, "/sketches/recursive-tree.js");
                        case 'mandelbrot':
                            return "".concat(basePath, "/sketches/mandelbrot.js");
                        case 'ornstein_uhlenbeck':
                            return "".concat(basePath, "/sketches/ornstein-uhlenbeck.js");
                        case 'harmonic_waves':
                            return "".concat(basePath, "/sketches/harmonic-waves.js");
                        case 'polar_rose':
                            return "".concat(basePath, "/sketches/polar-rose.js");
                        case 'noise_field_sculpture':
                            return "".concat(basePath, "/sketches/noise-field-sculpture.js");
                        case 'perlin_landscape':
                            return "".concat(basePath, "/sketches/perlin-landscape.js");
                        case 'boids':
                            return "".concat(basePath, "/sketches/boids.js");
                        case 'lissajous':
                            return "".concat(basePath, "/sketches/lissajous.js");
                        default:
                            return null // All 12 artworks are now implemented
                            ;
                    }
                }
            }["P5Canvas.useEffect.getSketchPath"];
            const scriptPath = getSketchPath(mode);
            if (!scriptPath) {
                // Fallback for non-implemented modes
                container.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400">This mode is not yet implemented in the new architecture</div>';
                return;
            }
            // Create container div for p5.js
            const canvasDiv = document.createElement('div');
            canvasDiv.id = 'p5-canvas-container';
            canvasDiv.className = 'w-full h-full flex items-center justify-center';
            container.appendChild(canvasDiv);
            // Load p5.js library first, then the sketch
            const loadP5 = {
                "P5Canvas.useEffect.loadP5": ()=>{
                    return new Promise({
                        "P5Canvas.useEffect.loadP5": (resolve)=>{
                            if (typeof window.p5 !== 'undefined' && p5ScriptRef.current) {
                                resolve();
                                return;
                            }
                            // Only create new p5 script if it doesn't exist
                            if (!p5ScriptRef.current) {
                                const p5Script = document.createElement('script');
                                p5Script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js';
                                p5Script.onload = ({
                                    "P5Canvas.useEffect.loadP5": ()=>{
                                        console.log('p5.js loaded successfully (once)');
                                        console.log('createCanvas available:', typeof window.createCanvas);
                                        resolve();
                                    }
                                })["P5Canvas.useEffect.loadP5"];
                                document.head.appendChild(p5Script);
                                p5ScriptRef.current = p5Script;
                                loadedScriptsRef.current.add(p5Script);
                            } else {
                                resolve();
                            }
                        }
                    }["P5Canvas.useEffect.loadP5"]);
                }
            }["P5Canvas.useEffect.loadP5"];
            // Load sketch script after p5.js is ready and cleanup is complete
            loadP5().then({
                "P5Canvas.useEffect": ()=>{
                    // Increased delay to ensure complete cleanup
                    setTimeout({
                        "P5Canvas.useEffect": ()=>{
                            const sketchScript = document.createElement('script');
                            // Add cache-busting parameter to prevent browser caching
                            const cacheBuster = "?t=".concat(Date.now(), "&mode=").concat(mode);
                            sketchScript.src = scriptPath + cacheBuster;
                            sketchScript.setAttribute('data-sketch-mode', mode);
                            sketchScript.onload = ({
                                "P5Canvas.useEffect": ()=>{
                                    console.log("Loaded sketch: ".concat(mode));
                                    console.log('p5-canvas-container exists:', !!document.getElementById('p5-canvas-container'));
                                    console.log('p5 createCanvas available:', typeof window.createCanvas);
                                    // Verify only one p5 instance is running
                                    setTimeout({
                                        "P5Canvas.useEffect": ()=>{
                                            const canvases = document.querySelectorAll('canvas');
                                            console.log("Active canvases after load: ".concat(canvases.length));
                                            if (canvases.length > 1) {
                                                console.warn('Multiple canvases detected - potential memory leak!');
                                            }
                                        }
                                    }["P5Canvas.useEffect"], 100);
                                }
                            })["P5Canvas.useEffect"];
                            sketchScript.onerror = ({
                                "P5Canvas.useEffect": ()=>{
                                    console.error("Failed to load sketch: ".concat(mode));
                                    container.innerHTML = '<div class="flex items-center justify-center h-full text-red-400">Failed to load sketch</div>';
                                    // Remove failed script from tracking
                                    loadedScriptsRef.current.delete(sketchScript);
                                }
                            })["P5Canvas.useEffect"];
                            document.head.appendChild(sketchScript);
                            currentScriptRef.current = sketchScript;
                            loadedScriptsRef.current.add(sketchScript);
                        }
                    }["P5Canvas.useEffect"], 300); // Increased delay to 300ms for more thorough cleanup
                }
            }["P5Canvas.useEffect"]);
            // Enhanced cleanup function
            return ({
                "P5Canvas.useEffect": ()=>{
                    // Stop any animations immediately
                    if (typeof window.noLoop === 'function') {
                        window.noLoop();
                    }
                    // Remove p5 instance
                    if (typeof window.remove === 'function') {
                        window.remove();
                    }
                    // Remove all tracked scripts (but keep p5.js library)
                    loadedScriptsRef.current.forEach({
                        "P5Canvas.useEffect": (script)=>{
                            try {
                                if (script.parentNode && script !== p5ScriptRef.current) {
                                    document.head.removeChild(script);
                                }
                            } catch (e) {
                                console.warn('Cleanup: Could not remove script:', e);
                            }
                        }
                    }["P5Canvas.useEffect"]);
                    loadedScriptsRef.current.clear();
                    // Keep p5.js in tracking if it exists
                    if (p5ScriptRef.current) {
                        loadedScriptsRef.current.add(p5ScriptRef.current);
                    }
                    // Remove current script
                    if (currentScriptRef.current) {
                        try {
                            if (currentScriptRef.current.parentNode) {
                                document.head.removeChild(currentScriptRef.current);
                            }
                        } catch (e) {
                            console.warn('Cleanup: Could not remove current script:', e);
                        }
                        currentScriptRef.current = null;
                    }
                    // Clear container
                    if (containerRef.current) {
                        containerRef.current.innerHTML = '';
                    }
                }
            })["P5Canvas.useEffect"];
        }
    }["P5Canvas.useEffect"], [
        mode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "flex items-center justify-center w-full h-full bg-black rounded-lg"
    }, void 0, false, {
        fileName: "[project]/src/components/P5Canvas.tsx",
        lineNumber: 322,
        columnNumber: 5
    }, this);
}
_s(P5Canvas, "kCP+qIkZxjpXDszTY0nRaKjA37w=");
_c = P5Canvas;
var _c;
__turbopack_context__.k.register(_c, "P5Canvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ControlPanel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ControlPanel
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ControlPanel(param) {
    let { mode } = param;
    const handleParameterChange = (param, value)=>{
        // Send parameter changes to p5.js sketch
        if (mode === 'gray_scott' && typeof window.updateGrayScottParameter === 'function') {
            window.updateGrayScottParameter(param, value);
        } else if (mode === 'flow_field' && typeof window.updateFlowFieldParameter === 'function') {
            window.updateFlowFieldParameter(param, value);
        } else if (mode === 'wave_interference' && typeof window.updateWaveInterferenceParameter === 'function') {
            window.updateWaveInterferenceParameter(param, value);
        } else if (mode === 'recursive_tree' && typeof window.updateRecursiveTreeParameter === 'function') {
            window.updateRecursiveTreeParameter(param, value);
        } else if (mode === 'mandelbrot' && typeof window.updateMandelbrotParameter === 'function') {
            window.updateMandelbrotParameter(param, value);
        } else if (mode === 'ornstein_uhlenbeck' && typeof window.updateOrnsteinUhlenbeckParameter === 'function') {
            window.updateOrnsteinUhlenbeckParameter(param, value);
        } else if (mode === 'harmonic_waves' && typeof window.updateHarmonicWavesParameter === 'function') {
            window.updateHarmonicWavesParameter(param, value);
        } else if (mode === 'polar_rose' && typeof window.updatePolarRoseParameter === 'function') {
            window.updatePolarRoseParameter(param, value);
        } else if (mode === 'noise_field_sculpture' && typeof window.updateNoiseFieldSculptureParameter === 'function') {
            window.updateNoiseFieldSculptureParameter(param, value);
        } else if (mode === 'perlin_landscape' && typeof window.updatePerlinLandscapeParameter === 'function') {
            window.updatePerlinLandscapeParameter(param, value);
        } else if (mode === 'boids' && typeof window.updateBoidsParameter === 'function') {
            window.updateBoidsParameter(param, value);
        } else if (mode === 'lissajous' && typeof window.updateLissajousParameter === 'function') {
            window.updateLissajousParameter(param, value);
        }
    };
    const handleSaveImage = ()=>{
        // Trigger save image in the current p5.js sketch
        if (typeof window.currentP5Instance !== 'undefined' && window.currentP5Instance) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const p5Instance = window.currentP5Instance;
            if (typeof p5Instance.saveCanvas === 'function') {
                p5Instance.saveCanvas("".concat(mode, "_").concat(Date.now()), 'png');
            }
        }
    };
    const handleReset = ()=>{
        // Trigger reset in the current p5.js sketch
        if (typeof window.currentP5Instance !== 'undefined' && window.currentP5Instance) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const p5Instance = window.currentP5Instance;
            if (typeof p5Instance.key !== 'undefined') {
                p5Instance.key = 'r';
                if (typeof p5Instance.keyPressed === 'function') {
                    p5Instance.keyPressed();
                }
            }
        }
    };
    const getParameters = ()=>{
        switch(mode){
            case 'gray_scott':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: "Gray-Scott Parameters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Feed Rate"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.01",
                                    max: "0.1",
                                    step: "0.005",
                                    defaultValue: "0.055",
                                    onChange: (e)=>handleParameterChange('feedRate', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.055"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Kill Rate"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.03",
                                    max: "0.1",
                                    step: "0.002",
                                    defaultValue: "0.062",
                                    onChange: (e)=>handleParameterChange('killRate', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.062"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Diffusion A"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.5",
                                    max: "2.0",
                                    step: "0.1",
                                    defaultValue: "1.0",
                                    onChange: (e)=>handleParameterChange('diffusionA', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "1.0"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 107,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Diffusion B"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.1",
                                    max: "1.0",
                                    step: "0.05",
                                    defaultValue: "0.5",
                                    onChange: (e)=>handleParameterChange('diffusionB', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 68,
                    columnNumber: 11
                }, this);
            case 'flow_field':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: "Flow Field Parameters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Noise Scale"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.001",
                                    max: "0.1",
                                    step: "0.001",
                                    defaultValue: "0.01",
                                    onChange: (e)=>handleParameterChange('noiseScale', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 131,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.01"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 129,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Particle Count"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "100",
                                    max: "1000",
                                    step: "50",
                                    defaultValue: "500",
                                    onChange: (e)=>handleParameterChange('particleCount', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "500"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 127,
                    columnNumber: 11
                }, this);
            case 'wave_interference':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: "Wave Interference Parameters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Number of Waves"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "2",
                                    max: "8",
                                    step: "1",
                                    defaultValue: "3",
                                    onChange: (e)=>handleParameterChange('numWaves', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 164,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Wave Speed"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.01",
                                    max: "0.2",
                                    step: "0.01",
                                    defaultValue: "0.1",
                                    onChange: (e)=>handleParameterChange('waveSpeed', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 177,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.1"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 160,
                    columnNumber: 11
                }, this);
            case 'recursive_tree':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: "Recursive Tree Parameters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 194,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Branch Angle"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "10",
                                    max: "45",
                                    step: "1",
                                    defaultValue: "25",
                                    onChange: (e)=>handleParameterChange('angle', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "25°"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 195,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Length Ratio"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 209,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.5",
                                    max: "0.8",
                                    step: "0.01",
                                    defaultValue: "0.67",
                                    onChange: (e)=>handleParameterChange('lengthRatio', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 210,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.67"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 208,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Min Length"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "2",
                                    max: "10",
                                    step: "1",
                                    defaultValue: "4",
                                    onChange: (e)=>handleParameterChange('minLength', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 223,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 232,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 193,
                    columnNumber: 11
                }, this);
            case 'mandelbrot':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: "Mandelbrot Set Parameters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 240,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Max Iterations"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "50",
                                    max: "200",
                                    step: "10",
                                    defaultValue: "100",
                                    onChange: (e)=>handleParameterChange('maxIterations', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 243,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "100"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 252,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 241,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Zoom Level"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "1",
                                    max: "100",
                                    step: "1",
                                    defaultValue: "1",
                                    onChange: (e)=>handleParameterChange('zoom', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "1x"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 265,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 254,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 239,
                    columnNumber: 11
                }, this);
            case 'ornstein_uhlenbeck':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: "Ornstein-Uhlenbeck Parameters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 273,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Theta (Drift)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 275,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.05",
                                    max: "0.5",
                                    step: "0.01",
                                    defaultValue: "0.15",
                                    onChange: (e)=>handleParameterChange('theta', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 276,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.15"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 285,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 274,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Sigma (Noise)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 288,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.1",
                                    max: "1.0",
                                    step: "0.05",
                                    defaultValue: "0.4",
                                    onChange: (e)=>handleParameterChange('sigma', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 298,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 287,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 272,
                    columnNumber: 11
                }, this);
            case 'harmonic_waves':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: "Harmonic Waves Parameters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 306,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Frequency X"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 308,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.005",
                                    max: "0.05",
                                    step: "0.001",
                                    defaultValue: "0.02",
                                    onChange: (e)=>handleParameterChange('freqX', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 309,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.02"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 318,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 307,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Frequency Y"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 321,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.005",
                                    max: "0.05",
                                    step: "0.001",
                                    defaultValue: "0.015",
                                    onChange: (e)=>handleParameterChange('freqY', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 322,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.015"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 331,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 320,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Amplitude"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 334,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "20",
                                    max: "150",
                                    step: "5",
                                    defaultValue: "80",
                                    onChange: (e)=>handleParameterChange('amplitude', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 335,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "80"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 344,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 333,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 305,
                    columnNumber: 11
                }, this);
            case 'polar_rose':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: "Polar Rose Parameters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 352,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "K (Petals)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 354,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "3",
                                    max: "8",
                                    step: "0.1",
                                    defaultValue: "5",
                                    onChange: (e)=>handleParameterChange('k', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 355,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 364,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 353,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Rotation Speed"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 367,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.001",
                                    max: "0.01",
                                    step: "0.0005",
                                    defaultValue: "0.003",
                                    onChange: (e)=>handleParameterChange('rotationSpeed', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 368,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.003"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 377,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 366,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Number of Roses"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 380,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "3",
                                    max: "8",
                                    step: "1",
                                    defaultValue: "6",
                                    onChange: (e)=>handleParameterChange('numRoses', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 381,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "6"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 390,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 379,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 351,
                    columnNumber: 11
                }, this);
            case 'noise_field_sculpture':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: "Noise Field Sculpture Parameters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 398,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Noise Scale"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 400,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.003",
                                    max: "0.03",
                                    step: "0.001",
                                    defaultValue: "0.01",
                                    onChange: (e)=>handleParameterChange('noiseScale', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 401,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.01"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 410,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 399,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Number of Contours"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 413,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "5",
                                    max: "20",
                                    step: "1",
                                    defaultValue: "12",
                                    onChange: (e)=>handleParameterChange('numContours', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 414,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "12"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 423,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 412,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 397,
                    columnNumber: 11
                }, this);
            case 'perlin_landscape':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: "Perlin Landscape Parameters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 431,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Terrain Scale"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 433,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "10",
                                    max: "50",
                                    step: "5",
                                    defaultValue: "20",
                                    onChange: (e)=>handleParameterChange('scale', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 434,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "20"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 443,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 432,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Flight Speed"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 446,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.005",
                                    max: "0.05",
                                    step: "0.005",
                                    defaultValue: "0.01",
                                    onChange: (e)=>handleParameterChange('speed', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 447,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.01"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 456,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 445,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 430,
                    columnNumber: 11
                }, this);
            case 'boids':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: "Boids Flocking Parameters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 464,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Separation Radius"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 466,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "15",
                                    max: "50",
                                    step: "5",
                                    defaultValue: "25",
                                    onChange: (e)=>handleParameterChange('separation', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 467,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "25"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 476,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 465,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Alignment Radius"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 479,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "30",
                                    max: "80",
                                    step: "10",
                                    defaultValue: "50",
                                    onChange: (e)=>handleParameterChange('alignment', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 480,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "50"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 489,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 478,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Cohesion Radius"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 492,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "30",
                                    max: "80",
                                    step: "10",
                                    defaultValue: "50",
                                    onChange: (e)=>handleParameterChange('cohesion', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 493,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "50"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 502,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 491,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Boid Count"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 505,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "50",
                                    max: "200",
                                    step: "10",
                                    defaultValue: "100",
                                    onChange: (e)=>handleParameterChange('count', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 506,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "100"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 515,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 504,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 463,
                    columnNumber: 11
                }, this);
            case 'lissajous':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: "Lissajous Curves Parameters"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 523,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "X Frequency"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 525,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "1",
                                    max: "8",
                                    step: "0.5",
                                    defaultValue: "3",
                                    onChange: (e)=>handleParameterChange('freqX', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 526,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 535,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 524,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Y Frequency"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 538,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "1",
                                    max: "8",
                                    step: "0.5",
                                    defaultValue: "2",
                                    onChange: (e)=>handleParameterChange('freqY', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 539,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 548,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 537,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Phase Shift"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 551,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0",
                                    max: "6.28",
                                    step: "0.1",
                                    defaultValue: "0",
                                    onChange: (e)=>handleParameterChange('phase', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 552,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 561,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 550,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Animation Speed"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 564,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0.005",
                                    max: "0.05",
                                    step: "0.005",
                                    defaultValue: "0.02",
                                    onChange: (e)=>handleParameterChange('speed', parseFloat(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 565,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "0.02"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 574,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 563,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1",
                                    children: "Trail Length"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 577,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "200",
                                    max: "1000",
                                    step: "50",
                                    defaultValue: "500",
                                    onChange: (e)=>handleParameterChange('trailLength', parseInt(e.target.value)),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 578,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-gray-400",
                                    children: "500"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ControlPanel.tsx",
                                    lineNumber: 587,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 576,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 522,
                    columnNumber: 11
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold",
                            children: [
                                mode,
                                " Parameters"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 595,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-400",
                            children: "Parameters coming soon..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/ControlPanel.tsx",
                            lineNumber: 596,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ControlPanel.tsx",
                    lineNumber: 594,
                    columnNumber: 11
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold mb-4",
                        children: "Parameters"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ControlPanel.tsx",
                        lineNumber: 605,
                        columnNumber: 9
                    }, this),
                    getParameters()
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ControlPanel.tsx",
                lineNumber: 604,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-700 pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-2",
                        children: "Controls"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ControlPanel.tsx",
                        lineNumber: 610,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleReset,
                                className: "w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors",
                                children: "Reset"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ControlPanel.tsx",
                                lineNumber: 612,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSaveImage,
                                className: "w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors",
                                children: "Save Image"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ControlPanel.tsx",
                                lineNumber: 618,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ControlPanel.tsx",
                        lineNumber: 611,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ControlPanel.tsx",
                lineNumber: 609,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-gray-700 pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold mb-2",
                        children: "Info"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ControlPanel.tsx",
                        lineNumber: 628,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-400 space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Current Mode: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white",
                                        children: mode
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ControlPanel.tsx",
                                        lineNumber: 630,
                                        columnNumber: 28
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ControlPanel.tsx",
                                lineNumber: 630,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Canvas Size: 600x600"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ControlPanel.tsx",
                                lineNumber: 631,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ControlPanel.tsx",
                        lineNumber: 629,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ControlPanel.tsx",
                lineNumber: 627,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ControlPanel.tsx",
        lineNumber: 603,
        columnNumber: 5
    }, this);
}
_c = ControlPanel;
var _c;
__turbopack_context__.k.register(_c, "ControlPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ArtGallery.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ArtGallery
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$P5Canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/P5Canvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ControlPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ControlPanel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const artworks = [
    {
        id: 'flow_field',
        name: 'Flow Field'
    },
    {
        id: 'wave_interference',
        name: 'Wave Interference'
    },
    {
        id: 'recursive_tree',
        name: 'Recursive Tree'
    },
    {
        id: 'mandelbrot',
        name: 'Mandelbrot Set'
    },
    {
        id: 'ornstein_uhlenbeck',
        name: 'Ornstein-Uhlenbeck'
    },
    {
        id: 'gray_scott',
        name: 'Gray-Scott'
    },
    {
        id: 'harmonic_waves',
        name: 'Harmonic Waves'
    },
    {
        id: 'polar_rose',
        name: 'Polar Rose'
    },
    {
        id: 'noise_field_sculpture',
        name: 'Noise Field Sculpture'
    },
    {
        id: 'perlin_landscape',
        name: 'Perlin Landscape'
    },
    {
        id: 'boids',
        name: 'Boids Flocking'
    },
    {
        id: 'lissajous',
        name: 'Lissajous Curves'
    }
];
function ArtGallery() {
    _s();
    const [currentMode, setCurrentMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('flow_field');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:w-64 bg-gray-800 p-4 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-bold mb-4",
                        children: "Generative Art Gallery"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ArtGallery.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    artworks.map((artwork)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setCurrentMode(artwork.id),
                            className: "w-full text-left p-3 rounded transition-colors ".concat(currentMode === artwork.id ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'),
                            children: artwork.name
                        }, artwork.id, false, {
                            fileName: "[project]/src/components/ArtGallery.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ArtGallery.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$P5Canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    mode: currentMode
                }, void 0, false, {
                    fileName: "[project]/src/components/ArtGallery.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ArtGallery.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:w-80 bg-gray-800 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ControlPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    mode: currentMode
                }, void 0, false, {
                    fileName: "[project]/src/components/ArtGallery.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ArtGallery.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ArtGallery.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(ArtGallery, "lP3G6LLUGDiEuaCC9tk17yAnuDI=");
_c = ArtGallery;
var _c;
__turbopack_context__.k.register(_c, "ArtGallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_57b70b1a._.js.map