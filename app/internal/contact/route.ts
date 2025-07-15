import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface GeneralInquiry {
  type: 'general'
  name: string
  phone: string
  email: string
  inquiryType: string
  message: string
}

interface EventApplication {
  type: 'event'
  eventName: string
  eventType: string
  expectedAttendees: string
  budgetRange: string
  preferredDate: string
  eventLocation: string
  eventDescription: string
  contactName?: string
  contactPhone?: string
  contactEmail?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 요청 타입 판별
    const isEventApplication = body.eventName && body.eventType
    
    if (isEventApplication) {
      return handleEventApplication(body)
    } else {
      return handleGeneralInquiry(body)
    }
  } catch (error) {
    console.error('Request processing error:', error)
    return NextResponse.json(
      { error: '요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}

async function handleGeneralInquiry(body: any) {
  const { name, phone, email, inquiryType, message } = body

  // 필수 필드 검증
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: '이름, 이메일, 메시지는 필수 입력 항목입니다.' },
      { status: 400 }
    )
  }

  try {
    // Gmail SMTP 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // 일반 문의 이메일 내용 구성
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `[EventHub 일반문의] ${name}님의 ${inquiryType} 문의`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            새로운 일반 문의가 도착했습니다
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">문의자 정보</h3>
            <p><strong>이름:</strong> ${name}</p>
            <p><strong>이메일:</strong> ${email}</p>
            ${phone ? `<p><strong>연락처:</strong> ${phone}</p>` : ''}
          </div>

          <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">문의 정보</h3>
            <p><strong>문의 유형:</strong> ${inquiryType}</p>
          </div>

          <div style="background-color: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">문의 내용</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666;">
            <p>이 메일은 EventHub 웹사이트 일반 문의 폼을 통해 자동으로 발송되었습니다.</p>
            <p>답변은 위의 이메일 주소(${email})로 보내주세요.</p>
          </div>
        </div>
      `,
    }

    // 이메일 발송
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: '문의가 성공적으로 전송되었습니다.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('General inquiry email sending error:', error)
    return NextResponse.json(
      { error: '이메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}

async function handleEventApplication(body: any) {
  const { 
    eventName, 
    eventType, 
    expectedAttendees, 
    budgetRange, 
    preferredDate, 
    eventLocation, 
    eventDescription,
    contactName,
    contactPhone,
    contactEmail
  } = body

  // 필수 필드 검증
  if (!eventName || !eventDescription || !preferredDate) {
    return NextResponse.json(
      { error: '행사명, 희망일정, 상세설명은 필수 입력 항목입니다.' },
      { status: 400 }
    )
  }

  try {
    // Gmail SMTP 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // 행사 신청 이메일 내용 구성
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `[EventHub 행사신청] ${eventName} - ${eventType} 신청`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">
            새로운 행사 운영 신청이 도착했습니다
          </h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <h3 style="color: #333; margin-top: 0; color: #16a34a;">📅 행사 기본 정보</h3>
            <p><strong>행사명:</strong> ${eventName}</p>
            <p><strong>행사 유형:</strong> ${eventType}</p>
            <p><strong>예상 참석자 수:</strong> ${expectedAttendees}</p>
            <p><strong>예산 범위:</strong> ${budgetRange}</p>
          </div>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #333; margin-top: 0; color: #f59e0b;">📍 일정 및 장소</h3>
            <p><strong>희망 일정:</strong> ${preferredDate}</p>
            <p><strong>행사 지역:</strong> ${eventLocation}</p>
          </div>

          ${(contactName || contactPhone || contactEmail) ? `
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h3 style="color: #333; margin-top: 0; color: #2563eb;">👤 담당자 정보</h3>
            ${contactName ? `<p><strong>이름:</strong> ${contactName}</p>` : ''}
            ${contactEmail ? `<p><strong>이메일:</strong> ${contactEmail}</p>` : ''}
            ${contactPhone ? `<p><strong>연락처:</strong> ${contactPhone}</p>` : ''}
          </div>
          ` : ''}

          <div style="background-color: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">📝 행사 상세 설명</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${eventDescription}</p>
          </div>

          <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
            <p style="margin: 0; color: #dc2626; font-weight: bold;">⚡ 우선 처리 요청</p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">행사 운영 신청은 24시간 이내에 담당자가 연락드립니다.</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666;">
            <p>이 메일은 EventHub 웹사이트 행사 운영 신청 폼을 통해 자동으로 발송되었습니다.</p>
            <p>빠른 시일 내에 담당자가 연락드리겠습니다.</p>
          </div>
        </div>
      `,
    }

    // 이메일 발송
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: '행사 운영 신청이 성공적으로 전송되었습니다.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Event application email sending error:', error)
    return NextResponse.json(
      { error: '이메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
} 