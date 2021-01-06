const { Wechaty } = require("wechaty") // Wechaty核心包
const { ScanStatus } = require('wechaty-puppet')
const QrcodeTerminal = require('qrcode-terminal')

const { PUPPET_DONUT_TOKEN, ROBOT_NAME } = require("./config") // token & robotName 脱敏源
const WechatyFriendPass = require("./plugin/wechaty-friend-pass") // plugin 好友申请自动通过
const WechatyRoomWelcome = require("./plugin/wechaty-room-welcome") // plugin 加入房间欢迎
const WechatyRoomInvite = require("./plugin/wechaty-room-invite") // plugin 加入房间邀请
const WechatyRoomRemove = require("./plugin/wechaty-room-remove") // plugin 快捷自动移出群聊
const WechatyRoomClock = require("./plugin/wechaty-room-clock") // plugin 积分打卡签到
const WechatyRoomLuckdraw = require("./plugin/wechaty-room-luckdraw") // plugin 抽奖

const { VoteOut: WechatyVoteoutPlugin } = require("wechaty-voteout") // 投票功能

// QRCodeTerminal - 在终端显示扫描二维码插件
// EventLogger - 官方 plugin 日志输出 config为数组，不提供默认输出全部事件
const {
  QRCodeTerminal,
  EventLogger,
} = require("wechaty-plugin-contrib")

// 初始化
const bot = new Wechaty({
  puppet: 'wechaty-puppet-hostie',
  puppetOptions: {
    token: PUPPET_DONUT_TOKEN,
  },
  name: ROBOT_NAME,
});

// 官方 plugin 在终端显示扫描二维码插件
bot.use(
  QRCodeTerminal({
    small: false,
  })
)

// 官方 plugin 日志输出
bot.use(EventLogger())

// plugin 自动通过好友申请
bot.use(
  WechatyFriendPass({
    keyword: [
      "加群",
      "前端",
      "后端",
      "全栈",
      "其他",
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
        close: true,
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
      {
        name: "张玉",
        id: "wxid_vvvkhgovki5n22",
      },
      {
        name: "王培智",
        id: "wxid_e53m1ijdx7kg12",
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
    keyword: ["签到", "打卡", "滴", "滴滴", "滴滴滴", "我真帅", "我真美"],
    exclusiveKeyword: [
      {
        id: "wxid_nrsh4yc8yupm22",
        name: "isboyjc",
        keyword: ["我太难了"],
      },
      {
        id: "wxid_e53m1ijdx7kg12",
        name: "小智",
        keyword: ["加薪成功"],
      },
    ],
    timeInterval: [["07:30:00", "09:30:00"], ["17:30:00", "19:30:00"]],
    success: (data) => {
      let str = "\n签到成功\n"
      Object.keys(data.CLOCKINFO).map(
        (v) => (str += `${v}年累计签到${data.CLOCKINFO[v]}次\n`)
      )
      return str + `共累计签到${data.CLOCKNUM}次`
      //  + `\n拥有${data.INTEGRALNUM}积分`
    },
    repeat: (data) => {
      return `\n今日已签到，请勿重复签到，共累计签到${data.CLOCKNUM}次！`
    },
  })
)

// 群聊抽奖
bot.use(WechatyRoomLuckdraw({
  admin: [
    {
      name: "isboyjc",
      id: "wxid_nrsh4yc8yupm22",
    }
  ],
  prize: [
    {
      id: "1",
      name: "JavaScript语言精髓与编程实践1本",
    },
    {
      id: "2",
      name: "JavaScript权威指南1本",
    },
    {
      id: "3",
      name: "50元红包1个",
    }
  ],
  start: "2021-01-07",
  keyword: ["抽奖"],
  success: () => "抽奖参与成功，本次抽奖于2020-01-07日开始，2020-01-15 21:00:00结束，同日 21:30:00 自动开奖，并发送至群聊中",
  repeat: (data) => `\n已于${data.DATE} ${data.TIME}参与抽奖，请勿重复抽奖！`,
}))

// 投票
bot.use(WechatyVoteoutPlugin({
  room: ["10614174865@chatroom", "22825376327@chatroom", "21705489152@chatroom", "24661539197@chatroom", "22275855499@chatroom"],
  threshold: 5,
  whitelist: [],
  downEmoji: [
    '[弱]',
    '[ThumbsDown]',
    '<img class="qqemoji qqemoji80" text="[弱]_web" src="/zh_CN/htmledition/v2/images/spacer.gif" />',
  ],
  warn: [
    '可能是因为你的聊天内容不当导致被用户投票，当前票数为 {{ downNum }}，当天累计票数达到 {{ threshold }} 时，你将被请出此群。',
  ],
  kick: '经 {{ voters }} 几人投票，你即将离开此群。',
  repeat: '你已经投票过 {{ votee }} 了，无需再投。',
}))

bot
  .on("error", (error) => {
    console.error(error)
  })
  .start()
