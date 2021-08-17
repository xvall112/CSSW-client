import * as React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const SEO = ({ title }) => {
  const lang = 'cs';

  const defaultTitle = 'CSSW';

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
    />
  );
};

SEO.propTypes = {
  title: PropTypes.string
};

SEO.defaultProps = {
  title: 'CSSW'
};

export default SEO;
