// Данные канала возвращают объект
// {
//   "mail@example.net": {
//     statusCode: 200,
//     visitorInfo: {first_name: 'Name'}
//   }
// }
var chnResponse = function(visitorsInfo) {
  console.log(visitorsInfo);
}

/*require('./chn_picasaweb')
  .picasaweb
  .getVisitorsInfo(['rostbersvb@gmail.com', 'vova@convead.com', 'galkabonka@gmail.com'], chnResponse);*/

require('./chn_fb')
  .fb
  .getVisitorsInfo(['rostbersvb@gmail.com', 'vova@convead.com', 'galkabonka@gmail.com'], chnResponse);
