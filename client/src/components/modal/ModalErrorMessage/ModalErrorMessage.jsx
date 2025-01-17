import { classNames } from '../../../utils/classnames';

import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {string | null} children
 */

/** @type {React.VFC<Props>} */
const ModalErrorMessage = ({ children }) => {
  return (
    <span className={classNames('block h-6 text-red-600', !children ? 'invisible' : null)}>
      <span className="mr-1">
        <FontAwesomeIcon iconType="exclamation-circle" styleType="icon" />
      </span>
      {children}
    </span>
  );
};

export { ModalErrorMessage };
