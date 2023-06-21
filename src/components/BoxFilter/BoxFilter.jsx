import { useContext } from 'react'
import styles from "./BoxFilter.module.css"
import { UserContext } from '../../App'
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
export default
    function FilterChip(props) {

    const {setActiveSort, setUpdateAvailable } = useContext(UserContext);

    const { name, isSelected } = props;

    const handleClick = () => {
        setActiveSort(name);
        setUpdateAvailable(true);
    }


    return (
        <div className={`${styles.main} ${isSelected && styles.selected}`} onClick={handleClick}>
            {name}
        </div>
    )
}

