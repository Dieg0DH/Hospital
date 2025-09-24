### Registro de Usuario:

--------------------------------Registro de Usuario-------------------------------

1. Para el backend en vamos a implementar un end point para recivir la informacion de el registro de un nuevo usuario:

Criterios de Aceptacion:

- El endpoint debe validar que el email tenga un formato correcto.
- La contraseña debe ser almacenada de forma encriptada. (bcrypt es una sugerencia)
- Se debe verificar que el email no este ya registrado en el sistema.
- Al crear la cuenta, se debe generar un identificador unico para el paciente.
- El endpoint debe retornar una respuesta exitosa al frontend con un mensaje de confirmacion.

-------------------------Autenticacion de Usuario (Paciente)-----------------------

2. Vamos a nesecitar implementar un endpoint para que un paciente registrado pueda iniciar sesion, utilizando mail y contrasena:

Criterios de Aceptacion:

- El endpoint debe recibir el mail y la contrasena del paciente.
- Se debe buscar el paciente en la DB por su email.
- La contrasena ingresada debe ser comparada con la contrasena almacenada.
- En caso de autenticacion exitosa, el endpoint debe retornar una respuesta exitosa al frontend con un mensaje de confirmacion.
- En caso de credenciales incorrectas, el endpoint debe retornar un error con un mensaje apropiado.

-------------------------Obtener Horario de Atencion:------------------------------

3. Vamos necesitar definir y presentar el horario de atencion del consultorio medico para que el usuario sepa la ventana de atencion disponible para agendar un turno.

Criterios de Aceptacion:

- El horario de atencion debe ser configurable. Por ejemplo de Lunes a Viernes de 9:00 a 18:00.
- El backend debe tener logica para identificar los fines de semana (Sabado y Domingo) como dias no laborables.
- Se debe implementar un endpoint que retorne el horario de atencion y los dias no laborables.

------------------------------------Creacion de Turno------------------------------

4. Vamos a implementar un endpoint para que un paciente autenticado pueda solicitar un nuevo turno, con fecha y hora incluida.

Criterios de Aceptacion:

- El endpoint debe reconocer a un usuario autenticado para la generacion de una solicitud de turno.
- El endpoint debe recibir la fecha y hora deseada para el turno.
- Se debe validar que la fecha seleccionada no sea un fin de semana (Horario no Laborable).
- Se debe validar que la hora seleccionada este dentro del horario de atencion del consultorio.
- Se debe almacenar la informacion del turno en la DB, incluyendo el ID del paciente que lo creo, la fecha y hora del turno.
- Al crear el turno, se debe generar un identificador unico para el turno.
- El endpoint debe retornar una respuesta exitosa al frontend con la informacion del turno creado. Por ejemplo: Turno creado exitosamente!.
- Si la fecha es un fin de semana o la hora esta fuera del horario de atencion, el endpoint debe retornar un error con un mensaje informativo.

--------------------------------Cancelacion de Turno-------------------------------

5. Vamos a implementear un endpoint para que un paciente autenticado pueda cancelar un turno reservado.

Criterios de Aceptacion:

- El endpoint debe reconocer al paciente autenticado para la cancelacion de un turno.
- El endpoint debe recibir el ID del turno que se desea cancelar.
- Se debe verificar que el turno con el ID proporcionado exista y pertenezca al paciente autenticado.
- Al cancelar el turno, se debe actualizar el estado del turno en la base de datos a "Cancelado".
- El endpoint debe retornar una respuesta exitosa al frontend indicando que el turno ha sido cancelado. Por ejemplo: Turno cancelado exitosamente!.
- Si el turno no existe o no pertenece al usuario, el endpoint debe retornar un error con un mensaje apropiado. Por ejemplo: Turno no encontrado o no pertenece al usuario.
