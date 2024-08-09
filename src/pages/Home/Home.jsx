import { CustomButton } from '@components/shared/ui/Button/CustomButton';
import './Home.css';

import feature_1 from '@media/homePage/feature_dashboard.png';
import feature_4 from '@media/homePage/feature_kids_info.png';
import feature_3 from '@media/homePage/feature_photo_album.png';
import feature_2 from '@media/homePage/feature_shared_calendar.png';

import feature_5 from '@media/homePage/mediated_messaging.svg';

import mockup from '@media/homePage/mock-up.png';

import value_2 from '@media/homePage/value_co-parenting.png';
import value_1 from '@media/homePage/value_kid_harmony.png';
import value_3 from '@media/homePage/value_learning.png';

import Feature from './components/Feature/Feature';
import Value from './components/Value/Value';

export default function Home() {
	return (
		<>
			<div className="banner-section" id="first-banner">
				<div className="left-blurb">
					<h1 className="banner-title">
						BRIDGING CO-PARENTS AND PRIORITIZING KIDS
					</h1>

					<div className="banner-text-wrapper">
						<p>
							Our co-parenting app that helps you maintain harmony
							in your kids&apos; lives.
						</p>
					</div>

					<div className="banner-btn-wrapper">
						<CustomButton
							styles="home-signup-btn-2"
							link="/register"
						>
							Sign up now
						</CustomButton>
					</div>
				</div>
			</div>

			<section className="site-section">
				<div className="container">
					<h1 className="section-title">KIDS FIRST VALUES</h1>

					<div className="values-wrapper">
						<Value
							title="Minimizing Conflicts"
							text="Fostering a harmonious childhood by reducing scheduling conflicts
							between divorced parents"
							img={value_1}
						/>

						<Value
							title="Better Child Upbringing"
							text="Facilitating peaceful communication and coordination between parents"
							img={value_2}
						/>

						<Value
							title="Enhancing Accountability"
							text="Improving the transparency in communication between
							parents and holding them accountable "
							img={value_3}
						/>
					</div>
				</div>
			</section>

			<section
				className="middle-banner-homepage"
				id="middle-banner-homepage"
			>
				<div className="container">
					<div className="middle-banner-homepage-content">
						<h1 className="middle-banner-homepage-title">
							KIDS HAPPINESS IS OUR PRIORITY
						</h1>
						<div className="middle-banner-homepage-text">
							<p>
								KIDS FIRST aspires to help families with simpler
								custody scheduling by providing an interactive
								shared calendar solution that reduces
								misunderstandings and conflicts.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="site-section" id="features-prev">
				<div className="container">
					<div className="section-title">KIDS FIRST FEATURES</div>

					<div className="features-wrapper">
						<Feature
							classModifier="feature--wide"
							title="Dashboard"
							img={feature_1}
						/>
						<Feature
							classModifier="feature--wide"
							title="Shared Calendar"
							img={feature_2}
						/>

						<Feature title="Photo Album" img={feature_3} />
						<Feature title="Kid's Info" img={feature_4} />
						<Feature title="Mediated Messaging" img={feature_5} />
					</div>
				</div>
			</section>

			<section className="banner-sect">
				<div className="container">
					<div className="banner-sect__row">
						<div>
							<h2 className="banner-sect__title">
								WHY KIDS FIRST
							</h2>
							<div className="banner-sect__text">
								<p>
									We take a different approach to reducing
									conflicts: To&nbsp;accommodate parents&apos;
									needs with a simple and clever app design
									that limits the need for calls or text
									messaging.
								</p>
								<CustomButton
									styles="home-signup-btn-2"
									link="/register"
								>
									Sign up now
								</CustomButton>
							</div>
						</div>
						<div>
							<img src={mockup} alt="" />
						</div>
					</div>
				</div>
			</section>

			{/*
      <footer>
        <a href="#">Terms of use</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Contact us</a>
        <a href="#">About us</a>
        <a href="#">Our team</a>
      </footer> */}
		</>
	);
}
