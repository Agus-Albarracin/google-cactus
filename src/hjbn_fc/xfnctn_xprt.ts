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
  // Send POST to endpoint with the token
  // Realizar la solicitud POST al endpoint con el token
  try {
    const response = await axios.post(endpoint, { token: credential });
    console.log("Response from server:", response.data);
  } catch (error) {
    console.error("%cTHE USER IS ALREADY IN DE DATA BASE, TRY WITH LOGIN 🙃 -> 🚨 XPICKER 🚨",
     "background-color: black; color: red; font-weight: bold; font-size: 16px", error);
    // You can handle the error if need it
    // Puedes manejar el error según sea necesario, lanzar una excepción, etc.
    throw new Error('Error sending token to server');
  }

  return { header, payload };
}

/** XOPS */

import { Request, Response } from "express";
import { OAuth2Client } from 'google-auth-library';


export async function xops(client: OAuth2Client, clientId: string, req: Request, res: Response, userModel: any) {
    const { token } = req.body; // Extrae el token de la solicitud
  
    try {
      // Verifica el token de identificación con el cliente proporcionado y la audiencia (clientId)
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId,
      });
  
      // Obtiene la carga útil (payload) del token
      const payload = ticket.getPayload();
      
      // Si la carga útil está vacía, lanza un error
      if (!payload) {
        throw new Error('Token payload is undefined');
      }
  
      // Extrae información importante de la carga útil
      const { sub, name, email } = payload;
  
      // Busca un usuario en la base de datos utilizando el ID de Google (sub)
      let user = await userModel.findOne({ googleId: sub });
  
      // Si no se encuentra un usuario, crea uno nuevo con la información proporcionada
      if (!user) {
        user = new userModel({
          id: sub,
          googleId: sub,
          email: email,
          name: name,
        });
      }
  
      // Guarda el usuario en la base de datos
      await user.save();
  
      // Envía una respuesta JSON indicando que el inicio de sesión fue exitoso junto con los detalles del usuario
      res.status(200).json({ message: 'Sign-in successful', user });
    } catch (error) {
      // Si ocurre algún error, lo imprime en la consola con un mensaje de advertencia
      console.error('\x1b[31m', '🚨 The controller received an error in the parameters 🚨 XOPS <- 🚨', error);
  
      // Envía una respuesta de error al cliente
      res.status(500).json({ error: 'Internal server error'});
    }
  }
  