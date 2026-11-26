/* Dịch giao diện ziwei-doushu sang tiếng Việt (thay chữ khi hiển thị) */
(function () {
  var D = {
    // ── Tiêu đề, form ──
    '紫微斗数排盘': 'Lập lá số Tử Vi Đẩu Số',
    '输入出生年月日时，开源排盘引擎即时生成命盘。': 'Nhập năm, tháng, ngày, giờ sinh — engine mã nguồn mở sẽ lập lá số ngay.',
    '（本页为引擎 Demo，完整商业版界面不在开源范围；排盘内核完全开放。）': '(Đây là bản demo của engine; giao diện thương mại đầy đủ không nằm trong bản mã nguồn mở, nhưng lõi lập lá số được mở hoàn toàn.)',
    '── 输入生辰八字 ──': '── Nhập ngày giờ sinh ──',
    '姓名（可选）': 'Họ tên (không bắt buộc)',
    '请输入姓名': 'Nhập họ tên',
    '出生日期（公历）': 'Ngày sinh (dương lịch)',
    '年份': 'Năm', '月份': 'Tháng', '日期': 'Ngày',
    '出生地点（用于真太阳时校正）': 'Nơi sinh (để chỉnh giờ mặt trời thực)',
    '* 倪海厦批命用真太阳时，建议填写出生地以自动校正时辰': '* Người sinh ở Việt Nam: chọn "Trùng Khánh" rồi chọn quận có ghi chú tỉnh VN gần kinh độ nhất (Hà Nội → Đồng Nam, Thái Bình/Hải Phòng → Giang Tân, TP.HCM → Kỳ Giang).',
    '倪海厦批命用真太阳时，建议填写出生地以自动校正时辰': 'Người sinh ở Việt Nam: chọn "Trùng Khánh" rồi chọn quận có ghi chú tỉnh VN gần kinh độ nhất.',
    '省份 / 直辖市': 'Tỉnh / thành phố', '先选省份': 'Chọn tỉnh trước', '城市': 'Thành phố',
    '出生时间（北京时间）': 'Giờ sinh (giờ Việt Nam)',
    '真太阳时 →': 'Giờ mặt trời thực →',
    '不知道出生时间，以子时（23:00–01:00）起盘': 'Không biết giờ sinh, lập lá số theo giờ Tý (23:00–01:00)',
    '时辰不详': 'Không rõ giờ',
    '性别': 'Giới tính', '♂ 男': '♂ Nam', '♀ 女': '♀ Nữ', '男': 'Nam', '女': 'Nữ',
    '立即起盘 · 解命运密码': 'Lập lá số ngay',
    '总时差 ': 'Tổng chênh lệch ', '分钟': 'phút', '（含均时差）': '(gồm phương trình thời gian)', '含均时差）': 'gồm phương trình thời gian)',
    '年份范围：1900–2026': 'Năm từ 1900–2026',
    '年': 'năm', '月': 'tháng', '日': 'ngày', '时': 'giờ', '分': 'phút', '岁': ' tuổi',

    // ── Lá số ──
    '← 重新起盘': '← Lập lại',
    '紫微斗数命盘': 'LÁ SỐ TỬ VI', '紫微斗数': 'Tử Vi Đẩu Số',
    '本命': 'Bản mệnh', '大限': 'Đại hạn', '流年': 'Lưu niên', '限': 'Hạn',
    '当前大限': 'Đại hạn hiện tại',
    '命宫': 'Mệnh', '身宫': 'Thân', '命': 'Mệnh', '身': 'Thân',
    '空宫': 'Vô chính diệu',
    '年四化：': 'Tứ hóa năm:',
    '点击宫位看三方四正': 'Bấm vào cung để xem tam phương tứ chính',
    '三方四正': 'Tam phương tứ chính', '对宫': 'Cung xung chiếu', '三合1': 'Tam hợp 1', '三合2': 'Tam hợp 2',
    '化': 'Hóa', '化禄': 'Hóa Lộc', '化权': 'Hóa Quyền', '化科': 'Hóa Khoa', '化忌': 'Hóa Kỵ',
    '禄': 'Lộc', '权': 'Quyền', '科': 'Khoa', '忌': 'Kỵ',
    '[庙]': '[Miếu]', '[旺]': '[Vượng]', '[得]': '[Đắc]', '[利]': '[Lợi]', '[平]': '[Bình]', '[不]': '[Bất]', '[陷]': '[Hãm]',
    '庙': 'Miếu', '旺': 'Vượng', '得': 'Đắc', '利': 'Lợi', '平': 'Bình', '不': 'Bất', '陷': 'Hãm',
    // Cung
    '兄弟': 'Huynh đệ', '夫妻': 'Phu thê', '子女': 'Tử tức', '财帛': 'Tài bạch', '疾厄': 'Tật ách',
    '迁移': 'Thiên di', '仆役': 'Nô bộc', '交友': 'Nô bộc', '官禄': 'Quan lộc', '田宅': 'Điền trạch',
    '福德': 'Phúc đức', '父母': 'Phụ mẫu',
    '兄弟宫': 'Cung Huynh đệ', '夫妻宫': 'Cung Phu thê', '子女宫': 'Cung Tử tức', '财帛宫': 'Cung Tài bạch',
    '疾厄宫': 'Cung Tật ách', '迁移宫': 'Cung Thiên di', '仆役宫': 'Cung Nô bộc', '交友宫': 'Cung Nô bộc',
    '官禄宫': 'Cung Quan lộc', '田宅宫': 'Cung Điền trạch', '福德宫': 'Cung Phúc đức', '父母宫': 'Cung Phụ mẫu',
    // Cục
    '水二局': 'Thủy nhị cục', '木三局': 'Mộc tam cục', '金四局': 'Kim tứ cục', '土五局': 'Thổ ngũ cục', '火六局': 'Hỏa lục cục',
    // 14 chính tinh
    '紫微': 'Tử Vi', '天机': 'Thiên Cơ', '太阳': 'Thái Dương', '武曲': 'Vũ Khúc', '天同': 'Thiên Đồng',
    '廉贞': 'Liêm Trinh', '天府': 'Thiên Phủ', '太阴': 'Thái Âm', '贪狼': 'Tham Lang', '巨门': 'Cự Môn',
    '天相': 'Thiên Tướng', '天梁': 'Thiên Lương', '七杀': 'Thất Sát', '破军': 'Phá Quân',
    // Phụ tinh
    '左辅': 'Tả Phù', '右弼': 'Hữu Bật', '文昌': 'Văn Xương', '文曲': 'Văn Khúc', '天魁': 'Thiên Khôi',
    '天钺': 'Thiên Việt', '禄存': 'Lộc Tồn', '天马': 'Thiên Mã', '擎羊': 'Kình Dương', '陀罗': 'Đà La',
    '火星': 'Hỏa Tinh', '铃星': 'Linh Tinh', '地空': 'Địa Không', '地劫': 'Địa Kiếp',
    '红鸾': 'Hồng Loan', '天喜': 'Thiên Hỷ', '天姚': 'Thiên Diêu', '天刑': 'Thiên Hình', '咸池': 'Hàm Trì',
    '三台': 'Tam Thai', '八座': 'Bát Tọa', '恩光': 'Ân Quang', '天贵': 'Thiên Quý', '台辅': 'Thai Phụ',
    '封诰': 'Phong Cáo', '龙池': 'Long Trì', '凤阁': 'Phượng Các', '天才': 'Thiên Tài', '天寿': 'Thiên Thọ',
    '天官': 'Thiên Quan', '天福': 'Thiên Phúc', '天厨': 'Thiên Trù', '天巫': 'Thiên Vu', '天月': 'Thiên Nguyệt',
    '阴煞': 'Âm Sát', '解神': 'Giải Thần', '年解': 'Niên Giải', '天哭': 'Thiên Khốc', '天虚': 'Thiên Hư',
    '孤辰': 'Cô Thần', '寡宿': 'Quả Tú', '蜚廉': 'Phi Liêm', '破碎': 'Phá Toái', '华盖': 'Hoa Cái',
    '天德': 'Thiên Đức', '月德': 'Nguyệt Đức', '天空': 'Thiên Không', '截空': 'Triệt Không', '旬空': 'Tuần Không',
    '副截': 'Phó Triệt', '副旬': 'Phó Tuần', '天伤': 'Thiên Thương', '天使': 'Thiên Sứ',
    // Bác sĩ 12 thần
    '博士': 'Bác Sĩ', '力士': 'Lực Sĩ', '青龙': 'Thanh Long', '小耗': 'Tiểu Hao', '将军': 'Tướng Quân',
    '奏书': 'Tấu Thư', '飞廉': 'Phi Liêm', '喜神': 'Hỷ Thần', '病符': 'Bệnh Phù', '大耗': 'Đại Hao',
    '伏兵': 'Phục Binh', '官符': 'Quan Phù',
    // Tuế tiền 12 thần
    '岁建': 'Tuế Kiến', '晦气': 'Hối Khí', '丧门': 'Tang Môn', '贯索': 'Quán Sách', '龙德': 'Long Đức',
    '白虎': 'Bạch Hổ', '吊客': 'Điếu Khách', '岁破': 'Tuế Phá', '天德合': 'Thiên Đức Hợp', '月德合': 'Nguyệt Đức Hợp',
    // Tướng tiền 12 thần
    '将星': 'Tướng Tinh', '攀鞍': 'Phan An', '岁驿': 'Tuế Dịch', '息神': 'Tức Thần', '劫煞': 'Kiếp Sát',
    '灾煞': 'Tai Sát', '天煞': 'Thiên Sát', '指背': 'Chỉ Bối', '月煞': 'Nguyệt Sát', '亡神': 'Vong Thần',
    // Trường sinh
    '长生': 'Trường Sinh', '沐浴': 'Mộc Dục', '冠带': 'Quan Đới', '临官': 'Lâm Quan', '帝旺': 'Đế Vượng',
    '衰': 'Suy', '病': 'Bệnh', '死': 'Tử', '墓': 'Mộ', '绝': 'Tuyệt', '胎': 'Thai', '养': 'Dưỡng',

    // ── Cột giải đoán ──
    '命格': 'Mệnh cách', '感情': 'Tình cảm', '事业': 'Sự nghiệp', '财运': 'Tài vận', '健康': 'Sức khỏe', '性格': 'Tính cách',
    '命理解读': 'Giải đoán',
    '命格解读生成中…': 'Đang giải đoán…',
    '解读失败，请稍后重试。': 'Giải đoán thất bại, vui lòng thử lại.',
    '开源版不含 AI 解读接口（/api/interpret），需要你自己实现后才能用，详见 README「快速开始」。排盘本身不需要任何 API Key。': 'Bản mã nguồn mở không có AI giải đoán (/api/interpret). Lá số bên trái vẫn chính xác.',
    '继续追问，如：今年适合换工作吗？': 'Hỏi thêm, ví dụ: Năm nay có nên đổi việc không?',
    '追问': 'Hỏi',

    // ── Tỉnh ──
    '北京市': 'Bắc Kinh', '天津市': 'Thiên Tân', '上海市': 'Thượng Hải',
    '重庆市': 'Trùng Khánh ← chọn nếu sinh ở VN',
    '河北省': 'Hà Bắc', '山西省': 'Sơn Tây', '辽宁省': 'Liêu Ninh', '吉林省': 'Cát Lâm', '黑龙江省': 'Hắc Long Giang',
    '江苏省': 'Giang Tô', '浙江省': 'Chiết Giang', '安徽省': 'An Huy', '福建省': 'Phúc Kiến', '江西省': 'Giang Tây',
    '山东省': 'Sơn Đông', '河南省': 'Hà Nam', '湖北省': 'Hồ Bắc', '湖南省': 'Hồ Nam', '广东省': 'Quảng Đông',
    '海南省': 'Hải Nam', '四川省': 'Tứ Xuyên', '贵州省': 'Quý Châu', '云南省': 'Vân Nam', '陕西省': 'Thiểm Tây',
    '甘肃省': 'Cam Túc', '青海省': 'Thanh Hải', '台湾省': 'Đài Loan', '内蒙古自治区': 'Nội Mông',
    '广西壮族自治区': 'Quảng Tây', '西藏自治区': 'Tây Tạng', '宁夏回族自治区': 'Ninh Hạ',
    '新疆维吾尔自治区': 'Tân Cương', '香港特别行政区': 'Hồng Kông', '澳门特别行政区': 'Ma Cao',
    // Quận Trùng Khánh (gợi ý kinh độ VN)
    '潼南': 'Đồng Nam 105.8° ≈ Hà Nội', '永川': 'Vĩnh Xuyên 105.9° ≈ Hà Nội, Bắc Ninh',
    '大足': 'Đại Túc 105.7°', '荣昌': 'Vinh Xương 105.6°',
    '江津': 'Giang Tân 106.3° ≈ Thái Bình, Hải Phòng, Nam Định', '合川': 'Hợp Xuyên 106.3°',
    '綦江': 'Kỳ Giang 106.7° ≈ TP.HCM', '渝中': 'Du Trung 106.6° ≈ TP.HCM',
    '铜梁': 'Đồng Lương 106.1° ≈ Ninh Bình, Hà Nam', '璧山': 'Bích Sơn 106.2°',
    '大渡口': 'Đại Độ Khẩu', '江北': 'Giang Bắc', '沙坪坝': 'Sa Bình Bá', '九龙坡': 'Cửu Long Pha', '南岸': 'Nam Ngạn',
    '北碚': 'Bắc Bội', '渝北': 'Du Bắc', '巴南': 'Ba Nam', '万州': 'Vạn Châu', '涪陵': 'Phù Lăng', '黔江': 'Kiềm Giang',
    '长寿': 'Trường Thọ', '南川': 'Nam Xuyên', '开州': 'Khai Châu', '梁平': 'Lương Bình', '武隆': 'Vũ Long',
    '城口': 'Thành Khẩu', '丰都': 'Phong Đô', '垫江': 'Điếm Giang', '忠县': 'Trung huyện', '云阳': 'Vân Dương',
    '奉节': 'Phụng Tiết', '巫山': 'Vu Sơn', '巫溪': 'Vu Khê', '石柱': 'Thạch Trụ', '秀山': 'Tú Sơn',
    '酉阳': 'Dậu Dương', '彭水': 'Bành Thủy'
  };

  // Can – Chi
  var CAN = { '甲': 'Giáp', '乙': 'Ất', '丙': 'Bính', '丁': 'Đinh', '戊': 'Mậu', '己': 'Kỷ', '庚': 'Canh', '辛': 'Tân', '壬': 'Nhâm', '癸': 'Quý' };
  var CHI = { '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão', '辰': 'Thìn', '巳': 'Tỵ', '午': 'Ngọ', '未': 'Mùi', '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi' };
  var c, z;
  for (c in CAN) { D[c] = CAN[c]; for (z in CHI) D[c + z] = CAN[c] + ' ' + CHI[z]; }
  for (z in CHI) { D[z] = CHI[z]; D[z + '时'] = 'giờ ' + CHI[z]; }

  var CJK = /[㐀-鿿]/;
  var keys = Object.keys(D).sort(function (a, b) { return b.length - a.length; });

  function tr(s) {
    var t = s.trim();
    if (!t || !CJK.test(t)) return null;
    var lead = s.slice(0, s.indexOf(t)), tail = s.slice(s.indexOf(t) + t.length);
    if (D[t] !== undefined) return lead + D[t] + tail;
    var r = t
      .replace(/(\d+)年(\d+)月(\d+)日/g, '$3/$2/$1')
      .replace(/^(\d+)\s*月$/, 'Tháng $1').replace(/^(\d+)\s*日$/, 'Ngày $1')
      .replace(/^(\d+)\s*时$/, '$1 giờ').replace(/^(\d+)\s*分$/, '$1 phút')
      .replace(/(\d+[–-]\d+)岁/g, '$1 tuổi');
    for (var i = 0; i < keys.length && CJK.test(r); i++) {
      var k = keys[i];
      if (r.indexOf(k) >= 0) r = r.split(k).join(' ' + D[k] + ' ');
    }
    r = r.replace(/\s{2,}/g, ' ').replace(/\s+([·:：,，)）\]])/g, '$1').replace(/([(（\[])\s+/g, '$1').trim();
    return lead + r + tail;
  }

  var CHIV = {}; for (z in CHI) CHIV[CHI[z]] = 1;
  // "辰" + "时" là 2 node riêng -> ghép thành "giờ Thìn"
  var HOUR = new WeakSet();
  function fixHour(n) {
    var nx = n.nextSibling;
    if (nx && HOUR.has(nx)) {
      var cv = n.nodeValue.trim();
      if (CHI[cv]) { n.nodeValue = 'giờ ' + CHI[cv]; return true; }
      return CHIV[cv.replace('giờ ', '')] ? true : false;
    }
    if (n.nodeValue.trim() !== '时') return false;
    var p = n.previousSibling;
    if (p && p.nodeType === 3) {
      var pv = p.nodeValue.trim();
      if (CHI[pv]) pv = CHI[pv];
      if (CHIV[pv]) { p.nodeValue = 'giờ ' + pv; HOUR.add(n); n.nodeValue = ''; return true; }
    }
    return false;
  }
  function walk(root) {
    if (root.nodeType === 3 && fixHour(root)) return;
    if (root.nodeType === 3) { var v = tr(root.nodeValue); if (v !== null && v !== root.nodeValue) root.nodeValue = v; return; }
    if (root.nodeType !== 1) return;
    ['placeholder', 'title', 'aria-label'].forEach(function (a) {
      var x = root.getAttribute && root.getAttribute(a);
      if (x) { var y = tr(x); if (y !== null && y !== x) root.setAttribute(a, y); }
    });
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    var n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) { fixHour(n) || (function () { var v2 = tr(n.nodeValue); if (v2 !== null && v2 !== n.nodeValue) n.nodeValue = v2; })(); }
      else ['placeholder', 'title', 'aria-label'].forEach(function (a) {
        var x = n.getAttribute(a);
        if (x) { var y = tr(x); if (y !== null && y !== x) n.setAttribute(a, y); }
      });
    }
  }

  document.documentElement.lang = 'vi';
  new MutationObserver(function (ms) {
    ms.forEach(function (m) {
      if (m.type === 'characterData') walk(m.target);
      else if (m.type === 'attributes') walk(m.target);
      else m.addedNodes.forEach(walk);
    });
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label'] });
  if (document.body) walk(document.body);
  else document.addEventListener('DOMContentLoaded', function () { walk(document.body); });
})();
