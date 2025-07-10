document.addEventListener('deviceready', function() {
    // ... (código anterior permanece igual)
    
    // Cargar lista de máquinas
    cargarMaquinas();
    
    // Cargar datos iniciales si la tabla está vacía
    verificarDatosIniciales();
    
    function verificarDatosIniciales() {
        obtenerMaquinas(function(rows) {
            if (rows.length === 0) {
                // Insertar datos iniciales
                insertarDatosIniciales();
            }
        }, function(error) {
            console.error('Error al verificar datos iniciales:', error);
        });
    }
    
    function insertarDatosIniciales() {
        // Datos iniciales basados en la tabla proporcionada
        var datosIniciales = [
            {id: 2, patente: "RKJC56", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "RANCAGUA", horas: 8},
            {id: 3, patente: "PPPJ69", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "RANCAGUA", horas: 8},
            {id: 4, patente: "PPPJ70", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 5, patente: "PPPJ73", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 6, patente: "LYZB94", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 7, patente: "PBYS78", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 8, patente: "PHVW53", marca: "MERCEDES BENZ", modelo: "416", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 9, patente: "PHVW54", marca: "MERCEDES BENZ", modelo: "416", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 10, patente: "PHVW55", marca: "MERCEDES BENZ", modelo: "416", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 11, patente: "PHVW56", marca: "MERCEDES BENZ", modelo: "416", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 12, patente: "PPCX10", marca: "MERCEDES BENZ", modelo: "416", fabricante: "MERCEDES BENZ", area: "ABENGOA", horas: 8},
            {id: 13, patente: "LWPP79", marca: "MERCEDES BENZ", modelo: "416", fabricante: "MERCEDES BENZ", area: "ABENGOA", horas: 8},
            {id: 14, patente: "LWPP77", marca: "MERCEDES BENZ", modelo: "416", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 15, patente: "LWPP78", marca: "MERCEDES BENZ", modelo: "416", fabricante: "MERCEDES BENZ", area: "RANCAGUA", horas: 8},
            {id: 16, patente: "LJSJ82", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 17, patente: "RJTK27", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 18, patente: "RJTK31", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 19, patente: "RJTK26", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 20, patente: "RKKP26", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8},
            {id: 21, patente: "RKKL73", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "RANCAGUA", horas: 8},
            {id: 22, patente: "RWXX20", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "RANCAGUA", horas: 8},
            {id: 23, patente: "RWXX28", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "ASTALDI", horas: 8},
            {id: 24, patente: "RWXX32", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "RANCAGUA", horas: 8},
            {id: 25, patente: "RKJC55", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "ASTALDI", horas: 8},
            {id: 26, patente: "RKJC57", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "ASTALDI", horas: 8},
            {id: 27, patente: "RKJC58", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", area: "ASTALDI", horas: 8},
            {id: 29, patente: "PPCW88", marca: "MERCEDES BENZ", modelo: "516", fabricante: "MERCEDES BENZ", codigo_serie: "65195800000000", area: "RANCAGUA", anio: 2021},
            {id: 30, patente: "SLHP58", marca: "MERCEDES BENZ", modelo: "O 500", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8, anio: 2023},
            {id: 31, patente: "KVBS42", marca: "Mercedes Benz", area: "HUERTOS FAMILIARES", horas: 8},
            {id: 32, patente: "JLZY79", area: "HUERTOS FAMILIARES", horas: 8},
            {id: 33, patente: "KWZH63", marca: "MERCEDES BENZ", modelo: "515", area: "HUERTOS FAMILIARES", horas: 8},
            {id: 34, patente: "TBRJ54", marca: "FUSO", modelo: "FUSO", area: "RANCAGUA", horas: 8},
            {id: 35, patente: "RSVF91", marca: "MERCEDES BENZ", modelo: "SPRINTER 516 CDI", fabricante: "MERCEDES BENZ", codigo_serie: "65195800000000", area: "RANCAGUA", horas: 8, anio: 2022},
            {id: 36, patente: "LZRJ68", horas: 8},
            {id: 37, patente: "KYWJ67", area: "HUERTOS FAMILIARES", horas: 8},
            {id: 38, patente: "HKDG80", area: "RANCAGUA", horas: 8},
            {id: 39, patente: "GZSP55", horas: 8},
            {id: 40, patente: "SYLY37", marca: "FUSO", horas: 8},
            {id: 41, patente: "JWZH22", area: "RANCAGUA", horas: 8},
            {id: 42, patente: "TKXF25", marca: "SCANIA", area: "RANCAGUA", horas: 8},
            {id: 43, patente: "KVBS41", area: "HUERTOS FAMILIARES", horas: 8},
            {id: 44, patente: "LJLF15", marca: "MERCEDES BENZ", modelo: "SPRINTER 516", area: "GARDILCIC", horas: 8, anio: 2019},
            {id: 45, patente: "TDDW16", marca: "MERCEDES BENZ", modelo: "419 4X4 AT", area: "RANCAGUA", horas: 8},
            {id: 46, patente: "TDDW18", marca: "MERCEDES BENZ", modelo: "SPRINTER 419 4X4", area: "RANCAGUA", horas: 8},
            {id: 47, patente: "SYLZ52", marca: "MERCEDES BENZ", modelo: "SPRINTER 517 4X4", area: "RANCAGUA", horas: 8},
            {id: 48, patente: "TDDW20", marca: "MERCEDES BENZ", modelo: "SPRINTER 419 4X4", area: "RANCAGUA", horas: 8},
            {id: 28, patente: "SLHP57", marca: "MERCEDES BENZ", modelo: "BUS O 500", fabricante: "MERCEDES BENZ", area: "GARDILCIC", horas: 8}
        ];

        db.transaction(function(tx) {
            // Primero verificar si ya existen datos para no duplicar
            tx.executeSql('SELECT COUNT(*) as count FROM maquinas', [], function(tx, result) {
                var count = result.rows.item(0).count;
                
                if (count === 0) {
                    // Insertar datos solo si la tabla está vacía
                    insertarLotes(tx, datosIniciales, 0);
                }
            });
        }, function(error) {
            console.error('Error al verificar datos existentes:', error);
        });
    }

    function insertarLotes(tx, datos, index) {
        if (index >= datos.length) {
            console.log('Todos los datos iniciales insertados correctamente');
            cargarMaquinas();
            return;
        }

        var maquina = datos[index];
        var query = `INSERT INTO maquinas (
            id, patente, marca, modelo, fabricante, codigo_serie, observaciones, 
            fotografia, mttr, area, horas, anio
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        var params = [
            maquina.id,
            maquina.patente || null,
            maquina.marca || null,
            maquina.modelo || null,
            maquina.fabricante || null,
            maquina.codigo_serie || null,
            'Ninguna', // observaciones
            null, // fotografia
            maquina.mttr || 0, // mttr
            maquina.area || null,
            maquina.horas || 8,
            maquina.anio || null
        ];

        tx.executeSql(query, params, 
            function() {
                // Insertar siguiente registro
                insertarLotes(tx, datos, index + 1);
            },
            function(tx, error) {
                console.error('Error al insertar máquina ID ' + maquina.id + ':', error);
                // Continuar con el siguiente a pesar del error
                insertarLotes(tx, datos, index + 1);
            }
        );
    }

    // ... (resto del código permanece igual)
}, false);