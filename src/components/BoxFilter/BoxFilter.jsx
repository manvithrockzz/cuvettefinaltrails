import { useContext } from 'react'
import Component from "./BoxFilter.module.css"
import { UserContext } from '../../App'
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
export default
    function FilterChip(props) {

    const {setActiveSort, setModifyStatus } = useContext(UserContext);

    const { name, isSelected } = props;

    const handleClick = () => {
        setActiveSort(name);
        setModifyStatus(true);
    }


    return (
        <div className={`${Component.BoxFilter} ${isSelected && Component.Filterupon}`} onClick={handleClick}>
            {name}
        </div>
    )
}

