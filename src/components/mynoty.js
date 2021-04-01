import Noty from 'noty';
import '../styles/mynoty.css';
import "../../node_modules/noty/lib/noty.css";
import "../../node_modules/noty/lib/themes/bootstrap-v4.css";
class mynoty{
    show(msg,type){
        let noty1 = new Noty({
            text: msg,
            layout: "topRight",
            theme: "bootstrap-v4",
            type: type===1?'success':'error'
          }).show()
          setTimeout(() => {
            noty1.close();
          }, 8000);
    }
}
var instance = new mynoty();
export default instance;