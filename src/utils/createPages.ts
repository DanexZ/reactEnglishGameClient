import { Page } from "../data/types/Page";

export const createPages = (requiredPagesNr: number) => {

    const pages: Page[] = [{page: 0, rows: []}];

    for (let i=1; i<requiredPagesNr; i++) pages.push({page: i, rows: []});

    return pages
}