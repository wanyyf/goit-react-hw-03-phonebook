import propTypes from 'prop-types';

const Filter = ({ onChange }) => {
  return (
    <>
      <p>Find contacts by name</p>
      <input type="text" name="filter" onChange={onChange} />
    </>
  );
};
Filter.propTypes = {
  onChange: propTypes.func.isRequired,
};
export default Filter;
