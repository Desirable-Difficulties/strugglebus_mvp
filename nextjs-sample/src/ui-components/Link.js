import * as React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link as FluentLink } from '@fluentui/react-components';

const Link = React.forwardRef(function Link(props, ref) {
  const {
    href,
    children,
    ...other
  } = props;

  const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    return (
      <FluentLink href={href} ref={ref} {...other}>
        {children}
      </FluentLink>
    );
  }

  return (
    <NextLink href={href} passHref>
      <FluentLink ref={ref} {...other}>
        {children}
      </FluentLink>
    </NextLink>
  );
});

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;