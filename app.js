function init(config) {
  global.config = config;
  
  // Данные канала возвращают объект
  // {
  //   "mail@example.net": {
  //     statusCode: 200,
  //     visitorInfo: {first_name: 'Name'}
  //   }
  // }

  var chnResponse = function(visitorsInfo) {
    console.log(visitorsInfo);
  };

  /*require('./chn_picasaweb')
    .picasaweb
    .getVisitorsInfo(['rostbersvb@gmail.com', 'vova@convead.com', 'galkabonka@gmail.com'], chnResponse);*/

  /*require('./chn_fb')
    .fb
    .getVisitorsInfo(['rostbersvb@gmail.com', 'vova@convead.com', 'galkabonka@gmail.com'], chnResponse);*/


  require('./chn_vk')
    .vk
    .getVisitorsInfo(['rostbersvb@gmail.com', 'vova@convead.com', 'galkabonka@gmail.com'], chnResponse);

}

var yaml = require('node-yaml');
yaml.read('config/chn.yaml', {encoding: 'utf8',  schema: yaml.schema.defaultSafe}, function(err, config) {
    if (err) throw err;
    init(config);
  }
);