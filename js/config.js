// www/js/config.js
const SUPABASE_URL = 'https://postgres.cswjdvjlfztewtmkrxsh.supabase.co';
const SUPABASE_KEY = '[YOUR-PASSWORD]'; // Reemplaza con tu clave real

// Tabla de máquinas en Supabase
const TABLA_MAQUINAS = 'maquinas';

// Inicializar Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Exportar configuración
window.config = {
  supabase,
  TABLA_MAQUINAS
};