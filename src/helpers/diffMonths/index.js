function monthDiff(start, end) {
    const d1 = new Date(start)
    const d2 = new Date(end)

    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

export default monthDiff