class ProductManager {

    constructor() {
        this.products = [] //generar array de productos vacio
    }

    getProductId = () => {
        const amount = this.products.length;
        const productId = (amount > 0) ? this.products[amount - 1].id + 1 : 1; // generar id que no se repitan
        return productId;
    }

    getProducts = () => {
        return this.products
    }

    getProductById = (productId) => {
        const productFound = this.products.find(e => e.id == productId)
        if (productFound) {
            console.log("El producto buscado es: ", productFound.title);
        } else {
            console.log("producto con id :",productId,"Not found");
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {   //pasar los parametros que se van a añadir al producto
        const product = {
            id: this.getProductId(),  //tomar el id despues de que se verifico que exista y que no este repetido
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const duplicatedCode = (element) => element.code == product.code;  // buscar que no se repita el codigo
        if (!this.products.some(duplicatedCode)) {
            this.products.push(product)
        } else {
            console.log("El codigo",product.code,"esta duplicado, ¡no se agregara a la lsita!")
        }

    }

}

const product = new ProductManager()

// Para añadir productos introducir, titulo, descripcion, precio, imagen, codigo y catidad de stock
product.addProduct("motherboard", "chipsets: AMD A32", 1450, "https://freepngimg.com/png/14180-motherboard-free-png-image", 1581, 2)
product.addProduct("mouse gamer", "Programable con 6 Botones, 6 Retroiluminación RGB", 239, "https://www.amazon.com.mx/Free-Programable-Retroiluminación-Interruptor-Independiente/dp/B098SCLJDJ", 2054, 10)
product.addProduct("Keyboard", "Mechanical Gaming Keyboard, Ultra Compac", 1600, "https://www.amazon.com.mx/HyperX-Alloy-Origins-Mechanical-Compatible/dp/B08XBQ79MN/ref=sr_1_9?keywords=keyboard&qid=1669066332&qu=eyJxc2MiOiI2Ljc5IiwicXNhIjoiNS45MSIsInFzcCI6IjQuNTcifQ%3D%3D&s=electronics&sprefix=keyb%2Celectronics%2C115&sr=1-9", 8147, 4)


product.getProductById(1)  // buscar un producto desde su ID

console.log("Lista de productos", product.getProducts()); //mostrar productos
