import { jwtDecode } from "jwt-decode";
import * as readline from 'readline';

// Next-Auth JWT 토큰 인터페이스
interface NextAuthJWT {
  sub?: string;
  name?: string;
  email?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

// 이 함수는 환경 변수나 쿠키에서 가져온 JWT 토큰을 분석합니다
const testTokenDecode = (token: string) => {
  try {
    const decoded = jwtDecode<NextAuthJWT>(token);
    console.log("\n디코딩 성공:", JSON.stringify(decoded, null, 2));
    
    // 주요 필드 확인
    console.log("\n--- 토큰 주요 필드 ---");
    console.log("sub (사용자 ID):", decoded.sub);
    console.log("name:", decoded.name);
    console.log("email:", decoded.email);
    console.log("iat (발급시간):", decoded.iat);
    console.log("exp (만료시간):", decoded.exp);
    
    // 만료 시간 확인
    if (decoded.exp) {
      const expDate = new Date(decoded.exp * 1000);
      const now = new Date();
      console.log(`\n토큰 만료일: ${expDate}`);
      console.log(`현재 시간: ${now}`);
      
      const timeRemaining = Math.floor((expDate.getTime() - now.getTime()) / 1000);
      if (timeRemaining > 0) {
        console.log(`만료까지 남은 시간: ${Math.floor(timeRemaining / 60)} 분 ${timeRemaining % 60} 초`);
      } else {
        console.log(`토큰이 이미 만료되었습니다. (${Math.abs(Math.floor(timeRemaining / 60))} 분 ${Math.abs(timeRemaining % 60)} 초 전)`);
      }
    }
    
    return decoded;
  } catch (error) {
    console.error("토큰 디코딩 오류:", error);
    return null;
  }
};

// 인터랙티브 모드로 토큰 입력 받기
const promptForToken = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("JWT 토큰 테스트 도구");
  console.log("토큰을 입력하거나 붙여넣으세요 (Ctrl+C 로 종료):");
  
  rl.question('> ', (token) => {
    if (token.trim()) {
      testTokenDecode(token.trim());
    } else {
      console.log("토큰이 입력되지 않았습니다.");
    }
    rl.close();
  });
};

// 스크립트 실행
if (require.main === module) {
  promptForToken();
}

export default testTokenDecode; 