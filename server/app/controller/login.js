const Controller = require('egg').Controller;
const config = require('../config')
const uuid = require('uuid/v1')
// const WXBizDataCrypt = require('../utils/WXBizDataCrypt')

class LoginController extends Controller {
  async getSessionId() {
    const url = 'https://api.weixin.qq.com/sns/jscode2session'
    const { ctx , app } = this
    const { code } = ctx.request.query
    const result = await ctx.curl(`${url}?appid=${config.appid}&secret=${config.secret}&js_code=${code}&grant_type=authorization_code`, {
      dataType: 'json',
    });
    const sessionId = uuid()
    const obj = {[sessionId]: `${result.data.session_key}#${result.data.openid}`}
    await app.redis.set('sessionid',JSON.stringify(obj))
    ctx.body = sessionId
    ctx.status = 200
  }

  async getSessionKey() {
    const { ctx, app } = this;
    const obj = await app.redis.get('sessionid')
    const session = JSON.parse(obj)
    const sessionid = ctx.request.headers['sessionid']
    const sessionArr = sessionid.split('#')
    ctx.body = sessionArr.length > 0 ? sessionArr[0] : ''
    ctx.status = 200
  } 
}

module.exports = LoginController