import { getVocabQuestions, getReadingQuestions, listeningQuestions, refreshQuestions } from './questions.js'
import { evaluate } from './scoring.js'

// ============ 常量 ============
const STEPS = [
  { key: 'info', label: '个人信息', icon: '👤' },
  { key: 'vocab', label: '词汇测试', icon: '📝' },
  { key: 'listening', label: '听力测试', icon: '🎧' },
  { key: 'reading', label: '阅读测试', icon: '📖' }
]

const GRADES = [
  '幼儿园小班', '幼儿园中班', '幼儿园大班',
  '一年级', '二年级', '三年级', '四年级', '五年级', '六年级',
  '初中一年级', '初中二年级', '初中三年级'
]

const COURSE_OPTIONS = [
  { value: 'school', label: '校内英语课' },
  { value: 'nce', label: '新概念英语' },
  { value: 'phonics', label: '牛津自然拼读' },
  { value: 'powerup', label: 'Power Up' },
  { value: 'ket', label: '剑桥KET' },
  { value: 'pet', label: '剑桥PET' },
  { value: 'other', label: '其他课程' }
]

const TEXTBOOK_OPTIONS = [
  { value: 'pep', label: '人教版PEP' },
  { value: 'oxford', label: '牛津版' },
  { value: 'longman', label: '朗文版' },
  { value: 'cambridge', label: '剑桥版' },
  { value: 'nce', label: '新概念' },
  { value: 'other', label: '其他' }
]

// ============ 全局状态 ============
const state = {
  currentStep: 'info',
  currentStepIndex: 0,

  // 个人信息
  chineseName: '',
  englishName: '',
  gradeIndex: -1,
  selectedCourses: [],
  textbook: '',

  // 题目
  vocabQuestions: [],
  readingQuestions: [],

  // 索引
  vocabIndex: 0,
  listeningIndex: 0,
  readingIndex: 0,

  // 答案
  vocabAnswers: [],
  listeningAnswers: [],
  readingAnswers: [],

  // 音频
  audioCtx: null,
  audioPlaying: false
}

// ============ DOM 工具 ============
function $(id) { return document.getElementById(id) }

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none')
  const el = $('screen-' + name)
  if (el) el.style.display = ''
  if (name !== 'survey') {
    $('screen-loading').style.display = 'none'
  }
}

function toast(msg) {
  const t = document.createElement('div')
  t.className = 'toast'
  t.textContent = msg
  document.body.appendChild(t)
  setTimeout(() => t.remove(), 1800)
}

// ============ 初始化 ============
function initWelcome() {
  // 重置状态
  state.currentStep = 'info'
  state.currentStepIndex = 0
  state.chineseName = ''
  state.englishName = ''
  state.gradeIndex = -1
  state.selectedCourses = []
  state.textbook = ''
  state.vocabIndex = 0
  state.listeningIndex = 0
  state.readingIndex = 0
  state.vocabAnswers = []
  state.listeningAnswers = []
  state.readingAnswers = []
  state.audioCtx = null
  state.audioPlaying = false

  // 重置表单
  const cnInput = $('chineseName')
  const enInput = $('englishName')
  if (cnInput) cnInput.value = ''
  if (enInput) enInput.value = ''
  const gradeSel = $('gradeSelect')
  if (gradeSel) gradeSel.selectedIndex = 0

  // 填充年级下拉
  const sel = $('gradeSelect')
  sel.innerHTML = '<option value="">请选择年级</option>' +
    GRADES.map((g, i) => '<option value="' + i + '">' + g + '</option>').join('')

  // 填充课程多选
  $('courseGroup').innerHTML = COURSE_OPTIONS.map((o, i) =>
    '<span class="chip-btn" data-index="' + i + '" data-value="' + o.value + '" onclick="App.toggleCourse(this)">' + o.label + '</span>'
  ).join('')

  // 填充教材单选
  $('textbookGroup').innerHTML = TEXTBOOK_OPTIONS.map((o, i) =>
    '<span class="chip-btn" data-index="' + i + '" data-value="' + o.value + '" onclick="App.selectTextbook(this)">' + o.label + '</span>'
  ).join('')

  // 步骤指示器
  renderStepIndicator()

  showScreen('welcome')
}

