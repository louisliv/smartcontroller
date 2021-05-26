let bases = document.getElementsByTagName('base');
export const AppConfig = {
  production: true,
  environment: 'PROD',
  apiUrl: `http://${window.location.host}:8000/api`
};
