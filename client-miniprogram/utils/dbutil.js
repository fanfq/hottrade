const debug = true;

const log = data =>{
  if(debug === false){
    return;
  }
  if(data instanceof Object){
    // let newarr = data.map((item,i,arr) =>{
    //   //item:遍历数组的每一项，i：数组下标，arr原数组
    //   console.log("item:"+item+",i:"+i+",arr:"+arr);
    // })

    console.log(JSON.stringify(data));
  }else{
    console.log(data);
  }
}

//初始化所有国家数据
const init_contrys = contrys =>{
  wx.setStorageSync('key_contrys',contrys);
}

//将数组数据已name为key，转换成map对象
const objChangeMap = obj => {
  let map = new Map();
  obj.map((item,i,obj)=>{
    map.set(item.name,item);
  })
  return map
}

//跟新所有国家数据
const upd_contrys = contrys =>{
  
  const arrChangeMap = objChangeMap(contrys);

  let _contrys = get_contrys();

  //item:遍历数组的每一项，i：数组下标，arr原数组
  let newarr = _contrys.map((item,i,_contrys) =>{
    const _item = arrChangeMap.get(item.name);
    item.value = _item.value;
    item.display = _item.display;
    
    return item;
  })
  wx.setStorageSync('key_contrys',newarr);
}

//
const sync_contrys = contrys =>{
  let _contrys = get_contrys();
  if(contrys && _contrys){
    upd_contrys(contrys);
  }else{
    init_contrys(contrys);
  }
}


//获取所有国家数据
const get_contrys = contrys =>{
  contrys = wx.getStorageSync('key_contrys');
  return contrys;
}

//获取所有关注的数据
const get_favorite = () =>{
  let all = get_all();
  // let newarr = data.map((item,i,arr) =>{
    //   //item:遍历数组的每一项，i：数组下标，arr原数组
    //   console.log("item:"+item+",i:"+i+",arr:"+arr);
    // })
}

const upd_base = (key) =>{
  let _contrys = get_contrys();
  if(key && _contrys){
    //item:遍历数组的每一项，i：数组下标，arr原数组
    let newarr = _contrys.map((item,i,_contrys) =>{
      if(item.name === key){
        item.base = true;
      }else{
        item.base = false;
      }      
      return item;
    })

    //reset
    init_contrys(newarr);
  }
}

const upd_favorite = (favs) =>{
  //log(favs)
  let _contrys = get_contrys();
  if(favs && _contrys){
    //item:遍历数组的每一项，i：数组下标，arr原数组
    let newarr = _contrys.map((item,i,_contrys) =>{
      if(favs.includes(item.name)){
        //log(item.name)
        item.favorite = true;
      }else{
        item.favorite = false;
      }      
      return item;
    })

    //reset
    init_contrys(newarr);
  }
}

const getdb = db => {
  db = wx.getStorageSync('key_updtime');
  return db;
}


module.exports = {
  getdb: getdb,
  upd_base:upd_base,
  upd_favorite:upd_favorite,
  sync_contrys:sync_contrys,
  get_contrys:get_contrys
}