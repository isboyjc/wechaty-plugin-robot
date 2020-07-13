const { Wechaty } = require("wechaty") // Wechaty核心包
const { PuppetPadplus } = require("wechaty-puppet-padplus") // padplus协议包

const { PUPPET_PADPLUS_TOKEN, ROBOT_NAME } = require("./config") // token & robotName 脱敏源
const WechatyFriendPass = require("wechaty-friend-pass") // plugin 好友申请自动通过
const WechatyRoomWelcome = require("wechaty-room-welcome") // plugin 加入房间欢迎
const WechatyRoomInvite = require("wechaty-room-invite") // plugin 加入房间邀请
const WechatyRoomRemove = require("wechaty-room-remove") // plugin 快捷自动移出群聊
const WechatyRoomClock = require("wechaty-room-clock") // plugin 积分打卡签到

const WechatyVoteoutPlugin = require("wechaty-voteout") // 投票功能

// QRCodeTerminal - 在终端显示扫描二维码插件
// EventLogger - 官方 plugin 日志输出 config为数组，不提供默认输出全部事件
// ManyToManyRoomConnector - 链接房间 把任何房间的信息广播到所有其他房间
const {
  QRCodeTerminal,
  EventLogger,
  ManyToManyRoomConnector,
} = require("wechaty-plugin-contrib")

// 初始化
const bot = new Wechaty({
  puppet: new PuppetPadplus({
    token: PUPPET_PADPLUS_TOKEN,
  }),
  name: ROBOT_NAME,
})

// 官方 plugin 在终端显示扫描二维码插件
bot.use(
  QRCodeTerminal({
    small: false,
  })
)

// 官方 plugin 日志输出
bot.use(EventLogger())

// 官方 plugin 链接房间 把任何房间的信息广播到所有其他房间
// bot.use(
//   ManyToManyRoomConnector({
//     blacklist: [async () => true],
//     many: [
//       "10614174865@chatroom", // Web圈0x01
//       "22825376327@chatroom", // Web圈0x02
//       "24661539197@chatroom", // 微信机器人
//     ],
//     map: async (message) => {
//       let roomName = await message.room().topic()
//       let name = await message.room().alias(message.from())
//       name ? null : (name = message.from().name())
//       return `来自群聊【${roomName}】的【${name}】说 \n\n ${message.text()}`
//     },
//     whitelist: [async (message) => message.type() === bot.Message.Type.Text],
//   })
// )

// plugin 自动通过好友申请
bot.use(
  WechatyFriendPass({
    keyword: [
      "加群",
      "前端",
      "后端",
      "全栈",
      "公众号",
      "cesium",
      "github",
      "wechaty",
    ],
    reply: `你好，我是机器人小助手圈子 \n\n 加入技术交流群请回复【加群】\n 公众号【不正经的前端】欢迎关注 \n 联系小主请加微信【lijianchao666】`,
    blackId: [],
  })
)

// plugin 加入房间欢迎
bot.use(
  WechatyRoomWelcome({
    reply: [
      {
        name: "Web圈0x01",
        roomId: "10614174865@chatroom",
        reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`,
      },
      {
        name: "Web圈0x02",
        roomId: "22825376327@chatroom",
        reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`,
      },
      {
        name: "每日算法",
        roomId: "21705489152@chatroom",
        reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`,
      },
      {
        name: "微信机器人",
        roomId: "24661539197@chatroom",
        reply: `\n 你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！ \n\n Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊`,
      },
      {
        name: "男神开门群",
        roomId: "22275855499@chatroom",
        reply: "男神你好",
      },
    ],
  })
)

// plugin 加入房间邀请
bot.use(
  WechatyRoomInvite({
    keyword: ["加群", "入群", "群"],
    reply: "",
    roomList: [
      {
        name: "Web圈0x01",
        roomId: "10614174865@chatroom",
        alias: "A01",
        label: "推荐",
      },
      {
        name: "Web圈0x02",
        roomId: "22825376327@chatroom",
        alias: "A02",
        label: "新群",
      },
      {
        name: "每日算法",
        roomId: "21705489152@chatroom",
        alias: "A03",
        label: "限制",
      },
      {
        name: "微信机器人",
        roomId: "24661539197@chatroom",
        alias: "A04",
        label: "推荐",
      },
      {
        name: "男神开门群",
        roomId: "22275855499@chatroom",
        alias: "A05",
        label: "测试",
        close: true,
      },
    ],
  })
)

// plugin 快捷自动移出群聊
bot.use(
  WechatyRoomRemove({
    keyword: ["飞机", "踢", "慢走", "不送"],
    adminList: [
      {
        name: "isboyjc",
        id: "wxid_nrsh4yc8yupm22",
      },
      {
        name: "工具人小杨",
        id: "wxid_vkovzba0b0c212",
      },
      {
        name: "便便",
        id: "wxid_4mnet5yeqo5d21",
      },
    ],
    time: 3000,
    replyDone: "done",
    replyNoPermission: "您暂时没有权限哦，联系管理员吧😊",
  })
)

// plugin 积分打卡签到
bot.use(
  WechatyRoomClock({
    keyword: ["签到", "打卡"],
    success: (data) => {
      let str = "\n签到成功\n"
      Object.keys(data.CLOCKINFO).map(
        (v) => (str += `${v}年累计签到${data.CLOCKINFO[v]}次\n`)
      )
      return str + `共累计签到${data.CLOCKNUM}次`
      //  + `\n拥有${data.INTEGRALNUM}积分`
    },
    repeat: () => `今日已签到，请勿重复签到`,
  })
)

// 投票
bot.use(WechatyVoteoutPlugin({ target: 5 }))

bot
  .on("error", (error) => {
    console.error(error)
  })
  .start()
