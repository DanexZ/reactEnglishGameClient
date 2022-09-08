export const shuffleList = (list: any[]) => {
    let currentIndex = list.length,  randomIndex;
  
    while (currentIndex !== 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [list[currentIndex], list[randomIndex]] = [
        list[randomIndex], list[currentIndex]];
    }
  
    return list;
}