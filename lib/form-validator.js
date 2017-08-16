'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormValidator;
var validator = {
  required: function required(value) {
    return value.trim() !== '';
  }
};

function createEvent(type) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return {
    wwtype: 'event',
    type: type,
    data: args
  };
}

function FormValidator() {

  this.mwtype = 'view';

  this.after = function (view) {
    if (!view.useFormValidator) return;

    view.formValidate = function (group, data) {
      var _this = this;

      var validateNodeList = view.el.querySelectorAll('[data-form-validate-group=' + group + ']');
      var validateResult = {};
      var allValid = true;

      validateNodeList.forEach(function (node) {
        var dataset = $(node).data();
        var name = dataset.formValidateName;
        var required = dataset.formValidateRequired || false;
        var requiredMessage = dataset.formValidateRequiredMessage || '';

        validateResult[name] = {
          valid: true
        };

        if (required) {
          validateResult[name].valid = validator.required(data[name]);

          if (!validateResult[name].valid) {
            validateResult[name].message = requiredMessage;
          }
        }

        if (validateResult[name].valid) {
          _this.dispatch(createEvent('valid', { target: validateResult[name], el: node }));
        } else {
          allValid = false;

          _this.dispatch(createEvent('invalid', { target: validateResult[name], el: node }));
        }
      });

      return allValid;
    };
  };
}

