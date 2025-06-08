// response 관련된 타입 여기서 정의
// items 동적이기 때문에 제네릭 타입으로 정의 해줘야 한다.

export interface ApiResponse<T> {
  // 여기 티로 받아서
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: T[]; // 동적 // 그 친구를 배열화시켜주겠다
}
