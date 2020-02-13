import {EventEmitter} from 'events';

let MobileEvents=new EventEmitter(); 
// ChangeCompanyName - наименование компании изменено
// ChangeFilter - фильтр компаний изменен
// AddClient - в список добавлен новый клиент
// DeleteClient - удален клиент
// EditClient - изменен клиент
// StatusClient - изменен статус клиента

export {MobileEvents};
