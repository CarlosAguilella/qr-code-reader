import React, { useEffect, useRef, useState, useCallback } from 'react';

const WhiteBoard = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [canvasx, setCanvasX] = useState(0);
  const [canvasy, setCanvasY] = useState(0);

  const [touchCoordinates, setTouchCoordinates] = useState({ x: 0, y: 0 });
  const [touchDown, setTouchDown] = useState(false);

  const [toolType, setToolType] = useState('draw');
  const [brushSize, setBrushSize] = useState(10);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const [drawLines, setDrawLines] = useState([]);
  const [eraseLines, setEraseLines] = useState([]);
  const [prueba, setPrueba] = useState([]);

  const handleUseTool = useCallback((tool) => {
    setToolType(tool);
  }, []);

  const handleBrushSizeChange = useCallback((size) => {
    setBrushSize(size);
  }, []);

  const handleColorChange = useCallback((color) => {
    setStrokeColor(color);
  }, []);

  const handleBackgroundColorChange = useCallback((color) => {
    setBackgroundColor(color);
  }, []);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    const x = parseFloat(touch.clientX - canvasx);
    const y = parseFloat(touch.clientY - canvasy);
    setTouchCoordinates({ x, y });
    setTouchDown(true);
  }, [canvasx, canvasy]);

  const handleTouchEnd = useCallback(() => {
    setTouchDown(false);
    if (drawLines.length > 0 || eraseLines.length > 0) {
      let updatedArray = [...prueba];
      const newLineSet = {
        line: toolType === 'draw' ? [...drawLines] : null,
        erase: toolType === 'erase' ? [...eraseLines] : null,
        props: { size: brushSize, color: strokeColor },
      };
      updatedArray.push(newLineSet);
      setPrueba(updatedArray);
    }
  }, [drawLines, eraseLines, toolType, brushSize, strokeColor, prueba]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const x = parseFloat(touch.clientX - canvasx);
    const y = parseFloat(touch.clientY - canvasy);
    if (touchDown) {
      const ctx = ctxRef.current;
      if (ctx) {
        ctx.beginPath();
        if (toolType === 'draw') {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = brushSize;
        } else if (toolType === 'erase') {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.lineWidth = brushSize;
        }
        ctx.moveTo(touchCoordinates.x, touchCoordinates.y);
        ctx.lineTo(x, y);
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();
      }
      setTouchCoordinates({ x, y });
      if (toolType === 'draw') {
        setDrawLines((prevLines) => [...prevLines, { x, y }]);
      } else if (toolType === 'erase') {
        setEraseLines((prevLines) => [...prevLines, { x, y }]);
      }
    }
  }, [canvasx, canvasy, touchDown, toolType, brushSize, strokeColor, touchCoordinates]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    const { left, top } = canvas.getBoundingClientRect();
    setCanvasX(left);
    setCanvasY(top);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [canvasRef, handleTouchStart, handleTouchEnd, handleTouchMove]);

  useEffect(() => {
    if (!touchDown && drawLines.length > 0) {
      setDrawLines([]);
    }
  }, [touchDown, drawLines]);

  useEffect(() => {
    if (!touchDown && eraseLines.length > 0) {
      setEraseLines([]);
    }
  }, [touchDown, eraseLines]);

  const handleClear = useCallback(() => {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setPrueba([]);
  }, [canvasRef]);

  const mostrarArrays = useCallback(() => {
    const linesToDisplay = prueba;
    const linesString = linesToDisplay.map((lineSet, index) => {
      const lineString = lineSet.line
        ? `"line": [${lineSet.line.map(point => `{ "x": ${point.x.toFixed(5)}, "y": ${point.y.toFixed(5)} }`).join(', ')}]`
        : '"line": null';
      const eraseString = lineSet.erase
        ? `"erase": [${lineSet.erase.map(point => `{ "x": ${point.x.toFixed(5)}, "y": ${point.y.toFixed(5)} }`).join(', ')}]`
        : '"erase": null';
      const props = lineSet.props || {};
      return `{
        "MyLine": {
          ${lineString},
          ${eraseString},
          "props": {
            "size": ${props.size || brushSize}
            ${lineSet.erase ? '}' : `,"color": "${props.color || strokeColor}"}`
          }
        }
      }`;
    }).join(',\n');
    console.log(`{\n"lines": [\n${linesString}\n]\n}`);
  }, [brushSize, strokeColor, prueba]);  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
      <canvas
        ref={canvasRef}
        id="canvas"
        width={500}
        height={500}
        style={{
          border: '2px solid',
          backgroundColor: backgroundColor,
          margin: '10px',
        }}
      ></canvas>
      <div style={{ marginTop: '10px' }}>
        <button style={{ padding: '8px 16px', margin: '0 5px', fontSize: '14px', cursor: 'pointer' }} onClick={() => handleUseTool('draw')}>
          Draw
        </button>
        <button style={{ padding: '8px 16px', margin: '0 5px', fontSize: '14px', cursor: 'pointer' }} onClick={() => handleUseTool('erase')}>
          Erase
        </button>
        <label style={{ marginLeft: '10px', fontSize: '14px' }}>Size:</label>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => handleBrushSizeChange(parseFloat(e.target.value))}
          style={{ marginLeft: '5px' }}
        />
        <label style={{ marginLeft: '10px', fontSize: '14px' }}>Color:</label>
        <input
          type="color"
          value={strokeColor}
          onChange={(e) => handleColorChange(e.target.value)}
          style={{ marginLeft: '5px' }}
        />
        <label style={{ marginLeft: '10px', fontSize: '14px' }}>Background:</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => handleBackgroundColorChange(e.target.value)}
          style={{ marginLeft: '5px' }}
        />
        <input type="button" value="Clear" onClick={handleClear} style={{ marginLeft: '10px', cursor: 'pointer' }} />
        <button onClick={mostrarArrays} style={{ padding: '8px 16px', margin: '0 5px', fontSize: '14px', cursor: 'pointer' }}>Mostrar Arrays</button>
      </div>
    </div>
  );
};

export default WhiteBoard;
