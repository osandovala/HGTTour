document.addEventListener('deviceready', function() {
    // Elementos de la interfaz
    var btnVolver = document.getElementById('btn-volver');
    var btnAgregar = document.getElementById('btn-agregar');
    var listaMantenimientos = document.getElementById('lista-mantenimientos').getElementsByTagName('tbody')[0];
    var detalleMantenimiento = document.getElementById('detalle-mantenimiento');
    var btnCerrarDetalle = document.getElementById('btn-cerrar-detalle');
    var btnRealizar = document.getElementById('btn-realizar');
    var btnImprimir = document.getElementById('btn-imprimir');
    var btnEliminar = document.getElementById('btn-eliminar');
    var buscarInput = document.getElementById('buscar-mantenimiento');
    
    var mantenimientoActual = null;
    
    // Event listeners
    btnVolver.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    btnAgregar.addEventListener('click', function() {
        // Aquí iría la lógica para mostrar el formulario de agregar
        alert('Funcionalidad para agregar mantenimiento');
    });
    
    btnCerrarDetalle.addEventListener('click', function() {
        detalleMantenimiento.classList.add('hidden');
    });
    
    btnRealizar.addEventListener('click', marcarComoRealizado);
    btnImprimir.addEventListener('click', imprimirMantenimiento);
    btnEliminar.addEventListener('click', eliminarMantenimiento);
    
    buscarInput.addEventListener('input', function() {
        filtrarMantenimientos(this.value);
    });
    
    // Cargar lista de mantenimientos
    cargarMantenimientos();
    
    function cargarMantenimientos() {
        obtenerMantenimientos(function(rows) {
            listaMantenimientos.innerHTML = '';
            
            for (var i = 0; i < rows.length; i++) {
                var row = rows.item(i);
                var tr = document.createElement('tr');
                
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.fecha}</td>
                    <td>${row.maquina_nombre || 'N/A'}</td>
                    <td class="${row.realizado ? 'realizado' : 'pendiente'}">
                        ${row.realizado ? 'REALIZADO' : 'PENDIENTE'}
                    </td>
                    <td>
                        <button class="btn-ver" data-id="${row.id}">Ver</button>
                    </td>
                `;
                
                listaMantenimientos.appendChild(tr);
            }
            
            // Agregar eventos a los botones Ver
            var botonesVer = document.getElementsByClassName('btn-ver');
            for (var j = 0; j < botonesVer.length; j++) {
                botonesVer[j].addEventListener('click', function() {
                    mostrarDetalleMantenimiento(parseInt(this.getAttribute('data-id')));
                });
            }
        }, function(error) {
            alert('Error al cargar mantenimientos: ' + error.message);
        });
    }
    
    function mostrarDetalleMantenimiento(id) {
        db.transaction(function(tx) {
            tx.executeSql(
                `SELECT m.*, ma.nombre as maquina_nombre, ma.marca, ma.modelo, ma.fabricante 
                 FROM mantenimientos m 
                 LEFT JOIN maquinas ma ON m.id_maquina = ma.id 
                 WHERE m.id = ?`,
                [id],
                function(tx, result) {
                    if (result.rows.length > 0) {
                        var mantenimiento = result.rows.item(0);
                        mantenimientoActual = mantenimiento;
                        
                        // Llenar los datos en el detalle
                        document.getElementById('maquina').textContent = mantenimiento.maquina_nombre || 'N/A';
                        document.getElementById('marca').textContent = mantenimiento.marca || 'N/A';
                        document.getElementById('modelo').textContent = mantenimiento.modelo || 'N/A';
                        document.getElementById('fabricante').textContent = mantenimiento.fabricante || 'N/A';
                        
                        document.getElementById('fecha').textContent = mantenimiento.fecha || 'N/A';
                        document.getElementById('hora').textContent = mantenimiento.hora || 'N/A';
                        document.getElementById('tipo').textContent = mantenimiento.tipo ? 'PREVENTIVO' : 'CORRECTIVO';
                        document.getElementById('estado').textContent = mantenimiento.realizado ? 'REALIZADO' : 'PENDIENTE';
                        
                        document.getElementById('responsable').textContent = mantenimiento.responsable || 'N/A';
                        document.getElementById('descripcion').textContent = mantenimiento.descripcion || 'N/A';
                        document.getElementById('observaciones').textContent = mantenimiento.observaciones || 'N/A';
                        
                        // Mostrar/ocultar botones según estado
                        btnRealizar.style.display = mantenimiento.realizado ? 'none' : 'block';
                        
                        // Mostrar el detalle
                        detalleMantenimiento.classList.remove('hidden');
                    }
                },
                function(tx, error) {
                    alert('Error al cargar detalle: ' + error.message);
                }
            );
        });
    }
    
    function marcarComoRealizado() {
        if (!mantenimientoActual) return;
        
        var fechaEntrega = prompt("Ingrese la fecha de entrega (DD/MM/AAAA):");
        if (!fechaEntrega) return;
        
        db.transaction(function(tx) {
            tx.executeSql(
                'UPDATE mantenimientos SET realizado = 1, fecha_entrega = ? WHERE id = ?',
                [fechaEntrega, mantenimientoActual.id],
                function() {
                    alert('Mantenimiento marcado como realizado');
                    cargarMantenimientos();
                    detalleMantenimiento.classList.add('hidden');
                    
                    // Si es preventivo, preguntar por el siguiente
                    if (mantenimientoActual.tipo) {
                        var programarSiguiente = confirm('¿Desea programar el siguiente mantenimiento preventivo?');
                        if (programarSiguiente) {
                            programarSiguienteMantenimiento();
                        }
                    }
                },
                function(tx, error) {
                    alert('Error al actualizar: ' + error.message);
                }
            );
        });
    }
    
    function programarSiguienteMantenimiento() {
        // Lógica similar a tu VBA para programar el siguiente mantenimiento preventivo
    }
    
    function imprimirMantenimiento() {
        // Lógica para imprimir
        alert('Funcionalidad de impresión');
    }
    
    function eliminarMantenimiento() {
        if (!mantenimientoActual) return;
        
        if (confirm('¿Está seguro de eliminar este mantenimiento?')) {
            db.transaction(function(tx) {
                tx.executeSql(
                    'DELETE FROM mantenimientos WHERE id = ?',
                    [mantenimientoActual.id],
                    function() {
                        alert('Mantenimiento eliminado');
                        cargarMantenimientos();
                        detalleMantenimiento.classList.add('hidden');
                    },
                    function(tx, error) {
                        alert('Error al eliminar: ' + error.message);
                    }
                );
            });
        }
    }
    
    function filtrarMantenimientos(texto) {
        // Lógica para filtrar la lista
    }
}, false);