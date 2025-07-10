<script>
    // Variable para la base de datos
    var db = null;
    var dbInitialized = false;
    var isBrowser = !window.cordova;

    // Función para inicializar la base de datos
    function initDB() {
        return new Promise((resolve, reject) => {
            if (isBrowser) {
                // Modo navegador - usar IndexedDB
                console.log("Usando IndexedDB en navegador");
                const request = indexedDB.open('bdmaquinas', 1);
                
                request.onupgradeneeded = function(event) {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains('maquinas')) {
                        const store = db.createObjectStore('maquinas', { keyPath: 'id', autoIncrement: true });
                        store.createIndex('patente', 'patente', { unique: false });
                        store.createIndex('marca', 'marca', { unique: false });
                        console.log('Estructura de IndexedDB creada');
                    }
                };
                
                request.onsuccess = function(event) {
                    db = event.target.result;
                    dbInitialized = true;
                    console.log('IndexedDB abierto con éxito');
                    resolve(db);
                };
                
                request.onerror = function(event) {
                    console.error('Error al abrir IndexedDB:', event.target.error);
                    reject(event.target.error);
                };
            } else {
                // Modo dispositivo - usar SQLite Plugin
                console.log("Usando SQLite Plugin");
                db = window.sqlitePlugin.openDatabase({
                    name: 'bdmaquinas.db',
                    location: 'default'
                }, function(db) {
                    dbInitialized = true;
                    db.transaction(function(tx) {
                        tx.executeSql(
                            `CREATE TABLE IF NOT EXISTS maquinas (
                                id INTEGER PRIMARY KEY AUTOINCREMENT,
                                patente TEXT,
                                marca TEXT,
                                modelo TEXT,
                                fabricante TEXT,
                                codigo_serie TEXT,
                                area TEXT,
                                horas INTEGER DEFAULT 0,
                                anio INTEGER,
                                observaciones TEXT
                            )`,
                            [],
                            function() {
                                console.log('Tabla maquinas creada (SQLite)');
                                resolve(db);
                            },
                            function(tx, error) {
                                console.error('Error al crear tabla (SQLite):', error);
                                reject(error);
                            }
                        );
                    });
                }, function(error) {
                    console.error('Error al abrir la base de datos:', error);
                    reject(error);
                });
            }
        });
    }

    // Función para obtener máquinas (IndexedDB)
    function obtenerMaquinas() {
        return new Promise((resolve, reject) => {
            if (!dbInitialized) {
                reject(new Error('Base de datos no inicializada'));
                return;
            }

            if (isBrowser) {
                // Versión IndexedDB
                const transaction = db.transaction(['maquinas'], 'readonly');
                const store = transaction.objectStore('maquinas');
                const request = store.getAll();
                
                request.onsuccess = function(event) {
                    resolve(event.target.result);
                };
                
                request.onerror = function(event) {
                    reject(event.target.error);
                };
            } else {
                // Versión SQLite
                db.transaction(function(tx) {
                    tx.executeSql(
                        'SELECT * FROM maquinas ORDER BY id DESC',
                        [],
                        function(tx, result) {
                            var maquinas = [];
                            for (var i = 0; i < result.rows.length; i++) {
                                maquinas.push(result.rows.item(i));
                            }
                            resolve(maquinas);
                        },
                        function(tx, error) {
                            reject(error);
                        }
                    );
                });
            }
        });
    }

    // Función para insertar máquina (IndexedDB)
    function insertarMaquina(maquinaData) {
        return new Promise((resolve, reject) => {
            if (isBrowser) {
                const transaction = db.transaction(['maquinas'], 'readwrite');
                const store = transaction.objectStore('maquinas');
                const request = store.add(maquinaData);
                
                request.onsuccess = function(event) {
                    resolve(event.target.result); // Retorna el ID
                };
                
                request.onerror = function(event) {
                    reject(event.target.error);
                };
            } else {
                // Versión SQLite (tu implementación original)
            }
        });
    }

    // Resto de tus funciones (mostrarEstado, cargarMaquinas, etc.)
    // ... mantén el mismo código que tenías antes ...

    // Inicialización automática
    if (isBrowser) {
        console.log("Ejecutando en navegador - inicializando IndexedDB");
        document.addEventListener('DOMContentLoaded', function() {
            cargarMaquinas();
        });
    } else {
        console.log("Ejecutando en dispositivo - esperando deviceready");
        document.addEventListener('deviceready', function() {
            console.log('Device ready');
            cargarMaquinas();
        }, false);
    }

    window.reintentarCarga = function() {
        cargarMaquinas();
    };
</script>