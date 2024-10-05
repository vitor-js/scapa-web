function index(date) {
    if (!date) return null
    const myDate = new Date(date);

    let day = 0
    let month = 0

    console.log(myDate, "myDate")

    return `${convert(myDate.getDay() + 1)}/${convert(myDate.getMonth() + 1)}/${myDate.getFullYear()}`

}

function convert(item) {
    console.log(item, '-----------')
    if (item <= 9) {
        return `0${item}`
    }
    else {
        return item
    }
}

export default index