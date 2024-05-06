type Props = {
    data: Array<any>;
    page: number;
    pageSize: number;
};

const paginate = function ({ data, page = 1, pageSize = 8 }: Props) {
    const totalPage = Math.ceil(data.length / pageSize);
    const start: number = (page - 1) * pageSize;
    const end: number = start + pageSize;
    const paginatedData = data.slice(start, end);
    return { totalPage, paginatedData };
};

export default paginate;
