import Notification from '../components/notification/main.js'
import MessageBox from '../components/message-box/main.js'
import Message from '../components/message/main.js'
import Loading from '../components/loading/directive.js'

export default {
    install (vue) {
        vue.use(Loading);
        vue.prototype.$msgbox = MessageBox;
        vue.prototype.$alert = MessageBox.alert;
        vue.prototype.$confirm = MessageBox.confirm;
        vue.prototype.$prompt = MessageBox.prompt;
        vue.prototype.$notify = Notification;
        vue.prototype.$message = Message;

    }
}
