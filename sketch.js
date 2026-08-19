document.querySelectorAll('.t1label, .t2label, .t3label, .t4label, .t5label').forEach((el) => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => {
    el.classList.toggle('clicked');
  });
});

const WORD_BANK = [
  '으악', '간에', '나는', '지성', '아닌', '짐승', '에프', '헛공', '괜한', '나의',
  '이', '어처', '추태', '침대', '어둠', '다시', '상태', '무릎', '영문', '모를',
  '깨진', '액정', '사이', '혼합', '야기', '환영', '우주', '존재', '미학', '논하',
  '거창', '자의', '방안', '단지', '냄새', '한', '여자', '한', '허탈', '심히',
  '무력', '참으', '밤이', '뒤로', '한참', '동안', '아무', '안심', '마땅', '오히',
  '그것', '때문', '눈을', '감으', '시각', '수렴', '또한', '망막', '사라', '단순',
  '닫힘', '조금', '만족', '그러나', '내', '눈을', '감는', '실재', '오히', '보이',
  '암흑', '무수', '관념', '파편', '단', '하나', '기호', '계속', '생각', '아침',
  '도래', '밤의', '끝을', '의미', '사건', '그대로', '정숙', '적어', '위치', '시계',
  '학교', '장소', '이동', '시각', '생각', '어젯', '질서', '공포', '인간', '군집',
  '단', '마리', '개체', '불과', '고등어', '단발마',
  '휴대폰', '고등어', '무릎은', '영문', '액정', '우주와', '존재의', '미학을', '자의식', '방에는',
];

function pickRandomWords(bank, count) {
  const pool = [...bank];
  const picked = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return picked;
}

// slot 0 = 왼쪽 복제 컬럼, slot 1~8 = column8 -> column1 순서
const slotRowIds = [
  ['d1', 'd2', 'd3', 'd4', 'd5'],
  ['r36', 'r37', 'r38', 'r39', 'r40'],
  ['r31', 'r32', 'r33', 'r34', 'r35'],
  ['r26', 'r27', 'r28', 'r29', 'r30'],
  ['r21', 'r22', 'r23', 'r24', 'r25'],
  ['r16', 'r17', 'r18', 'r19', 'r20'],
  ['r11', 'r12', 'r13', 'r14', 'r15'],
  ['r6', 'r7', 'r8', 'r9', 'r10'],
  ['r1', 'r2', 'r3', 'r4', 'r5'],
];
const rowLabelClasses = ['dlabel', 't1label', 't2label', 't3label', 't4label'];
// d칸은 dlabel 하나뿐이라 rowLabelClasses를 slot별로 다르게 다룸
const slotElements = slotRowIds.map((ids, slotIdx) => {
  if (slotIdx === 0) {
    return ids.map((id) => document.querySelector(`.${id} .dlabel`));
  }
  const labelClasses = ['t1label', 't2label', 't3label', 't4label', 't5label'];
  return ids.map((id, i) => document.querySelector(`.${id} .${labelClasses[i]}`));
});

const initialWords = pickRandomWords(WORD_BANK, 5);
let pipeline = slotRowIds.map(() => initialWords);

function render() {
  pipeline.forEach((words, slotIdx) => {
    slotElements[slotIdx].forEach((el, i) => {
      if (el) el.textContent = words[i];
    });
  });
}
render();

setInterval(() => {
  for (let i = pipeline.length - 1; i >= 1; i--) {
    pipeline[i] = pipeline[i - 1];
  }
  pipeline[0] = pickRandomWords(WORD_BANK, 5);
  render();
}, 3000);
