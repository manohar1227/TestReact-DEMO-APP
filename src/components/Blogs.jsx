const Blogs = () => {
  return (
    <div>
      <h1>Table</h1>
      <table className="custom-table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>age</th>
            <th>location</th>
          </tr>
          <tr>
            <td>John</td>
            <td>25</td>
            <td>chicago</td>
          </tr>
          <tr>
            <td>Elsa</td>
            <td>35</td>
            <td>chicago</td>
          </tr>
          <tr>
            <td>Murf</td>
            <td>25</td>
            <td>chicago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Blogs;
