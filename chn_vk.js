var VK = require('vksdk');
var config = global.config.vk;
var vk = new VK({
  'appId'     : config.appId,
  'appSecret' : config.appSecret,
  'language'  : 'ru'
});

// ссылка для авторизации
// https://oauth.vk.com/authorize?client_id=5143220&redirect_uri=http://app.convead.io&scope=4259840&response_type=token

// TODO develop process

module.exports.vk = {
  getVisitorsInfo: function(emails, callback) {
    this.setToken();
    vk.request('users.get', {email: 'svb-tver@mail.ru', fields: 'photo_400_orig,contacts,maiden_name'}, function(res) {
      console.log(res);
    });
  },
  setToken: function() {
    vk.setToken(config.accessToken);
    vk.setSecureRequests(true);
  },
  getToken: function() {
    vk.requestServerToken();
    vk.on('serverTokenReady', function(_o) {
      console.log(_o);
    });
  },
  request: function(email) {

  },
};