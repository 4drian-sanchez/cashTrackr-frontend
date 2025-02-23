export function formatToDollar(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return formattedDate.replace(/(\d{1,2}) de (\w+) de (\d{4})/, '$1 de $2 del $3');
}
