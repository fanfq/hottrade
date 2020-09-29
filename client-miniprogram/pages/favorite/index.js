// pages/setting/index.js
var app = getApp();
var dbutil = require("../../utils/dbutil");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contorys:[]
  },

  checkboxChange:function(e){
    //console.log(JSON.stringify(e));
    let favs = e.detail.value;
    //console.log(JSON.stringify(favs));
    dbutil.upd_favorite(favs);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择换算货币'
    })

    var _this = this;
    let contorys = dbutil.get_contrys();

    _this.setData({
      contorys:contorys
    });
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