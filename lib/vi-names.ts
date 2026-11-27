/** Tên tiếng Việt dùng cho trang quản trị (không phụ thuộc public/vi.js) */
export const CHI_VI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

export const MAJOR_STAR_VI: Record<string, string> = {
  '紫微': 'Tử Vi', '天机': 'Thiên Cơ', '太阳': 'Thái Dương', '武曲': 'Vũ Khúc', '天同': 'Thiên Đồng',
  '廉贞': 'Liêm Trinh', '天府': 'Thiên Phủ', '太阴': 'Thái Âm', '贪狼': 'Tham Lang', '巨门': 'Cự Môn',
  '天相': 'Thiên Tướng', '天梁': 'Thiên Lương', '七杀': 'Thất Sát', '破军': 'Phá Quân',
};

export const JU_VI: Record<string, string> = {
  '水二局': 'Thủy nhị cục', '木三局': 'Mộc tam cục', '金四局': 'Kim tứ cục', '土五局': 'Thổ ngũ cục', '火六局': 'Hỏa lục cục',
};

const PALACE_VI: Record<string, string> = {
  '命': 'Mệnh', '兄弟': 'Huynh đệ', '夫妻': 'Phu thê', '子女': 'Tử tức', '财帛': 'Tài bạch', '疾厄': 'Tật ách',
  '迁移': 'Thiên di', '仆役': 'Nô bộc', '交友': 'Nô bộc', '官禄': 'Quan lộc', '田宅': 'Điền trạch', '福德': 'Phúc đức', '父母': 'Phụ mẫu',
};

/** Nhãn ngắn cho câu lệnh tự động của giao diện (bấm tab / bấm cung) */
export function autoPromptLabel(content: string): string {
  const head = content.slice(0, 60);
  if (head.includes('命格总览')) return 'Tab Mệnh cách';
  if (head.includes('感情')) return 'Tab Tình cảm';
  if (head.includes('事业')) return 'Tab Sự nghiệp';
  if (head.includes('财运')) return 'Tab Tài vận';
  if (head.includes('健康')) return 'Tab Sức khỏe';
  if (head.includes('性格')) return 'Tab Tính cách';
  const palace = head.match(/请重点分析【(.+?)】/);
  if (palace) return `Bấm cung ${PALACE_VI[palace[1].replace(/宫$/, '')] || palace[1]}`;
  if (head.includes('飞化')) return 'Bấm Tứ Hóa';
  return 'Tự động';
}
