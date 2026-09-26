/**
 * Dual Pagination Utility: Cursor-based & Offset-based
 * Supports both high-throughput feeds (cursor) and administrative catalogs (offset).
 */

export function paginateOffset(dataArray, page = 1, limit = 10) {
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const itemsPerPage = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
  const totalItems = dataArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const items = dataArray.slice(startIndex, endIndex);

  return {
    paginationType: 'offset',
    items,
    meta: {
      page: currentPage,
      limit: itemsPerPage,
      totalItems,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1
    }
  };
}

export function paginateCursor(dataArray, cursor = null, limit = 10, cursorField = 'id') {
  const itemsPerPage = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
  let startIndex = 0;

  if (cursor) {
    try {
      // Decode base64 cursor value
      const decodedValue = Buffer.from(cursor, 'base64').toString('utf8');
      const foundIndex = dataArray.findIndex(item => String(item[cursorField]) === String(decodedValue));
      if (foundIndex !== -1) {
        startIndex = foundIndex + 1;
      }
    } catch {
      startIndex = 0;
    }
  }

  const items = dataArray.slice(startIndex, startIndex + itemsPerPage);
  const nextItem = items[items.length - 1];
  const hasMore = startIndex + itemsPerPage < dataArray.length;

  const nextCursor = (hasMore && nextItem)
    ? Buffer.from(String(nextItem[cursorField])).toString('base64')
    : null;

  return {
    paginationType: 'cursor',
    items,
    meta: {
      limit: itemsPerPage,
      cursor: cursor || null,
      nextCursor,
      hasMore,
      count: items.length
    }
  };
}
