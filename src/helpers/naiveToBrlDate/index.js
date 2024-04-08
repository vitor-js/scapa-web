function index(date) {
    if (!date) return null
    const myDate = new Date(date);

    return `${myDate.getDay()}/${myDate.getMonth()}/${myDate.getFullYear()}`

}


export default index