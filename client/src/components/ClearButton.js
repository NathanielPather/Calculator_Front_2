import "./ClearButton.css";

const ClearButton = ({ setValue, setClear, onClick }) => {
    return(
        <button className="clearbutton" onClick={() => {
            setValue(0);
            setClear(false);
        }}>
            AC
        </button>
    );
};

export default ClearButton;