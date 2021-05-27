import { ElectronService } from '../app/core/services';

let isElectron = !!(window && window.process && window.process.type)
const baseUrlName = isElectron ? "localhost" : window.location.hostname
export const AppConfig = {
  production: true,
  environment: 'PROD',
  apiUrl: `http://${baseUrlName}/api`
};
