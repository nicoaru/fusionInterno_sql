import React from 'react';
import './home.css';
import {Layout} from '../../components/layout/layout';

function Home() {
    const [message, setMessage] = React.useState()


    React.useEffect(() => {
        fetch("/api/message", {
            accept: 'application/json',
          })
            .then((res) => {
                console.log("res => ", res)
                res.json()
                    .then((data) => {
                    console.log("data => ", data)
                    setMessage(data.message)
                })
            })
            .catch((error) => {
                console.log("Fetch error => ", error.message)
                setMessage(`Error en el servidor (${error.message})`)
            })
        }, 
    [])
    

    return (
        <Layout>
            <div>
                <h1>Página Home</h1>
                <p>Mensaje: {message}</p>
            </div>
        </Layout>
    )

};

export {Home};