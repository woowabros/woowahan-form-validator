# woowahan-form-validator

Form validator middleware for woowahanjs

#### requirements

* woowahanjs v0.3.0 higher

## Install

```
npm install --save-dev woowahan-form-validator
```

## Setup

```javascript
import Woowahan from 'woowahan';
import FormValidator from 'woowahan-form-validator';

const app = new Woowahan();

app.set(FormValidator);
```

## Use

```handlebars
<div>
  <form name="myform">
    <div class="form-group">
      <label for="id">아이디</label>
      <input type="text" class="form-control" name="id" id="id" placeholder="아이디"
              data-form-validate-group="login"
              data-form-validate-name="id"
              data-form-validate-type="string"
              data-form-validate-required="true"
              data-form-validate-required-message="아이디는 필수입력입니다"
        >
      <span class="text-warning hide"></span>
    </div>
    <div class="form-group">
      <label for="password">비밀번호</label>
      <input type="password" class="form-control" name="password" id="password" placeholder="비밀번호"
              data-form-validate-group="login"
              data-form-validate-name="password"
              data-form-validate-type="string"
              data-form-validate-required="true"
              data-form-validate-required-message="비밀번호는 필수입력입니다"
        >
      <span class="text-warning hide"></span>
    </div>
    <button type="submit">Submit</button>
  </form>
</div>
```

```javascript
import Woowahan from 'woowahan';
import template from './template.hbs';

export default Woowahan.View.create('myView', {
  template, 

  useFormValidator: true,

  events: {
    '@submit form': 'onSubmit',
    '@valid': 'onFormValid',
    '@invalid': 'onFormInvalid'
  }

  onFormValid(data) {
    $(data.el).next().text('').addClass('hide');
  },

  onFormInvalid(data) {
    $(data.el).next().text(data.target.message).removeClass('hide');
  },

  onSubmit(formData, event) {
    event.preventDefault();

    if(!this.formValidate('login', formData)) return;

    // Do something
  }
});

```
