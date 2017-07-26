const validator = {
  required: value => value.trim() !== '',
};

function createEvent(type, ...args) {
  return {
    wwtype: 'event',
    type: type,
    data: args
  };
}

export default function FormValidator() {

  this.mwtype = 'view';

  this.after = function(view) {
    if (!view.useFormValidator) return;

    view.validate = function(group, data) {
      const validateNodeList = view.el.querySelectorAll(`[data-form-validate-group=${group}]`);
      const validateResult = {};
      let allValid = true;

      validateNodeList.forEach(node => {
        const dataset = $(node).data();
        const name = dataset.formValidateName;
        const required = dataset.formValidateRequired || false;
        const requiredMessage = dataset.formValidateRequiredMessage || '';

        validateResult[name] = {
          valid: true
        };

        if (required ) {
          validateResult[name].valid = validator.required(data[name]);

          if (!validateResult[name].valid) {
            validateResult[name].message = requiredMessage;
          }
        }

        if (validateResult[name].valid) {
          this.dispatch(createEvent('valid', { target: validateResult[name], el: node }));
        } else {
          allValid = false;

          this.dispatch(createEvent('invalid', { target: validateResult[name], el: node }));
        }
      });

      return allValid;
    }
  };
}
