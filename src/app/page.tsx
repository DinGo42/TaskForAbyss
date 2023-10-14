'use client';
import { useEaselControl } from '@todo/shared';
import { Easel, Header } from '@todo/widgets';
import { useRef } from 'react';

export default function Home() {
  const easelRef = useRef<HTMLDivElement | null>(null);

  const { zoom, zoomIn, zoomOut, changeZoom } = useEaselControl(
    easelRef.current
  );

  return (
    <>
      <Header
        setZoom={changeZoom}
        zoom={zoom}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      />
      <Easel ref={easelRef} />
    </>
  );
}
