/**
 * Update if the user can see the SIF Configuration
 * @return {object} 
 */
export function updateUserCanSeeSIF(value) {
    return {
        type: 'UPDATE_CONFIGURATION_SHOW_SIF',
        payload: value
    };
}
/**
 * Update Value of SIF
 * @return {object} 
 */
export function updateSIF(value) {
    return {
        type: 'UPDATE_CONFIGURATION_SIF',
        payload: value
    };
}
/**
 * Update Value of Temporal SIF
 * @return {object} 
 */
export function updateTemporalSIF(value) {
    return {
        type: 'UPDATE_CONFIGURATION_TEMPORAL_SIF',
        payload: value
    };
}
/**
 * Update if the user can see the SIC Configuration
 * @return {object} 
 */
export function updateUserCanSeeSIC(value) {
    return {
        type: 'UPDATE_CONFIGURATION_SHOW_SIC',
        payload: value
    };
}
/**
 * Update Value of SIC
 * @return {object} 
 */
export function updateSIC(value) {
    return {
        type: 'UPDATE_CONFIGURATION_SIC',
        payload: value
    };
}
/**
 * Update Value of the Temporal SIC
 * @return {object} 
 */
export function updateTemporalSIC(value) {
    return {
        type: 'UPDATE_CONFIGURATION_TEMPORAL_SIC',
        payload: value
    };
}
/**
 * Reset
 * @return {object} 
 */
export function resetState() {
    return {
        type: 'RESET_CONFIGURATION'
    };
}

/**
 * Reset
 * @return {object} 
 */
export function updateCatalogoModulo(value) {
    return {
        type: 'UPDATE_CATALOG_MODULO',
        payload: value
    };
}
/**
 * Reset
 * @return {object} 
 */
export function updateCatalogoEstatus(value) {
    return {
        type: 'UPDATE_CATALOGO_ESTATUS',
        payload: value
    };
}
/**
 * Reset
 * @return {object} 
 */
export function resetStateCatalog() {
    return {
        type: 'RESET_CATALOG'
    };
}