export default function currencyToBackend(amount) {
    if (!isNaN(amount)) {
        return Math.round(amount)
    }
    if (!amount) {
        return;
    }

    return amount.replace(/[.]/g, "").replace(",", ".").trim();
}