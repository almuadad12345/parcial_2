// Clase Alimento - hereda de Producto, agrega fecha de vencimiento
class Alimento extends Producto {
    constructor(codigoProducto, nombreProducto, proveedor, stock, precioUnitario, fechaVencimiento) {
        // Llama al constructor del padre con categoria A
        super(codigoProducto, nombreProducto, proveedor, stock, precioUnitario, 'A');
        this.fechaVencimiento = fechaVencimiento;
    }

    // Descuento fijo del 5% para alimentos
    calcularPrecioFinal() {
        let subtotal = this.precioUnitario * this.stock;
        return subtotal - (subtotal * 0.05);
    }
}