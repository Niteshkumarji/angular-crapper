import angular from 'angular';
import notie from 'notie';

class AlertService {

  constructor () {
    this.NOTIFICATION_TYPE = {
      SUCCESS: 1,
      WARNING: 2,
      ERROR: 3,
      INFO: 4
    };
  }

  // declarations
  //
  success (message, seconds) {
    notie.alert(this.NOTIFICATION_TYPE.SUCCESS, message, seconds || 1.5);
  }

  warning (message, seconds) {
    notie.alert(this.NOTIFICATION_TYPE.WARNING, message, seconds || 2);
  }

  error (message, seconds) {
    notie.alert(this.NOTIFICATION_TYPE.ERROR, message, seconds || 2.5);
  }

  info (message, seconds) {
    notie.alert(this.NOTIFICATION_TYPE.INFO, message, seconds || 2);
  }

  confirm (message, cb) {
    notie.confirm(message, 'Yes', 'Cancel', cb);
  }

}

const moduleName = 'financial-alerts.service';

let module = angular.module(moduleName, [])
  .service('AlertService', AlertService)

export default moduleName;