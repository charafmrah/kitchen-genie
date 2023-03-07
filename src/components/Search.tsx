const Search: React.FC = () => {
  return (
    <form className="form-control flex w-full max-w-md flex-col gap-5">
      <label className="label">Enter the ingredients</label>
      <textarea
        className="textarea-bordered textarea rounded-sm"
        placeholder="Bio"
      ></textarea>

      <button className="btn-secondary btn rounded-md">Generate recipe</button>
    </form>
  );
};

export default Search;
