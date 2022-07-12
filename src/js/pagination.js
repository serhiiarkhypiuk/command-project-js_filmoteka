import Pagination from 'tui-pagination';

export function createPagination() {
  const options = {
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    totalItems: 20000, // due to the API limits
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    usageStatistics: false,
  };
  const container = document.getElementById('tui-pagination-container');
  window.pagination = new Pagination(container, options);
}
