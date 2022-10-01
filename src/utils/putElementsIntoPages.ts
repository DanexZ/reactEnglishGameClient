import { Page } from "../data/types/Page";
import { PageRow } from "../data/types/PageRow";

export const putElementsIntoPages = (pages: Page[], rowsPerPage: number, elements: PageRow[]) => {
    
    let elementIndex = 0;

    for(let i=0; i<pages.length; i++){
        for(let m=0; m<rowsPerPage; m++){

            if( elements[elementIndex] ){
                pages[i].rows.push( { element: elements[elementIndex], elementIndex } );
                elementIndex++;
            }
        }
    }

}