export function checkFields(obj1: any, obj2: any): boolean {
    for (let key in obj1) {
        if (typeof obj1[key] === 'object' && obj1[key] !== null) {
            if (!checkFields(obj1[key], obj2[key])) return false;
        } else if (obj2[key] === undefined) {
            return false;
        }
    }
    return true;
}