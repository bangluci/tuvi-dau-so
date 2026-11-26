/**
 * Nơi sinh ở Việt Nam — dùng để chỉnh giờ mặt trời thực.
 * Kinh độ lấy theo tỉnh lỵ (63 tỉnh thành theo danh sách quen thuộc trước sáp nhập 2025).
 * Giờ nhập trong form là giờ Việt Nam (UTC+7, kinh tuyến chuẩn 105°E).
 *
 * south = các tỉnh từ Quảng Trị trở vào: từ 01/01/1960 đến 13/06/1975 miền Nam dùng UTC+8,
 * nên giờ trên đồng hồ lúc đó nhanh hơn giờ UTC+7 một tiếng (xem vnUtcOffsetMinutes).
 */
import type { ProvinceInfo } from './cities';

export interface VnProvinceInfo extends ProvinceInfo {
  south?: boolean;
}

const P = (name: string, capital: string, longitude: number, south = false): VnProvinceInfo => ({
  name,
  cities: [{ name: capital, longitude }],
  south,
});

export const VN_PROVINCES: VnProvinceInfo[] = [
  // Thành phố trực thuộc trung ương
  P('Hà Nội', 'Hà Nội', 105.85),
  P('TP. Hồ Chí Minh', 'TP. Hồ Chí Minh', 106.70, true),
  P('Hải Phòng', 'Hải Phòng', 106.68),
  P('Đà Nẵng', 'Đà Nẵng', 108.22, true),
  P('Cần Thơ', 'Cần Thơ', 105.78, true),
  // Các tỉnh (A–Z)
  P('An Giang', 'Long Xuyên', 105.43, true),
  P('Bà Rịa – Vũng Tàu', 'Vũng Tàu', 107.08, true),
  P('Bắc Giang', 'Bắc Giang', 106.20),
  P('Bắc Kạn', 'Bắc Kạn', 105.83),
  P('Bạc Liêu', 'Bạc Liêu', 105.72, true),
  P('Bắc Ninh', 'Bắc Ninh', 106.07),
  P('Bến Tre', 'Bến Tre', 106.38, true),
  P('Bình Định', 'Quy Nhơn', 109.22, true),
  P('Bình Dương', 'Thủ Dầu Một', 106.65, true),
  P('Bình Phước', 'Đồng Xoài', 106.90, true),
  P('Bình Thuận', 'Phan Thiết', 108.10, true),
  P('Cà Mau', 'Cà Mau', 105.15, true),
  P('Cao Bằng', 'Cao Bằng', 106.25),
  P('Đắk Lắk', 'Buôn Ma Thuột', 108.05, true),
  P('Đắk Nông', 'Gia Nghĩa', 107.69, true),
  P('Điện Biên', 'Điện Biên Phủ', 103.02),
  P('Đồng Nai', 'Biên Hòa', 106.82, true),
  P('Đồng Tháp', 'Cao Lãnh', 105.63, true),
  P('Gia Lai', 'Pleiku', 108.00, true),
  P('Hà Giang', 'Hà Giang', 104.98),
  P('Hà Nam', 'Phủ Lý', 105.92),
  P('Hà Tĩnh', 'Hà Tĩnh', 105.90),
  P('Hải Dương', 'Hải Dương', 106.33),
  P('Hậu Giang', 'Vị Thanh', 105.47, true),
  P('Hòa Bình', 'Hòa Bình', 105.34),
  P('Hưng Yên', 'Hưng Yên', 106.05),
  P('Khánh Hòa', 'Nha Trang', 109.19, true),
  P('Kiên Giang', 'Rạch Giá', 105.08, true),
  P('Kon Tum', 'Kon Tum', 108.00, true),
  P('Lai Châu', 'Lai Châu', 103.46),
  P('Lâm Đồng', 'Đà Lạt', 108.44, true),
  P('Lạng Sơn', 'Lạng Sơn', 106.76),
  P('Lào Cai', 'Lào Cai', 103.97),
  P('Long An', 'Tân An', 106.41, true),
  P('Nam Định', 'Nam Định', 106.17),
  P('Nghệ An', 'Vinh', 105.68),
  P('Ninh Bình', 'Ninh Bình', 105.97),
  P('Ninh Thuận', 'Phan Rang – Tháp Chàm', 108.99, true),
  P('Phú Thọ', 'Việt Trì', 105.40),
  P('Phú Yên', 'Tuy Hòa', 109.30, true),
  P('Quảng Bình', 'Đồng Hới', 106.60),
  P('Quảng Nam', 'Tam Kỳ', 108.48, true),
  P('Quảng Ngãi', 'Quảng Ngãi', 108.80, true),
  P('Quảng Ninh', 'Hạ Long', 107.08),
  P('Quảng Trị', 'Đông Hà', 107.10, true),
  P('Sóc Trăng', 'Sóc Trăng', 105.97, true),
  P('Sơn La', 'Sơn La', 103.91),
  P('Tây Ninh', 'Tây Ninh', 106.10, true),
  P('Thái Bình', 'Thái Bình', 106.34),
  P('Thái Nguyên', 'Thái Nguyên', 105.84),
  P('Thanh Hóa', 'Thanh Hóa', 105.78),
  P('Thừa Thiên Huế', 'Huế', 107.58, true),
  P('Tiền Giang', 'Mỹ Tho', 106.36, true),
  P('Trà Vinh', 'Trà Vinh', 106.34, true),
  P('Tuyên Quang', 'Tuyên Quang', 105.22),
  P('Vĩnh Long', 'Vĩnh Long', 105.97, true),
  P('Vĩnh Phúc', 'Vĩnh Yên', 105.60),
  P('Yên Bái', 'Yên Bái', 104.87),
];

/** Giờ Việt Nam: UTC+7 (420 phút). Miền Nam 1960-01-01 → 1975-06-13 dùng UTC+8 (480 phút). */
export function vnUtcOffsetMinutes(province: string | undefined, year: number, month: number, day: number): number {
  const p = VN_PROVINCES.find(x => x.name === province);
  if (p?.south) {
    const ymd = year * 10000 + month * 100 + day;
    if (ymd >= 19600101 && ymd < 19750613) return 480;
  }
  return 420;
}
