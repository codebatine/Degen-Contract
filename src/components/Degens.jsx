import PropTypes from 'prop-types';

export const Degens = ({ degens, contract, populateDegens }) => {
  const removeDegen = async (id) => {
    const result = await contract.removeDegen(id);
    await result.wait();
    populateDegens();
  };

  return (
    <div>
      {degens.map((d) => (
        <div
          className="degen-list"
          key={d.id}
        >
          <div>
            <span className="label">Nickname:</span> {d.nickname}
          </div>
          <div>
            <span className="label">Tagline:</span> {d.tagline}
          </div>
          <div>
            <span className="label">Hodler?</span> {d.isHodler ? 'Yes' : 'No'}
          </div>
          <button
            className="remove-button"
            onClick={() => removeDegen(d.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

Degens.propTypes = {
  degens: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
      isHodler: PropTypes.bool,
    }),
  ).isRequired,
  contract: PropTypes.shape({
    removeDegen: PropTypes.func,
  }).isRequired,
  populateDegens: PropTypes.func.isRequired,
};
