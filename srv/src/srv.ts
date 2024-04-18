export default async function xops(client: any, clientId: string, req:any, res: any, userModel: any) {
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
      console.error('\x1b[31m', '🌵CACTUS \n 🚨 The controller received an error in the parameters 🚨 XOPS <- 🚨', error);
  
      // Envía una respuesta de error al cliente
      res.status(500).json({ error: 'Internal server error'});
    }
  }
  