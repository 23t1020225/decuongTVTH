// Tách logic tạo đề khỏi giao diện để kiểm tra được bộ lọc, tính duy nhất và đáp án.
const QuizEngine = (() => {
  const templates = {
    chinhta: [
      () => 'Chọn cách viết phù hợp để điền vào chỗ trống.',
      () => 'Hoàn thành câu bằng phương án viết đúng và phù hợp ngữ cảnh.',
      () => 'Cách viết nào đúng trong ngữ cảnh dưới đây?'
    ],
    dongnghia: [
      word => `Từ hoặc cụm từ nào gần nghĩa nhất với “${word}” trong câu?`,
      word => `Chọn cách diễn đạt gần nghĩa nhất với “${word}” trong ngữ cảnh này.`,
      word => `Trong câu dưới đây, “${word}” gần nghĩa nhất với phương án nào?`
    ],
    trainghia: [
      word => `Từ nào trái nghĩa với “${word}” trong câu?`,
      word => `Chọn từ mang nghĩa đối lập với “${word}” trong ngữ cảnh này.`,
      word => `Trong câu dưới đây, từ nào đối lập về nghĩa với “${word}”?`
    ],
    hanviet: [
      word => `“${word}” có nghĩa là gì trong ngữ cảnh này?`,
      word => `Chọn lời giải nghĩa phù hợp nhất cho “${word}” trong câu.`,
      word => `Trong câu dưới đây, hiểu “${word}” theo cách nào là đúng?`
    ],
    danghia: [
      word => `Từ “${word}” trong câu được dùng với nghĩa nào?`,
      word => `Chọn nghĩa phù hợp của từ “${word}” theo ngữ cảnh.`,
      word => `Trong ngữ cảnh dưới đây, từ “${word}” chỉ điều gì?`
    ]
  };

  function shuffle(items, random = Math.random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function expand(bank) {
    return bank.topics.flatMap(topic => (bank.entries[topic.id] || []).flatMap(entry => {
      const [id, level, word, answer, distractors, explain, contexts] = entry;
      return contexts.map((context, index) => ({
        id: `${id}-${index + 1}`,
        entryId: id,
        topicId: topic.id,
        topic: topic.title,
        level,
        word,
        context: context.replaceAll('{word}', word).replaceAll('{blank}', '…'),
        answer,
        options: [answer, ...distractors],
        explain
      }));
    }));
  }

  function filter(questions, { topic = 'all', level = 'all' } = {}) {
    return questions.filter(q => (topic === 'all' || q.topicId === topic) &&
      (level === 'all' || q.level === level));
  }

  function createSession(questions, settings, random = Math.random) {
    const pool = filter(questions, settings);
    // Cùng một mục từ có thể xuất hiện ở ngữ cảnh khác; ưu tiên phủ hết mục từ
    // trước khi lấy ngữ cảnh thứ hai. Không tính đổi mẫu hỏi là một câu mới.
    const firstContexts = [];
    const otherContexts = [];
    const seenEntries = new Set();
    for (const question of shuffle(pool, random)) {
      if (seenEntries.has(question.entryId)) otherContexts.push(question);
      else {
        seenEntries.add(question.entryId);
        firstContexts.push(question);
      }
    }
    const requested = Number(settings.count);
    const count = Number.isInteger(requested) && requested > 0 ? requested : 10;
    const selected = shuffle([...firstContexts, ...otherContexts].slice(0, count), random);
    return {
      settings: { ...settings, count },
      available: pool.length,
      requestedCount: count,
      questions: selected.map(q => {
        const options = shuffle(q.options, random);
        const variants = templates[q.topicId];
        return {
          ...q,
          options,
          correct: options.indexOf(q.answer),
          question: variants[Math.floor(random() * variants.length)](q.word)
        };
      })
    };
  }

  function score(session, answers) {
    const answered = session.questions.filter(q => answers[q.id] !== undefined);
    const correct = answered.filter(q => answers[q.id] === q.correct).length;
    return {
      total: session.questions.length,
      answered: answered.length,
      correct,
      incorrect: answered.length - correct,
      completed: session.questions.length > 0 && answered.length === session.questions.length
    };
  }

  return { expand, filter, createSession, shuffle, score };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = QuizEngine;
