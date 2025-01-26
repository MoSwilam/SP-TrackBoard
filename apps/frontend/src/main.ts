import './styles.scss';
import router from './router';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './app/App.vue';


const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.mount('#root');
