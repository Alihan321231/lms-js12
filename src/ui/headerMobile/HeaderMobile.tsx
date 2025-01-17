import { Link, useLocation } from 'react-router-dom';
import scss from './HeaderMobile.module.scss';
import { links } from '@/src/utils/routes';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const HeaderMobile = () => {
	const { pathname } = useLocation();
	const [sliderRef] = useKeenSlider({
		mode: 'free',
		slides: {
			origin: 'center',
			perView: 6,
			spacing: 4
		}
	});

	return (
		<>
			<header className={scss.HeaderMobile}>
				<ul ref={sliderRef} className="keen-slider">
					{/* //! admin */}
					{pathname.startsWith('/admin') && (
						<>
							{links.admin.map((item, index) => (
								<li className="keen-slider__slide number-slide1" key={index}>
									<Link
										to={`/admin/${item.link!}`}
										className={
											pathname === `/admin/${item.link!}`
												? `${scss.nav_item} ${scss.active}`
												: `${scss.nav_item}`
										}
									>
										<span className={scss.icon}>{item.icon}</span>
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</>
					)}
					{/* //! student */}

					{pathname === '/' && (
						<>
							{links.student.map((item, index) => (
								<li key={index}>
									<Link
										to={`/${item.link!}`}
										className={
											pathname === `/${item.link!}`
												? `${scss.nav_item} ${scss.active}`
												: `${scss.nav_item}`
										}
									>
										<span className={scss.icon}>{item.icon}</span>
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</>
					)}
					{pathname === '/courses' && (
						<>
							{links.student.map((item, index) => (
								<li key={index}>
									<Link
										to={`/${item.link!}`}
										className={
											pathname === `/${item.link!}`
												? `${scss.nav_item} ${scss.active}`
												: `${scss.nav_item}`
										}
									>
										<span className={scss.icon}>{item.icon}</span>
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</>
					)}
					{pathname === '/calendar' && (
						<>
							{links.student.map((item, index) => (
								<li key={index}>
									<Link
										to={`/${item.link!}`}
										className={
											pathname === `/${item.link!}`
												? `${scss.nav_item} ${scss.active}`
												: `${scss.nav_item}`
										}
									>
										<span className={scss.icon}>{item.icon}</span>
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</>
					)}

					{/* //! instructor */}
					{pathname.startsWith('/instructor') && (
						<>
							{links.instructor.map((item, index) => (
								<li key={index}>
									<Link
										to={`/instructor/${item.link!}`}
										className={
											pathname === `/instructor/${item.link!}`
												? `${scss.nav_item} ${scss.active}`
												: `${scss.nav_item}`
										}
									>
										<span className={scss.icon}>{item.icon}</span>
										<span>{item.name}</span>
									</Link>
								</li>
							))}
						</>
					)}
				</ul>
			</header>
		</>
	);
};

export default HeaderMobile;
