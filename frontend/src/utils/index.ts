export const filterSeleceted = <T>(array: T[], selected: string): T[] => {
    return array.filter((each) => each !== selected);
};

export const noSpaces = (string: string): string => {
    return string.replace(/\s/g, '');
}

export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}