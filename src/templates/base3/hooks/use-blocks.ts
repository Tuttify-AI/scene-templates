import { useCallback, useEffect, useRef } from 'react';

const useBlocks = (block: string, editMode: boolean) => {
  const ref = useRef(null);
  const ghostRef = useRef(null);
  const paletteRef = useRef(null);
  const pane = document.getElementById(block);
  const ghostPane = document.getElementById('ghost-pane');
  const palette = document.getElementById('background');

  useEffect(() => {
    if (pane) {
      ref.current = pane;
    }
  }, [pane]);

  useEffect(() => {
    if (ghostPane) {
      ghostRef.current = ghostPane;
    }
  }, [ghostPane]);

  useEffect(() => {
    if (palette) {
      paletteRef.current = palette;
    }
  }, [palette]);

  // Minimum resizable area
  const minWidth = 60;
  const minHeight = 40;

  // Thresholds
  const FULLSCREEN_MARGINS = -10;
  const MARGINS = 4;

  // End of what's configurable.
  let clicked = null;
  let onRightEdge, onBottomEdge, onLeftEdge, onTopEdge;
  let e;
  let rightScreenEdge, bottomScreenEdge;

  let preSnapped;

  let b, x, y;

  let redraw = false;

  const calc = useCallback(
    e => {
      if (ref.current) {
        b = ref.current.getBoundingClientRect();

        console.log();

        x = e.clientX - b.left;
        y = e.clientY - b.top;

        onTopEdge = y < MARGINS;
        onLeftEdge = x < MARGINS;
        onRightEdge = x >= b.width - MARGINS;
        onBottomEdge = y >= b.height - MARGINS;

        rightScreenEdge = window.innerWidth - MARGINS;
        bottomScreenEdge = window.innerHeight - MARGINS;
      }
    },
    [ref.current]
  );

  const setBounds = (element, x, y, w, h) => {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    element.style.width = w + 'px';
    element.style.height = h + 'px';
  };

  const hintHide = () => {
    setBounds(ghostRef.current, b.left, b.top, b.width, b.height);
    ghostRef.current.style.opacity = String(0);

    // const b = ghostpane.getBoundingClientRect();
    // ghostpane.style.top = b.top + b.height / 2;
    // ghostpane.style.left = b.left + b.width / 2;
    // ghostpane.style.width = 0;
    // ghostpane.style.height = 0;
  };

  const onUp = useCallback(
    e => {
      calc(e);

      if (clicked && clicked.isMoving) {
        // Snap
        const snapped = {
          width: b.width,
          height: b.height,
        };

        if (
          b.top < FULLSCREEN_MARGINS ||
          b.left < FULLSCREEN_MARGINS ||
          b.right > paletteRef.current.innerWidth - FULLSCREEN_MARGINS ||
          b.bottom > paletteRef.current.innerHeight - FULLSCREEN_MARGINS
        ) {
          // hintFull();
          setBounds(ref.current, 0, 0, paletteRef.current.innerWidth, paletteRef.current.innerHeight);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          preSnapped = snapped;
        } else if (b.top < MARGINS) {
          // hintTop();
          setBounds(ref.current, 0, 0, paletteRef.current.innerWidth, paletteRef.current.innerHeight / 2);
          preSnapped = snapped;
        } else if (b.left < MARGINS) {
          // hintLeft();
          setBounds(ref.current, 0, 0, paletteRef.current.innerWidth / 2, paletteRef.current.innerHeight);
          preSnapped = snapped;
        } else if (b.right > rightScreenEdge) {
          // hintRight();
          setBounds(
            ref.current,
            paletteRef.current.innerWidth / 2,
            0,
            paletteRef.current.innerWidth / 2,
            paletteRef.current.innerHeight
          );
          preSnapped = snapped;
        } else if (b.bottom > bottomScreenEdge) {
          // hintBottom();
          setBounds(
            ref.current,
            0,
            paletteRef.current.innerHeight / 2,
            paletteRef.current.innerWidth,
            paletteRef.current.innerWidth / 2
          );
          preSnapped = snapped;
        } else {
          preSnapped = null;
        }

        hintHide();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      clicked = null;
    },
    [b]
  );

  const onDown = useCallback(e => {
    calc(e);

    const isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    clicked = {
      x: x,
      y: y,
      cx: e.layerX,
      cy: e.layerY,
      w: b.width,
      h: b.height,
      isResizing: isResizing,
      isMoving: !isResizing && canMove(),
      onTopEdge: onTopEdge,
      onLeftEdge: onLeftEdge,
      onRightEdge: onRightEdge,
      onBottomEdge: onBottomEdge,
    };
  }, []);

  const onMouseDown = useCallback(
    e => {
      onDown(e);
      e.preventDefault();
    },
    [onDown]
  );

  const onMove = useCallback(ee => {
    calc(ee);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    e = ee;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    redraw = true;
  }, []);

  // Mouse events
  useEffect(() => {
    if (ref.current && editMode) {
      ref.current.addEventListener('mousedown', onMouseDown);
      palette.addEventListener('mousemove', onMove);
      palette.addEventListener('mouseup', onUp);
    }
    return () => {
      ref.current && ref.current.removeEventListener('mousedown', onMouseDown);
      palette?.removeEventListener('mousemove', onMove);
      palette?.removeEventListener('mouseup', onUp);
    };
  }, [editMode, onMouseDown, onMove, onUp, palette]);

  //eslint-disable-next-line
  const onTouchDown = (e: any) => {
    onDown(e.touches[0]);
    e.preventDefault();
  };
  //eslint-disable-next-line
  const onTouchMove = (e: any) => {
    onMove(e.touches[0]);
  };
  //eslint-disable-next-line
  const onTouchEnd = (e: any) => {
    if (e.touches.length == 0) onUp(e.changedTouches[0]);
  };

  // Touch events
  useEffect(() => {
    if (ref.current && palette) {
      ref.current.addEventListener('touchstart', onTouchDown);
      palette.addEventListener('touchmove', onTouchMove);
      palette.addEventListener('touchend', onTouchEnd);
    }
    return () => {
      ref.current && ref.current.removeEventListener('touchstart', onTouchDown);
      palette?.removeEventListener('touchmove', onTouchMove);
      palette?.removeEventListener('touchend', onTouchEnd);
    };
  }, [onTouchDown, onTouchEnd, onTouchMove, palette]);

  useEffect(() => {
    if (!editMode && ref.current && palette) {
      ref.current && ref.current.removeEventListener('mousedown', onMouseDown);
      palette.removeEventListener('mousemove', onMove);
      palette.removeEventListener('mouseup', onUp);
      ref.current && ref.current.removeEventListener('touchstart', onTouchDown);
      palette.removeEventListener('touchmove', onTouchMove);
      palette.removeEventListener('touchend', onTouchEnd);
    }
  }, [editMode, onMouseDown, onMove, onTouchDown, onTouchEnd, onTouchMove, onUp, palette]);

  const canMove = () => {
    return x > 0 && x < b.width && y > 0 && y < b.height && y < 30;
  };

  const animate = useCallback(() => {
    requestAnimationFrame(animate);

    if (!redraw) return;

    redraw = false;

    if (clicked && clicked.isResizing) {
      if (clicked.onRightEdge) ref.current.style.width = Math.max(x, minWidth) + 'px';
      if (clicked.onBottomEdge) ref.current.style.height = Math.max(y, minHeight) + 'px';

      if (clicked.onLeftEdge) {
        const currentWidth = Math.max(clicked.cx - e.clientX + clicked.w, minWidth);
        if (currentWidth > minWidth) {
          ref.current.style.width = currentWidth + 'px';
          ref.current.style.left = e.clientX + 'px';
        }
      }

      if (clicked.onTopEdge) {
        const currentHeight = Math.max(clicked.cy - e.clientY + clicked.h, minHeight);
        if (currentHeight > minHeight) {
          ref.current.style.height = currentHeight + 'px';
          ref.current.style.top = e.clientY + 'px';
        }
      }

      hintHide();

      return;
    }

    if (clicked && clicked.isMoving) {
      if (
        b.top < FULLSCREEN_MARGINS ||
        b.left < FULLSCREEN_MARGINS ||
        b.right > paletteRef.current.innerWidth - FULLSCREEN_MARGINS ||
        b.bottom > paletteRef.current.innerHeight - FULLSCREEN_MARGINS
      ) {
        // hintFull();
        setBounds(ghostRef.current, 0, 0, paletteRef.current.innerWidth, paletteRef.current.innerHeight);
        ghostRef.current.style.opacity = String(0.2);
      } else if (b.top < MARGINS) {
        // hintTop();
        setBounds(ghostRef.current, 0, 0, paletteRef.current.innerWidth, paletteRef.current.innerHeight / 2);
        ghostRef.current.style.opacity = String(0.2);
      } else if (b.left < MARGINS) {
        // hintLeft();
        setBounds(ghostRef.current, 0, 0, paletteRef.current.innerWidth / 2, paletteRef.current.innerHeight);
        ghostRef.current.style.opacity = String(0.2);
      } else if (b.right > rightScreenEdge) {
        // hintRight();
        setBounds(
          ghostRef.current,
          paletteRef.current.innerWidth / 2,
          0,
          paletteRef.current.innerWidth / 2,
          paletteRef.current.innerHeight
        );
        ghostRef.current.style.opacity = String(0.2);
      } else if (b.bottom > bottomScreenEdge) {
        // hintBottom();
        setBounds(
          ghostRef.current,
          0,
          paletteRef.current.innerHeight / 2,
          paletteRef.current.innerWidth,
          paletteRef.current.innerWidth / 2
        );
        ghostRef.current.style.opacity = String(0.2);
      } else {
        hintHide();
      }

      if (preSnapped) {
        setBounds(
          ref.current,
          e.layerX - preSnapped.width / 2,
          e.layerY - Math.min(clicked.y, preSnapped.height),
          preSnapped.width,
          preSnapped.height
        );
        return;
      }

      // moving
      ref.current.style.top = e.layerY - clicked.y + 'px';
      ref.current.style.left = e.layerX - clicked.x + 'px';

      return;
    }

    // This code executes when mouse moves without clicking

    // style cursor
    if ((onRightEdge && onBottomEdge) || (onLeftEdge && onTopEdge)) {
      ref.current.style.cursor = 'nwse-resize';
    } else if ((onRightEdge && onTopEdge) || (onBottomEdge && onLeftEdge)) {
      ref.current.style.cursor = 'nesw-resize';
    } else if (onRightEdge || onLeftEdge) {
      ref.current.style.cursor = 'ew-resize';
    } else if (onBottomEdge || onTopEdge) {
      ref.current.style.cursor = 'ns-resize';
    } else if (canMove()) {
      ref.current.style.cursor = 'move';
    } else {
      ref.current.style.cursor = 'default';
    }
  }, []);

  animate();
};

export default useBlocks;
