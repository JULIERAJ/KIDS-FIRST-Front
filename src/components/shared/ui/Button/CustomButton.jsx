/* 
This is a reusable button to standardize button styling. 
Please refer to Figma for visual reference: https://www.figma.com/design/qUBlZE5TIgpqShKTVcSvRo/Kids-First-WITT(Desktop)?node-id=10101-45063&t=qkg15eX9vNqI63nz-4

Below is an example of usage:

        <CustomButton
          styles={`med primary-light ${styles.customButton}`}
          iconLeft={<IconLeft />} 
          iconRight={<IconRight />}
          type='submit'>
          Text for button
        </CustomButton>

Note that the Icons are intended for SVGs. As such, please import your SVG as follows:

import { ReactComponent as IconRight} from '@media/icons/home.svg';

The styles prop accepts the predefined styles based on the classNames described in buttonStyles.css and buttonSizes.css.
You can also add icons using the iconLeft or iconRight props to add icons to either side of the button Text.
*/

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './buttonStyles.css';
import './buttonSizes.css';
import './contentStyles.css';

export const CustomButton = ({
  styles,
  size,
  link,
  iconLeft,
  iconRight,
  iconLeftStyles,
  iconRightStyles,
  textStyles,
  children,
  ...props
}) => {
  return (
    <Button className={classNames(styles, size)} href={link} {...props}>
      <div className={classNames('icon-left', iconLeftStyles)}>{iconLeft}</div>
      <span className={classNames('text', textStyles)}>{children}</span>
      <div className={classNames('icon-right', iconRightStyles)}>
        {iconRight}
      </div>
    </Button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string,
  styles: PropTypes.string,
  size: PropTypes.oneOf(['xsml', 'sml', 'med', 'lg']),
  iconLeft: PropTypes.object,
  iconLeftStyles: PropTypes.string,
  iconRight: PropTypes.object,
  iconRightStyles: PropTypes.string,
  textStyles: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.any,
};
