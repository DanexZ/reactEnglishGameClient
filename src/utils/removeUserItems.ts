export const removeUserItems = () => {
    localStorage.removeItem("englishGame_token");
    localStorage.removeItem("englishGame_id");
    localStorage.removeItem("englishGame_nick");
    localStorage.removeItem("englishGame_level");
    localStorage.removeItem("englishGame_lifes");
    localStorage.removeItem("englishGame_points");
    localStorage.removeItem("englishGame_userHash");
}