import { useState, useEffect, MutableRefObject } from 'react';

export const useEaselControl = (ref: HTMLDivElement | null) => {
  const [scale, setScale] = useState(1);
  const [zoom, setZoom] = useState(100);

  const [viewport, setViewport] = useState({
    offset: {
      x: 0.0,
      y: 0.0,
    },
    zoom: 1,
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) {
      return;
    }

    if (e.buttons !== 1) {
      setIsDragging(false);

      return;
    }

    setViewport((prev) => ({
      ...prev,
      offset: {
        x: prev.offset.x + e.movementX / viewport.zoom,
        y: prev.offset.y + e.movementY / viewport.zoom,
      },
    }));
  };

  useEffect(() => {
    if (!ref) {
      return;
    }

    ref.onwheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.ctrlKey) {
        const speedFactor =
          (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 0.002) * 10;

        setViewport((prev) => {
          const pinchDelta = -e.deltaY * speedFactor;

          return {
            ...prev,
            zoom: Math.min(
              1.3,
              Math.max(0.1, prev.zoom * Math.pow(2, pinchDelta))
            ),
          };
        });
      }
    };
  }, [ref, setViewport]);

  const MIN_SCALE = 10;

  const changeScale = (scale: number) => {
    const newScale = scale < MIN_SCALE ? MIN_SCALE : scale;
    setScale(newScale);
  };

  const changeZoom = (zoom: number) => {
    const newScale = zoom / 100;
    changeScale(newScale);
    setZoom(zoom);
  };

  const zoomIn = () => {
    const newZoom = zoom + 25;
    setZoom(+(newZoom < MIN_SCALE ? MIN_SCALE : newZoom).toFixed(1));
  };

  const zoomOut = () => {
    const newZoom = zoom - 25;
    setZoom(+(newZoom < MIN_SCALE ? MIN_SCALE : newZoom).toFixed(1));
  };

  useEffect(() => {
    if (ref) {
      const scaleLevel = zoom / 100;
      ref.style.transform = `scale(${+scaleLevel.toFixed(1)})`;
    }
  }, [ref, scale, zoom]);

  return {
    zoomOut,
    zoomIn,
    zoom,
    scale,
    changeZoom,
    changeScale,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    viewport,
  };
};
