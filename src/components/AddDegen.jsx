import { useState } from "react";
import PropTypes from 'prop-types';

export const AddDegen = ({ writeContract, populateDegens }) => {
  const [degen, setDegen] = useState({ nickname: "", tagline: "", isHodler: false });

  const createDegen = async () => {
    try {
      const result = await writeContract.createDegen(
        degen.nickname,
        degen.tagline,
        Boolean(degen.isHodler)
      );
      await result.wait();

      console.log(result);

      populateDegens();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setDegen({ ...degen, [e.target.name]: value });
  };

  return (
    <form
      className="add-degen-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDegen();
      }}
    >
      <input
        type="text"
        name="nickname"
        placeholder="nickname"
        value={degen.nickname}
        onChange={handleChange}
      />
      <input
        type="text"
        name="tagline"
        placeholder="tagline"
        value={degen.tagline}
        onChange={handleChange}
      />
      <label>
        Hodler?
        <input
          type="checkbox"
          name="isHodler"
          checked={degen.isHodler}
          onChange={handleChange}
        />
      </label>
      <button>Add Degen</button>
    </form>
  );
};

AddDegen.propTypes = {
  writeContract: PropTypes.shape({
    createDegen: PropTypes.func,
  }).isRequired,
  populateDegens: PropTypes.func.isRequired,
};