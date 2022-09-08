export const createPagination = (nr: number, onClickFn: Function) => {

    const pagination = [];

    for (let i=0; i<nr; i++) pagination.push({ onClickFn: () => onClickFn(i) });

    return pagination
}