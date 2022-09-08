export const putElementsIntoPages = (pages: any[], rowsPerPage: number, elements: any[], key: string) => {
    
    let elementIndex = 0;

    for(let i=0; i<pages.length; i++){
        for(let m=0; m<rowsPerPage; m++){

            if( elements[elementIndex] ){
                pages[i].rows.push( { [key]: elements[elementIndex], elementIndex } );
                elementIndex++;
            }
        }
    }

}