'use client';
import { FC, useRef, memo } from 'react';

export type CategoryType = {
  parentId: string | null;
  id: string;
  name: string;
  childrenId: string[];
};
export type StorageCategory = {
  parent?: StorageCategory | null;
  id: string;
  name: string;
  children?: StorageCategory[];
};

type CategoryProps = {
  id: string;
  name: string;
  categories: StorageCategory[];
  createCategory: (name: string, parentId: string) => void;
  updateCategory: (id: string, newName: string) => void;
  deleteCategory: (id: string) => void;
};

export const Category: FC<CategoryProps> = memo(
  ({
    id,
    name,
    categories,
    createCategory,
    deleteCategory,
    updateCategory,
  }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
      <>
        <div className="flex flex-col items-center gap-2">
          <div
            key={id}
            className="bg-blue-700 w-fit pl-5 pr-5 pb-5 pt-2 rounded-2xl flex flex-col items-center gap-2"
          >
            <h2>{name}</h2>
            <div className="flex gap-2">
              <input type="text" ref={inputRef} className="text-black pl-4" />
              <button
                className="w-8 h-8 bg-slate-500 hover:bg-green-500 transition-colors rounded-full text-center items-center justify-center flex"
                onClick={() =>
                  inputRef.current &&
                  (createCategory(inputRef.current.value, id),
                  (inputRef.current.value = ''))
                }
              >
                +
              </button>
              <button
                className="w-8 h-8 bg-slate-500 rounded-full hover:bg-orange-300 transition-colors text-center items-center justify-center flex"
                onClick={() =>
                  inputRef.current &&
                  (updateCategory(id, inputRef.current.value),
                  (inputRef.current.value = ''))
                }
              >
                O
              </button>
              <button
                className="w-8 h-8 bg-red-400 hover:bg-red-600  rounded-full text-center items-center justify-center flex"
                onClick={() => deleteCategory(id)}
              >
                x
              </button>
            </div>
          </div>

          <div className="flex gap-5">
            {categories.map((category) => (
              <Category
                key={category.id}
                id={category.id}
                name={category.name}
                createCategory={createCategory}
                deleteCategory={deleteCategory}
                updateCategory={updateCategory}
                categories={category.children ? category.children : []}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
);
