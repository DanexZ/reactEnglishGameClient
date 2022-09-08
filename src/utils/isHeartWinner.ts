export const isHeartWinner = (score: number, userLevel: number, userLifes: number) => {

    if (userLifes < 4 && score >= 200/userLevel) return true
    if (userLifes < 5 && score >= 600/userLevel) return true
    if (userLifes < 6 && score >= 1200/userLevel) return true
    if (userLifes < 7 && score >= 2000/userLevel) return true
    if (userLifes < 8 && score >= 5000/userLevel) return true
    if (userLifes < 9 && score >= 10000/userLevel) return true
    if (userLifes < 10 && score >= 20000/userLevel) return true
}