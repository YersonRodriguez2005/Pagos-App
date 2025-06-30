# PagosApp 💰

**PagosApp** es una aplicación web desarrollada con **React** que permite registrar, listar, editar y eliminar consignaciones de pagos realizadas por clientes o terceros. Toda la información se almacena localmente en el navegador mediante `localStorage`, sin necesidad de un backend.

## 🛠️ Tecnologías utilizadas

- React (Vite)
- React Router DOM
- TailwindCSS
- React Icons
- LocalStorage

## 📦 Funcionalidades principales

- ✅ Registrar consignaciones con nombre, monto (formato COP) y fecha
- ✅ Listar consignaciones en una tabla interactiva
- ✅ Editar registros existentes con campos prellenados
- ✅ Eliminar registros individualmente
- ✅ Diseño responsive con estilo profesional
- ✅ Iconos descriptivos y accesibilidad básica

## 🚀 Instalación y uso

1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/pagos-app.git
cd pagos-app
```

2. Instala dependencias:

```bash
npm install
```

3. Ejecuta la aplicación:

```bash
npm run dev
```

4. Abre en tu navegador:

```
http://localhost:5173
```

## 🧠 Estructura de carpetas

```
src/
├── components/
│   ├── Create.jsx      # Formulario de creación
│   ├── List.jsx        # Tabla de registros
│   └── Edit.jsx        # Formulario de edición
├── App.jsx             # Rutas principales
├── main.jsx            # Punto de entrada
└── index.css           # Estilos globales (Tailwind)
```

## 📋 Notas adicionales

- Los montos se formatean automáticamente como pesos colombianos (COP) al escribirlos.
- Los datos se mantienen mientras no se limpie el `localStorage` o se borre la caché del navegador.

## 🧑‍💻 Autor

Desarrollado por Yerson Rodriguez - Fullstack Developer MERN 💻

---

**PagosApp** es ideal para pequeños negocios agrícolas o cafeteros que desean llevar un control básico de ingresos sin sistemas complicados.