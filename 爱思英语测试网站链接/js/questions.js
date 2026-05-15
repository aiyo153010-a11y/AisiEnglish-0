import vocabBank from './vocabBank.js'
import readingBank from './readingBank.js'

// 随机打乱数组
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ===================== 词汇抽题 =====================
// 按难度分层抽取：Pre-A1(5题) + A1(5题) + A2(3题) + B1(2题) = 15题
function selectVocabQuestions() {
  const levels = { 0: [], 1: [], 2: [], 3: [] }
  vocabBank.forEach(item => {
    if (levels[item.l]) levels[item.l].push(item)
  })

  const selected = []
  selected.push(...shuffle(levels[0]).slice(0, 5))
  selected.push(...shuffle(levels[1]).slice(0, 5))
  selected.push(...shuffle(levels[2]).slice(0, 3))
  selected.push(...shuffle(levels[3]).slice(0, 2))

  return shuffle(selected).map((item, idx) => {
    const options = shuffle([item.c, ...item.d])
    const answerIndex = options.indexOf(item.c)
    return {
      id: idx + 1,
      word: item.w,
      question: '请选出"' + item.w + '"的中文意思：',
      options: options,
      answer: answerIndex
    }
  })
}

// ===================== 听力测试（5题固定） =====================
const AUDIO_BASE = 'audio/'

const listeningQuestions = [
  {
    id: 1,
    audio: AUDIO_BASE + 'listening_q1.wav',
    transcript: 'Tom asks, Amy, what do you usually have for breakfast? Amy says, I usually have bread and milk.',
    question: 'Amy早餐通常吃什么？',
    options: ['鸡蛋和果汁', '面包和牛奶', '米饭和蔬菜', '三明治和可乐'],
    answer: 1
  },
  {
    id: 2,
    audio: AUDIO_BASE + 'listening_q2.wav',
    transcript: 'It is sunny today. Let us go to the park and fly a kite!',
    question: '他们打算去公园做什么？',
    options: ['踢足球', '放风筝', '骑自行车', '野餐'],
    answer: 1
  },
  {
    id: 3,
    audio: AUDIO_BASE + 'listening_q3.wav',
    transcript: 'Dad asks, Lily, what time does your school start every day? Lily says, My school starts at eight o\'clock in the morning.',
    question: 'Lily的学校几点开始上课？',
    options: ['7点', '8点', '9点', '10点'],
    answer: 1
  },
  {
    id: 4,
    audio: AUDIO_BASE + 'listening_q4.wav',
    transcript: 'Ben asks, Mum, where is my blue jacket? Mum says, It is on the chair in your bedroom, Ben.',
    question: 'Ben的蓝色夹克在哪里？',
    options: ['在客厅沙发上', '在卧室椅子上', '在衣柜里', '在书包旁边'],
    answer: 1
  },
  {
    id: 5,
    audio: AUDIO_BASE + 'listening_q5.wav',
    transcript: 'Yesterday we went to the zoo. We saw elephants, monkeys and pandas. The pandas were eating bamboo. They were so cute!',
    question: '昨天他们在动物园看到了什么动物在吃东西？',
    options: ['大象', '猴子', '熊猫', '长颈鹿'],
    answer: 2
  }
]

// ===================== 阅读抽题 =====================
// 按难度抽取3篇短文（A1一篇 + A2一篇 + B1一篇），共5-6题
function selectReadingQuestions() {
  const levels = { 0: [], 1: [], 2: [] }
  readingBank.forEach(item => {
    if (levels[item.l]) levels[item.l].push(item)
  })

  const selected = []
  selected.push(...shuffle(levels[0]).slice(0, 1))
  selected.push(...shuffle(levels[1]).slice(0, 1))
  selected.push(...shuffle(levels[2]).slice(0, 1))

  const result = []
  selected.forEach(passage => {
    passage.q.forEach((qItem) => {
      const options = shuffle(qItem.o.map((o, i) => ({ text: o, orig: i })))
      const answer = options.findIndex(opt => opt.orig === qItem.a)
      result.push({
        id: result.length + 1,
        passage: passage.p,
        passageTitle: passage.t,
        question: qItem.q,
        options: options.map(o => o.text),
        answer: answer
      })
    })
  })

  return shuffle(result).slice(0, 6).map((item, idx) => {
    item.id = idx + 1
    return item
  })
}

// ===================== 缓存与导出 =====================
let _cachedVocab = null
let _cachedReading = null

export function getVocabQuestions() {
  if (!_cachedVocab) _cachedVocab = selectVocabQuestions()
  return _cachedVocab
}

export function getReadingQuestions() {
  if (!_cachedReading) _cachedReading = selectReadingQuestions()
  return _cachedReading
}

export function refreshQuestions() {
  _cachedVocab = null
  _cachedReading = null
}

export { listeningQuestions }
