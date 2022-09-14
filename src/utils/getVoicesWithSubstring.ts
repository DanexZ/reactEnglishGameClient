export const getVoicesWithLangSubstring = (langSubstr: any) => {
    return window.speechSynthesis.getVoices().filter( (v) => {
        return v.lang.replace('_', '-').substring(0, langSubstr.length) === langSubstr
    });
}