'use client';
import { useEaselControl } from '@todo/shared';
import { useState, useRef, forwardRef, useCallback } from 'react';
import {
  Category,
  addCategoryToStorage,
  deleteCategoryFromStorage,
  getCategories,
  updateCategoryFromStorage,
} from '../constructor';

export const Easel = forwardRef<HTMLDivElement | null>(({}, ref) => {
  const [categories, setNewCategories] = useState(() => getCategories());
  const inputRef = useRef<HTMLInputElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const { handleMouseDown, handleMouseMove, handleMouseUp, viewport } =
    useEaselControl(layerRef.current);
  const createCategory = (name: string, parentId?: string) => {
    addCategoryToStorage({
      name: name,
      parentId: parentId || null,
      childrenId: [],
    });

    setNewCategories(getCategories());
  };

  const updateCategory = useCallback((id: string, newName: string) => {
    updateCategoryFromStorage({ id, newName });
    setNewCategories(getCategories());
  }, []);
  const deleteCategory = useCallback((id: string) => {
    deleteCategoryFromStorage({ id });
    setNewCategories(getCategories());
  }, []);
  return (
    <>
      <div
        className="bg-gray-600 w-full h-full"
        ref={layerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className="w-screen h-screen flex items-center justify-center"
          style={{
            transform: `translate(${viewport.offset.x * viewport.zoom}px, ${
              viewport.offset.y * viewport.zoom
            }px) scale(${viewport.zoom})`,
          }}
        >
          <div
            ref={ref}
            className="flex flex-col transition-all w-fit h-fit  justify-start items-center duration-300 text-white gap-10"
          >
            <div className="flex pl-6 pr-6 pb-6 pt-3 bg-gray-900 rounded-2xl gap-2 flex-col items-center w-fit">
              <h1>Create Category</h1>

              <div className="flex gap-2">
                <input type="text" className="text-black pl-4" ref={inputRef} />
                <button
                  className="w-8 h-8 bg-gray-400 hover:bg-green-500 transition-colors rounded-full text-center"
                  onClick={() => {
                    inputRef.current &&
                      (createCategory(inputRef.current.value),
                      (inputRef.current.value = ''));
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex gap-10">
              {categories.map(({ id, name, children }) => (
                <Category
                  key={id}
                  id={id}
                  name={name}
                  createCategory={createCategory}
                  deleteCategory={deleteCategory}
                  updateCategory={updateCategory}
                  categories={children ? children : []}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
