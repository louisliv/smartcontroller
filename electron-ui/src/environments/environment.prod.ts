let bases = document.getElementsByTagName('base');
export const AppConfig = {
  production: true,
  environment: 'PROD',
  apiUrl: `http://${window.location.host}${bases[0].getAttribute('href')}/api`
};
