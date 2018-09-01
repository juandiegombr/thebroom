(function(e){function t(t){for(var n,s,c=t[0],i=t[1],l=t[2],u=0,f=[];u<c.length;u++)s=c[u],a[s]&&f.push(a[s][0]),a[s]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);d&&d(t);while(f.length)f.shift()();return o.push.apply(o,l||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,c=1;c<r.length;c++){var i=r[c];0!==a[i]&&(n=!1)}n&&(o.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},a={app:0},o=[];function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var d=i;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"02cc":function(e,t,r){},2856:function(e,t,r){},"41a0d":function(e,t,r){"use strict";var n=r("ebde"),a=r.n(n);a.a},4449:function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("097d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("TheGameArea"),r("Menu"),r("ThePlayButton"),e._l(e.deck,function(e,t){return r("Card",{key:t,attrs:{card:e,index:0,position:0}})}),e._l([0,1,2],function(e){return r("CardPositionMark",{key:e+999,attrs:{positionIndex:e,position:"dealer"}})}),e._l([0,1,2],function(e){return r("CardPositionMark",{key:e+99,attrs:{positionIndex:e,position:"player"}})})],2)},o=[],s=r("c93e"),c=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"game-area-background"},[r("div",{staticClass:"game-area-background-decoration"}),r("div",{staticClass:"score"},[r("div",{staticClass:"round"},[r("span",[e._v("ROUND "+e._s(e.round))])]),r("div",{staticClass:"results"},[r("p",[e._v("PLAYER: "+e._s(e.results.player))]),r("p",[e._v("DEALER: "+e._s(e.results.dealer))])]),r("div",{staticClass:"results"},[r("p",[e._v("DEAL: "+e._s(e.deal))])])])])},i=[],l=r("2f62"),d={name:"TheGameArea",props:{},computed:Object(s["a"])({},Object(l["b"])(["results","round","deal"])),components:{}},u=d,f=(r("8016"),r("2877")),p=Object(f["a"])(u,c,i,!1,null,null,null);p.options.__file="TheGameArea.vue";var m=p.exports,h=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"the-buttons",style:{bottom:"calc(20% - 4.4rem)",right:"calc(50% + 13rem)"}},[r("div",{staticClass:"buttons-group"},[r("button",{staticClass:"the-play-button",on:{click:e.newRound}},[e._v("\n      DEAL\n      "),r("i",{staticClass:"far fa-share-square button-icon"})]),r("button",{staticClass:"the-play-button",on:{click:e.resetGame}},[e._v("\n      RESET\n      "),r("i",{staticClass:"far fa-star button-icon"})])]),r("div",{staticClass:"buttons-group"},[r("button",{staticClass:"the-play-button",on:{click:e.play,dblclick:e.double}},[e._v("\n      PLAY\n      "),r("i",{staticClass:"far fa-thumbs-up button-icon"})]),r("button",{staticClass:"the-play-button",on:{click:e.play}},[e._v("\n      PASS\n      "),r("i",{staticClass:"far fa-dizzy button-icon"})])])])},v=[],C=(r("7514"),function(){var e=b(g()),t=y(e),r=k(t);return r});function y(e){for(var t=e.slice(),r=t.length-1;r>=0;r--){var n=Math.floor(Math.random()*(r+1)),a=t[n];t[n]=t[r],t[r]=a}return t}var g=function(){var e=[],t=[1,2,3,4,5,6,7,8,9,10],r=["sword","gold","heart","wood"];return t.forEach(function(t){r.forEach(function(r){e.push({value:t,suit:r})})}),e},b=function(e){return e.map(function(e){return Object(s["a"])({},e,{facedDown:!0})})},k=function(e){return e.map(function(e,t){return Object(s["a"])({index:t},e,{facedDown:!0,selected:!1,position:"deck",positionIndex:null,dealed:!1})})},w=function(e){for(var t=[],r={quantity:0,cards:[]},n=Math.pow(2,e.length),a=0;a<n;a++){r={quantity:0,cards:[]};for(var o=0;o<e.length;o++)a&Math.pow(2,o)&&(r.quantity+=e[o].value,r.cards.push(e[o]));0!==r.quantity&&t.push(r)}return t},_=function(e,t){for(var r=[],n=function(n){var a=15-e[n].value,o=t.filter(function(e){return e.quantity===a}),s=o.map(function(t){return t.cards.push(e[n]),t});r.push(s)},a=0;a<e.length;a++)n(a);return r},x=function(e){for(var t=[],r=0;r<e.length;r++)for(var n=e[r],a=0;a<n.length;a++)for(var o=n[a].cards,s=0;s<o.length;s++){var c=o[s];if(t=e[r][a].cards,O(c))return console.log("break gold seven",r,a,s),t=e[r][a].cards,t;if(D(c))return console.log("break seven",r,a,s),t=e[r][a].cards,t;if(T(c))return console.log("break gold",r,a,s),t=e[r][a].cards,t}return t},O=function(e){return 7===e.value&&"gold"===e.suit},D=function(e){return 7===e.value},T=function(e){return"gold"===e.suit},P={name:"ThePlayButton",data:function(){return{positions:{player:{top:20,left:50}}}},computed:Object(s["a"])({},Object(l["b"])(["status","turn","deal","restart","playerCards","dealerCards","selectedCards","commonCards"]),{areCardsOnPlayers:function(){return this.playerCards.length+this.dealerCards.length}}),watch:{commonCards:function(e){0===e.length&&(console.log("escoba!!!"),console.log(this.restart))},turn:function(e){var t=this;console.log(e),"dealer"===e&&setTimeout(function(){t.dealerPlay()},500)},status:function(e){"finished"===e&&this.$store.dispatch("showResults")}},methods:{double:function(){console.log("doubleclick")},play:function(){var e=function(e,t){return e+t.value},t=this.selectedCards.reduce(e,0);15===t?this.$store.dispatch("correctPlay"):this.pass()},pass:function(){var e=this.playerCards.find(function(e){return e.selected});this.$store.dispatch("pass",{player:"player",card:e})},dealerPlay:function(){var e=this,t=w(this.commonCards),r=_(this.dealerCards,t),n=x(r);console.log("plays",r),console.log("bestPlay",n),n.length>0?this.$store.dispatch("dealerPlay",n).then(function(){setTimeout(function(){e.$store.dispatch("correctPlay")},2e3)}):(this.$store.commit("selectCard",this.dealerCards[0]),setTimeout(function(){e.$store.dispatch("pass",{player:"dealer",card:e.dealerCards[0]})},2e3))},resetGame:function(){this.$store.dispatch("resetGame")},newRound:function(){this.$store.dispatch("newRound")}}},j=P,S=(r("bf9b"),Object(f["a"])(j,h,v,!1,null,null,null));S.options.__file="ThePlayButton.vue";var E=S.exports,$=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"card",class:{selected:e.card.selected},style:{top:"calc("+e.positions[e.card.position].top+"% - 4.5rem)",left:"calc("+e.positions[e.card.position].left+"% - "+(("player"!==e.card.position&&"dealer"!==e.card.position&&"common"!==e.card.position?0:"common"===e.card.position?e.commonCardsInitialPosition:10)-7*e.card.positionIndex)+"rem)"}},[r("div",{staticClass:"card-front",class:{"face-down":e.card.facedDown,selected:e.card.selected},on:{click:e.moveCard}},[r("div",{staticClass:"suit-wrapper"}),r("span",{class:"card-value "+e.suitColor+"-color"},[e._v("\n        "+e._s(e.card.value)+"\n      ")])]),r("div",{staticClass:"card-back",class:{"face-down":e.card.facedDown}},[r("div",{staticClass:"card-back-design"}),r("div",{staticClass:"card-back-corners-top"}),r("div",{staticClass:"card-back-corners-bottom"})])])},M=[],A=(r("c5f6"),{name:"Card",props:{index:{type:Number,required:!0},card:{type:Object,required:!0},position:{type:Number,required:!0}},computed:Object(s["a"])({},Object(l["b"])(["playerCards","dealerCards","commonCards"]),{suitColor:function(){var e={heart:"red",sword:"blue",gold:"yellow",wood:"green"};return e[this.card.suit]},playersCards:function(){return this.playerCards.length+this.dealerCards.length},commonCardsInitialPosition:function(){return this.commonCards.length/2*6+(this.commonCards.length-1)/2}}),methods:{moveCard:function(){this.card.selected?this.$store.commit("deselectCard",this.card):this.$store.commit("selectCard",this.card)},clickOnCard:function(){this.cardSelected=!this.cardSelected},clickOnCardTest:function(){this.cardSelected=!this.cardSelected;var e=_(this.playerCards,w(this.commonCards));console.log(_(this.playerCards,w(this.commonCards))),console.log(x(e))}},data:function(){return{cardSelected:!1,positions:{deck:{top:50,left:5},common:{top:50,left:50},dealer:{top:20,left:50},dealerDeck:{top:20,left:20},player:{top:80,left:50},playerDeck:{top:80,left:80}},positionstest:[{top:40,left:50},{top:2,left:50},{top:80,left:50},{top:100,left:100},{top:0,left:100},{top:50,left:50}],number:0}},components:{}}),G=A,I=(r("e60d"),Object(f["a"])(G,$,M,!1,null,null,null));I.options.__file="Card.vue";var N=I.exports,R=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"card-position-mark",style:{top:"calc("+e.positions[e.position].top+"% - 4.5rem)",left:"calc("+e.positions[e.position].left+"% - "+(10-7*e.positionIndex)+"rem)"}})},q=[],B={name:"CardPositionMark",props:{positionIndex:{type:Number,required:!0},position:{type:String,required:!0}},data:function(){return{positions:{deck:{top:20,left:5},common:{top:50,left:50},dealer:{top:20,left:50},dealerDeck:{top:20,left:80},player:{top:80,left:50},playerDeck:{top:80,left:80}}}}},H=B,W=(r("41a0d"),Object(f["a"])(H,R,q,!1,null,null,null));W.options.__file="CardPositionMark.vue";var V=W.exports,L=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},Z=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"menu"},[r("i",{staticClass:"fas fa-cog help-icon"})])}],J={name:"Menu"},Y=J,z=(r("bb78"),Object(f["a"])(Y,L,Z,!1,null,null,null));z.options.__file="Menu.vue";var F=z.exports,U=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("transition",{attrs:{name:"balloon"}},[e.show?r("div",{staticClass:"hand-result"},[r("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 280 84.41"}},[r("g",{attrs:{id:"result-push"}},[r("path",{staticClass:"text-white",attrs:{id:"result-push-balloon",d:"M219.83,112H80.17a4.12,4.12,0,0,0-4.11,4.11v50.11a4.12,4.12,0,0,0,4.11,4.11H139.8L150,188l10.2-17.67h59.63a4.12,4.12,0,0,0,4.11-4.11V116.11A4.12,4.12,0,0,0,219.83,112Z",transform:"translate(-10 -107.8)",fill:"currentColor"}}),r("g",{attrs:{id:"result-push-text"}},[r("path",{staticClass:"text-secondary",attrs:{d:"M96.7,145.78H87v13.45H84.28V123.16H97.37c7.94,0,13.4,4.07,13.4,11v.1C110.77,141.87,104.23,145.78,96.7,145.78Zm11.39-11.44c0-5.72-4.43-8.71-10.93-8.71H87v17.68h9.9c6.7,0,11.24-3.51,11.24-8.87Z",transform:"translate(-10 -107.8)",fill:"currentColor",opacity:"0.75"}}),r("path",{staticClass:"text-secondary",attrs:{d:"M131.73,159.8c-8.66,0-14.79-5.46-14.79-15.57V123.16h2.68V144c0,8.51,4.59,13.4,12.22,13.4,7.32,0,12-4.43,12-13.14V123.16h2.68v20.77C146.53,154.29,140.5,159.8,131.73,159.8Z",transform:"translate(-10 -107.8)",fill:"currentColor",opacity:"0.75"}}),r("path",{staticClass:"text-secondary",attrs:{d:"M167.6,159.75A20.54,20.54,0,0,1,153.07,154l1.75-2c4,3.66,7.63,5.36,12.94,5.36s9.12-3,9.12-7.16v-.1c0-3.81-2-6-10.21-7.68-8.66-1.75-12.16-4.69-12.16-10.15v-.1c0-5.36,4.9-9.48,11.6-9.48A18,18,0,0,1,178.48,127l-1.7,2.11A15.53,15.53,0,0,0,166,125.06c-5.31,0-8.81,3-8.81,6.8v.1c0,3.81,2,6.13,10.52,7.89,8.35,1.7,11.86,4.69,11.86,9.95v.1C179.56,155.73,174.56,159.75,167.6,159.75Z",transform:"translate(-10 -107.8)",fill:"currentColor",opacity:"0.75"}}),r("path",{staticClass:"text-secondary",attrs:{d:"M213,159.24V142.33H189.95v16.91h-2.68V123.16h2.68v16.7H213v-16.7h2.68v36.08Z",transform:"translate(-10 -107.8)",fill:"currentColor",opacity:"0.75"}})])])])]):e._e()])},K=[],Q={components:{},props:{player:{type:String,required:!1}},data:function(){return{show:!1}},computed:{turn:function(){return this.$store.state.turn}},watch:{turn:function(e){var t=this;e===this.player&&(this.show=!0),setTimeout(function(){t.show=!1},2e3)}},methods:{timer:function(){this.show=!this.show}},mounted:function(){}},X=Q,ee=(r("aeb8"),Object(f["a"])(X,U,K,!1,null,"6fefcbbf",null));ee.options.__file="MessageOk.vue";var te=ee.exports,re={name:"app",computed:Object(s["a"])({},Object(l["b"])(["status","turn","deal","deck","playerCards","dealerCards"]),{test:function(){return this.$store.state.restart},playersCards:function(){return this.playerCards.length+this.dealerCards.length}}),watch:{turn:function(e){console.log(e)},playersCards:function(e){e||this.test||"finished"===this.status||this.$store.dispatch("startDeal")},restart:function(e){console.log(e,this.playersCards)}},mounted:function(){this.$store.dispatch("startBroomGame")},components:{Menu:F,Card:N,CardPositionMark:V,TheGameArea:m,ThePlayButton:E,MessageOk:te}},ne=re,ae=(r("5c0b"),Object(f["a"])(ne,a,o,!1,null,null,null));ae.options.__file="App.vue";var oe=ae.exports,se=r("8c4f"),ce=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("img",{attrs:{alt:"Vue logo",src:r("cf05")}}),n("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},ie=[],le={name:"home",components:{}},de=le,ue=Object(f["a"])(de,ce,ie,!1,null,null,null);ue.options.__file="Home.vue";ue.exports;n["a"].use(se["a"]);var fe=new se["a"]({routes:[]});r("ac6a");n["a"].use(l["a"]);var pe={status:"",deck:[],playerCards:[],dealerCards:[],commonCards:[],selectedCards:[],playerCardsWinned:[],dealerCardsWinned:[],turn:"player",deal:0,restart:!1,round:1,results:{player:0,dealer:0}},me=new l["a"].Store({state:JSON.parse(JSON.stringify(pe)),mutations:{clearStateToNewGame:function(e){e.restart=!0,e.playerCards=[],e.dealerCards=[],e.commonCards=[],e.selectedCards=[],e.playerCardsWinned=[],e.dealerCardsWinned=[],e.turn="player",e.deal=0,e.round=1,e.results={player:0,dealer:0}},clearStateToNextRound:function(e){e.restart=!0,e.playerCards=[],e.dealerCards=[],e.commonCards=[],e.selectedCards=[],e.playerCardsWinned=[],e.dealerCardsWinned=[],e.turn="player",e.deal=0,e.round++},cardsToDeck:function(e){var t=e.deck.map(function(e){return e.position="deck",e.positionIndex=0,e.facedDown=!0,e});e.deck=t},setNewDeck:function(e,t){e.deck=t},deal:function(e,t){var r={player:e.playerCards,dealer:e.dealerCards},n=e.deck.find(function(e){return!1===e.dealed});if("commonCard"===t)return n.facedDown=!1,n.player="common",n.position="common",n.positionIndex=e.commonCards.length,n.dealed=!0,void e.commonCards.push(n);n.facedDown=!1,n.player=t,n.position=t,n.positionIndex=r[t].length,n.dealed=!0,r[t].push(n),e.restart=!1},dealerSelectedCards:function(e,t){e.selectedCards=t;var r=t.filter(function(e){return"dealer"===e.player})[0],n=e.dealerCards,a=t.filter(function(e){return"common"===e.player}),o=e.commonCards;n.forEach(function(e,t){e.suit===r.suit&&e.value===r.value&&(n[t].selected=!0,n[t].facedDown=!1)}),a.forEach(function(e,t){o.forEach(function(t,r){e.suit===t.suit&&e.value===t.value&&(o[r].selected=!0)})})},selectCard:function(e,t){if(("common"===t.player||t.player===e.turn)&&!e.deck.find(function(e){return"common"!==t.player&&e.selected&&e.player===t.player})){var r=t.index;"dealer"===t.player&&(e.deck[r].facedDown=!1,console.log("dealer card selected")),e.selectedCards.push(t),e.deck[r].selected=!0}},deselectCard:function(e,t){var r=t.index;e.deck[r].selected=!1,e.selectedCards.some(function(r,n){r===t&&e.selectedCards.splice(n,1)})},removePlayedCard:function(e,t){var r=t.player,n=t.index;e.deck[n].position="".concat(e.turn,"Deck"),e.deck[n].facedDown=!0,e.deck[n].selected=!1,e.deck[n].positionIndex=0;var a={dealer:e.dealerCards,player:e.playerCards,common:e.commonCards};a[r].forEach(function(e,n){e===t&&a[r].splice(n,1)}),a[r].filter(function(e){return"common"===e.player}).forEach(function(e,t){a[r][t].positionIndex=t})},resetSelectedCards:function(e){e.selectedCards=[],e.deck=e.deck.map(function(e){return e.selected=!1,e})},changeTurn:function(e){var t={player:"dealer",dealer:"player"};e.turn=t[e.turn]},setCardToCommonCards:function(e,t){var r=t.player,n=t.card,a={player:e.playerCards,dealer:e.dealerCards},o=a[r].filter(function(e,t){return e===n&&a[r].splice(t,1),e!==n});e.deck.forEach(function(t,r){t===n&&(e.deck[r].facedDown=!1,e.deck[r].position="common",e.deck[r].positionIndex=e.commonCards.length,e.deck[r].player="common")}),a[r]=o,n.selected=!1,n.player="common",e.commonCards.push(n)},dealDid:function(e){6===e.deal?e.status="finished":e.deal++},setResults:function(e,t){var r=t.player,n=t.dealer;e.results.player=r,e.results.dealer=n}},actions:{resetGame:function(e){var t=e.commit,r=e.dispatch;t("clearStateToNewGame"),t("cardsToDeck"),setTimeout(function(){r("startBroomGame")},1e3)},startBroomGame:function(e){var t=e.commit,r=e.dispatch,n=C();t("setNewDeck",n),r("startDeal")},startDeal:function(e){var t=e.commit,r=e.dispatch,n=e.state;if(6!==n.deal){var a=["player","dealer","player","dealer","player","dealer"];a.forEach(function(e,r){setTimeout(function(){t("deal",e)},10*r)}),0===n.deal&&setTimeout(function(){r("startDealCommonCards")},10*a.length-1),t("dealDid")}else n.status="finished"},startDealCommonCards:function(e){for(var t=e.commit,r=4,n=0;n<r;n++)setTimeout(function(){t("deal","commonCard")},10*n)},correctPlay:function(e){var t=e.commit,r=e.state,n={player:r.playerCards,dealer:r.dealerCards},a=r.turn;r.selectedCards.forEach(function(e,o){for(var s=0;s<n[a].length;s++){var c=n[a][s];if(c===e){t("removePlayedCard",c);break}}for(var i=0;i<r.commonCards.length;i++){var l=r.commonCards[i];l===e&&t("removePlayedCard",l)}}),t("changeTurn"),t("resetSelectedCards")},pass:function(e,t){var r=e.commit,n=(e.state,t.player),a=t.card;r("setCardToCommonCards",{player:n,card:a}),r("resetSelectedCards"),r("changeTurn")},dealerPass:function(e,t){var r=e.commit,n=(e.state,t.player),a=t.card;r("setCardToCommonCards",{player:n,card:a}),r("resetSelectedCards"),r("changeTurn")},dealerPlay:function(e,t){var r=e.commit;return r("dealerSelectedCards",t),!0},showResults:function(e){var t=e.commit,r=e.state,n=r.deck.filter(function(e){return"playerDeck"===e.position}),a=r.deck.filter(function(e){return"dealerDeck"===e.position}),o={cards:n.length,goldSeven:n.filter(function(e){return 7===e.value&&"gold"===e.suit}).length,seven:n.filter(function(e){return 7===e.value}).length,gold:n.filter(function(e){return"gold"===e.suit}).length},s={cards:a.length,goldSeven:a.filter(function(e){return 7===e.value&&"gold"===e.suit}).length,seven:a.filter(function(e){return 7===e.value}).length,gold:a.filter(function(e){return"gold"===e.suit}).length},c={player:0,dealer:0,winner:null};for(var i in o)o[i]>s[i]?c.player++:o[i]<s[i]&&c.dealer++;c.player>c.dealer?c.winner="player":c.winner="dealer",t("setResults",{player:c.player,dealer:c.dealer}),console.log({player:o,dealer:s,points:c})},newRound:function(e){var t=e.commit,r=e.dispatch;t("clearStateToNextRound"),t("cardsToDeck"),setTimeout(function(){r("startBroomGame")},1e3)}},getters:{commonCards:function(e){return e.deck.filter(function(e){return"common"===e.position})},dealerCards:function(e){return e.deck.filter(function(e){return"dealer"===e.position})},dealeWinnedrCards:function(e){return e.deck.filter(function(e){return"dealerDeck"===e.position})},playerCards:function(e){return e.deck.filter(function(e){return"player"===e.position})},playerWinnedCards:function(e){return e.deck.filter(function(e){return"playerDeck"===e.position})}}}),he=r("9483");Object(he["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),n["a"].config.productionTip=!1,new n["a"]({router:fe,store:me,render:function(e){return e(oe)}}).$mount("#app")},"5c0b":function(e,t,r){"use strict";var n=r("2856"),a=r.n(n);a.a},"671f":function(e,t,r){},"693f":function(e,t,r){},8016:function(e,t,r){"use strict";var n=r("9b96"),a=r.n(n);a.a},"9b96":function(e,t,r){},aeb8:function(e,t,r){"use strict";var n=r("671f"),a=r.n(n);a.a},bb78:function(e,t,r){"use strict";var n=r("02cc"),a=r.n(n);a.a},bf9b:function(e,t,r){"use strict";var n=r("4449"),a=r.n(n);a.a},cf05:function(e,t,r){e.exports=r.p+"img/logo.82b9c7a5.png"},e60d:function(e,t,r){"use strict";var n=r("693f"),a=r.n(n);a.a},ebde:function(e,t,r){}});
//# sourceMappingURL=app.017988ab.js.map