function import$(t,o){var n={}.hasOwnProperty;for(var e in o)n.call(o,e)&&(t[e]=o[e]);return t}require.register("config.jsenv",function(t,o,n){n.exports={BUILD:"git-deef1c0"}}),angular.module("App",["app.templates","ngMaterial","ui.router","comap","leaflet-directive"]).config(["$stateProvider","$urlRouterProvider","$locationProvider"].concat(function(t,o,n){return t.state("about",{url:"/about",templateUrl:"app/partials/about.html",controller:"About"}).state("comap",{url:"/comap",templateUrl:"app/partials/comap.html",controller:"CoMapCtrl"}).state("comap.county",{url:"/{county}"}).state("comap.county.booth",{url:"/{seq}"}),o.otherwise("/comap/TPQ"),n.html5Mode(!0)})).run(["$rootScope","$state","$stateParams","$location","$window","$anchorScroll"].concat(function(t,o,n,e){return t.$state=o,t.$stateParam=n,t.config_build=require("config.jsenv").BUILD,t.$on("$stateChangeSuccess",function(t,o){var n;return n=o.name,"undefined"!=typeof window&&null!==window&&"function"==typeof window.ga?window.ga("send","pageview",{page:e.$$path,title:n}):void 0})})).controller({AppCtrl:["$scope","$location","$rootScope","$sce"].concat(function(t,o){return t.$location=o,t.$watch("$location.path()",function(o){return o||(o="/"),t.activeNavId=o,t}),t.getClass=function(o){return t.activeNavId.substring(0,o.length===o)?"active":""}})}).controller({About:["$rootScope","$http"].concat(function(t){return t.activeTab="about"})}),angular.module("config",[]).constant("API_ENDPOINT","http://api-beta.ly.g0v.tw:3908");var tw3166;tw3166={CHA:"彰化縣",CYI:"嘉義市",CYQ:"嘉義縣",HSQ:"新竹縣",HSZ:"新竹市",HUA:"花蓮縣",ILA:"宜蘭縣",JME:"金門縣",KEE:"基隆市",KHH:"高雄市",LJF:"連江縣",MIA:"苗栗縣",NAN:"南投縣",PEN:"澎湖縣",PIF:"屏東縣",TAO:"桃園市",TNN:"臺南市",TPE:"臺北市",TPQ:"新北市",TTT:"臺東縣",TXG:"臺中市",YUN:"雲林縣"},angular.module("comap",["config"]).factory({CoMapData:["$http","API_ENDPOINT"].concat(function(t,o){return{get:function(n){return t.get(o+"/collections/booth/"+n)},random:function(n,e){return t.get(o+"/collections/booth",{params:{q:JSON.stringify({county:n,lat:null}),f:JSON.stringify({id:!0}),l:1,sk:Math.round(Math.random()*e)}})},count:function(n,e){return null==e&&(e={}),t.get(o+"/collections/booth",{params:{q:JSON.stringify(import$({county:n},e)),c:1}})},completion:function(){return t.get(o+"/collections/completion")},set:function(n,e){return t.put(o+"/collections/booth/"+n,e)},geocode:function(o,n){var e,a,r,c;return e=n.city,a=null!=(r=n.country)?r:"TW",c=n.county,"桃園市"===e&&(e="桃園縣 (Táoyuán)"),t.get("https://nominatim.openstreetmap.org/search",{params:import$({county:c,city:e,country:a},{format:"json",addressdetails:1,street:o})})}}})}).controller({CoMapCtrl:["$q","$scope","$sce","$materialSidenav","$state","leafletData","CoMapData"].concat(function(t,o,n,e,a,r,c){var s,u;return c.completion(JSON.stringify({lat:null})).success(function(t){var n;return null!=t&&(n=t.entries),o.completion=n}),u=t.defer(),o.$watch("$state.params.county",function(t){return t?(o.county=t,o.countyName=s=tw3166[t],c.count(t,{lat:null}).success(function(n){return o.count=n.count,c.count(t).success(function(t){return o.total=t.count,u.resolve(),"comap.county"===a.current.name?o.random():void 0})})):void 0}),o.toggleLeft=function(){return e("left").toggle()},import$(o,{center:{lat:24.5,lng:121.5,zoom:8}}),r.getMap().then(function(t){var n;return o.edit=function(t){var o;return o="https://www.openstreetmap.org/edit?"+t.osm_type+"="+t.osm_id,window.open(o,"_blank")},o.setPlace=function(t){var n;return import$((n=o.data,n.place_id=t.place_id,n),{osm_id:t.osm_type+"/"+t.osm_id,lat:t.lat,lng:t.lon,osm_name:$('tag[k="name"]',o.xml).attr("v")}),o.showOsm(o.data.osm_id,function(){return o.dirty=!0,o.selectingName=!1})},o.selectName=function(t){return(t||!o.osmdata.nameResults)&&c.geocode(o.osmdata.place_name,{city:s}).success(function(t){return o.osmdata.nameResults=t}),o.selectingName=!0},o.selectAddress=function(t){return(t||!o.osmdata.addressResults)&&c.geocode(o.osmdata.address,{city:s,county:o.data.town}).success(function(t){return o.osmdata.addressResults=t}),o.selectingAddress=!0},o.setStreet=function(t){return import$(o.data,{osm_street_id:t.osm_type+"/"+t.osm_id}),o.showOsm(o.data.osm_street_id,function(){return o.dirty=!0,o.selectingAddress=!1})},o.save=function(){var t;return o.data.osm_data=o.osmdata,c.set(o.id,{osm_data:(t=o.data).osm_data,place_id:t.place_id,osm_id:t.osm_id,osm_name:t.osm_name,lat:t.lat,lng:t.lng,osm_street_id:t.osm_street_id}).success(function(){return o.dirty=!1,o.random()})},o.random=function(){return c.random(o.county,o.count).success(function(t){var n,e,r;return o.count=t.paging.count,n=t.entries[0].id.split("-"),e=n[0],r=n[1],a.transitionTo("comap.county.booth",{county:a.params.county,seq:r})})},o.showOsm=function(e,a){var r;return r=/node/.exec(e)?"":"/full",$.ajax({url:"https://www.openstreetmap.org/api/0.6/"+e+r,dataType:"xml",success:function(e){var r,c;return o.xml=e,"function"==typeof a&&a(),(r=n)&&t.removeLayer(r),c=new L.OSM.DataLayer(e),t.fitBounds(c.getBounds()),setTimeout(function(){return c.addTo(t),n=c},200)}})},o.look=function(t){return o.showOsm([t.osm_type,t.osm_id].join("/"))},o.$watch("$state.params.seq",function(t){return void 0!==t?t?(o.id=a.params.county+"-"+a.params.seq,c.get(o.id).success(function(t){var n,e,a;return o.data=t,o.osmdata=(n=o.data.osm_data)?n:(a={},a.place_name=(e=o.data).place_name,a.address=e.address,a),(n=o.data.osm_id)?o.showOsm(n):void 0})):u.promise.then(function(){return o.random()}):void 0})})})}).controller({LeftCtrl:["$scope","$timeout","$materialSidenav"].concat(function(t,o,n){return t.close=function(){return n("left").close()}})}).controller({RightCtrl:["$scope","$timeout","$materialSidenav"].concat(function(t,o,n){return t.close=function(){return n("right").close()}})}).filter("countyName",function(){return function(t){return tw3166[t]}});