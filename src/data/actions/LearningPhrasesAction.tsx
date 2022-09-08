export type LearningPhrasesAction =
    | { type: "setCurrentPage"; payload: number }
    | { type: "createPagination"; payload: any }
    | { type: "createPages"; payload: any }
    | { type: "setRowsOnPage"; payload: any }