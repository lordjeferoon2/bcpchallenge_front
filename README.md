# 🧠 Chatbot Cliente - Angular + FastAPI

Este proyecto es una aplicación web de chat construida con **Angular 17** y conectada a un backend en **FastAPI**, desplegada en **Azure App Service** con integración continua desde **GitHub**.

---

## 🚀 Tecnologías

- **Angular 17**
- **PrimeNG** (UI elegante y accesible)
- **FastAPI** (backend)
- **Azure App Service** (deploy)
- **GitHub Actions** (CI/CD)

---

## 📦 Instalación local

### 1. Clona el proyecto

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Configura variables de entorno

Crea el archivo:

```bash
cp src/environments/environment.ts src/environments/environment.prod.ts
```

Y edita los archivos `environment.ts` y `environment.prod.ts` con tu backend:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api' // o URL de Azure
};
```

---

## 🧪 Levantar en desarrollo

```bash
ng serve
```

---

## 🛠️ Compilar para producción

```bash
ng build --configuration production
```

---

## ☁️ Deploy a Azure con GitHub

1. Sube este repo a GitHub
2. Entra al [portal de Azure](https://portal.azure.com)
3. Crea un **App Service**
4. En el paso "Deploy", elige **GitHub** y selecciona este repo
5. Azure generará automáticamente un flujo de CI/CD con **GitHub Actions**

---

## 🧹 Borrar conversación

Haz clic en el botón 🗑️ para limpiar el historial del chat **y reiniciar el `session_id`**.

---

## 📄 Licencia

MIT
