import fs from 'fs'

export class productManagerFilesystem {
    constructor(path) {
        this.path = path;

        this.#init()
    }
    #init () {
        try{
            const existFile = fs.existsSync(this.path)
            if(existFile) return;
            
            fs.writeFileSync(this.path, JSON.stringify([]));
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        const response = await fs.promises.readFile(this.path, "utf-8")

        return JSON.parse(response);
    }

    async getProductsById (id) {
        const product = await this.getProducts()

        const productFound = product.find(f => f.id === id )

        return productFound;
    }
}

