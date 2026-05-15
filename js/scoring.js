function calculateScores(answers, vocabQuestions, listeningQuestions, readingQuestions) {
  const vocabScore = countCorrect(answers.vocab || [], vocabQuestions)
  const listeningScore = countCorrect(answers.listening || [], listeningQuestions)
  const readingScore = countCorrect(answers.reading || [], readingQuestions)

  const maxScore = vocabQuestions.length + listeningQuestions.length + readingQuestions.length
  const totalScore = vocabScore + listeningScore + readingScore

  return {
    vocabScore,
    vocabTotal: vocabQuestions.length,
    listeningScore,
    listeningTotal: listeningQuestions.length,
    readingScore,
    readingTotal: readingQuestions.length,
    totalScore,
    maxScore
  }
}

function countCorrect(userAnswers, questions) {
  let correct = 0
  userAnswers.forEach((ans, idx) => {
    if (idx < questions.length && ans === questions[idx].answer) {
      correct++
    }
  })
  return correct
}

function getCEFRLevel(totalScore, vocabScore) {
  if (totalScore <= 10 || vocabScore <= 5) {
    return { level: 'Pre-A1', label: '启蒙阶段', icon: '🌟', color: '#FBBF24' }
  }
  if (totalScore <= 16 || vocabScore <= 10) {
    return { level: 'A1', label: '入门阶段', icon: '⭐', color: '#60A5FA' }
  }
  if (totalScore <= 21 || vocabScore <= 13) {
    return { level: 'A2', label: '基础阶段', icon: '✨', color: '#34D399' }
  }
  return { level: 'B1', label: '进阶阶段', icon: '🏆', color: '#FB7185' }
}

function getRecommendations(level) {
  const map = {
    'Pre-A1': {
      courses: ['Power Up Starter', 'Power Up Level 1'],
      description: '孩子的英语正在起步，建议从Power Up入门级开始，通过歌曲、故事和游戏建立英语学习兴趣，积累基础词汇和简单句型。',
      focusAreas: ['自然拼读基础', '日常主题词汇', '简单问候与自我介绍']
    },
    'A1': {
      courses: ['Power Up Level 2', 'Power Up Level 3'],
      description: '孩子已具备基础英语能力，建议通过Power Up 2-3级系统提升听说读写综合能力，为后续的剑桥考试打下坚实基础。',
      focusAreas: ['核心词汇积累', '简单对话交流', '绘本阅读入门']
    },
    'A2': {
      courses: ['Power Up Level 4', 'Power Up Level 5', '剑桥KET预备班'],
      description: '孩子英语基础扎实，建议在Power Up 4-5级基础上，同步进入KET预备阶段，逐步熟悉剑桥考试题型和答题技巧。',
      focusAreas: ['分级阅读提升', '短篇写作训练', 'KET题型入门']
    },
    'B1': {
      courses: ['Power Up Level 6', '剑桥KET冲刺班', '剑桥PET预备班'],
      description: '孩子英语能力较强，建议冲刺KET考试取得优异成绩，同时可开始PET预备阶段的学习，挑战更高目标！',
      focusAreas: ['学术词汇拓展', '长篇文章阅读', 'PET听力与写作']
    }
  }
  return map[level] || map['A1']
}

function generateSuggestions(scores) {
  const suggestions = []
  const { vocabScore, vocabTotal, listeningScore, listeningTotal, readingScore, readingTotal } = scores

  const vocabRate = vocabScore / vocabTotal
  const listenRate = listeningScore / listeningTotal
  const readRate = readingScore / readingTotal

  const maxRate = Math.max(vocabRate, listenRate, readRate)
  if (maxRate >= 0.8) {
    if (vocabRate >= 0.8) {
      suggestions.push('词汇量表现优秀！继续保持阅读习惯，可以通过英文分级读物拓展更多主题词汇。')
    }
    if (listenRate >= 0.8) {
      suggestions.push('听力理解能力很棒！可以尝试听英文短篇故事或动画片原声，进一步提升语感。')
    }
    if (readRate >= 0.8) {
      suggestions.push('阅读理解能力出色！建议挑战更高难度的英文读物，如初级章节书。')
    }
  }

  const minRate = Math.min(vocabRate, listenRate, readRate)
  if (minRate <= 0.5) {
    if (vocabRate <= 0.5) {
      suggestions.push('词汇量需要加强，建议每天阅读英文绘本10-15分钟，遇到生词记录下来，用单词卡片游戏的方式记忆。')
    }
    if (listenRate <= 0.5) {
      suggestions.push('听力方面可以多下功夫，建议每天听15分钟英文儿歌、动画片或英文小故事，培养英语语感和听力习惯。')
    }
    if (readRate <= 0.5) {
      suggestions.push('阅读理解可以更进一步，建议从简单的分级读物开始（如Oxford Reading Tree），每天坚持读一篇小短文并复述大意。')
    }
  }

  if (suggestions.length === 0) {
    suggestions.push('各方面发展均衡，继续保持良好的学习习惯，可以适当增加英语学习时间和难度。')
  }

  suggestions.push('建议每周保持3-4次英语学习频率，每次20-30分钟，持续积累效果好！')

  return suggestions
}

export function evaluate(answers, vocabQuestions, listeningQuestions, readingQuestions) {
  const scores = calculateScores(answers, vocabQuestions, listeningQuestions, readingQuestions)
  const cefr = getCEFRLevel(scores.totalScore, scores.vocabScore)
  const recommendations = getRecommendations(cefr.level)
  const suggestions = generateSuggestions(scores)

  return { scores, cefr, recommendations, suggestions }
}
