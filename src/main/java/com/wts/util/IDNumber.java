package com.wts.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class IDNumber {

  public static String checkIDNumber(String IDNumber) {
    if (IDNumber.matches("\\d{17}[0-9,X]")) {
      if (checkBirth(IDNumber)) {
        if (checkOut(IDNumber)) {
          return "OK";
        }
        return "验证码错误";
      }
      return "出生日期错误";
    }
    return "位数错误或字符错误";
  }
  public static String checkIDNumberDetail(String IDNumber) {
    if (IDNumber.matches("\\d{17}[0-9,X]")) {
      if (checkArea(IDNumber)) {
        if (checkBirth(IDNumber)) {
          if (checkOut(IDNumber)) {
            return "正确";
          }
          return "验证码错误";
        }
        return "出生日期错误";
      }
      return "户籍位置错误";
    }
    return "位数错误或字符错误";
  }
  private static boolean checkArea(String IDNumber) {
    Map<String, String> areaCode = new HashMap<String, String>();
    areaCode.put("0000", "无");
    areaCode.put("1100", "北京市");
    areaCode.put("1101", "东城区");
    areaCode.put("1102", "县");
    areaCode.put("1200", "天津市");
    areaCode.put("1201", "和平区");
    areaCode.put("1202", "县");
    areaCode.put("1300", "河北省");
    areaCode.put("1301", "石家庄市");
    areaCode.put("1302", "唐山市");
    areaCode.put("1303", "秦皇岛市");
    areaCode.put("1304", "邯郸市");
    areaCode.put("1305", "邢台市");
    areaCode.put("1306", "保定市");
    areaCode.put("1307", "张家口市");
    areaCode.put("1308", "承德市");
    areaCode.put("1309", "沧州市");
    areaCode.put("1310", "廊坊市");
    areaCode.put("1311", "衡水市");
    areaCode.put("1400", "山西省");
    areaCode.put("1401", "太原市");
    areaCode.put("1402", "大同市");
    areaCode.put("1403", "阳泉市");
    areaCode.put("1404", "长治市");
    areaCode.put("1405", "晋城市");
    areaCode.put("1406", "朔州市");
    areaCode.put("1407", "晋中市");
    areaCode.put("1408", "运城市");
    areaCode.put("1409", "忻州市");
    areaCode.put("1410", "临汾市");
    areaCode.put("1411", "吕梁市");
    areaCode.put("1500", "内蒙古自治区");
    areaCode.put("1501", "呼和浩特市");
    areaCode.put("1502", "包头市");
    areaCode.put("1503", "乌海市");
    areaCode.put("1504", "赤峰市");
    areaCode.put("1505", "通辽市");
    areaCode.put("1506", "鄂尔多斯市");
    areaCode.put("1507", "呼伦贝尔市");
    areaCode.put("1508", "巴彦淖尔市");
    areaCode.put("1509", "乌兰察布市");
    areaCode.put("1522", "兴安盟");
    areaCode.put("1522", "乌兰浩特市");
    areaCode.put("1525", "锡林郭勒盟");
    areaCode.put("1525", "二连浩特市");
    areaCode.put("1529", "阿拉善盟");
    areaCode.put("2100", "辽宁省");
    areaCode.put("2101", "沈阳市");
    areaCode.put("2102", "大连市");
    areaCode.put("2103", "鞍山市");
    areaCode.put("2104", "抚顺市");
    areaCode.put("2105", "本溪市");
    areaCode.put("2106", "丹东市");
    areaCode.put("2107", "锦州市");
    areaCode.put("2108", "营口市");
    areaCode.put("2109", "阜新市");
    areaCode.put("2110", "辽阳市");
    areaCode.put("2111", "盘锦市");
    areaCode.put("2112", "铁岭市");
    areaCode.put("2113", "朝阳市");
    areaCode.put("2114", "葫芦岛市");
    areaCode.put("2200", "吉林省");
    areaCode.put("2201", "长春市");
    areaCode.put("2202", "吉林市");
    areaCode.put("2203", "四平市");
    areaCode.put("2204", "辽源市");
    areaCode.put("2205", "通化市");
    areaCode.put("2206", "白山市");
    areaCode.put("2207", "松原市");
    areaCode.put("2208", "白城市");
    areaCode.put("2224", "延边朝鲜族自治州");
    areaCode.put("2224", "延吉市");
    areaCode.put("2300", "黑龙江省");
    areaCode.put("2301", "哈尔滨市");
    areaCode.put("2302", "齐齐哈尔市");
    areaCode.put("2303", "鸡西市");
    areaCode.put("2304", "鹤岗市");
    areaCode.put("2305", "双鸭山市");
    areaCode.put("2306", "大庆市");
    areaCode.put("2307", "伊春市");
    areaCode.put("2308", "佳木斯市");
    areaCode.put("2309", "七台河市");
    areaCode.put("2310", "牡丹江市");
    areaCode.put("2311", "黑河市");
    areaCode.put("2312", "绥化市");
    areaCode.put("2327", "大兴安岭地区");
    areaCode.put("3100", "上海市");
    areaCode.put("3101", "黄浦区");
    areaCode.put("3102", "县");
    areaCode.put("3200", "江苏省");
    areaCode.put("3201", "南京市");
    areaCode.put("3202", "无锡市");
    areaCode.put("3203", "徐州市");
    areaCode.put("3204", "常州市");
    areaCode.put("3205", "苏州市");
    areaCode.put("3206", "南通市");
    areaCode.put("3207", "连云港市");
    areaCode.put("3208", "淮安市");
    areaCode.put("3209", "盐城市");
    areaCode.put("3210", "扬州市");
    areaCode.put("3211", "镇江市");
    areaCode.put("3212", "泰州市");
    areaCode.put("3213", "宿迁市");
    areaCode.put("3300", "浙江省");
    areaCode.put("3301", "杭州市");
    areaCode.put("3302", "宁波市");
    areaCode.put("3303", "温州市");
    areaCode.put("3304", "嘉兴市");
    areaCode.put("3305", "湖州市");
    areaCode.put("3306", "绍兴市");
    areaCode.put("3307", "金华市");
    areaCode.put("3308", "衢州市");
    areaCode.put("3309", "舟山市");
    areaCode.put("3310", "台州市");
    areaCode.put("3311", "丽水市");
    areaCode.put("3400", "安徽省");
    areaCode.put("3401", "合肥市");
    areaCode.put("3402", "芜湖市");
    areaCode.put("3403", "蚌埠市");
    areaCode.put("3404", "淮南市");
    areaCode.put("3405", "马鞍山市");
    areaCode.put("3406", "淮北市");
    areaCode.put("3407", "铜陵市");
    areaCode.put("3408", "安庆市");
    areaCode.put("3410", "黄山市");
    areaCode.put("3411", "滁州市");
    areaCode.put("3412", "阜阳市");
    areaCode.put("3413", "宿州市");
    areaCode.put("3415", "六安市");
    areaCode.put("3416", "亳州市");
    areaCode.put("3417", "池州市");
    areaCode.put("3418", "宣城市");
    areaCode.put("3500", "福建省");
    areaCode.put("3501", "福州市");
    areaCode.put("3502", "厦门市");
    areaCode.put("3503", "莆田市");
    areaCode.put("3504", "三明市");
    areaCode.put("3505", "泉州市");
    areaCode.put("3506", "漳州市");
    areaCode.put("3507", "南平市");
    areaCode.put("3508", "龙岩市");
    areaCode.put("3509", "宁德市");
    areaCode.put("3600", "江西省");
    areaCode.put("3601", "南昌市");
    areaCode.put("3602", "景德镇市");
    areaCode.put("3603", "萍乡市");
    areaCode.put("3604", "九江市");
    areaCode.put("3605", "新余市");
    areaCode.put("3606", "鹰潭市");
    areaCode.put("3607", "赣州市");
    areaCode.put("3608", "吉安市");
    areaCode.put("3609", "宜春市");
    areaCode.put("3610", "抚州市");
    areaCode.put("3611", "上饶市");
    areaCode.put("3700", "山东省");
    areaCode.put("3701", "济南市");
    areaCode.put("3702", "青岛市");
    areaCode.put("3703", "淄博市");
    areaCode.put("3704", "枣庄市");
    areaCode.put("3705", "东营市");
    areaCode.put("3706", "烟台市");
    areaCode.put("3707", "潍坊市");
    areaCode.put("3708", "济宁市");
    areaCode.put("3709", "泰安市");
    areaCode.put("3710", "威海市");
    areaCode.put("3711", "日照市");
    areaCode.put("3712", "莱芜市");
    areaCode.put("3713", "临沂市");
    areaCode.put("3714", "德州市");
    areaCode.put("3715", "聊城市");
    areaCode.put("3716", "滨州市");
    areaCode.put("3717", "菏泽市");
    areaCode.put("4100", "河南省");
    areaCode.put("4101", "郑州市");
    areaCode.put("4102", "开封市");
    areaCode.put("4103", "洛阳市");
    areaCode.put("4104", "平顶山市");
    areaCode.put("4105", "安阳市");
    areaCode.put("4106", "鹤壁市");
    areaCode.put("4107", "新乡市");
    areaCode.put("4108", "焦作市");
    areaCode.put("4109", "濮阳市");
    areaCode.put("4110", "许昌市");
    areaCode.put("4111", "漯河市");
    areaCode.put("4112", "三门峡市");
    areaCode.put("4113", "南阳市");
    areaCode.put("4114", "商丘市");
    areaCode.put("4115", "信阳市");
    areaCode.put("4116", "周口市");
    areaCode.put("4117", "驻马店市");
    areaCode.put("4190", "省直辖县级行政区划");
    areaCode.put("4190", "济源市");
    areaCode.put("4200", "湖北省");
    areaCode.put("4201", "武汉市");
    areaCode.put("4202", "黄石市");
    areaCode.put("4203", "十堰市");
    areaCode.put("4205", "宜昌市");
    areaCode.put("4206", "襄阳市");
    areaCode.put("4207", "鄂州市");
    areaCode.put("4208", "荆门市");
    areaCode.put("4209", "孝感市");
    areaCode.put("4210", "荆州市");
    areaCode.put("4211", "黄冈市");
    areaCode.put("4212", "咸宁市");
    areaCode.put("4213", "随州市");
    areaCode.put("4228", "恩施土家族苗族自治州");
    areaCode.put("4228", "恩施市");
    areaCode.put("4290", "省直辖县级行政区划");
    areaCode.put("4300", "湖南省");
    areaCode.put("4301", "长沙市");
    areaCode.put("4302", "株洲市");
    areaCode.put("4303", "湘潭市");
    areaCode.put("4304", "衡阳市");
    areaCode.put("4305", "邵阳市");
    areaCode.put("4306", "岳阳市");
    areaCode.put("4307", "常德市");
    areaCode.put("4308", "张家界市");
    areaCode.put("4309", "益阳市");
    areaCode.put("4310", "郴州市");
    areaCode.put("4311", "永州市");
    areaCode.put("4312", "怀化市");
    areaCode.put("4313", "娄底市");
    areaCode.put("4331", "湘西土家族苗族自治州");
    areaCode.put("4331", "吉首市");
    areaCode.put("4400", "广东省");
    areaCode.put("4401", "广州市");
    areaCode.put("4402", "韶关市");
    areaCode.put("4403", "深圳市");
    areaCode.put("4404", "珠海市");
    areaCode.put("4405", "汕头市");
    areaCode.put("4406", "佛山市");
    areaCode.put("4407", "江门市");
    areaCode.put("4408", "湛江市");
    areaCode.put("4409", "茂名市");
    areaCode.put("4412", "肇庆市");
    areaCode.put("4413", "惠州市");
    areaCode.put("4414", "梅州市");
    areaCode.put("4415", "汕尾市");
    areaCode.put("4416", "河源市");
    areaCode.put("4417", "阳江市");
    areaCode.put("4418", "清远市");
    areaCode.put("4419", "东莞市");
    areaCode.put("4420", "中山市");
    areaCode.put("4451", "潮州市");
    areaCode.put("4452", "揭阳市");
    areaCode.put("4453", "云浮市");
    areaCode.put("4500", "广西壮族自治区");
    areaCode.put("4501", "南宁市");
    areaCode.put("4502", "柳州市");
    areaCode.put("4503", "桂林市");
    areaCode.put("4504", "梧州市");
    areaCode.put("4505", "北海市");
    areaCode.put("4506", "防城港市");
    areaCode.put("4507", "钦州市");
    areaCode.put("4508", "贵港市");
    areaCode.put("4509", "玉林市");
    areaCode.put("4510", "百色市");
    areaCode.put("4511", "贺州市");
    areaCode.put("4512", "河池市");
    areaCode.put("4513", "来宾市");
    areaCode.put("4514", "崇左市");
    areaCode.put("4600", "海南省");
    areaCode.put("4601", "海口市");
    areaCode.put("4602", "三亚市");
    areaCode.put("4603", "三沙市");
    areaCode.put("4690", "省直辖县级行政区划");
    areaCode.put("4690", "五指山市");
    areaCode.put("5000", "重庆市");
    areaCode.put("5001", "万州区");
    areaCode.put("5002", "县");
    areaCode.put("5100", "四川省");
    areaCode.put("5101", "成都市");
    areaCode.put("5103", "自贡市");
    areaCode.put("5104", "攀枝花市");
    areaCode.put("5105", "泸州市");
    areaCode.put("5106", "德阳市");
    areaCode.put("5107", "绵阳市");
    areaCode.put("5108", "广元市");
    areaCode.put("5109", "遂宁市");
    areaCode.put("5110", "内江市");
    areaCode.put("5111", "乐山市");
    areaCode.put("5113", "南充市");
    areaCode.put("5114", "眉山市");
    areaCode.put("5115", "宜宾市");
    areaCode.put("5116", "广安市");
    areaCode.put("5117", "达州市");
    areaCode.put("5118", "雅安市");
    areaCode.put("5119", "巴中市");
    areaCode.put("5120", "资阳市");
    areaCode.put("5132", "阿坝藏族羌族自治州");
    areaCode.put("5133", "甘孜藏族自治州");
    areaCode.put("5134", "凉山彝族自治州");
    areaCode.put("5134", "西昌市");
    areaCode.put("5200", "贵州省");
    areaCode.put("5201", "贵阳市");
    areaCode.put("5202", "六盘水市");
    areaCode.put("5202", "钟山区");
    areaCode.put("5203", "遵义市");
    areaCode.put("5204", "安顺市");
    areaCode.put("5205", "毕节市");
    areaCode.put("5206", "铜仁市");
    areaCode.put("5223", "黔西南布依族苗族自治州");
    areaCode.put("5223", "兴义市");
    areaCode.put("5226", "黔东南苗族侗族自治州");
    areaCode.put("5226", "凯里市");
    areaCode.put("5227", "黔南布依族苗族自治州");
    areaCode.put("5227", "都匀市");
    areaCode.put("5300", "云南省");
    areaCode.put("5301", "昆明市");
    areaCode.put("5303", "曲靖市");
    areaCode.put("5304", "玉溪市");
    areaCode.put("5305", "保山市");
    areaCode.put("5306", "昭通市");
    areaCode.put("5307", "丽江市");
    areaCode.put("5308", "普洱市");
    areaCode.put("5309", "临沧市");
    areaCode.put("5323", "楚雄彝族自治州");
    areaCode.put("5323", "楚雄市");
    areaCode.put("5325", "红河哈尼族彝族自治州");
    areaCode.put("5325", "个旧市");
    areaCode.put("5326", "文山壮族苗族自治州");
    areaCode.put("5326", "文山市");
    areaCode.put("5328", "西双版纳傣族自治州");
    areaCode.put("5328", "景洪市");
    areaCode.put("5329", "大理白族自治州");
    areaCode.put("5329", "大理市");
    areaCode.put("5331", "德宏傣族景颇族自治州");
    areaCode.put("5333", "怒江傈僳族自治州");
    areaCode.put("5334", "迪庆藏族自治州");
    areaCode.put("5400", "西藏自治区");
    areaCode.put("5401", "拉萨市");
    areaCode.put("5421", "昌都地区");
    areaCode.put("5422", "山南地区");
    areaCode.put("5423", "日喀则地区");
    areaCode.put("5423", "日喀则市");
    areaCode.put("5424", "那曲地区");
    areaCode.put("5425", "阿里地区");
    areaCode.put("5426", "林芝地区");
    areaCode.put("6100", "陕西省");
    areaCode.put("6101", "西安市");
    areaCode.put("6102", "铜川市");
    areaCode.put("6103", "宝鸡市");
    areaCode.put("6104", "咸阳市");
    areaCode.put("6105", "渭南市");
    areaCode.put("6106", "延安市");
    areaCode.put("6107", "汉中市");
    areaCode.put("6108", "榆林市");
    areaCode.put("6109", "安康市");
    areaCode.put("6110", "商洛市");
    areaCode.put("6200", "甘肃省");
    areaCode.put("6201", "兰州市");
    areaCode.put("6202", "嘉峪关市");
    areaCode.put("6203", "金昌市");
    areaCode.put("6204", "白银市");
    areaCode.put("6205", "天水市");
    areaCode.put("6206", "武威市");
    areaCode.put("6207", "张掖市");
    areaCode.put("6208", "平凉市");
    areaCode.put("6209", "酒泉市");
    areaCode.put("6210", "庆阳市");
    areaCode.put("6211", "定西市");
    areaCode.put("6212", "陇南市");
    areaCode.put("6229", "临夏回族自治州");
    areaCode.put("6229", "临夏市");
    areaCode.put("6230", "甘南藏族自治州");
    areaCode.put("6230", "合作市");
    areaCode.put("6300", "青海省");
    areaCode.put("6301", "西宁市");
    areaCode.put("6302", "海东市");
    areaCode.put("6322", "海北藏族自治州");
    areaCode.put("6323", "黄南藏族自治州");
    areaCode.put("6325", "海南藏族自治州");
    areaCode.put("6326", "果洛藏族自治州");
    areaCode.put("6327", "玉树藏族自治州");
    areaCode.put("6327", "玉树市");
    areaCode.put("6328", "海西蒙古族藏族自治州");
    areaCode.put("6328", "格尔木市");
    areaCode.put("6400", "宁夏回族自治区");
    areaCode.put("6401", "银川市");
    areaCode.put("6402", "石嘴山市");
    areaCode.put("6403", "吴忠市");
    areaCode.put("6404", "固原市");
    areaCode.put("6405", "中卫市");
    areaCode.put("6500", "新疆维吾尔自治区");
    areaCode.put("6501", "乌鲁木齐市");
    areaCode.put("6502", "克拉玛依市");
    areaCode.put("6521", "吐鲁番地区");
    areaCode.put("6521", "吐鲁番市");
    areaCode.put("6522", "哈密地区");
    areaCode.put("6522", "哈密市");
    areaCode.put("6523", "昌吉回族自治州");
    areaCode.put("6523", "昌吉市");
    areaCode.put("6527", "博尔塔拉蒙古自治州");
    areaCode.put("6527", "博乐市");
    areaCode.put("6528", "巴音郭楞蒙古自治州");
    areaCode.put("6528", "库尔勒市");
    areaCode.put("6529", "阿克苏地区");
    areaCode.put("6529", "阿克苏市");
    areaCode.put("6530", "克孜勒苏柯尔克孜自治州");
    areaCode.put("6530", "阿图什市");
    areaCode.put("6531", "喀什地区");
    areaCode.put("6531", "喀什市");
    areaCode.put("6532", "和田地区");
    areaCode.put("6532", "和田市");
    areaCode.put("6540", "伊犁哈萨克自治州");
    areaCode.put("6542", "塔城地区");
    areaCode.put("6542", "塔城市");
    areaCode.put("6543", "阿勒泰地区");
    areaCode.put("6543", "阿勒泰市");
    areaCode.put("6590", "自治区直辖县级行政区划");
    areaCode.put("6590", "石河子市");
    areaCode.put("7100", "台湾省");
    areaCode.put("8100", "香港特别行政区");
    areaCode.put("8200", "澳门特别行政区");
    areaCode.put("9200", "外籍");
    return areaCode.containsKey(IDNumber.substring(0, 4));
  }
  private static boolean checkBirth(String IDNumber) {
    String Birth = IDNumber.substring(6, 10) + "-"
            + IDNumber.substring(10, 12) + "-" + IDNumber.substring(12, 14);
    SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
    try {
      Date BirthDate = formatDate.parse(Birth);
      Date DateBefore = formatDate.parse("1800-1-1");
      Date DateAfter = formatDate.parse("2199-12-31");
      return BirthDate.after(DateBefore) && BirthDate.before(DateAfter);
    } catch (ParseException e1) {
      e1.printStackTrace();
    }
    return false;
  }
  private static boolean checkOut(String IDNumber) {
    int i = (Integer.parseInt(IDNumber.substring(0, 1)) * 7
            + Integer.parseInt(IDNumber.substring(1, 2)) * 9
            + Integer.parseInt(IDNumber.substring(2, 3)) * 10
            + Integer.parseInt(IDNumber.substring(3, 4)) * 5
            + Integer.parseInt(IDNumber.substring(4, 5)) * 8
            + Integer.parseInt(IDNumber.substring(5, 6)) * 4
            + Integer.parseInt(IDNumber.substring(6, 7)) * 2
            + Integer.parseInt(IDNumber.substring(7, 8)) * 1
            + Integer.parseInt(IDNumber.substring(8, 9)) * 6
            + Integer.parseInt(IDNumber.substring(9, 10)) * 3
            + Integer.parseInt(IDNumber.substring(10, 11)) * 7
            + Integer.parseInt(IDNumber.substring(11, 12)) * 9
            + Integer.parseInt(IDNumber.substring(12, 13)) * 10
            + Integer.parseInt(IDNumber.substring(13, 14)) * 5
            + Integer.parseInt(IDNumber.substring(14, 15)) * 8
            + Integer.parseInt(IDNumber.substring(15, 16)) * 4 + Integer
            .parseInt(IDNumber.substring(16, 17)) * 2) % 11;
    return (i == 0 && IDNumber.substring(17, 18).equals("1"))
            || (i == 1 && IDNumber.substring(17, 18).equals("0"))
            || (i == 2 && IDNumber.substring(17, 18).equals("X"))
            || (i == 3 && IDNumber.substring(17, 18).equals("9"))
            || (i == 4 && IDNumber.substring(17, 18).equals("8"))
            || (i == 5 && IDNumber.substring(17, 18).equals("7"))
            || (i == 6 && IDNumber.substring(17, 18).equals("6"))
            || (i == 7 && IDNumber.substring(17, 18).equals("5"))
            || (i == 8 && IDNumber.substring(17, 18).equals("4"))
            || (i == 9 && IDNumber.substring(17, 18).equals("3"))
            || (i == 10 && IDNumber.substring(17, 18).equals("2"));
  }
  public static boolean availableIDNumber(String IDNumber) {
    if (IDNumber.matches("\\d{17}[0-9,X]")) {
      if (checkBirth(IDNumber)) {
					if (checkOut(IDNumber)) {
						return true;
					}
					return false;
				}
    }
    return false;
  }
//	public boolean availableIDNumber(String IDNumber) {
//		if (IDNumber.matches("\\d{17}[0-9,X]")) {
//			if (checkArea(IDNumber)) {
//				if (checkBirth(IDNumber)) {
//					if (checkOut(IDNumber)) {
//						return true;
//					}
//					return false;
//				}
//				return false;
//			}
//			return false;
//		}
//		return false;
//	}

  public static int getSex(String IDNumber) {
    if (IDNumber.substring(16, 17).equals("1")
            || IDNumber.substring(16, 17).equals("3")
            || IDNumber.substring(16, 17).equals("5")
            || IDNumber.substring(16, 17).equals("7")
            || IDNumber.substring(16, 17).equals("9")) {
      return 1;// 男
    }
    return 2;// 女
  }
  public static String getMF(String IDNumber) {
    if (IDNumber.substring(16, 17).equals("1")
            || IDNumber.substring(16, 17).equals("3")
            || IDNumber.substring(16, 17).equals("5")
            || IDNumber.substring(16, 17).equals("7")
            || IDNumber.substring(16, 17).equals("9")) {
      return "M";// 男
    }
    return "F";// 女
  }
  public static String get(String IDNumber) {
    if (IDNumber.substring(16, 17).equals("1")
            || IDNumber.substring(16, 17).equals("3")
            || IDNumber.substring(16, 17).equals("5")
            || IDNumber.substring(16, 17).equals("7")
            || IDNumber.substring(16, 17).equals("9")) {
      return "男";//
    }
    return "女";//
  }
  public static String getRetireMonth(String IDNumber, Date DocunmentBirth) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
    String str = sdf.format(DocunmentBirth);
    if (IDNumber.substring(6, 14).equals(str)) {
      if (getSex(IDNumber) == 1) {
        int ryear = Integer.parseInt(IDNumber.substring(6, 10)) + 60;
        int rmonth = Integer.parseInt(IDNumber.substring(10, 12));
        if (rmonth > 9) {
          String r = String.valueOf(ryear)
                  + Integer.parseInt(IDNumber.substring(10, 12));
          return r;
        } else {
          String r = String.valueOf(ryear) + "0"
                  + Integer.parseInt(IDNumber.substring(10, 12));
          return r;
        }

      } else {
        int ryear = Integer.parseInt(IDNumber.substring(6, 10)) + 50;
        int rmonth = Integer.parseInt(IDNumber.substring(10, 12));
        if (rmonth > 9) {
          String r = String.valueOf(ryear)
                  + Integer.parseInt(IDNumber.substring(10, 12));
          return r;
        } else {
          String r = String.valueOf(ryear) + "0"
                  + Integer.parseInt(IDNumber.substring(10, 12));
          return r;
        }
      }
    } else {
      if (getSex(IDNumber) == 1) {
        int ryear = Integer.parseInt(str.substring(0, 4)) + 60;
        int rmonth = Integer.parseInt(str.substring(4, 6));
        if (rmonth > 9) {
          String r = String.valueOf(ryear)
                  + Integer.parseInt(str.substring(4, 6));
          return r;
        } else {
          String r = String.valueOf(ryear) + "0"
                  + Integer.parseInt(str.substring(4, 6));
          return r;
        }

      } else {
        int ryear = Integer.parseInt(str.substring(0, 4)) + 50;
        int rmonth = Integer.parseInt(str.substring(4, 6));
        if (rmonth > 9) {
          String r = String.valueOf(ryear)
                  + Integer.parseInt(str.substring(4, 6));
          return r;
        } else {
          String r = String.valueOf(ryear) + "0"
                  + Integer.parseInt(str.substring(4, 6));
          return r;
        }
      }
    }
  }
  public static Date getBirthDate(String IDNumber) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    try {
      Date date = sdf.parse(IDNumber.substring(6, 10) + "-"
              + IDNumber.substring(10, 12) + "-"
              + IDNumber.substring(12, 14));
      return date;
    } catch (ParseException e) {
      e.printStackTrace();
    }
    return null;
  }
  public static Date getFileDate(String DateNumber) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
    try {
      Date date = sdf.parse(DateNumber);
      return date;
    } catch (ParseException e) {
      e.printStackTrace();
    }
    return null;
  }

  private static boolean checkFileDate(String number) {
    String Birth = number.substring(0, 4) + "-"
            + number.substring(4, 6) + "-" + number.substring(6, 8);
    SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
    try {
      Date BirthDate = formatDate.parse(Birth);
      Date DateBefore = formatDate.parse("1800-1-1");
      Date DateAfter = formatDate.parse("2199-12-31");
      return BirthDate.after(DateBefore) && BirthDate.before(DateAfter);
    } catch (ParseException e1) {
      e1.printStackTrace();
    }
    return false;
  }
  public static String getfileAge(String number) {
    if (number.matches("\\d{8}")) {
      if (checkFileDate(number)) {
        return "OK";
      }
      return "档案年龄日期有误！";
    }
    return "档案年龄必须为8位数字!";
  }
  public static boolean checkfileAge(String number) {
    if (number.matches("\\d{8}")) {
      if (checkFileDate(number)) {
        return true;
      }
      return false;
    }
    return false;
  }
  public static void main(String[] args) {
    System.out.println(checkfileAge("20160101"));
  }
}