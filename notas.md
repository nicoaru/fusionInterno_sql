crear nuevos endpoints

/api/muebles/:id/estados   GET / POST / DELETE / PATCH NO
/api/muebles/:id/insumos
/api/pedidos/:id/muebles
/api/clientes/:id/pedidos



Quitar lógica de negocio del DAO
DAO ->  . sólo comunicación con la base de datos
        . que no responda pedidos
        . sino no me permite hacer ciertas validaciones en los endpoints




ENDOPOINTS
    El servidor decide que informacion devolver en cada enpoint (includes y selects)
    
/api/muebles
GET     /api/muebles
            . puede recibir queryObject por queryParams
            . devuelve todos los muebles que concuerden con el queryObject
            . si no hay queryObject, devuelve todos los muebles
            . el mueble se envía con data extra: 
                . pedido
                . estado
                . estadosHistorico
                . insumos

GET     /api/muebles/:id
            . recibe id por parametro
            . devuelve el mueble cuyo id sea igual al id recibido
            . el mueble se envía con data extra:
                . pedido
                . estado
                . estadosHistorico
                . insumos

DEL     /api/muebles
            . puede recibir queryObject por body
            . elimina todos los muebles que concuerden con el queryObject
            . si no hay queryObject, elimina todos los muebles
            . devuelve el mueble eliminado con data extra

DEL     /api/muebles/:id
            . recibe id por parámetro
            . elimina el mueble cuyo id sea igual al id recibido
            . devuelve el mueble eliminado con data extra

POST    /api/muebles
            . si recibe un objeto de tipo Mueble por body:
                . crea el nuevo mueble en la DB 
                . devuelve el mueble creado con data extra
            . si recibe un array de objetos de tipo Mueble por body:
                . crea los nuevos muebles en la DB
                . devuelve un array de objetos confirmando o rechazando cada operación junto con el mueble con data extra
            
PATCH   /api/muebles/:id
            . recibe id por parámetro
            . actualiza el mueble cuyo id sea igual al id recibido
            . recibe un objeto con los campos que deben ser actualizados, y sus nuevos valores
            . devuelve el mueble actualizado, con data extra

GET     /api/muebles/:id/estados
            . recibe id por parámtro
            . devuelve todos los estadosXMueble cuyo id_mueble sea igual al id recibido
            . los estadosXMueble son devueltos con data extra:
                . estado (solo el nombre)

POST    /api/muebles/:id/estados
            . recibe id por parámetro
            . si recibe un objeto de tipo EstadoXMueble (sin id_mueble) por body:
                . crea el nuevo estadoXMueble en la DB 
                . devuelve el mueble creado con data extra
            . si recibe un array de objetos de tipo EstadoXMueble (sin id_mueble) por body:
                . crea los nuevos estadoXMueble en la DB
                . devuelve un array de objetos confirmando o rechazando cada operación junto con el estadoXMueble con data extra

DEL     /api/muebles/:id/estados/:idEstadoXMueble
            . recibe id (del mueble) por parámetro
            . recibe idEstadoXMueble por parámetro
            . elimina el estadoXMueble cuyo id sea igual al idEstadoXMueble recibido
            . devuelve el estadoXMueble eliminado con data extra




/api/pedidos
GET     /api/pedidos
GET     /api/pedidos/:id
DEL     /api/pedidos
DEL     /api/pedidos/:id
POST    /api/pedidos
PATCH   /api/pedidos/:id