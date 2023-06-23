import Component from "./BoxFilter.module.css"
import { UserContext } from '../../App'
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'

// receives props as its parameter.
    function FilterChip(props) {

    const {setActiveSort, setModifyStatus } = useContext(UserContext);
    // props are like, when we want to change set the const value and can access and modify by states
    const { name, isSelected } = props;

    const handleClick = () => {
        // updates the active sort value and modifies the status
        setActiveSort(name);
        //  furthr rendering and updates in the component.
        setModifyStatus(true);
    }


    return (

        // renders div-element with dynamically generated CSS classes bases on isSelected prop. .
        <div className={`${Component.BoxFilter} ${isSelected && Component.Filterupon}`} onClick={handleClick}>
            {/* handleClick function is assign as the click event handler for the element */}
            {name}
        </div>
    )
}

export default FilterChip;


