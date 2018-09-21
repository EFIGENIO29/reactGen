/**
 * 
 */
export function updateHeaderBackgroundColor(color) {
    return {
        type: 'UPDATE_HEADER_BACKGROUND_COLOR',
        payload: color
    };
}

/**
 * 
 */
export function resetHeaderBackgroundColor() {
    return {
        type: 'RESET_HEADER_BACKGROUND_COLOR'
    };
}
