# 📅 DataWizard Calendar

Un calendario de eventos interactivo y moderno construido con React, Vite y Tailwind CSS.

## 🚀 Ejecutar con Docker

### Opción 1: Docker Compose (Recomendado)

```bash
# Construir y ejecutar el contenedor
docker-compose up --build

# Para detener el contenedor
docker-compose down
```

### Opción 2: Docker directo

```bash
# Construir la imagen
docker build -t datawizard-calendar .

# Ejecutar el contenedor
docker run -p 5173:5173 -v ${PWD}:/app -v /app/node_modules datawizard-calendar
```

## 🌐 Acceder a la aplicación

Una vez que el contenedor esté ejecutándose, abre tu navegador en:

**http://localhost:5173**

## ✨ Características

- 📆 Vista mensual del calendario
- ➕ Agregar eventos con banners personalizados
- 🎨 Diferentes tipos de eventos con colores
- 🔗 Soporte para enlaces de reuniones (Google Meet, Zoom, Discord)
- 🖼️ Carga de imágenes para banners de eventos
- 📱 Diseño responsive y moderno
- 🌙 Tema oscuro elegante

## 🛠️ Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos
- **Docker** - Containerización

## 📝 Uso

1. Haz clic en cualquier día del calendario para agregar un evento
2. Completa el formulario con los detalles del evento
3. Opcionalmente, sube una imagen de banner
4. Haz clic en un evento para ver sus detalles completos
5. Usa el botón de eliminar (X) para borrar eventos

## 🔧 Desarrollo sin Docker

Si prefieres ejecutar sin Docker:

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

---

Creado con ❤️ usando React y Docker
