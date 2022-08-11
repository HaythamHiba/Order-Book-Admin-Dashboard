export const addPathVariablesToUrl=(VarsObjects,endPoint="")=>{
    if(!Array.isArray(Object.entries(VarsObjects))) return "";
    if(Object.entries(VarsObjects).length===0) return "";
    let prefixUrl="";
    Object.entries(VarsObjects).map(arr=>prefixUrl+=`/${arr[0]}/${arr[1]}`)

    return `${prefixUrl}${endPoint}`
}