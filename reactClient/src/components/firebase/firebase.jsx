    /*Importo el inicializador que me permite conectarme con Firebase*/
import {initializeApp} from 'firebase/app'
    /*Importo los servicios de Firebase que voy a utilizar*/
    /*En este caso Firestore, especificamente el modulo getFirestore  */
import {getFirestore, collection} from 'firebase/firestore'
    /*En este caso Storage, especificamente el modulo getStorage*/
import {getStorage} from 'firebase/storage'

    /*Luego agregar FirebaseAuthentication*/

    /* Objeto con los datos de configuracion de Firebase*/
const firebaseConfig = {
    apiKey: "AIzaSyCcou68tQrIAAdXTyqnLDnTKhBnAQgYBys",
    authDomain: "fusion-interno.firebaseapp.com",
    projectId: "fusion-interno",
    storageBucket: "fusion-interno.appspot.com",
    messagingSenderId: "400722330912",
    appId: "1:400722330912:web:190862891deacad31c4345"
};

    /*Inicializacion de Firebase, es decir me conecto con Firebase*/
const firebaseApp = initializeApp(firebaseConfig);

    /*Genero la referencia a la base de datos creada en el servicio Firestore*/
const db = getFirestore(firebaseApp)

const refCollMueblesEncargadosDB = collection(db, "/mueblesEncargados")

    /*Genero la referencia al bucket creado en el servicio Storage, para luego crear referencias especificas*/
const storage = getStorage(firebaseApp);



export { db, refCollMueblesEncargadosDB, storage }