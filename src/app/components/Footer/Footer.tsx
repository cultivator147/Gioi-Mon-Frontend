import { Link } from 'react-router-dom';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('footer__main')}>
                <div className={cx('footer__rateAndCirti')}>
                    <div className={cx('rate')}>
                        <h3 className={cx('rate__title')}>True rate</h3>
                        <div className={cx('rate__star')}>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalf} />
                        </div>
                        <div className={cx('rate__number')}>12,000 rates</div>
                    </div>
                    <div className={cx('cirti')}>
                        <img className={cx('cirti__img')} src="" alt="" />
                    </div>
                </div>
                <div className={cx('footer__nav')}>
                    <Link to="/support_help">Support and help</Link>
                    <Link to="/become_an_affilate">Become an Affilate</Link>
                    <Link to="/gift_card">Gift Card</Link>
                    <Link to="/bookshop_auther">Auther</Link>
                    <Link to="/faq">Indiebound - bookchop Chaneover FAQ</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/return_refund_policy">Return and refund Policy</Link>
                </div>
                <div className={cx('footer__followAndPay')}>
                    <div className={cx('follow')}>
                        <div className={cx('follow__title')}>Follow us: </div>
                        <div className={cx('follow__icon')}>
                            <div className={cx('follow__icon__facbook')}>
                                <a href={'https://www.facebook.com/'}>
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </div>
                            <div className={cx('follow__icon__twitter')}>
                                <a href={'https://twitter.com/'}>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                            </div>
                            <div className={cx('follow__icon__insta')}>
                                <a href={'https://www.instagram.com/'}>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={cx('pay')}>
                        <div className={cx('pay__title')}>Payments Accepted</div>
                        <div className={cx('pay__img')}>
                            <img src="" alt="" />
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer__info')}>
                <Link to="/">© 2023 All Rights Reserved </Link>
                <Link to="/">Terms of Use</Link>
                <Link to="/">Privacy Notice</Link>
            </div>
        </footer>
    );
}

export default Footer;
