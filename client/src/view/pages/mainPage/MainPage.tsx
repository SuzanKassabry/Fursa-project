import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import MainResponsiveAppBar from '../../components/header/Header';
import './MainPage.scss';

export default function WebsiteMainPape() {
    return (
        <div>
            <MainResponsiveAppBar />

            <div className='mainPageContent'>
                <div className="image">
                    <div className="text">
                        <p>Our website was developped to help you manage your classes easily,
                            in addtion it let your teachers and students have more efficient learning. </p>

                        <div className="buttons">
                            <Link to='/login'>
                                <Button variant="outlined" style={{backgroundColor: "#ffffff"}}>Log in</Button>
                            </Link>

                            <Link to='/register'>
                                <Button variant="outlined" style={{backgroundColor: "#ffffff"}}>Register</Button>
                            </Link>
                        </div>
                    </div>


                </div>


            </div>



        </div>
    );
}