function renderStepIndicator() {
  // Dots
  let dotsHtml = ''
  STEPS.forEach((step, i) => {
    const cls = i === state.currentStepIndex ? 'active' : (i < state.currentStepIndex ? 'done' : '')
    dotsHtml += '<div class="step-dot ' + cls + '"></div>'
    if (i < STEPS.length - 1) {
      dotsHtml += '<div class="step-line ' + (i < state.currentStepIndex ? 'done' : '') + '"></div>'
    }
  })
  $('stepDots').innerHTML = dotsHtml
  $('stepLabels').innerHTML = STEPS.map((s, i) =>
    '<span class="step-label' + (i === state.currentStepIndex ? ' active' : '') + '">' + s.label + '</span>'
  ).join('')
}

// ============ 进度 ============
function updateProgress() {
  const { currentStep, vocabIndex, listeningIndex, readingIndex,
    vocabQuestions, listeningQuestions: lq, readingQuestions } = state
  const totalSteps = 3

  if (currentStep === 'info') {
    $('progressWrap').style.display = 'none'
    return
  }
  $('progressWrap').style.display = ''

  let stepOffset, progressInStep, stepTotal
  if (currentStep === 'vocab') {
    stepOffset = 0; progressInStep = vocabIndex + 1; stepTotal = vocabQuestions.length
  } else if (currentStep === 'listening') {
    stepOffset = 1; progressInStep = listeningIndex + 1; stepTotal = lq.length
  } else {
    stepOffset = 2; progressInStep = readingIndex + 1; stepTotal = readingQuestions.length
  }

  const pct = Math.round(((stepOffset + progressInStep / stepTotal) / totalSteps) * 100)
  $('progressFill').style.width = pct + '%'
  $('progressText').textContent = '测试完成'
}

// ============ 表单交互 ============
function toggleCourse(el) {
  const idx = parseInt(el.dataset.index)
  const val = el.dataset.value
  const arr = state.selectedCourses
  const pos = arr.indexOf(val)
  if (pos > -1) {
    arr.splice(pos, 1)
    el.classList.remove('checked')
  } else {
    arr.push(val)
    el.classList.add('checked')
  }
}

function selectTextbook(el) {
  const val = el.dataset.value
  document.querySelectorAll('#textbookGroup .chip-btn').forEach(b => b.classList.remove('checked'))
  el.classList.add('checked')
  state.textbook = val
}

// ============ 验证 ============
function validateInfo() {
  const cn = $('chineseName').value.trim()
  const en = $('englishName').value.trim()
  const grade = $('gradeSelect').value
  if (!cn) { toast('请填写中文姓名'); return false }
  if (!en) { toast('请填写英文名'); return false }
  if (!grade) { toast('请选择年级'); return false }

  state.chineseName = cn
  state.englishName = en
  state.gradeIndex = parseInt(grade)
  return true
}

// ============ 导航 ============
function getCurrentQuestions() {
  const { currentStep, vocabQuestions, readingQuestions } = state
  if (currentStep === 'vocab') return vocabQuestions
  if (currentStep === 'listening') return listeningQuestions
  if (currentStep === 'reading') return readingQuestions
  return []
}

function getCurrentIndex() {
  const { currentStep, vocabIndex, listeningIndex, readingIndex } = state
  if (currentStep === 'vocab') return vocabIndex
  if (currentStep === 'listening') return listeningIndex
  if (currentStep === 'reading') return readingIndex
  return 0
}

function getCurrentAnswers() {
  const { currentStep, vocabAnswers, listeningAnswers, readingAnswers } = state
  if (currentStep === 'vocab') return vocabAnswers
  if (currentStep === 'listening') return listeningAnswers
  if (currentStep === 'reading') return readingAnswers
  return []
}

