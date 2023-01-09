/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
// 



export  class mapinfo {
    constructor(constr) {
      this.amap = null
      this.marker={}
  }
  
  
    init(mapId,params) {
        MapLoader().then(AMap => {
          try {
            var amap = new AMap.Map(mapId, {
              ...params
          })
          this.amap  = amap
          } catch (error) {
            console.log(error)
          }
            
        })
    }
    getAmap(){
      return this.amap
    }
    getMarker(keys){
        return this.marker[keys]
    }
    setMarker(keys,value){
       this.marker[keys]=value
    }
  }
  
  
  
  function MapLoader() {
    return new Promise(function (resolve, reject) {
      if (window.AMap) {
        resolve(window.AMap);
      } else {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=e5761f5df1d30e2ffedee67d693ff590&plugin=AMap.DistrictLayer,AMap.MouseTool,AMap.Geocoder,AMap.Heatmap,AMap.PolyEditor';
        script.onerror = reject;
        document.head.appendChild(script);
      }
  
      window.initAMap = function () {
        resolve(window.AMap);
      };
    });
  }
  
