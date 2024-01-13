import {MdError} from 'react-icons/md'
import './Error.css'
export default function Error({ErrorMessage,closeButton}){
    return(
        <div className="ErrorContainer">
            <MdError size={30} />
            <span>{ErrorMessage}</span>
            {closeButton}
        </div>
    )
}