const test = require('node:test');
const assert = require('node:assert/strict');
const bank = require('../quiz-bank');
const engine = require('../quiz-engine');
const questions = engine.expand(bank);

function seededRandom(seed) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

test('ngân hàng: đủ 5 chủ đề, 3 mức độ, 300 ngữ cảnh và một đáp án mỗi câu', () => {
  assert.equal(bank.topics.length, 5);
  assert.equal(questions.length, 300);
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length);
  assert.equal(new Set(questions.map(q => `${q.topicId}:${q.context}`)).size, questions.length);
  const entryIds = new Set();
  for (const topic of bank.topics) {
    assert.equal(bank.entries[topic.id].length, 30);
    for (const entry of bank.entries[topic.id]) {
      assert.ok(!entryIds.has(entry[0]), entry[0]);
      entryIds.add(entry[0]);
      assert.equal(entry[6].length, 2);
    }
    for (const level of Object.keys(bank.levels)) {
      assert.equal(engine.filter(questions, { topic: topic.id, level }).length, 20);
    }
  }
  for (const q of questions) {
    assert.ok(bank.levels[q.level]);
    assert.ok(q.explain.trim().length > 20, q.id);
    assert.equal(q.options.length, 4, q.id);
    assert.equal(new Set(q.options.map(o => o.normalize('NFC').toLocaleLowerCase('vi'))).size, 4, q.id);
    assert.equal(q.options.filter(o => o === q.answer).length, 1, q.id);
    assert.doesNotMatch(q.context, /\{(?:word|blank)\}/, q.id);
    assert.ok(q.topicId === 'chinhta' ? q.context.includes('…') : q.context.includes(q.word), q.id);
    assert.ok(q.options.every(o => !/^[ABCD]\./.test(o)), q.id);
  }
});

test('mọi bộ lọc và số câu: đúng nội dung, đúng số lượng, không lặp ngữ cảnh', () => {
  for (const topic of ['all', ...bank.topics.map(t => t.id)]) {
    for (const level of ['all', ...Object.keys(bank.levels)]) {
      for (const count of [10, 20, 50]) {
        for (let seed = 1; seed <= 20; seed++) {
          const settings = { topic, level, count };
          const session = engine.createSession(questions, settings, seededRandom(seed));
          const available = engine.filter(questions, settings).length;
          assert.equal(session.available, available);
          assert.equal(session.questions.length, Math.min(count, available));
          assert.equal(new Set(session.questions.map(q => q.id)).size, session.questions.length);
          assert.equal(new Set(session.questions.map(q => q.context)).size, session.questions.length);
          for (const q of session.questions) {
            assert.ok(topic === 'all' || q.topicId === topic);
            assert.ok(level === 'all' || q.level === level);
            assert.equal(q.options[q.correct], q.answer);
          }
        }
      }
    }
  }
});

test('ưu tiên mục từ khác nhau trước khi lấy ngữ cảnh thứ hai', () => {
  const session = engine.createSession(questions, { topic: 'danghia', level: 'easy', count: 10 }, seededRandom(42));
  assert.equal(new Set(session.questions.map(q => q.entryId)).size, 10);
});

test('bộ lọc thiếu câu trả về toàn bộ câu sẵn có; bộ lọc rỗng không tạo câu giả', () => {
  const session = engine.createSession(questions, { topic: 'chinhta', level: 'hard', count: 50 });
  assert.equal(session.requestedCount, 50);
  assert.equal(session.available, 20);
  assert.equal(session.questions.length, 20);
  const empty = engine.createSession(questions, { topic: 'missing', level: 'all', count: 50 });
  assert.equal(empty.available, 0);
  assert.deepEqual(empty.questions, []);
  assert.equal(engine.score(empty, {}).completed, false);
});

test('đảo đáp án giữ đúng đáp án và không thay đổi ngân hàng hoặc lượt cũ', () => {
  const original = JSON.stringify(questions);
  const settings = { topic: 'all', level: 'all', count: 50 };
  const first = engine.createSession(questions, settings, seededRandom(1));
  const savedFirst = JSON.stringify(first);
  const second = engine.createSession(questions, settings, seededRandom(2));
  assert.equal(JSON.stringify(questions), original);
  assert.equal(JSON.stringify(first), savedFirst);
  assert.notDeepEqual(first.questions.map(q => q.id), second.questions.map(q => q.id));
  assert.equal(new Set(first.questions.map(q => q.correct)).size, 4);
  for (const q of second.questions) assert.equal(q.options[q.correct], q.answer);
});

test('mẫu câu hỏi thay đổi nhưng không làm tăng số ngữ cảnh trong ngân hàng', () => {
  const settings = { topic: 'dongnghia', level: 'easy', count: 50 };
  const first = engine.createSession(questions, settings, () => 0);
  const last = engine.createSession(questions, settings, () => 0.999999);
  assert.equal(first.questions.length, 20);
  assert.equal(last.questions.length, 20);
  assert.notEqual(first.questions[0].question, last.questions[0].question);
});

test('chấm điểm chỉ tính lượt hiện tại, phân biệt chưa làm và hoàn thành', () => {
  const session = engine.createSession(questions, { topic: 'all', level: 'all', count: 10 });
  const answers = { 'old-question': 0 };
  assert.deepEqual(engine.score(session, answers), { total: 10, answered: 0, correct: 0, incorrect: 0, completed: false });
  session.questions.forEach((q, index) => { answers[q.id] = index < 7 ? q.correct : (q.correct + 1) % 4; });
  assert.deepEqual(engine.score(session, answers), { total: 10, answered: 10, correct: 7, incorrect: 3, completed: true });
});
