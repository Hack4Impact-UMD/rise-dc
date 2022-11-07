import Arrow from './rightArrow.svg'
import './RecentLogs.css'

const RecentLogs = ({props}: any) => {
    const handleClick = () => {
        console.log('hi')
    }

    return (
        <div className = "log-container">
            <h1 className = "log-title"> Most Recent Logs </h1>
            <button onClick = {handleClick} className = "logs"> 
                    <h1 className = "log-name">Log 1</h1>
                    <img src={Arrow} alt="Arrow" className = "arrow"/>
            </button>
            <button onClick = {handleClick} className = "logs"> 
                    <h1 className = "log-name">Log 2</h1>
                    <img src={Arrow} alt="Arrow" className = "arrow"/>
            </button>
            <button onClick = {handleClick} className = "logs"> 
                    <h1 className = "log-name">Log 3</h1>
                    <img src={Arrow} alt="Arrow" className = "arrow"/>
            </button>
            <a className = "log-view-more" href = {props}>
                View More 
            </a>
        </div>
    )
}

export default RecentLogs;