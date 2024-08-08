import PropTypes from 'prop-types';

import styles from './Feature.module.css';

const Feature = ({ title, img, classModifier }) => {
	return (
		<div className={`${styles.feature} feature ` + classModifier}>
			<h2 className={styles.feature['title']}>{title}</h2>
			<img src={img} alt={title} className={styles.feature['img']} />
		</div>
	);
};

Feature.propTypes = {
	title: PropTypes.string,
	img: PropTypes.string,
	classModifier: PropTypes.string,
};

export default Feature;
