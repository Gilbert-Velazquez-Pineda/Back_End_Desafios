const fs = require("fs");

class ProductManagerFilesystem {
  // nos pide que la clase reciba la ruta / path del archivo donde guardaremos los productos
  constructor(path) {
    // en el constructor podemos inicializar variables de la clase, y darle un valor, cada instancia tendra el suyo
    this.path = path;

    // Para invocar el método al crear la instancia, podemos llamarlo desde acá
    this.init();
  }

  // ver si existe el archivo, de no estar crearlo
  init() {
    try {
      const existFile = fs.existsSync(this.path);
      if (existFile) return;

      // Se crea vacio si no existe el archivo.
      fs.writeFileSync(this.path, JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  }

  // Leer productos
  async getProducts() {
    try {
      // leer el archivo 
      const response = await fs.promises.readFile(this.path, "utf-8");

      // Se convierte respuesta a JS con JSON.parse
      return JSON.parse(response);

      //promesa rechazada
    } catch (error) {
      console.log(error);
    }
  }

  async saveProduct({ title, description, price, thumbnail, code, stock }) {
    try {
      if (!title || !description || !price || !thumbnail || !code || !stock)
        return { error: "Las variables son obligatorias" };

      const newProduct = { title, description, price, thumbnail, code, stock };
      // vamos a buscar el array de products
      const products = await this.getProducts();
      
      //agregar ID verificando que no se repita
      newProduct.id = !products.length
        ? 1
        : products[products.length - 1].id + 1;
        
      //evitar productos duplicados por codigo
      const duplicateCode = products.some(e => e.code == newProduct.code)
      if(!duplicateCode) {
        products.push(newProduct);
        //Escribir en el archivo FS convirtiendolo a objeto
         await fs.promises.writeFile(this.path, JSON.stringify(products, null, 3));
   
         //regresar el nuevo producto a agregar
         return newProduct;

      } else {
        console.log("El codigo",newProduct.code,"esta duplicado, ¡no se agregara a la lsita!")
     }
     

      //promesa rechazada
    } catch (error) {
      console.log(error);
    }
    
  }

  //obtener el producto por el ID
  async getProductsById(productId) {
    try {
      const productFound = await this.getProducts();
      const found = productFound.find(e => e.id == productId)
      if (found) {
        console.log("El producto buscado es:",found.title);
    } else {
        console.log("producto con id: ",productId,"Not found");
    }
    // regresar solo el producto buscado
    return found;

    //promesa no resuelta
    } catch (error) {
      console.log(error);
    }
  }

  //delete product
  async deleteProduct(deleteId) {
    try {
      const productFound = await this.getProducts();
      const found = productFound.find(e => e.id == deleteId)
      if (found) {
         const productWithoutItem = productFound.filter(item => item.id !== deleteId)
         console.log("se elimino producto con ID:", deleteId);
         productFound.push(productWithoutItem);
         await fs.promises.writeFile(this.path, JSON.stringify(productWithoutItem, null, 3));
         return productFound
      } else {
        console.log("Ningun producto con este ID, No se puede borrar nada");
      }

    } catch (error) {
       console.log(error);
    }
  }

  //update product
  async updateProduct (updateId, updateObj) {
    try {
      updateObj.id = updateId
      const list = await this.getProducts() //obtengo toda la matriz
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == updateId) {
           list[i] = updateObj
           break
        }  
      }
      await fs.promises.writeFile(this.path, JSON.stringify(list, null, 3)) // escribe en el documento json la actualizacion
        

    } catch (error) { // si no encuentra el ID del procucto 
      console.log("ningun producto tiene esa Id; No se puede actualizar");
    }
  }


}

// Creamos una instancia
// Y simplemente al hacer el new, se va a ejecutar el metodo init que creara el archivo si no existe
const electronicProducts = new ProductManagerFilesystem(
  "./products.json"
);

// Metodos asincronos para ejecutar 
const testClass = async () => {

  // añadir producto
  /*    const productOne = await electronicProducts.saveProduct({
      code: 1581,
      title: "motherboard",
      description: "chipsets: AMD A32",
      price: 1450,
      thumbnail: "https://freepngimg.com/png/14180-motherboard-free-png-image",
      stock: 200
     });

     const productTwo = await electronicProducts.saveProduct ({
      code: 2054,
      title: "mouse gamer",
      description: "Programable con 6 Botones",
      price: 239,
      thumbnail: "https://www.amazon.com.mx/Free-Programable-Retroiluminación-Interruptor-Independiente/dp/B098SCLJDJ",
      stock: 10
     }); 

     const productThree = await electronicProducts.saveProduct ({
      code: 8147,
      title: "Keyboard",
      description: "Mechanical Gaming Keyboard",
      price: 1600,
      thumbnail: "https://www.amazon.com.mx/HyperX-Alloy-Origins-Mechanical-Compatible/dp/B08XBQ79MN/ref=sr_1_9?keywords=keyboard&qid=1669066332&qu=eyJxc2MiOiI2Ljc5IiwicXNhIjoiNS45MSIsInFzcCI6IjQuNTcifQ%3D%3D&s=electronics&sprefix=keyb%2Celectronics%2C115&sr=1-9",
      stock: 40
     });
 */

  // Todos los productos
  const allProducts = await electronicProducts.getProducts();
  console.log("Lista de productos", allProducts);


  //buscar producto por ID
  const productById = await electronicProducts.getProductsById(10); 
  console.log(productById);

  //borrar por ID
  const deleteById = await electronicProducts.deleteProduct(200);

  //update product
  const updateById = await electronicProducts.updateProduct(200, {
    title: "test",
    description: "test update",
    price: 10000,
    thumbnail: "test image",
    code: 11111,
    stock: 200
  })
  
};

testClass();
