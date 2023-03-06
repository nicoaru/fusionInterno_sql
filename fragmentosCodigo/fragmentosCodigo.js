
// query queryparams searchparams
const getMuebles = async () => {

    const _queryObject = {
        where: {}
    }
    const _customResult = {
        include: {
            pedido: { 
                include: {cliente: true}
            },
            estado: true,
            estadosHistorico: {
                include: {estado: true}
            },
            insumos: {
                include: {insumo: true}
            } 
        }
    }
    const queryParams = {queryObject: JSON.stringify(_queryObject), customResult: JSON.stringify(_customResult)}
    const urlParams = new URLSearchParams(queryParams)

    fetch(`/api/muebles?`+urlParams, {method:'GET'})
    .then(async response => {
        if(response.ok) {
            const _muebles = await response.json()
            setMuebles(_muebles)
        }
        else {
            const _error = {error: {status: response.status, message: response.statusText}}
            setMuebles(_error)
        }
    })
    .catch(error => {
        const _error = {error: {message: error.message}}
        setMuebles(_error)
    })        
}