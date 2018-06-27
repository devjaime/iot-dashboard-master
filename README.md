


# Angular  IOT Azure Dashboard

Angular Dashboard es un panel de administración para muchos propósitos, enfocado en IoT, hogar inteligente y autonomía.
Este proyecto, es una aplicación completamente funcional y está alojado en `www.lawebdelprogramador.cl/IOT` como una demo de azure con angular. Estoy compartiendo muchos componentes y el flujo de trabajo aquí dentro de este repositorio.

Este proyecto se puede usar para Internet de cosas, informes de tablero, administración de usuarios, monitoreo en vivo y otros
proyectos basados ​​en tablero para angular.


Continuamente actualizare el flujo de trabajo de la aplicación. Puede usar componentes de este proyecto e inspirarse
un tablero de inteligencia puede estar funcionando.
O puede bifurcar este proyecto, o crear su propia aplicación, e importar componentes desde este repositorio


Intente mantener los componentes lo más intactos posible si desea obtener actualizaciones y mejoras semanales. En caso de que su lógica comercial sea diferente de la forma en que estamos implementando la nuestra, intente consultar con nosotros para crear su propia versión,
y aún así obtener el beneficio de las características menores y principales de nuestros desarrolladores y colaboradores.

keywords: zure IOT Dashboard,Internet de las cosas Angular, Tiempo real Angular App

# Características estables
Enumeramos nuestras características estables que funcionan como nivel demo dentro de la aplicación.

* Registro de usuario
* Usuario iniciando sesión
* Restablecimiento de contraseña de usuario
* Recibir solicitudes RESTful entrantes de dispositivos (Arduino, Raspberry Pi)
* Crear dispositivos y administrarlos
* Documentación interactiva para la API
* Crea lugares y ubicaciones según el nombre y el nivel
* Mostrar valor en tiempo real en el tablero
* Soporte de versión móvil usando cordova
* Recopilar información de contacto del usuario por razones técnicas.
* Administrar perfiles de usuario


# Funciones experimentales
* Agregue las condiciones para cambiar los dispositivos
* Leer la ubicación geográfica de los dispositivos para la versión móvil



# Idiomas admitidos

Estamos tratando de cubrir tantos idiomas como sea posible. Por el momento, cubrimos:

* Inglés (Estados Unidos)
* Español (Chile)

Por favor, siéntase libre de contribuir a este repositorio en caso de que quiera agregar su idioma.



## Proceso técnico

* El proyecto se basa en Angular y CLI angular. Para desarrollar, utilice `npm start`, 
que también proporciona HMR, y para el nivel de producción usaremos` npm run build`, 
que llama directamente a las tareas `ng *`.
Revise el paquete.json para diferentes entornos de construcción. * 
Esta aplicación se puede ejecutar sin api o microservicios, 
todos los puntos finales tienen simulaciones interactivas *. 
Dado que cada cliente puede necesitar una forma diferente de compilar la aplicación, simplemente ponemos ejemplos de construcción.
En caso de que esté distribuyendo esta aplicación nuevamente para sus propios fines, 
cree sus propios entornos y agréguelos al archivo `.angular-cli.json` y actualice el paquete, respectivamente

* Estoy utilizando la biblioteca Highcharts para los gráficos https://www.highcharts.com/ . Para cualquier solicitud de extracción entrante que contenga otras librerías de gráficos, abra primero un problema y describa por qué no es posible hacerlo utilizando los gráficos HigjCharts.
* `lodash`, y` ngrx` store se usan mucho para el flujo de datos.
* Los conceptos Async / Await están en todas partes ya que el proyecto es un panel en tiempo real
* No estamos apoyando pruebas unitarias. Solo usamos pruebas de integración / e2e usando ciprés, y se ejecutará para cada solicitud de extracción. En caso de un cálculo pesado o una implementación de datos confidenciales que requiera pruebas unitarias, muévala a otra
paquete, publíquelo en npm y luego instálelo dentro de este repositorio


* La demostración del proyecto se almacena en páginas github; 
http://www.lawebdelprogramador.cl/IOT Por lo tanto, estoy comprometiendo el directorio dist para cada compilación y dado que nuestra carpeta dist no es necesariamente de producción. Sin embargo, necesita construir esta aplicación para usted, ya que esta configuración es diferente.


# Versión móvil (Experimental)
Esta aplicación también se incluirá en una aplicación Cordova para aplicaciones de Android. Pongo los archivos apk en versiones de Github, que no están firmadas. Por favor, siéntase libre de firmarlos en su propio almacén de claves.


Lea sobre la firma de un archivo apk aquí:
https://stackoverflow.com/questions/10930331/how-to-sign-an-already-compiled-apk


luego, puede publicarlo o instalarlo para fines de prueba. Tenga en cuenta que construimos nuestra aplicación con datos falsos,
para que la aplicación no esté conectada a ningún servidor remoto y sea solo para fines de prueba y demostración.
Por favor, bifurque la aplicación y actualice o CI / CD para compilar con su dirección de punto final o configuración adicional.


## Vista previa en vivo

Puede ver la última implementación aquí: [http://www.lawebdelprogramador.cl/IOT](http://www.lawebdelprogramador.cl/IOT)


Estoy organizando la versión demo en github. Para la versión empresarial, contácteme hernandez.hs@gmail.com.


## Copywrite
Este proyecto es gratuito para uso educativo, revisión de código y uso no comercial. Sin embargo agradeceria nombrarme en proyectos empresariales como parte de la idea original
