<br><br><h1 align="center"> 🌵 🌵 🌵🌵 🌵 🌵 google-cactus 🌵 🌵 🌵🌵 🌵 🌵</h1>
get npm page: https://www.npmjs.com/package/google-cactus

<br><br>

## 👣 First step

Al montar el componente como explica en la documentación de la libreria: ( obtén más información desde npm: https://www.npmjs.com/package/@react-oauth/google ), el componente se monta de manera éxitosamente.
Puedes ver incluso en la consola la respuesta de manera que la misma contiene las credenciales del usuario.

A diferencia de hace unos años, cuando se usaba la libreria de **react-google-login:** ( obtén más información desde npm: https://www.npmjs.com/package/react-google-login , **esta libreria se encuentra obsoleta.** ), la libreria de **@react-oauth/google** no devuelve el objeto profileObj, el cual obtenias el objeto de con la información de usuario.
**Es importante aclarar** que esta libreria no pertenece directamente al equipo de React y recomiendo usar las librerias que empiecen con **@react** que son de la organización.
<br><br> 

![profile object -> @react-oauth/google ](https://res.cloudinary.com/do1hcqjpe/image/upload/v1713482672/nussxjqhujvyqikhypno.jpg)
<br><br>


## Peticiones

Normalmente cuando instalamos este componente estamos recurriendo a querer verificar usuarios a través de las cuentas de google, no obstante podremos utilizar los datos para cargar nuestra base de datos.

**Ejemplo:** Supongamos que se tratase de una tienda en la nube y queremos registrar usuarios de manera segura, esta sería una buena idea de registrar usuarios y a través de la propiedad googleId que proporciona nuestro querido Google, podremos tenes un registro de usuarios con un id único para cada uno, además de los atributos que queramos agregarle a nuestro esquemas, modelos, en fin...

Necesitaremos de un Back-end en donde se procesen nuestras peticiones y podamos comunicar el front-end con nuestro servidor, por lo tanto vamos a requerir de hacer peticiones, en este caso POST, para crear usuarios.

Y es acá en donde propongo soluciones pero para entender de que se trata primero quiero mostrarte algunos posibles errores al utilizar este componente que nos brinda React / Google.
<br><br>

![Error al post, react-google-login](https://res.cloudinary.com/do1hcqjpe/image/upload/v1713481447/k8lnyqsbq66mgyk5kah8.jpg)
<br><br>

Este error es concurrente a la hora de programar...

Estamos intentando hacer una petición post de las credenciales que obtenemos a través de nuestra función onSuccess que brinda la libreria. Pero al momento de desencriptarla obtenemos errores como este.
Necesitamos de librerias externas sobre JWT e incluso aún así aseguro que podrían llegar a tener errores en la consola y requieren de un profundo entendimiento sobre la libreria y como funciona por detrás todo este sistema para llegar a la obtención del controlador bien hecho para registrar al usuario.

Otra de las opciones que también he utilizado y es concurrente observar, siguiendo con la linea de Google es la libreria **google-auth-library** que no ofrece el método **OAuth2Client** el cual utilizamos para hacer una nueva instancia de nuestro **id de cliente** que nos brinda **Google Cloud** al utilizar APIs y servicios para poner nuestra App en producción.
En esta instancia deberian conocer la libreria para poder decodificar las credenciales que devuelve el inicio de sesión... por lo que afirmo que podrian estar horas o días incluso según el entendimiento que desean tener sobre la misma.
Acá les dejo algunos de los metodos que les podría interesar: **verifyIdToken**, **getPayload**.

Incluso utilizando esta libreria en nuestro controlador podriamos tener errores comúnes como:
<br><br>

![Error al post, google-oauth-library](https://res.cloudinary.com/do1hcqjpe/image/upload/v1713479183/arix4qegjipu1svmqnko.png)
<br><br><br>

## Soluciones

Obviamente no queria dejarlos solos en esto.
Por lo que actualmente dedique a pensar los metodos y la manera en la que pueda facilitarles a aquellos que recién comienzan en este mundo de la programación y están intentando llevar a cabo:

- Proyectos individuales.
- Proyectos de estudios.
- Trabajos freelance.
- Trabajos competitivos.

No crean que solo es para principiantes... también me voy a ocupar de que pueda ser utilizado en el ámbito competitivo ya que es una manera muy práctica de consumir los datos del cliente directamente a través de un objeto que nos envia el front.

### Tranquilo
Esta manera de enviar datos no desproteje nuestro datos sensibles, es una manera de poder acceder más alla de lo que nos propone React/Google.
Haciendo mucho más fácil la utilidad de propiedades de las credenciales a través del token que nos proporciona, otra vez Google.
**¿Qué quiero decir con ésto?...**
Que ésta información no es infalible, de manera que si no no estaría proporcionando esta habilidad. Creo que un programador con el suficiente conocimiento en la especialidad supiera conocer de que manera solucionarlo, no es algo imposible, pero tampoco es algo que se vea mucho.

<br><br>

# CLIENTE - google-cactus/cli

# Método xpicker 👷

## ⚙️ Configuración del componente
El método **xpicker()** es nuestro operario estrella, trabaja en seleccionar, organiza, prepara y envia.
recibe 2 argumentos : 
- el endpoint, que debe ser un string.
- y el objeto credentialResponse que nos brinda el componente de React / Google.

Y con esta simple linea de código reduzco las cantidad de lineas de código y tiempo que necesitas para crear los usuarios en tu base de datos, a través de la Autenticación que nos brinda React / Google.

Recordá que siempre que se trate de peticiones usar async function.
Este es uno de los ejemplos de control básico de como debes configurar el componente :

<br>


```javascript
import { GoogleLogin } from '@react-oauth/google';
import xpicker from 'google-cactus/cli'; 


const GoogleLoginComponent: React.FC = () => {

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        console.log(credentialResponse);

          const decodedToken = await xpicker('/api/signin', credentialResponse);
          console.log('Decoded token:', decodedToken);
      }}

      onError={() => { console.log('Login Failed');  }}

      useOneTap
    />
  );
};

export default GoogleLoginComponent;
```
<br>


Si deseas manejar las funciones en el cuerpo del componente y agregar estilos al componente, que brinda la libreria **@react-oauth/google**, puedes obtar por algo como ésto:

<br>


````javascript
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import xpicker from 'google-cactus/cli'; 


const  GoogleLoginComponent: React.FC = () => {

    const onSuccess = async (credentialResponse: CredentialResponse) => {
      console.log(credentialResponse);

      const decodedToken = await xpicker("http://localhost:3001/yourEndPoint", credentialResponse);
      console.log("Decoded token:", decodedToken);
    }
  
    const onError = () => {
      console.log('Login Failed');
    };

    return (
        <>
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
            useOneTap={true}
            theme="filled_black"
            text="continue_with"
            shape="pill"
            width="200px"
          />
        </>
    );
};
export default GoogleLoginComponent;
````

<br><br>

# SERVER - google-cactus/srv

# Método xops 🏭

## ⚙️ Configuración del controlador


El **método xops** hace referencia a una fábrica. 
Este método se encarga de recibir los productos como: el cliente, el ID de la API, la request, la response y el modelo que creaste en la base de datos para tu usuario, como la materia prima, para crear y depositar los usuarios en tu base de datos.

La fábrica le fácilita al developer las lineas de códigos de en su controlador, la ventajas que contiene usar esta pequeña pymes:

- Prolijidad del código.
- Reducción de lineas y tiempo.
- Recibe todos los parametros necesarios para crear el usuario en tu base de datos
  - Más tarde podes seguir agrengando o podes modificarlo en el momento que quieras.

  <br>

- Es capaz de procesar cualquier ORM que estes utilizando en tu back-end.
- Este operario cuenta con sus herramientas de try y catch de manera que captura los errores y hace posible la comunicación entre él y el  método (nuestro operario de fábrica **xpicker**) de manera que recibe la captura de error y es capaz de mostrar en consola cuando se produce un error.
  - En cuanto a los errores el único que error que puede llegar a generar es el de "El usuario ya existe en la base de datos" ya que método solo se utiliza para utilización del componente **login** que proporciona @react-oauth/google.

  <br>

- Este flujo de información fue creado con el único propósito de la creación de usuarios.
- Cuenta con los métodos de cualquier ORM en donde busca o crea el usuario para el registro.


**En cuento a su configuración...** podriamos simular un controlador de tu código.

<br>


````javascript

import { Request, Response } from "express";
import { OAuth2Client } from 'google-auth-library';

import  xops from 'google-cactus/srv'  // import de xops 

import userModel from "../../models/user.model"
import dotenv from "dotenv"
dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ""; // config the var env with || ""

const client = new OAuth2Client(CLIENT_ID);

export async function signIn(req: Request, res: Response) {
  await xops(client, CLIENT_ID, req, res, userModel);
}
````