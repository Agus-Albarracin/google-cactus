import axios from 'axios';

interface Credential {
  credential?: string;
}

interface DecodedToken {
  header: any;
  payload: any;
}



export default async function xpicker(endpoint: string, credentialResponse: Credential): Promise<DecodedToken> {
  const { credential } = credentialResponse;

  if (!credential) {
    throw new Error("Token is undefined.");
  }

  const parts = credential.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }
     
/** The atob() function is a built-in JavaScript function used to decode a string that has been encoded in Base64.
    
    It decodes the first part of the token (the header) from Base64,
     then converts it from JSON to a JavaScript object using JSON.parse().
    
    La función atob() es una función incorporada de JavaScript que se utiliza para decodificar una cadena
     que ha sido codificada en Base64.
    
    Decodifica la primera parte del token (el encabezado) de Base64 y luego la convierte de JSON 
    a un objeto JavaScript utilizando JSON.parse.
    
    Agus Albarracin <- */

  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));

  if (!axios) {
        console.warn('%cWarning: 🌵CACTUS \n 🚨AXIOS LIBRARY IS NOT INSTALLED. PLEASE INSTALL AXIOS TO USE THIS FUNCTION -> 🚨 XPICKER 🚨', 'background-color: yellow; color: black; font-weight: bold; font-size: 16px');
    }  // Check if axios is available

      try {
          await axios.post(endpoint, { token: credential });
          // Send POST to endpoint with the token
          // Realizar la solicitud POST al endpoint con el token
  } catch (error) {
    console.error("%cWarning: 🌵CACTUS \n 🚨THE USER ALREADY EXISTS IN THE DATABASE, TRY LOGIN🙃 -> 🚨 XPICKER 🚨",
     "background-color: black; color: red; font-weight: bold; font-size: 16px", error);
    // You can handle the error if need it
    // Puedes manejar el error según sea necesario, lanzar una excepción, etc.
    throw new Error('Error sending token to server');
  }

  return { header, payload };
}
