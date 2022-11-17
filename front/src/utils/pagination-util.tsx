// pagination function
export default function paginationUtil(totalPage: number = 0, currentPage: number, pageRange: number) {
  const finalPage = Math.ceil(totalPage === 0 ? 1 : totalPage / 10);

  const list = Array(finalPage < 5 ? finalPage : 5).fill(0);

  let result;

  if (currentPage < pageRange / 2) {
    result = list.map((v, i) => i + 1);
  } else if (currentPage > finalPage - 5 / 2) {
    result = list.map((v, i) => finalPage - i).reverse();
  } else {
    result = list.map((v, i) => currentPage + (i - 2));
  }
  return result;
}
