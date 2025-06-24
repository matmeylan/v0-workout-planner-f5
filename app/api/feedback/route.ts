import { NextRequest, NextResponse } from 'next/server'

// In a real app, this would be stored in a database
const feedbackStorage = new Map<string, { tooEasy: number; hard: number; outOfReach: number }>()

export async function POST(request: NextRequest) {
  try {
    const { sessionId, vote } = await request.json()
    
    if (!sessionId || !vote || !['tooEasy', 'hard', 'outOfReach'].includes(vote)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Get current votes or initialize
    const current = feedbackStorage.get(sessionId) || { tooEasy: 0, hard: 0, outOfReach: 0 }
    
    // Increment the vote
    current[vote as keyof typeof current]++
    
    // Store updated votes
    feedbackStorage.set(sessionId, current)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    const votes = feedbackStorage.get(sessionId) || { tooEasy: 0, hard: 0, outOfReach: 0 }
    const total = votes.tooEasy + votes.hard + votes.outOfReach
    
    if (total === 0) {
      return NextResponse.json({ 
        percentages: { tooEasy: 0, hard: 0, outOfReach: 0 },
        totalVotes: 0
      })
    }
    
    const percentages = {
      tooEasy: Math.round((votes.tooEasy / total) * 100),
      hard: Math.round((votes.hard / total) * 100),
      outOfReach: Math.round((votes.outOfReach / total) * 100)
    }
    
    return NextResponse.json({ percentages, totalVotes: total })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}