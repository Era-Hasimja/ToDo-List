export const Details = () => {
  return (
    <div className="container form-group mt-5">
      <div>
        <label htmlFor="comment">Describe your task:</label>
        <textarea className="form-control" rows={5} id="comment"></textarea>
      </div>
    </div>
  );
};
