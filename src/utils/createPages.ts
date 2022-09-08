export const createPages = (requiredPagesNr: number) => {

    const pages: any[] = [{page: 0, rows: []}];

    for (let i=1; i<requiredPagesNr; i++) pages.push({page: i, rows: []});

    return pages
}