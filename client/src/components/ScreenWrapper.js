import Screen from "./Screen";
import ClearButton from "./ClearButton";
import "./ScreenWrapper.css";

const ScreenWrapper = ({ value, setValue, setClear }) => {
    return(
        <div className="screenwrapper">
            <ClearButton setValue={setValue} setClear={setClear} />
            <Screen value={value} />
        </div>
    )
}

export default ScreenWrapper;