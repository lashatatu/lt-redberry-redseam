const ProductsPageShowingResultsComponent = ({ total, page, pageSize }) => {
  if (!total || total === 0) {
    return <div className='text-xs'>no results</div>;
  }
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return (
    <div className='text-xs'>
      {`showing results ${start}-${end} of ${total} results`}
    </div>
  );
};

export default ProductsPageShowingResultsComponent;
