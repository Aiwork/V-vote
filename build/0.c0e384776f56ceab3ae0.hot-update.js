webpackHotUpdate(0,{"./src/Store/store.js":function(e,o,a){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(o,"__esModule",{value:!0});var r=a("./node_modules/babel-runtime/helpers/toConsumableArray.js"),s=t(r),n=a("./node_modules/babel-runtime/helpers/extends.js"),l=t(n),d=a("./node_modules/redux/es/index.js"),i=a("./node_modules/redux-devtools-extension/index.js"),u=a("./node_modules/redux-thunk/es/index.js"),c=t(u),_=a("./node_modules/unix-timestamp/lib/timestamp.js"),p=t(_),m=a("./src/Store/constant.js"),f=function(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(o[a]=e[a]);return o.default=e,o}(m),b={logdin:null,username:null,userToken:null,onShowCpanel:!1},v={allCoinsArrayWithData:[],voteActions:{event_time:null,coins:[]},vote_error_message:[],messages:[],amount:0},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,o=arguments[1];switch(o.type){case f.SET_TOKEN:var a=o.payload;a.logdin=!0,e=a;break;case f.VERIFIED_TOKEN:e={username:o.payload.user,userToken:o.payload.token,logdin:!0};break;case f.UNVERIFIED_TOKEN:case f.ERROR_LOGIN:e=(0,l.default)({},e,{logdin:!1});break;case f.SHOW_CPANEL:e=(0,l.default)({},e,{onShowCpanel:!0});break;case f.NOT_SHOW_CPANEL:e=(0,l.default)({},e,{onShowCpanel:!1});break;case f.SIGNOUT:e={logdin:null,username:null,userToken:null}}return e},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,o=arguments[1];switch(console.log("state=",e),o.type){case f.SET_VOTE_LIST:var a=o.payload[0],t=[],r=[];a.forEach(function(e){t.push(p.default.toDate(e.time)),r.push(e.close)});var n={coin:o.payload[1],data:[t,r]},d={labels:t,datasets:[{fill:!0,lineTension:.1,backgroundColor:"rgba(75,192,192,0.4)",borderColor:"rgba(75,192,192,1)",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"rgba(75,192,192,1)",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"rgba(75,192,192,1)",pointHoverBorderColor:"rgba(250,250,250)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:r}]};e=(0,l.default)({},e,{allCoinsArrayWithData:[].concat((0,s.default)(e.allCoinsArrayWithData),[{line:d,coin:n}])});break;case f.SET_VOTE_ACTION:e=(0,l.default)({},e,{voteActions:(0,l.default)({},e.voteActions,{coins:o.payload})});break;case f.SET_VOTE_ACTION_ERROR_MAX:console.log("vote_error_message",e.vote_error_message),e=(0,l.default)({},e,{vote_error_message:e.vote_error_message.concat([o.payload])});break;case f.GET_ACTIONS:e=(0,l.default)({},e,{voteActions:o.payload});break;case f.TIMER:e.voteActions.event_time&&(e=(0,l.default)({},e,{voteActions:{coins:[].concat((0,s.default)(e.voteActions.coins)),event_time:e.voteActions.event_time-1}}));break;case f.GET_AMOUNT:e=(0,l.default)({},e,{amount:o.payload.data.amount});break;case f.GET_CHAT:"success"===o.payload.status&&(e=(0,l.default)({},e,{messages:o.payload.data.messages}));break;case f.NEW_MESSAGE:e=(0,l.default)({},e,{messages:e.messages.concat([o.payload])})}return e},E=(0,d.createStore)((0,d.combineReducers)({reducerMain:T,userReducer:g}),(0,i.composeWithDevTools)((0,d.applyMiddleware)(c.default)));o.default=E}});
//# sourceMappingURL=0.c0e384776f56ceab3ae0.hot-update.js.map