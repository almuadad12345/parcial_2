// Vista - maneja todo lo que el usuario ve en pantalla
const Vista = {

    // Muestra u oculta los campos segun la categoria elegida
    cambiarCamposExtra() {
        let categoria     = document.getElementById('categoria').value;
        let campoAlimento = document.getElementById('campoAlimento');
        let campoTecno    = document.getElementById('campoTecno');

        campoAlimento.style.display = 'none';
        campoTecno.style.display    = 'none';

        if (categoria === 'A') campoAlimento.style.display = 'block';
        if (categoria === 'T') campoTecno.style.display    = 'block';
    },

    // Muestra un mensaje de exito o error que desaparece en 3 segundos
    mostrarMensaje(texto, tipo) {
        let caja = document.getElementById('mensaje');
        caja.textContent   = texto;
        caja.className     = 'msg ' + tipo;
        caja.style.display = 'block';
        setTimeout(() => caja.style.display = 'none', 3000);
    },

    // Limpia todos los campos del formulario
    limpiarFormulario() {
        document.getElementById('formProducto').reset();
        document.getElementById('campoAlimento').style.display = 'none';
        document.getElementById('campoTecno').style.display    = 'none';
    },

    // Construye la tabla con los productos del inventario
    renderizarTabla(lista, total) {
        let cuerpo  = document.getElementById('cuerpoTabla');
        let nombres = { A: 'Alimento', L: 'Limpieza', T: 'Tecnologia', R: 'Ropa' };
        cuerpo.innerHTML = '';

        if (lista.length === 0) {
            cuerpo.innerHTML = '<tr><td colspan="8" class="vacio">No hay productos registrados aun.</td></tr>';
        } else {
            for (let i = 0; i < lista.length; i++) {
                let p     = lista[i];
                let pf    = p.calcularPrecioFinal();
                let extra = '-';

                if (p.categoriaProducto === 'A' && p.fechaVencimiento) extra = 'Vence: ' + p.fechaVencimiento;
                if (p.categoriaProducto === 'T' && p.garantiaMeses)    extra = 'Garantia: ' + p.garantiaMeses + ' mes(es)';

                let fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${p.codigoProducto}</td>
                    <td>${p.nombreProducto}</td>
                    <td>${p.proveedor}</td>
                    <td>${p.stock}</td>
                    <td>$${p.precioUnitario.toLocaleString('es-CO')}</td>
                    <td><span class="badge cat-${p.categoriaProducto}">${nombres[p.categoriaProducto]}</span></td>
                    <td>${extra}</td>
                    <td class="precio-final">$${Math.round(pf).toLocaleString('es-CO')}</td>
                `;
                cuerpo.appendChild(fila);
            }
        }

        // Actualiza el total visible en pantalla
        document.getElementById('totalInventario').textContent =
            '$' + Math.round(total).toLocaleString('es-CO');
    }
};