function updateQuestionIndex(newIndex) {
  if (state.currentStep === 'vocab') state.vocabIndex = newIndex
  else if (state.currentStep === 'listening') { state.listeningIndex = newIndex; stopAudio() }
  else if (state.currentStep === 'reading') state.readingIndex = newIndex

  renderCurrentQuestion()
  updateProgress()
  updateNavButtons()
}

function goToNextStep() {
  stopAudio()
  const newIdx = state.currentStepIndex + 1
  if (newIdx >= STEPS.length) {
    submit()
    return
  }
  state.currentStepIndex = newIdx
  state.currentStep = STEPS[newIdx].key
  renderStepIndicator()
  showCurrentStepContent()
  updateProgress()
  updateNavButtons()
}

function goToPrevStep() {
  stopAudio()
  const newIdx = state.currentStepIndex - 1
  if (newIdx < 0) {
    showScreen('welcome')
    return
  }
  state.currentStepIndex = newIdx
  state.currentStep = STEPS[newIdx].key
  renderStepIndicator()
  showCurrentStepContent()
  updateProgress()
  updateNavButtons()
}

function prevQuestion() {
  if (state.currentStep === 'info') {
    showScreen('welcome')
    return
  }
  const idx = getCurrentIndex()
  if (idx > 0) {
    updateQuestionIndex(idx - 1)
  } else {
    goToPrevStep()
  }
}

function nextQuestion() {
  if (state.currentStep === 'info') {
    if (!validateInfo()) return
    goToNextStep()
    return
  }

  const answers = getCurrentAnswers()
  const idx = getCurrentIndex()
  if (answers[idx] === -1) {
    toast('请先选择一个答案哦~')
    return
  }

  const questions = getCurrentQuestions()
  if (idx < questions.length - 1) {
    updateQuestionIndex(idx + 1)
  } else {
    goToNextStep()
  }
}

function updateNavButtons() {
  const { currentStep, vocabIndex, listeningIndex, readingIndex,
    vocabQuestions, readingQuestions } = state

  $('btnPrev').textContent = currentStep === 'info' ? '返回' : '上一题'

  let nextLabel = '下一题'
  if (currentStep === 'info') nextLabel = '答题开始'
  else if (currentStep === 'vocab' && vocabIndex === vocabQuestions.length - 1) nextLabel = '下一题'
  else if (currentStep === 'listening' && listeningIndex === listeningQuestions.length - 1) nextLabel = '下一题'
  else if (currentStep === 'reading' && readingIndex === readingQuestions.length - 1) nextLabel = '提交测试'
  $('btnNext').textContent = nextLabel
}

// ============ 渲染题目 ============
function showCurrentStepContent() {
  // 隐藏所有步骤内容
  ['info', 'vocab', 'listening', 'reading'].forEach(key => {
    const el = $('step-' + key)
    if (el) el.style.display = 'none'
  })

  const step = state.currentStep
  const el = $('step-' + step)
  if (el) el.style.display = ''

  if (step !== 'info') {
    renderCurrentQuestion()
  }
}

function renderCurrentQuestion() {
  const step = state.currentStep

  if (step === 'vocab') {
    const qs = state.vocabQuestions
    const qi = state.vocabIndex
    const answers = state.vocabAnswers
    $('vocabCounter').textContent = (qi + 1) + ' / ' + qs.length
    $('vocabWord').textContent = qs[qi].word
    $('vocabQuestion').textContent = qs[qi].question
    $('vocabOptions').innerHTML = renderOptions(qs[qi].options, answers[qi], 'vocab')
  }

  if (step === 'listening') {
    const qs = listeningQuestions
    const qi = state.listeningIndex
    const answers = state.listeningAnswers
    $('listeningCounter').textContent = (qi + 1) + ' / ' + qs.length
    $('listeningQuestion').textContent = qs[qi].question
    $('listeningOptions').innerHTML = renderOptions(qs[qi].options, answers[qi], 'listening')
    // 重置音频按钮状态
    $('audioBtn').classList.remove('playing')
    $('audioHint').textContent = '点击播放听力'
    state.audioPlaying = false
  }

  if (step === 'reading') {
    const qs = state.readingQuestions
    const qi = state.readingIndex
    const answers = state.readingAnswers
    $('readingCounter').textContent = (qi + 1) + ' / ' + qs.length
    $('readingQuestion').textContent = qs[qi].question
    $('readingOptions').innerHTML = renderOptions(qs[qi].options, answers[qi], 'reading')
    // 短文区域
    if (qs[qi].passageTitle || qs[qi].passage) {
      $('passageBox').style.display = ''
      $('passageTitle').textContent = qs[qi].passageTitle || ''
      $('passageText').textContent = qs[qi].passage || ''
    } else {
      $('passageBox').style.display = 'none'
    }
  }
}

