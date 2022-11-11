
import './Header.css'

const Header = () => {
    return (
        <div className = "header">
            <span className = "header-circle"></span>
            <div className='welcome-container'>
                <h1 className = "header-upper-text">Welcome back,</h1>
                <h1>name!</h1>
                <p className = "header-role">role</p>
            </div>
        </div>
    )
}

export default Header;
