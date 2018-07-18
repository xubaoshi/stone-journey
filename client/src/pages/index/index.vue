<template>
  <div class="container">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>

     <button open-type="getUserInfo" @getuserinfo="onGotUserInfo">授权获取用户信息</button>
     <button open-type="openSetting">授权设置页</button>
     <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权获取手机号</button>
     <button @click='getSessionKey'>获取sessionKey</button>
  </div>
</template>

<script>
import card from '@/components/card'
import { baseFetcher } from '@/utils/fetch'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      wx.login({
        success: (res) => {
          wx.getUserInfo({
            success: (data) => {
              wx.setStorageSync('userInfo', data.userInfo)
              // 后端获取  session_key 提供给前端 sessionId
              baseFetcher({
                url: '/api/user/authorize',
                data: {
                  code: res.code
                }
              }).then(sessionid => {
                console.log(sessionid)
                wx.setStorageSync('sessionid', sessionid)
              })
            }
          })

          // 授权
          // scope.userInfo 使用 wx.authorize 无法弹出确认框 使用 button 代替
          wx.authorize({
            scope: 'scope.camera',
            success (res) {
              console.log(res)
            }
          })
        }
      })
    },
    onGotUserInfo (e) {
      console.log(e.mp.detail.errMsg)
      console.log(e.mp.detail.userInfo)
      console.log(e.mp.detail.rawData)
    },
    getPhoneNumber (e) {
      console.log(e)
    },
    getSessionKey () {
      baseFetcher({
        url: '/api/user/sessionkey'
      }).then(res => {
        console.log(res)
      })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

</style>
