import { AppStateInterface } from "../data/types/AppStateInterface";

export const setUserItems = (appState: AppStateInterface) => {
    localStorage.setItem("englishGame_token", appState.user.token);
    localStorage.setItem("englishGame_id", String(appState.user.id));
    localStorage.setItem("englishGame_nick", appState.user.nick);
    localStorage.setItem("englishGame_level", String(appState.user.level));
    localStorage.setItem("englishGame_lifes", String(appState.user.lifes));
    localStorage.setItem("englishGame_points", String(appState.user.points));
    localStorage.setItem("englishGame_userHash", String(appState.user.password));
}