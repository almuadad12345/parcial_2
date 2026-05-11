// Clase Tecnologia - hereda de Producto, agrega meses de garantia
class Tecnologia extends Producto {
    constructor(codigoProducto, nombreProducto, proveedor, stock, precioUnitario, garantiaMeses) {
        // Llama al constructor del padre con categoria T
        super(codigoProducto, nombreProducto, proveedor, stock, precioUnitario, 'T');
        this.garantiaMeses = garantiaMeses;
    }

    // Descuento fijo del 10% para tecnologia
    calcularPrecioFinal() {
        let subtotal = this.precioUnitario * this.stock;
        return subtotal - (subtotal * 0.10);
    }
}