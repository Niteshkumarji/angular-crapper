import moment from 'moment';
import datePickerModal from '../templates/partials/date-picker.partial.template.html';

export default function dateFilter () {
  // Creates:
  //
  const directive = {
    restrict: 'E',
    bindToController: {
      'from': '=from',
      'to': '=to'
    },
    controller: controller,
    controllerAs: 'dfc',
    template: `<div class="date-filter">
      <md-button class="md-icon-button date-filter-button" ng-click="dfc.openDateDialog($event)">
        <md-icon>date_range</md-icon>
      </md-button> 

      <p class="date-description">
        {{dfc.from | date:'MMM d'}}
        <span flex>-</span>
        {{dfc.to | date:'MMM d'}}
      </p>
      
      <span flex></span>

      <md-button class="md-icon-button date-filter-button" ng-click="dfc.subtract()" ng-disabled="dfc.fromDisabled()">
        <md-icon>keyboard_arrow_left</md-icon>
      </md-button>
      <md-button class="md-icon-button date-filter-button" ng-click="dfc.add()" ng-disabled="dfc.toDisabled()">
        <md-icon>keyboard_arrow_right</md-icon>
      </md-button>
    </div>`
  };

  return directive;
  
  function controller ($scope, $mdDialog) {
    'ngInject';
    
    this.settings = {
      filter: 2, // month
      0: {
        selected: 0,
        0: {
          from: moment().startOf('day').toDate(),
          to: moment().endOf('day').toDate()
        },
        1: {
          from: moment().subtract(1, 'd').startOf('day').toDate(),
          to: moment().subtract(1, 'd').endOf('day').toDate()
        },
        2: {
          from: moment().subtract(3, 'd').startOf('day').toDate(),
          to: moment().endOf('day').toDate()
        }
      },
      1: {
        selected: 0,
        0: {
          from: moment().subtract(7, 'd').startOf('day').toDate(),
          to: moment().subtract(1, 'd').endOf('day').toDate()
        },
        1: {
          from: moment().subtract(9, 'd').startOf('day').toDate(),
          to: moment().endOf('day').toDate()
        },
        2: {
          from: moment().subtract(7, 'd').startOf('day').toDate(),
          to: moment().subtract(1, 'd').endOf('day').toDate()
        }
      },
      2: {
        selected: 3,
        0: {
          from: moment().subtract(30, 'd').startOf('day').toDate(),
          to: moment().subtract(1, 'd').endOf('day').toDate()
        },
        1: {
          from: moment().startOf('month').toDate(),
          to: moment().endOf('month').toDate()
        },
        2: {
          from: moment().subtract(1, 'M').startOf('month').toDate(),
          to: moment().subtract(1, 'M').endOf('month').toDate()
        },
        3: {
          from: moment().subtract(3, 'M').startOf('month').toDate(),
          to: moment().endOf('month').toDate()
        },
        4: {
          from: moment().subtract(6, 'M').startOf('month').toDate(),
          to: moment().endOf('month').toDate()
        }
      },
      3: {
        selected: 1,
        0: {
          from: this.from,
          to: this.to
        },
        1: {
          from: new Date(0),
          to: new Date()
        }
      }
    };

    // clone to date to compare
    this.copyTo = this.to;

    this.subtract = function () {
      let period = Math.round((this.to - this.from) / (1000*60*60*24));
      
      this.from = moment(this.from).subtract(period, 'd').startOf('day').toDate();
      this.to = moment(this.to).subtract(period, 'd').endOf('day').toDate();
    };

    this.add = function () {
      let period = Math.round((this.to - this.from) / (1000*60*60*24));

      this.from = moment(this.from).add(period, 'd').startOf('day').toDate();
      this.to = moment(this.to).add(period, 'd').endOf('day').toDate();
    };

    this.fromDisabled = function () {
      return this.from <= new Date(0);
    };

    this.toDisabled = function () {
      return this.to >= this.copyTo;
    };

    this.openDateDialog = function (ev) {
      $mdDialog.show({
        templateUrl: datePickerModal,
        scope: $scope,
        preserveScope: true,
        targetEvent: ev,
        fullscreen: true
      });
    };

    this.closeDateDialog = function () {
      $mdDialog.hide();
    };

    this.saveSettings = function () {
      let filter = this.settings[this.settings.filter];
      let settings = filter[filter.selected];

      this.from = settings.from;
      this.to = settings.to;

      this.closeDateDialog();
    };
  }
}