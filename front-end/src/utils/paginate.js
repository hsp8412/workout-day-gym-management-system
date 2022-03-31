import _ from "lodash";

export function paginate(items, pageSize, currentPage) {
  const startIndex = (currentPage - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
