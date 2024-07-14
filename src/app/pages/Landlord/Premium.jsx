import '../../assets/css/Premium.css';
import BellIcon from '../../assets/images/bell.svg';
import Premium1 from '../../assets/images/premium1.png';
import Premium2 from '../../assets/images/premium2.png';
import Check from '../../assets/images/receipt-check.svg';
import Button from "../../components/ButtonComponent";
import Footer from '../../components/Footer';

function Premium() {
    return (
        <div className='premium'>
            <div className="head">
                <a href="/notification"><img src={BellIcon} alt="Bell Icon" /></a>
                <h1>Sell and Rent Out Your Property</h1>
                <p>With <span>MyHome.NG</span>, Unlocking your safe space</p>
            </div>
            <div className='premium-option'>
                <div className="premium-card">
                    <div className="premium-image">
                        <img src={Premium1} alt="Premium Img" />
                    </div>
                    <div className="premium-content">
                        <p>For Rent</p>
                    </div>
                </div>
                <div className="premium-card">
                    <div className="premium-image">
                        <img src={Premium2} alt="Premium Img" />
                    </div>
                    <div className="premium-content">
                        <p>For Sale</p>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                <h3>Get connected with your perfect tenant</h3>
                <h4>Use our Premium Listing tool to connect with potential tenant.</h4>
                <ul>
                    <li>
                        <img src={Check} alt="Check Icon" />
                        <p>Up to 3 Month Validity</p>
                    </li>
                    <li>
                        <img src={Check} alt="Check Icon" />
                        <p>Front-line Visibility</p>
                    </li>
                    <li>
                        <img src={Check} alt="Check Icon" />
                        <p>Premium Positioning</p>
                    </li>
                </ul>
                <Button link="/signup">Continue to signup</Button>
            </div>
            <Footer currentRoute={window.location.pathname} />
        </div>
    )
}

export default Premium;