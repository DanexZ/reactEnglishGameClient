export const prepareTextForProperComparing = (txt: string) => {

    return txt
            .toLowerCase()
            .trim()
            .replace(/[V]/g, '5th')
            .replace('full time', 'full-time')
            .replace('part time', 'part-time')
            .replace(/[?]/g, '')
            .replace(/[,]/g, '')
            .replace(/[!]/g, '')
            .replace(/[.]/g, '');
}