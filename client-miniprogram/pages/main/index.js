var app = getApp();
var dbutil = require("../../utils/dbutil");

// pages/main/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorites:[],
    base:{},
    usd:{},
    updtime:null,
    contorys:[]
  },

  //页面跳转到 base/index
 baseClick:function(e){
   console.log("12"+e);
   //wx.navigateTo("../base/index");

   wx.navigateTo({
    url: '../base/index'
  })

 },
 //页面跳转到 favorite/index
 addClick:function(e){
  //console.log("aad"+e);
  wx.navigateTo({
    url: '../favorite/index'
  })
},


  loadData:function(){
    var _this = this;




    // wx.setNavigationBarTitle({
    //   title: 'HotTrade'
    // })

    var updtime =  wx.getStorageSync('key_updtime');
   
    

    let contorys = dbutil.get_contrys();

    if(contorys){
      let bases = contorys.filter(data=>{return data.base == true});
      let favorites = contorys.filter(data=>{return data.favorite == true});
      let usds = contorys.filter(data=>{return data.name === "USD"});
      //console.log(JSON.stringify(contorys))
  
      _this.setData({
        usd:usds[0],
        base:bases[0],//基准货币
        updtime:updtime,
        contorys:contorys,//所有货币
        favorites:favorites//货币换算列表
      })
    }
      
    

    
  },



  //base 跟新，对于的favorite也会跟着跟新
  baseDisplayUpd:function(e){
    let _this = this;
    let _usd = _this.data.usd;
    let _favorites = _this.data.favorites;
    let _base = _this.data.base;

    console.log( _usd);
    var display = e.detail.value;
    var name = e.currentTarget.dataset.name;
    var value = e.currentTarget.dataset.value;

    console.log(name+","+display+","+value);

    if(_base.name === _usd.name){
      //基准货币为USD
      let newarr = _favorites.map((item,i,_favorites) =>{
        item.display = parseFloat((display*item.value).toFixed(4));
        return item;
      });

      _this.setData({
        favorites:newarr
      });

    }else{
      //基准货币为USD
      let rate = display / _base.value;
      let usd_display = _usd.value * rate;

      let newarr = _favorites.map((item,i,_favorites) =>{
        item.display = parseFloat((usd_display*item.value).toFixed(4));
        return item;
      });

      _this.setData({
        favorites:newarr
      });
    }
  },

  favoriteDisplayUpd:function(e){
    let _this = this;
    let _usd = _this.data.usd;
    let _favorites = _this.data.favorites;
    let _base = _this.data.base;

    var display = e.detail.value;
    var name = e.currentTarget.dataset.name;
    var value = e.currentTarget.dataset.value;

    console.log(name+","+display+","+value);
    if(_base.name === _usd.name){
      //基准货币为USD
      let rate = display / value;
      _base.display = parseFloat((rate * _base.value).toFixed(4));

      let newarr = _favorites.map((item,i,_favorites) =>{
        if(item.name === name){
          item.display = display;
        }else{
          item.display = parseFloat((_base.display*item.value).toFixed(4));
        }
        return item;
      });

      _this.setData({
        base:_base,
        favorites:newarr
      });

    }else{
      //基准货币为USD
      let rate = display / value;
      _usd.display = parseFloat((rate * _usd.value).toFixed(4));
      _base.display = parseFloat((rate * _base.value).toFixed(4));

      let newarr = _favorites.map((item,i,_favorites) =>{
        if(item.name === name){
          item.display = display;
        }else{
          item.display = parseFloat((_usd.display*item.value).toFixed(4));
        }
        return item;
      });

      _this.setData({
        base:_base,
        favorites:newarr,
        usd:_usd
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let _this = this;
    wx.setNavigationBarTitle({
      title: 'HotTrade'
    })

    //每次打开同步一次数据，并本地缓存
     //网络数据请求
     wx.request({
      url: 'https://host/all',
      success: function (res) {

        console.log(res);

        if(res.data.code == 200){
          var updtime = res.data.msg;
          var contorys = res.data.countrys;
  
          console.log(updtime);
          console.log(contorys);
  
          //缓存同步时间
          wx.setStorageSync('key_updtime', updtime);
  
          //缓存所有数据
          dbutil.sync_contrys(contorys);
  
          let _contrys = dbutil.get_contrys();
  
          let bases = _contrys.filter(data=>{return data.base == true});
          let favorites = _contrys.filter(data=>{return data.favorite == true});
          let usds = _contrys.filter(data=>{return data.name === "USD"});
          //console.log(JSON.stringify(contorys))
      
          _this.setData({
            usd:usds[0],
            base:bases[0],//基准货币
            updtime:updtime,
            contorys:_contrys,//所有货币
            favorites:favorites//货币换算列表
          })
        }else{
          console.info("sync error")
        }

      },
      fail:function(res){
        console.log("error");
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log("onshow")
    
    this.loadData(); 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})