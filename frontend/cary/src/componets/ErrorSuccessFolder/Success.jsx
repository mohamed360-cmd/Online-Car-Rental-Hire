import './Success.css'
import {BsHandThumbsUpFill} from 'react-icons/bs'
import {FaRegThumbsUp} from 'react-icons/fa';
export default function Success({SuccessMessage,closeButton}){
    return(
        <div className="SuccessContainer">
            <FaRegThumbsUp size={30} color='blue'/>
            <span>{SuccessMessage}</span>
            {closeButton}
        </div>
    )
}