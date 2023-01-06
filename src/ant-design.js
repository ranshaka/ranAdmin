/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
// ant design vue library
import { 
    ConfigProvider,
    Layout,
    Input,
    InputNumber,
    Button,
    Switch,
    Radio,
    Checkbox,
    Select,
    Card,
    Form,
    FormModel,
    Row,
    Col,
    Modal,
    Table,
    Tabs,
    Icon,
    Badge,
    Popover,
    Dropdown,
    List,
    Avatar,
    Breadcrumb,
    Steps,
    Spin,
    Menu,
    Alert,
    Drawer,
    Pagination,
    Transfer,
    Calendar,
    Space,
    Divider,
  } from 'ant-design-vue'
  
  const importAntd = Vue => {
    Vue.use(ConfigProvider)
    Vue.use(Layout)
    Vue.use(Input)
    Vue.use(InputNumber)
    Vue.use(Button)
    Vue.use(Switch)
    Vue.use(Radio)
    Vue.use(Checkbox)
    Vue.use(Select)
    Vue.use(Card)
    Vue.use(Form)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Modal)
    Vue.use(Table)
    Vue.use(Tabs)
    Vue.use(Badge)
    Vue.use(Popover)
    Vue.use(Dropdown)
    Vue.use(List)
    Vue.use(Avatar)
    Vue.use(Breadcrumb)
    Vue.use(Steps)
    Vue.use(Spin)
    Vue.use(Menu)
    Vue.use(Alert)
    Vue.use(Drawer)
    Vue.use(Pagination)
    Vue.use(Transfer)
    Vue.use(Calendar)
    Vue.use(Space)
    Vue.use(Divider)

    process.env.NODE_ENV !== 'production' && console.warn('ant design use lazy-load !')
  }
  
  export default importAntd
  