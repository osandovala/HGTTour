window.database = {

    initialize: function () {
        return new Promise(function (resolve, reject) {
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dir) {
                dir.getFile("bdmaquinas.txt", { create: true }, function (file) {
                    file.file(function (fileObj) {
                        const reader = new FileReader();
                        reader.onloadend = function () {
                            if (!this.result) {
                                // Si el archivo está vacío, crear lista vacía
                                database.guardarMaquinas([]).then(resolve).catch(reject);
                            } else {
                                resolve();
                            }
                        };
                        reader.onerror = reject;
                        reader.readAsText(fileObj);
                    }, reject);
                }, reject);
            }, reject);
        });
    },

    leerMaquinas: function () {
        return new Promise(function (resolve, reject) {
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory + "bdmaquinas.txt", function (file) {
                file.file(function (fileObj) {
                    const reader = new FileReader();
                    reader.onloadend = function () {
                        try {
                            const datos = JSON.parse(this.result || "[]");
                            resolve(datos);
                        } catch (err) {
                            reject(err);
                        }
                    };
                    reader.onerror = reject;
                    reader.readAsText(fileObj);
                }, reject);
            }, function () {
                resolve([]); // Si no existe, lista vacía
            });
        });
    },

    guardarMaquinas: function (listaMaquinas) {
        return new Promise(function (resolve, reject) {
            const datos = JSON.stringify(listaMaquinas, null, 2);
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dir) {
                dir.getFile("bdmaquinas.txt", { create: true }, function (file) {
                    file.createWriter(function (writer) {
                        writer.onwriteend = resolve;
                        writer.onerror = reject;
                        writer.write(datos);
                    }, reject);
                }, reject);
            }, reject);
        });
    },

    obtenerMaquinas: function () {
        return this.leerMaquinas();
    },

    agregarMaquina: function (maquina) {
        return new Promise((resolve, reject) => {
            this.leerMaquinas().then(function (lista) {
                maquina.id = Date.now();
                lista.push(maquina);
                return database.guardarMaquinas(lista);
            }).then(resolve).catch(reject);
        });
    },

    eliminarMaquina: function (id) {
        return new Promise((resolve, reject) => {
            this.leerMaquinas().then(function (lista) {
                const nuevaLista = lista.filter(m => m.id !== id);
                return database.guardarMaquinas(nuevaLista);
            }).then(resolve).catch(reject);
        });
    }
};

