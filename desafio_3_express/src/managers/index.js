import { productManagerFilesystem } from "./productManager.js";

export const productManager = new productManagerFilesystem(
    "./src/db/products.json");