Claro, acá te dejo un README básico para tu proyecto de registro de equipos con Vue y Firebase. Lo podés copiar y ajustar según necesites.

---

# Highline Registro

Registro simple de equipos con Vue.js y Firebase.

## Descripción

Aplicación para gestionar registros de "pegues" y lavados/mantenimientos de equipos.
Permite:

* Listar equipos.
* Agregar y editar registros de pegues.
* Agregar y editar registros de lavado/mantenimiento.
* Guardar datos en Firebase Firestore.

---

## Tecnologías usadas

* [Vue.js 3](https://vuejs.org/)
* [Firebase Firestore](https://firebase.google.com/products/firestore)
* [Vite](https://vitejs.dev/) para el bundling
* (Opcional) FontAwesome para íconos

---

## Instalación

1. Clonar repositorio

```bash
git clone https://github.com/tu-usuario/highline-registro.git
cd highline-registro
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar Firebase

* Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
* Copiar configuración Firebase y pegar en archivo `src/firebase/config.js` (o donde tengas la configuración)
* Configurar reglas Firestore para lectura/escritura según tu necesidad

4. Correr la app en desarrollo

```bash
npm run dev
```

---

## Uso

* En la lista de equipos, seleccionar uno para ver detalles.
* En detalles, podés agregar registros de pegues y lavados.
* Los formularios se abren en modales.
* Puedes editar o borrar registros (editar/borrar puede no estar implementado).

---

## Scripts disponibles

* `npm run dev`: corre servidor de desarrollo.
* `npm run build`: crea build para producción.
* `npm run preview`: preview del build de producción.

---

## Consideraciones

* Algunas funcionalidades de editar y borrar están en proceso.
* Se recomienda manejar las reglas de seguridad de Firebase según usuarios.
* La UI usa componentes modales para formularios.

---

## Contribuciones

Pull requests y sugerencias son bienvenidas.

---

## Open Source (freee network!)


By AS