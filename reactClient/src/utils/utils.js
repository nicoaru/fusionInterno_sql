const dateObjectFromDateString = (dateString) => {
    let dateObject
    try{
        if(dateString === null) {
            dateObject = null
        }
        else {
            dateObject = new Date(dateString)    
        }
    }
    catch{
        dateObject = null
    }
    return dateObject
}

const dateStringFromDataObject = (dateObject) =>  {
    let dateString
    if(dateObject === null) {
        dateString = null
    }
    else {
        dateString = dateObject.toLocaleDateString()        
    }
    return dateString

}

export {dateStringFromDataObject, dateObjectFromDateString}