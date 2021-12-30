import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/global.css'

import VueExcelXlsx from "vue-excel-xlsx";

// import moment from 'moment';


const app = createApp(App)
app.use(router);
app.use(VueExcelXlsx);

app.mount('#app');
