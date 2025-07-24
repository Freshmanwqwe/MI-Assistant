import EventRouter from "./EventRouter";
import { loadExistedTestList, loadConfig, saveConfig, savePoints, loadPoints} from '../Functions/local.store'
import {testAPI, AddCatChat} from '../Functions/llm'
import { createConfigWindow } from '../configView'
import { createAddCatWindow } from "../addCatView";

const routers = new Array();

routers.push(
    new EventRouter(
        'show-info', // name
        'event', // evnet
        (api, data={}) => {
            api.dialog.showMessageBox({
                  type: 'info',
                  message: 'HCI@ISCAS : MedImageAssistant',
                  buttons: ['OK']
                })
        }
    )
)

// load local test configs
routers.push(
    new EventRouter(
        'testlist-get', // name
        'asyncevent', // evnet
        async (api, data={}) =>  {
            const testList = await loadExistedTestList();
            return testList;
        }
    )
)

routers.push(
    new EventRouter(
        'create-config',
        'event',
        (api, data={}) => {
            createConfigWindow();
        }
    )
)


routers.push(
    new EventRouter(
        'create-addcat',
        'event',
        (api, data={}) => {
            createAddCatWindow();
        }
    )
)


routers.push(
    new EventRouter(
        'request-config',
        'asyncevent', // evnet
        async (api, data={}) =>  {
            const config = await loadConfig();
            return config;
        }
    )
)



routers.push(
    new EventRouter(
        'save-config',
        'event',
        (api, data) => {
            saveConfig(data.data);
        }
    )
)

routers.push(
    new EventRouter(
        'save-points',
        'event',
        (api, data) => {
            savePoints(data.data);
        }
    )
)

routers.push(
    new EventRouter(
        'load-points',
        'asyncevent',
        async (api, data) =>  {
            const res = await loadPoints(data.data);
            return res;
        }
    )
)

routers.push(
    new EventRouter(
        'test-api',
        'asyncevent', // evnet
        async (api, data) =>  {
            const res = await testAPI(data.data);
            return res;
        }
    )
)

routers.push(
    new EventRouter(
        'addcat-chat', // name
        'asyncevent', // evnet
        async (api, data={}) =>  {
            const res = await AddCatChat(data.data);
            return res;
        }
    )
)


export default routers;