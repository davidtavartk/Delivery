export const filterSeleceted = <T>(array: T[], selected: string): T[] => {
    return array.filter((each) => each !== selected);
};

export const noSpaces = (string: string): string => {
    return string.replace(/\s/g, '');
}