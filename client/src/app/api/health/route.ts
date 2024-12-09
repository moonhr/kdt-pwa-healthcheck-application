import { NextResponse } from 'next/server';

export async function GET() {
  console.log('[Health Check] 요청 시작 -', new Date().toISOString());

  try {
    const responseData = {
      status: 'healthy',
      timestamp: Date.now(),
      uptime: process.uptime(),
      message: '정상',
      environment: process.env.NODE_ENV,
      path: '/api/health'
    };

    console.log('[Health Check] 응답 데이터:', JSON.stringify(responseData, null, 2));

    return NextResponse.json(
      responseData,
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  } catch (error) {
    console.error('[Health Check] 오류 발생:', error);
    console.error('[Health Check] 오류 상세:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: Date.now(),
        message: '오류 발생',
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}
