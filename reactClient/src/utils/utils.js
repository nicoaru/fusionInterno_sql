const dateFromString = (dateString) => dateString && new Date(dateString)

const stringFromDate = (dateObject) => dateObject && dateObject.toLocaleDateString()

const formatDateString = (dateString) => {
    const date = dateFromString(dateString)
    return stringFromDate(date)
} 


export {dateFromString, stringFromDate, formatDateString}



// const dateObjectFromDateString = (dateString) => {
//     try{
//         if(dateString === null) {
//             dateObject = null
//         }
//         else {
//             dateObject = new Date(dateString)    
//         }
//     }
//     catch{
//         dateObject = null
//     }
//     return dateObject
// }


// const dateStringFromDataObject = (dateObject) =>  {
//     let dateString
//     if(dateObject === null) {
//         dateString = null
//     }
//     else {
//         dateString = dateObject.toLocaleDateString()        
//     }
//     return dateString

// }