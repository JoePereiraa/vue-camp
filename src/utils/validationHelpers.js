// validationHelpers.js

/**
 * Verifica se um valor está contido em um array de valores permitidos.
 * Equivale ao WHERE IN (valor, [lista...]) do SQL.
 * * @param {any} value - O valor único a ser testado.
 * @param {Array<any>} permittedValues - O array de valores permitidos.
 * @returns {boolean}
 */
export function isIn(value, permittedValues) {
    if (!Array.isArray(permittedValues)) {
        console.error("isIn espera um array de valores permitidos.");
        return false;
    }
    // Usa o método Array.prototype.includes()
    return permittedValues.includes(value); 
}