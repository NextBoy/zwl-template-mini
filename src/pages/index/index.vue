<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <button @click="wxLogin">微信登录</button>
    <button open-type="getUserInfo" @getuserinfo="handleGetUserInfo">微信授权</button>
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
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import card from '@/components/card'

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
    handleGetUserInfo (e) {},
    async wxLogin () {
      try {
        // 调用登录接口
        // 获取code
        const { code } = await this.$wxApi('login')
        // 服务端根据code获取session_key
        const loginStatus = await this.$wxApi('request', {
          url: 'http://127.0.0.1:3002/api/users/wxLogin',
          method: 'POST',
          data: {
            code
          }
        })
        console.log(loginStatus)
        // 获取iv, decryptedData
        // const userInfo = await this.$wxApi('getUserInfo')
        // const { encryptedData, iv } = userInfo
        // 验证身份
//        const checkStatus = await this.$wxApi('request', {
//          url: 'http://127.0.0.1:3002/api/users/wxUserCheck',
//          method: 'POST',
//          data: {
//            code,
//            encryptedData,
//            iv
//          }
//        })
      } catch (err) {
        console.log(err)
      }
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
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

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
