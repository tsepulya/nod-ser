import { Category } from "./category";
import { categories } from "./db";

    
export function getCategories() : Promise<Category[]> {
    return Promise.resolve(categories);
}

export function getCategoryById(id: number): Promise<Category | undefined> {
    const category = categories.find((cat) => cat.id === id);
    return Promise.resolve(category);
}

export function deleteCategory(id: number) : Promise<void> {
    const catIndex = categories.findIndex((cat) => cat.id === id);
    if (catIndex < 0) {
        return Promise.reject('Category not found');
    }
    categories.splice(catIndex, 1);
    return Promise.resolve();
}

async function newId () {
    const categories = await getCategories();
    const categoriesArr = Array.from(categories);
    const ids = categoriesArr.map((elem) => elem.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
    //  let id = categories.length;
    //  return () => id++;
}

export async function createCategory(data: Category): Promise<Category> {
    const isExists = categories.findIndex((cat) => cat.name === data.name) >= 0;
    if (isExists) {
        return Promise.reject(new Error('Category with this name already exists'));
    }
    const newCategory: Category = {
        ...data, 
        id: await newId()
    };
    categories.push(newCategory);
    return Promise.resolve(newCategory);
}

export function updateCategory(category: Category): Promise<Category> {
   const id = category.id;
   const catIndex = categories.findIndex((cat) => cat.id === id);
   categories[catIndex] = category;
   return Promise.resolve(categories[catIndex]);
}