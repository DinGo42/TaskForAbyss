'use client';
import { FC, useState } from 'react';
const zoomLevels = [25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150];

type Header = {
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoom: number;
  zoomOut: () => void;
};
export const Header: FC<Header> = ({ setZoom, zoom, zoomIn, zoomOut }) => {
  const [isOpenZoomList, setOpenZoomList] = useState(false);
  return (
    <header className="w-screen h-fit p-3 flex bg-white text-black items-center justify-between z-50 sticky top-0 pr-20 left-0">
      <h1>Services</h1>
      <div className="flex gap-10">
        <div className="flex">
          <button
            className="p-3 border-2 hover:bg-gray-300 transition-colors"
            onClick={zoomIn}
          >
            +
          </button>
          <div className="relative">
            <button
              className="p-3 border-t-2 border-b-2 w-20"
              onClick={() => setOpenZoomList((prev) => !prev)}
            >
              {zoom}%
            </button>
            <div
              className={`flex flex-col h-fit w-16   bg-white transition-opacity duration-500 ${
                isOpenZoomList ? '' : 'hidden'
              } absolute`}
            >
              {zoomLevels.map((zoomLevel) => (
                <button
                  key={zoomLevel}
                  onClick={() => {
                    setZoom(zoomLevel);
                    setOpenZoomList(false);
                  }}
                  className={`hover:bg-slate-300 transition-colors duration-150 p-1 ${
                    zoom === zoomLevel ? 'bg-green-300' : ''
                  }`}
                >
                  {zoomLevel}%
                </button>
              ))}
            </div>
          </div>
          <button
            className="p-3 border-2 hover:bg-gray-300 transition-colors"
            onClick={zoomOut}
          >
            -
          </button>
        </div>
      </div>
    </header>
  );
};
