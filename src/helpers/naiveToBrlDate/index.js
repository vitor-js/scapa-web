function index(date) {
    if (!date) return null
    const myDate = new Date(date);

    let day = 0
    let month = 0



    return `${convert(myDate.getDay())}/${convert(myDate.getMonth())}/${myDate.getFullYear()}`

}

function convert(item) {
    if (item <= 9) {
        return `0${9}`
    }
    else {
        return item
    }
}

export default index