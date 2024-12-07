export default function currencyToBackend(amount) {

    if (typeof amount === 'string' && amount.includes("$")) {
        const split = amount.split("$")
        const value = split[1].trim()
        return value.replace(/[.]/g, "").replace(",", ".").trim();
    }

    if (!isNaN(amount)) {
        return Math.round(amount)
    }
    if (!amount) {
        return;
    }


    return amount.replace(/[.]/g, "").replace(",", ".").trim();
}