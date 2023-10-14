import { CategoryType, StorageCategory } from './category';

let storage: CategoryType[] = [
  { childrenId: ['1', '2'], id: '0', name: 'value', parentId: null },
  { childrenId: [], id: '1', name: 'value', parentId: '0' },
  { childrenId: [], id: '2', name: 'value', parentId: '0' },
  { childrenId: ['4', '5'], id: '3', name: 'value', parentId: null },
  { childrenId: ['6'], id: '4', name: 'value', parentId: '3' },
  { childrenId: ['8'], id: '6', name: 'value', parentId: '4' },
  { childrenId: [], id: '8', name: 'value', parentId: '6' },
  { childrenId: [], id: '5', name: 'value', parentId: '3' },
];

let prevCategory: StorageCategory | null = null;

export const getCategories = () => {
  const rootCategories = storage.filter(
    (storageCategory) => storageCategory.parentId === null
  );
  const sortedStorage = rootCategories.map((storageCategory) => {
    const createObj = ({ childrenId, id, name, parentId }: CategoryType) => {
      if (parentId === null) prevCategory = { id, name };
      const obj: StorageCategory = {
        name,
        id,
        parent: parentId !== null ? prevCategory : null,
        children: storage
          .filter((category) => childrenId.includes(category.id))
          .map((category) => createObj(category)),
      };
      return obj;
    };
    const res = createObj(storageCategory);
    prevCategory = res;
    return res;
  });
  return sortedStorage;
};

export const addCategoryToStorage = ({
  ...props
}: Omit<CategoryType, 'id'>) => {
  const newCategory = { id: Date.now().toString(), ...props };
  storage.forEach((category) => {
    if (category.id === props.parentId) {
      category.childrenId.push(newCategory.id);
    }
  });
  storage.push(newCategory);
  console.log(storage);
  return newCategory;
};

export const updateCategoryFromStorage = ({
  id,
  newName,
}: {
  id: string;
  newName: string;
}) => {
  console.log(newName, id);
  storage.forEach((category) =>
    category.id === id ? (category.name = newName) : category
  );
};

export const deleteCategoryFromStorage = ({ id }: { id: string }) => {
  const deletedIds: string[] = [id];

  const findChildCategories = (searchId: string) => {
    const childrenToDelete = storage
      .filter((category) => category.parentId === searchId)
      .map((category) => category.id);

    for (const childId of childrenToDelete) {
      deletedIds.push(childId);
      findChildCategories(childId);
    }
  };
  findChildCategories(id);

  const newStorage = storage.filter(
    (category) => !deletedIds.includes(category.id)
  );
  storage = newStorage;
};
