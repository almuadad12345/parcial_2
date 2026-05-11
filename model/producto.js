// Clase principal Producto - representa un producto del inventario
class Producto {
    constructor(codigoProducto, nombreProducto, proveedor, stock, precioUnitario, categoriaProducto) {
        this.codigoProducto    = codigoProducto;
        this.nombreProducto    = nombreProducto;
        this.proveedor         = proveedor;
        this.stock             = stock;
        this.precioUnitario    = precioUnitario;
        this.categoriaProducto = categoriaProducto;
    }

    // Calcula el precio final aplicando descuento segun la categoria
    calcularPrecioFinal() {
        let subtotal  = this.precioUnitario * this.stock;
        let descuento = 0;

        if (this.categoriaProducto === 'A') {
            descuento = subtotal * 0.05; // Alimentos 5%
        } else if (this.categoriaProducto === 'L') {
            descuento = subtotal * 0.08; // Limpieza 8%
        } else if (this.categoriaProducto === 'T') {
            descuento = subtotal * 0.10; // Tecnologia 10%
        } else if (this.categoriaProducto === 'R') {
            descuento = subtotal * 0.15; // Ropa 15%
        }

        return subtotal - descuento;
    }

    // Suma los precios finales de todos los productos del inventario
    static hallarTotalInventario(listaProductos) {
        let total = 0;
        for (let i = 0; i < listaProductos.length; i++) {
            total += listaProductos[i].calcularPrecioFinal();
        }
        return total;
    }
}