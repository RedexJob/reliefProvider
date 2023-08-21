// styled components
import {Menu, UserWrapper} from '../style';
import { useNavigate } from 'react-router-dom';
// components
import Avatar from '@ui/Avatar';

// utils
import ClickAwayListener from '@mui/base/ClickAwayListener';
import {useState} from 'react';

// assets
import doc1jpg from '@assets/avatars/imgProfile.png';
import doc1webp from '@assets/avatars/doc1.jpg?as=webp';
// import  demoavtar from '@assets/avatars/demoavtar.png?as=webp';

const CurrentUser = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClickAway = () => setOpen(false);
    const handleClick = () => setOpen(!open);



    const LogoutDone = () =>{
        localStorage.clear();
        
        window.location.reload(false)
    }
    const changeuser = () =>{
        navigate("/my_account")
    }
    const userProfile = JSON.parse(localStorage.getItem("profile"));
    console.log(userProfile,'userprofile')
    const src = userProfile?.img
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <UserWrapper>
                <Avatar  src={src ? src: doc1jpg} />
                <div className="info">
                    <span className="h3">{userProfile?.name ? userProfile?.name :'N/A'}</span>
                    <span className="position">{userProfile?.role}</span>
                    <Menu className={open ? 'visible' : ''}>
                        <button onClick={changeuser}>
                            <i className="icon icon-circle-user" /> Change user
                        </button>
                        <button onClick={LogoutDone}>
                            <i className="icon icon-logout" /> Logout
                        </button>
                    </Menu>
                </div>
                <button className="trigger" onClick={handleClick} aria-label="Show menu">
                    <i className="icon icon-chevron-down" />
                </button>
            </UserWrapper>
        </ClickAwayListener>
    )
}

export default CurrentUser;