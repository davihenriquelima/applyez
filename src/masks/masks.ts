export const maskPhoneNumber = (value: string, format: string | null, regexString:string | null) => {
    if (!value) return '';
    
    if(regexString && format) {
        const regex = new RegExp(regexString, 'g');
        const digitGroups = (regexString.match(/\d{1,2}(?:,\d{1,2})?/g) || []);

        const totalDigits = digitGroups.map(group => {
            const [min, max] = group.split(',').map(Number); // Se há intervalo, pega o maior número; senão, o número fixo
            return max || min;  // Retorna o maior número de dígitos
        }).reduce((total, num) => total + num, 0);

        let cleanedValue = value.replace(/\D/g, '');

        if (cleanedValue.length > totalDigits) {
            cleanedValue = cleanedValue.slice(0, totalDigits);
        }
        return cleanedValue.replace(regex, format);
    }

    return value;
}

export const maskZipCode = (value: string) => {
    if (!value) return '';
    return value
        .replace(/\D/g, '') // Remove todos os caracteres não numéricos
        .slice(0, 8) // Limita a string a 8 caracteres
        .replace(/^(\d{5})(\d{3})$/, '$1-$2'); // Formata o CEP
}

export const maskCpf = (value: string) => {
    if (!value) return '';
    return value
        .replace(/\D/g, '') // Remove todos os caracteres não numéricos
        .slice(0, 11) // Limita a string a 11 caracteres
        .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'); // Formata o CPF
}

export const maskDate = (value: string) => {
    if (!value) return '';
    return value
        .replace(/\D/g, '') // Remove todos os caracteres não numéricos
        .slice(0, 8) // Limita a string a 8 caracteres
        .replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3'); // Formata a data
}