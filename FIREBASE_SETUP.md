# 🔥 Configuración Rápida de Firebase

## Paso 1: Crear Proyecto Firebase (5 minutos)

1. Ve a https://console.firebase.google.com/
2. Clic en **"Crear un proyecto"**
3. Nombre: `datawizard-calendar`
4. Desactiva Google Analytics (opcional)
5. Clic en **"Crear proyecto"**

## Paso 2: Configurar Firestore Database

1. Menú lateral → **Firestore Database**
2. Clic en **"Crear base de datos"**
3. Selecciona **"Iniciar en modo de prueba"**
4. Ubicación: `us-central` (o la más cercana)
5. Clic en **"Habilitar"**

## Paso 3: Configurar Storage

1. Menú lateral → **Storage**
2. Clic en **"Comenzar"**
3. Selecciona **"Iniciar en modo de prueba"**
4. Clic en **"Listo"**

## Paso 4: Obtener Configuración

1. En **Project Overview** → ⚙️ **Configuración del proyecto**
2. Scroll down → **Tus aplicaciones** → Clic en **</>** (Web)
3. Nombre de la app: `datawizard-calendar-web`
4. **NO marques** "Firebase Hosting"
5. Clic en **"Registrar app"**
6. **COPIA** el objeto `firebaseConfig`

Verás algo como:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## Paso 5: Crear archivo .env

Crea el archivo `.env` en la raíz del proyecto con estos valores (reemplaza con los tuyos):

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

## Paso 6: Reconstruir Docker

```bash
# Detener el contenedor actual
Ctrl + C

# Reconstruir e iniciar
docker-compose up --build
```

## ✅ Listo!

Firebase está configurado. Los archivos ya creados:
- ✅ `src/firebase/config.js` - Configuración
- ✅ `src/firebase/eventService.js` - Servicios CRUD
- ✅ `package.json` - Firebase agregado

**Siguiente paso:** Integrar Firebase en el componente del calendario.
