document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Crear o abrir la base de datos
  var db = window.sqlitePlugin.openDatabase({ name: 'mantenciones.db', location: 'default' });

  // Crear tabla si no existe
  db.transaction(function(tx) {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS maquinas (
      id INTEGER PRIMARY KEY,
      maquina TEXT,
      marca TEXT,
      modelo TEXT,
      fabricante TEXT,
      codigo_serie TEXT,
      observaciones TEXT,
      fotografia TEXT,
      mttr INTEGER,
      area TEXT,
      horas INTEGER,
      anio INTEGER
    )`);
  }, function(error) {
    console.error("Error al crear la base de datos: " + error.message);
  }, function() {
    console.log("Base de datos creada correctamente.");
  });
}
