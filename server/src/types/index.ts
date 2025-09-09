// 상자 색상별 개수
export interface IBoxCounts {
  red: number;
  green: number;
  blue: number;
}

// 'stats' 테이블 데이터 형태
export interface IStats {
  date: string;
  red_boxes: number;
  green_boxes: number;
  blue_boxes: number;
}

// 'videos' 테이블 데이터 형태
export interface IVideo {
  id?: number;
  date: string;
  url: string;
  boxCounts: IBoxCounts;
}