import Hafter from "./HeaderAfter";
import Hbefore from "./HeaderBefore";
const token = localStorage.getItem("ACCESS_TOKEN")
function TopHeaderNavigator({cart}){
    return(
        token !== "" ? <Hafter cart={cart}/> : <Hbefore/>
    );        
}
export default TopHeaderNavigator;