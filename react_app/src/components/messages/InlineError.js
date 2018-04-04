import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({ text}) => (
<div style={{color: "#912d57"}}>
{text}
</div>
);

InlineError.propTypes = {
    text: PropTypes.string.isRequired
}
export default InlineError;