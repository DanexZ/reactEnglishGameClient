export const prepareText = (str:string) => {

    str = str.replace(/[?]/g, '?+').replace(/[!]/g, '!+').replace(/[:]/, ':+').replace(/[.]/g, '.+').replace('.+.+.+', '...+');

    if (str.charAt(str.length-1) === "+" ) return str.slice(0, -1);

    return str;

}