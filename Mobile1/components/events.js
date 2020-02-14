import {EventEmitter} from 'events';

let MobileEvents=new EventEmitter(); 
// ChangeCompanyName - наименование компании изменено
// ChangeFilter - фильтр компаний изменен
// AddClient - в список добавлен новый клиент
// DeleteClient - удален клиент
// EditClient - нажата кнопка изменения клиента
// EditClientEnd - изменения клиента завершены
// StatusClient - изменен статус клиента

export {MobileEvents};
