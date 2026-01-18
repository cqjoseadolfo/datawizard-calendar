# 📅 DataWizard Calendar

Calendario de eventos interactivo y moderno construido con React, Vite, Tailwind CSS y Docker.

![Calendar Preview](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-purple?logo=vite)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)

## ✨ Características

- 📆 **Vista mensual** del calendario con navegación entre meses
- ➕ **Agregar eventos** con información completa
- 🎨 **Tipos de eventos** con colores personalizados (Reunión, Evento, Conferencia, Taller, Personal)
- 🖼️ **Banners personalizados** para cada evento
- 🔗 **Integración con plataformas** de videoconferencia (Google Meet, Zoom, Discord)
- 🌍 **Múltiples zonas horarias** (Lima 🇵🇪, Colombia 🇨🇴, México 🇲🇽)
- 👤 **Información del ponente** y descripción del evento
- 🌙 **Tema oscuro** elegante con gradientes
- 📱 **Diseño responsive**

## 🚀 Inicio Rápido con Docker

### Prerrequisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

### Ejecutar la Aplicación

```bash
# Clonar el repositorio
git clone https://github.com/cqjoseadolfo/datawizard-calendar.git
cd datawizard-calendar

# Construir y ejecutar con Docker Compose
docker-compose up --build

# La aplicación estará disponible en http://localhost:5173
```

### Detener la Aplicación

```bash
# Presiona Ctrl+C en la terminal, o ejecuta:
docker-compose down
```

## 💻 Desarrollo Local (sin Docker)

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview
```

## 🛠️ Tecnologías

- **React 18** - Framework de UI
- **Vite 6** - Build tool ultrarrápido
- **Tailwind CSS 3** - Framework de estilos utility-first
- **Lucide React** - Iconos modernos
- **Docker** - Containerización

## 📁 Estructura del Proyecto

```
datawizard-calendar/
├── Dockerfile              # Configuración Docker
├── docker-compose.yml      # Orquestación Docker
├── package.json           # Dependencias npm
├── vite.config.js         # Configuración Vite
├── tailwind.config.js     # Configuración Tailwind
├── index.html             # HTML principal
├── public/                # Archivos estáticos
│   ├── datawizard.png    # Logo de marca
│   └── google-meet-icon.png
└── src/
    ├── main.jsx           # Entry point React
    ├── index.css          # Estilos globales
    └── calendario-eventos.jsx  # Componente principal
```

## 🎯 Uso

1. **Agregar un evento**: Haz clic en cualquier día del calendario
2. **Completar el formulario**:
   - Banner (imagen opcional)
   - Título del evento
   - Hora
   - Tipo de evento
   - Plataforma de reunión (opcional)
   - Link de reunión (opcional)
   - Ponente (opcional)
   - Descripción (opcional)
3. **Ver detalles**: Haz clic en un evento para ver toda la información
4. **Eliminar**: Hover sobre un evento y haz clic en la X

## 🌐 Despliegue

### Opción 1: Firebase (Recomendado)

```bash
npm install -g firebase-tools
firebase init
firebase deploy
```

### Opción 2: Vercel

```bash
npm install -g vercel
vercel
```

### Opción 3: Azure Static Web Apps

Conecta tu repositorio desde el portal de Azure para CI/CD automático.

## 📝 Próximas Características

- [ ] Integración con base de datos (Firebase/PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Compartir eventos
- [ ] Exportar a Google Calendar
- [ ] Notificaciones por email
- [ ] Vista semanal y diaria
- [ ] Búsqueda y filtros

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

**Jose Adolfo**
- GitHub: [@cqjoseadolfo](https://github.com/cqjoseadolfo)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
