# <a href="https://nodejs.org/es/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" alt="nodejs" width="40" height="40"/> </a> Node.js | Microservicio DevOps

Este microservicio expone un endpoint REST `/DevOps` protegido con una API Key y un JWT. 
Está diseñado para ser escalable y probado bajo un entorno Docker con balanceo de carga. 
A continuación, se proporcionan las instrucciones detalladas para ejecutar y probar el microservicio.

## Requisitos

- Node.js (v16 o superior)
- Docker y Docker Compose
- Git
- `curl` para probar el endpoint

## Pasos para configurar y ejecutar el microservicio

### 1. Clonar el repositorio y configurar el entorno

Primero, debes clonar este repositorio y configurar las variables de entorno:

```bash
git clone [demo_devops_microservice](https://github.com/Parterdev/demo_devops_microservice)
cd demo_devops_microservice
cp .env.example .env
```

Edita el archivo `.env` y rellénalo con los valores necesarios, como la API Key y la clave secreta (4. Generar un JWT):

```plaintext
API_KEY=your_api_key_here
SECRET_KEY=your_secret_key_here
```

### 2. Instalar dependencias y ejecutar en desarrollo

Instala las dependencias del proyecto:

```bash
npm install
```

Luego, puedes ejecutar el microservicio en modo desarrollo en el puerto 3000 usando:

```bash
npm run dev
```

Esto iniciará el servidor en el puerto 3000.

### 3. Probar el microservicio

Para probar el microservicio una vez que esté en funcionamiento, realiza una solicitud POST al endpoint `/DevOps` utilizando `curl`. Debes incluir la API Key y el JWT en los encabezados de la solicitud:

```bash
curl -X POST -H "X-Parse-REST-API-Key: your_api_key_here" -H "X-JWT-KWY: <your_jwt_token_here>" -H "Content-Type: application/json" -d '{"message":"This is a test", "to":"Juan Perez", "from":"Rita Asturia", "timeToLifeSec":45}' http://localhost/DevOps
```

Si la solicitud es exitosa, recibirás la siguiente respuesta:

```json
{
  "message": "Hello Juan Perez your message will be send"
}
```

### 4. Generar un JWT

Para obtener un JWT que puedas usar en las solicitudes, puedes llamar al siguiente endpoint:

```bash
curl http://localhost/generate-token
```

Esto devolverá un JWT que podrás usar en tus pruebas.

### 5. Ejecutar en Docker con NGINX

Puedes desplegar el microservicio en un entorno de producción usando Docker y NGINX como balanceador de carga. Para hacerlo, primero debes construir y levantar los contenedores:

```bash
docker-compose up --build
```

Este comando levantará 3 réplicas del microservicio y configurará NGINX para balancear la carga en el puerto 80.

### 6. Verificar el balanceo de carga

Para verificar que el balanceo de carga está funcionando, puedes hacer varias solicitudes consecutivas al endpoint `/generate-token`:

```bash
for i in {1..5}; do curl http://localhost/generate-token; done
```

Recibirás diferentes respuestas del token generadas por las diferentes réplicas del microservicio.

### 7. Ejecutar pruebas unitarias

Este proyecto incluye pruebas unitarias que puedes ejecutar con Jest. Para correr las pruebas, usa:

```bash
npm test
```

Esto ejecutará las pruebas unitarias del proyecto.

### 8. Cobertura de pruebas

Para generar un informe de cobertura de las pruebas, usa:

```bash
npm run test:coverage
```

Esto generará un reporte detallado de la cobertura de las pruebas en el proyecto.

### 9. CI/CD con GitHub Actions

Este proyecto incluye un pipeline de CI/CD configurado con GitHub Actions. El pipeline se ejecuta automáticamente en cada push a la rama `main` y tiene las siguientes etapas: build y test.

El archivo de configuración del pipeline está en `.github/workflows/node.js.yml` y realiza los siguientes pasos:

1. **Checkout del código**: Obtiene el código del repositorio.
2. **Configuración de Node.js**: Configura la versión de Node.js (v14).
3. **Instalación de dependencias**: Ejecuta `npm install` para instalar las dependencias.
4. **Compilación del proyecto**: Ejecuta `npm run build` para compilar el código TypeScript.
5. **Revisión de código estático**: Ejecuta ESLint para revisar el código.
6. **Ejecución de tests**: Ejecuta las pruebas unitarias con Jest.

### License

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