function renderOptions(options, selectedIdx, step) {
  return options.map((opt, i) => {
    const letter = ['A', 'B', 'C', 'D'][i]
    const cls = i === selectedIdx ? ' selected' : ''
    return '<div class="option-item' + cls + '" data-answer="' + i + '" onclick="App.selectAnswer(\'' + step + '\',' + i + ')">' +
      '<span class="option-letter">' + letter + '</span>' +
      '<span class="option-text">' + opt + '</span>' +
      '</div>'
  }).join('')
}

function selectAnswer(step, answer) {
  if (step === 'vocab') {
    state.vocabAnswers[state.vocabIndex] = answer
    renderCurrentQuestion()
  } else if (step === 'listening') {
    state.listeningAnswers[state.listeningIndex] = answer
    renderCurrentQuestion()
  } else if (step === 'reading') {
    state.readingAnswers[state.readingIndex] = answer
    renderCurrentQuestion()
  }
}

// ============ 音频播放 ============
function playAudio() {
  if (state.currentStep !== 'listening') return

  const q = listeningQuestions[state.listeningIndex]
  if (!q || !q.audio) return

  stopAudio()

  const audio = new Audio(q.audio)
  audio.oncanplay = () => console.log('音频就绪:', q.audio)
  audio.onplaying = () => {
    state.audioPlaying = true
    $('audioBtn').classList.add('playing')
    $('audioHint').textContent = '正在播放...'
  }
  audio.onended = () => {
    state.audioPlaying = false
    $('audioBtn').classList.remove('playing')
    $('audioHint').textContent = '点击播放听力'
  }
  audio.onerror = (err) => {
    console.error('音频播放失败:', err)
    state.audioPlaying = false
    $('audioBtn').classList.remove('playing')
    $('audioHint').textContent = '点击播放听力'
    toast('音频加载失败')
  }
  audio.play().catch(err => {
    console.error('音频播放失败:', err)
    toast('音频加载失败')
  })
  state.audioCtx = audio
}

function stopAudio() {
  if (state.audioCtx) {
    state.audioCtx.pause()
    state.audioCtx.currentTime = 0
    state.audioCtx = null
  }
  state.audioPlaying = false
}

// ============ 提交与结果 ============
function submit() {
  $('screen-loading').style.display = ''
  document.querySelectorAll('#screen-survey, #screen-welcome, #screen-result').forEach(s => s.style.display = 'none')

  const vocabQuestions = state.vocabQuestions
  const readingQuestions = state.readingQuestions

  const answers = {
    vocab: state.vocabAnswers,
    listening: state.listeningAnswers,
    reading: state.readingAnswers
  }

  // 小延迟让加载动画显示
  setTimeout(() => {
    try {
      const result = evaluate(answers, vocabQuestions, listeningQuestions, readingQuestions)
      const s = result.scores
      s.vocabPct = Math.round(s.vocabScore / s.vocabTotal * 100)
      s.listenPct = Math.round(s.listeningScore / s.listeningTotal * 100)
      s.readPct = Math.round(s.readingScore / s.readingTotal * 100)

      showResult(result, s)
    } catch (e) {
      console.error('评估出错:', e)
      toast('评估失败，请重试')
      showScreen('welcome')
    }
  }, 600)
}

