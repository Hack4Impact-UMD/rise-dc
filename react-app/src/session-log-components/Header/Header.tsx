import './Header.css'

type sessionHeaderProp = {
    title: string;
};

const Header = ({title}: sessionHeaderProp) => {
    return (
        <div className = "session-header">
            {title}'s Logs
        </div>
    )
}

export default Header;