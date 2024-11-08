
export default function toBRL(v1) {
    if (!v1 || v1 === 0) {
        return "0,00";
    }
    const result = v1.toLocaleString('pt-br', { minimumFractionDigits: 2 });

    return `R$ ${result}`;
}