function showResult(result, s) {
  // Hero
  const hero = $('resultHero')
  hero.style.background = 'linear-gradient(160deg, ' + result.cefr.color + ', ' + result.cefr.color + '88)'
  $('resultIcon').textContent = result.cefr.icon
  $('resultLevel').textContent = result.cefr.level
  $('resultLabel').textContent = result.cefr.label

  // 学生信息
  const gradeText = state.gradeIndex >= 0 ? GRADES[state.gradeIndex] : ''
  $('infoName').textContent = state.chineseName + ' (' + state.englishName + ')'
  $('infoGrade').textContent = gradeText

  const courseLabels = state.selectedCourses.map(v => {
    const opt = COURSE_OPTIONS.find(o => o.value === v)
    return opt ? opt.label : v
  })
  if (courseLabels.length) {
    $('infoCoursesRow').style.display = ''
    $('infoCourses').textContent = courseLabels.join('、')
  } else {
    $('infoCoursesRow').style.display = 'none'
  }

  const tbOpt = TEXTBOOK_OPTIONS.find(o => o.value === state.textbook)
  if (tbOpt) {
    $('infoTextbookRow').style.display = ''
    $('infoTextbook').textContent = tbOpt.label
  } else {
    $('infoTextbookRow').style.display = 'none'
  }

  // 得分
  $('totalScoreNum').textContent = s.totalScore
  $('totalScoreTotal').textContent = '/ ' + s.maxScore
  $('vocabBar').style.width = s.vocabPct + '%'
  $('listenBar').style.width = s.listenPct + '%'
  $('readBar').style.width = s.readPct + '%'
  $('vocabScoreText').textContent = s.vocabScore + '/' + s.vocabTotal
  $('listenScoreText').textContent = s.listeningScore + '/' + s.listeningTotal
  $('readScoreText').textContent = s.readingScore + '/' + s.readingTotal

  // 推荐课程
  $('recommendDesc').textContent = result.recommendations.description
  $('courseList').innerHTML = result.recommendations.courses.map(c =>
    '<div class="course-item"><span class="course-icon">📚</span><span class="course-name">' + c + '</span></div>'
  ).join('')
  $('focusList').innerHTML = result.recommendations.focusAreas.map(f =>
    '<div class="focus-item"><div class="focus-dot"></div><span>' + f + '</span></div>'
  ).join('')

  // 学习建议
  $('suggestionList').innerHTML = result.suggestions.map((sug, i) =>
    '<div class="suggestion-item"><div class="sug-num">' + (i + 1) + '</div><span class="sug-text">' + sug + '</span></div>'
  ).join('')

  showScreen('result')
}

// ============ 开始测试 ============
function startTest() {
  refreshQuestions()
  const vocabQuestions = getVocabQuestions()
  const readingQuestions = getReadingQuestions()

  state.vocabQuestions = vocabQuestions
  state.readingQuestions = readingQuestions
  state.vocabAnswers = new Array(vocabQuestions.length).fill(-1)
  state.listeningAnswers = new Array(listeningQuestions.length).fill(-1)
  state.readingAnswers = new Array(readingQuestions.length).fill(-1)
  state.vocabIndex = 0
  state.listeningIndex = 0
  state.readingIndex = 0
  state.currentStep = 'info'
  state.currentStepIndex = 0
  state.selectedCourses = []
  state.textbook = ''

  // 重置表单
  $('chineseName').value = ''
  $('englishName').value = ''
  $('gradeSelect').selectedIndex = 0
  document.querySelectorAll('#courseGroup .chip-btn').forEach(b => b.classList.remove('checked'))
  document.querySelectorAll('#textbookGroup .chip-btn').forEach(b => b.classList.remove('checked'))

  showScreen('survey')
  renderStepIndicator()
  showCurrentStepContent()
  updateProgress()
  updateNavButtons()
}

function retest() {
  stopAudio()
  showScreen('welcome')
  initWelcome()
}

// ============ 导出 ============
window.App = {
  startTest,
  retest,
  prevQuestion,
  nextQuestion,
  selectAnswer,
  playAudio,
  toggleCourse,
  selectTextbook
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initWelcome()
})
