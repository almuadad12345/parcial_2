// Controlador - maneja la logica entre el modelo y la vista
const Controlador = {

    // Guarda un producto en el localStorage
    guardarProducto(producto) {
        let lista = this.obtenerProductos();
        lista.push(producto);
        localStorage.setItem('mr_inv', JSON.stringify(lista));
    },

    // Lee todos los productos guardados en el localStorage
    obtenerProductos() {
        let datos = localStorage.getItem('mr_inv');
        if (datos === null) return [];
        return JSON.parse(datos);
    },

    // Reconstruye los objetos con sus clases para poder usar los metodos
    reconstruirObjetos(lista) {
        let objetos = [];
        for (let i = 0; i < lista.length; i++) {
            let p = lista[i];
            let obj;

            if (p.categoriaProducto === 'A') {
                obj = new Alimento(p.codigoProducto, p.nombreProducto, p.proveedor, p.stock, p.precioUnitario, p.fechaVencimiento);
            } else if (p.categoriaProducto === 'T') {
                obj = new Tecnologia(p.codigoProducto, p.nombreProducto, p.proveedor, p.stock, p.precioUnitario, p.garantiaMeses);
            } else {
                obj = new Producto(p.codigoProducto, p.nombreProducto, p.proveedor, p.stock, p.precioUnitario, p.categoriaProducto);
            }

            objetos.push(obj);
        }
        return objetos;
    },

    // Recoge los datos del formulario y crea el producto correspondiente
    registrarProducto() {
        let codigo    = document.getElementById('codigo').value.trim();
        let nombre    = document.getElementById('nombre').value.trim();
        let proveedor = document.getElementById('proveedor').value.trim();
        let stock     = parseInt(document.getElementById('stock').value);
        let precio    = parseInt(document.getElementById('precio').value);
        let categoria = document.getElementById('categoria').value;

        // Validacion de campos obligatorios
        if (!codigo || !nombre || !proveedor || !stock || !precio || !categoria) {
            Vista.mostrarMensaje('Completa todos los campos.', 'error');
            return;
        }

        let producto;

        if (categoria === 'A') {
            let fecha = document.getElementById('fechaVencimiento').value;
            if (!fecha) { Vista.mostrarMensaje('Ingresa la fecha de vencimiento.', 'error'); return; }
            producto = new Alimento(codigo, nombre, proveedor, stock, precio, fecha);
        } else if (categoria === 'T') {
            let garantia = parseInt(document.getElementById('garantiaMeses').value);
            if (!garantia) { Vista.mostrarMensaje('Ingresa los meses de garantia.', 'error'); return; }
            producto = new Tecnologia(codigo, nombre, proveedor, stock, precio, garantia);
        } else {
            producto = new Producto(codigo, nombre, proveedor, stock, precio, categoria);
        }

        this.guardarProducto(producto);
        Vista.mostrarMensaje('Producto registrado con exito.', 'ok');
        Vista.limpiarFormulario();
        this.cargarTabla();
    },

    // Carga los productos y los envia a la vista para renderizar
    cargarTabla() {
        let lista   = this.obtenerProductos();
        let objetos = this.reconstruirObjetos(lista);
        let total   = Producto.hallarTotalInventario(objetos);
        Vista.renderizarTabla(objetos, total);
    }
};