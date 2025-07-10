// www/js/database.js

// Clave para el almacenamiento
const STORAGE_KEY = 'bdmaquinas_data';

// Función para obtener la ruta del archivo JSON
function getDatabasePath() {
    return cordova.file.dataDirectory + 'BDmaquinas.json';
}

// Función para leer el archivo JSON
function leerDatos(callback) {
    window.resolveLocalFileSystemURL(getDatabasePath(), 
        function(fileEntry) {
            fileEntry.file(function(file) {
                const reader = new FileReader();
                
                reader.onloadend = function(e) {
                    try {
                        const data = JSON.parse(this.result);
                        callback(data);
                    } catch (error) {
                        console.error("Error al parsear JSON:", error);
                        callback(null);
                    }
                };
                
                reader.readAsText(file);
            }, function(error) {
                console.error("Error al leer archivo:", error);
                callback(null);
            });
        }, 
        function(error) {
            // Si el archivo no existe, creamos uno nuevo
            const datosIniciales = {
                fechaCreacion: new Date().toISOString(),
                maquinas: []
            };
            
            guardarDatos(datosIniciales, function(success) {
                callback(success ? datosIniciales : null);
            });
        }
    );
}

// Función para guardar datos en el archivo JSON
function guardarDatos(datos, callback) {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, 
        function(directoryEntry) {
            directoryEntry.getFile('BDmaquinas.json', 
                { create: true }, 
                function(fileEntry) {
                    fileEntry.createWriter(function(fileWriter) {
                        fileWriter.onwriteend = function(e) {
                            if (callback) callback(true);
                        };
                        
                        fileWriter.onerror = function(e) {
                            console.error("Error al escribir archivo:", e);
                            if (callback) callback(false);
                        };
                        
                        const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
                        fileWriter.write(blob);
                    });
                }, 
                function(error) {
                    console.error("Error al obtener archivo:", error);
                    if (callback) callback(false);
                }
            );
        }, 
        function(error) {
            console.error("Error al acceder al directorio:", error);
            if (callback) callback(false);
        }
    );
}

// Función para agregar una máquina
function agregarMaquina(maquinaData, callback) {
    leerDatos(function(data) {
        if (!data) {
            if (callback) callback(false, "Error al leer los datos");
            return;
        }
        
        // Generar nuevo ID
        const nuevoId = data.maquinas.length > 0 ? 
            Math.max(...data.maquinas.map(m => parseInt(m.id))) + 1 : 1;
        
        maquinaData.id = nuevoId.toString();
        data.maquinas.push(maquinaData);
        
        guardarDatos(data, function(success) {
            if (callback) callback(success, success ? maquinaData.id : "Error al guardar");
        });
    });
}

// Función para obtener todas las máquinas
function obtenerMaquinas(callback) {
    leerDatos(function(data) {
        if (!data) {
            if (callback) callback([]);
            return;
        }
        callback(data.maquinas || []);
    });
}

// Función para eliminar una máquina
function eliminarMaquina(id, callback) {
    leerDatos(function(data) {
        if (!data) {
            if (callback) callback(false);
            return;
        }
        
        const nuevaLista = data.maquinas.filter(m => m.id !== id);
        data.maquinas = nuevaLista;
        
        guardarDatos(data, function(success) {
            if (callback) callback(success);
        });
    });
}

// Función para obtener una máquina por ID
function obtenerMaquinaPorId(id, callback) {
    leerDatos(function(data) {
        if (!data) {
            if (callback) callback(null);
            return;
        }
        
        const maquina = data.maquinas.find(m => m.id === id);
        callback(maquina || null);
    });
}

// Función para actualizar una máquina
function actualizarMaquina(id, maquinaData, callback) {
    leerDatos(function(data) {
        if (!data) {
            if (callback) callback(false);
            return;
        }
        
        const index = data.maquinas.findIndex(m => m.id === id);
        if (index === -1) {
            if (callback) callback(false);
            return;
        }
        
        // Mantener el ID original
        maquinaData.id = id;
        data.maquinas[index] = maquinaData;
        
        guardarDatos(data, function(success) {
            if (callback) callback(success);
        });
    });
}