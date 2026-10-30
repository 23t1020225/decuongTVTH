// Quản lý trạng thái và tương tác giao diện

let currentTab = 'chuyende';
let activeTopicIndex = 0;
let userAnswers = {};
const quizPool = QuizEngine.expand(QUIZ_BANK);
let quizSettings = { topic: 'all', level: 'all', count: 10 };
let quizSession = null;
let quizOnlyIncorrect = false;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupNavigation();
  renderCurrentTab();
  setupSearch();
});

// Chuyển đổi giao diện sáng / tối
function initTheme() {
  const savedTheme = localStorage.getItem('tvth_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', current);
      localStorage.setItem('tvth_theme', current);
      updateThemeIcon(current);
    });
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  if (theme === 'dark') {
    btn.innerHTML = `<svg class="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/></svg>`;
  } else {
    btn.innerHTML = `<svg class="w-5 h-5 text-stone-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>`;
  }
}

// Cài đặt điều hướng đồng bộ Desktop & Mobile
function setupNavigation() {
  const navButtons = document.querySelectorAll('[data-nav-target]');
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = btn.getAttribute('data-nav-target');
      switchTab(target);
    });
  });
}

function switchTab(tabId) {
  currentTab = tabId;
  
  // Cập nhật trạng thái active trên thanh điều hướng
  document.querySelectorAll('[data-nav-target]').forEach(b => {
    const isActive = b.getAttribute('data-nav-target') === tabId;
    if (isActive) {
      b.classList.add('active');
      b.setAttribute('aria-current', 'page');
    } else {
      b.classList.remove('active');
      b.removeAttribute('aria-current');
    }
  });

  renderCurrentTab();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render nội dung theo tab
function renderCurrentTab() {
  const container = document.getElementById('mainContentArea');
  if (!container) return;

  container.innerHTML = '';
  container.classList.remove('animate-fade-in');
  void container.offsetWidth; // Trigger reflow
  container.classList.add('animate-fade-in');

  switch (currentTab) {
    case 'chuyende':
      renderTopicsView(container);
      break;
    case 'decuong':
      renderSyllabusView(container);
      break;
    case 'tracuu':
      renderDictionaryView(container);
      break;
    case 'luyentap':
      renderQuizView(container);
      break;
    default:
      renderTopicsView(container);
  }
}

// 1. GIAO DIỆN 5 CHUYÊN ĐỀ
function renderTopicsView(container) {
  const currentTopic = APP_DATA.topics[activeTopicIndex];

  let topicNavPills = APP_DATA.topics.map((t, idx) => `
    <button onclick="changeActiveTopic(${idx})" 
      class="px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all touch-target flex items-center gap-1.5 ${
        idx === activeTopicIndex 
        ? 'bg-emerald-800 text-white shadow-sm' 
        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
      }">
      ${t.title}
    </button>
  `).join('');

  let sectionsHtml = currentTopic.sections.map(s => `
    <div class="content-card mb-4">
      <h3 class="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mb-3 border-b border-stone-200 dark:border-stone-700 pb-2 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-700 dark:bg-emerald-400"></span>
        ${s.heading}
      </h3>
      <div>${s.content}</div>
    </div>
  `).join('');

  container.innerHTML = `
    <!-- Top banner & Topic Selector -->
    <div class="mb-5">
      <div class="flex items-center justify-between mb-2">
        <span class="badge badge-green">${currentTopic.badge}</span>
        <span class="text-xs text-stone-500">Chuyên đề ${activeTopicIndex + 1} / 5</span>
      </div>
      <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-1">${currentTopic.title}</h2>
      <p class="text-sm text-stone-600 dark:text-stone-400">${currentTopic.tagline}</p>
      
      <!-- Horizontal scroll topic pills on mobile -->
      <div class="flex gap-2 overflow-x-auto py-3 no-scrollbar mt-2 border-b border-stone-200 dark:border-stone-800">
        ${topicNavPills}
      </div>
    </div>

    <!-- Sections of Current Topic -->
    <div class="space-y-4">
      ${sectionsHtml}
    </div>

    <!-- Quick Navigation to Next Topic -->
    <div class="flex justify-between items-center mt-6 pt-4 border-t border-stone-200 dark:border-stone-800">
      <button onclick="changeActiveTopic(${Math.max(0, activeTopicIndex - 1)})" 
        class="text-xs sm:text-sm font-medium px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 ${activeTopicIndex === 0 ? 'invisible' : ''}">
        ← Chuyên đề trước
      </button>
      <button onclick="changeActiveTopic(${Math.min(APP_DATA.topics.length - 1, activeTopicIndex + 1)})" 
        class="text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-800 text-white ${activeTopicIndex === APP_DATA.topics.length - 1 ? 'invisible' : ''}">
        Chuyên đề tiếp theo →
      </button>
    </div>
  `;
}

window.changeActiveTopic = function(idx) {
  activeTopicIndex = idx;
  renderCurrentTab();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 2. GIAO DIỆN ĐỀ CƯƠNG CHI TIẾT
function renderSyllabusView(container) {
  const closHtml = APP_DATA.clos.map(c => `
    <div class="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700">
      <div class="flex items-center justify-between mb-1">
        <span class="font-bold text-emerald-800 dark:text-emerald-400 text-sm">${c.code}</span>
        <span class="badge badge-amber text-xs">${c.bloom}</span>
      </div>
      <p class="text-xs sm:text-sm text-stone-700 dark:text-stone-300">${c.desc}</p>
    </div>
  `).join('');

  const methodsHtml = APP_DATA.teachingMethods.map(method => `
    <li class="text-sm text-stone-700 dark:text-stone-300">${method}</li>
  `).join('');

  const scheduleHtml = APP_DATA.courseSchedule.map(item => `
    <article class="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
        <h4 class="font-bold text-emerald-800 dark:text-emerald-300">Buổi ${item.session}: ${item.topic}</h4>
        <span class="badge badge-amber text-[11px]">${item.clos}</span>
      </div>
      <p class="text-sm text-stone-800 dark:text-stone-200">${item.content}</p>
      <p class="text-xs text-stone-600 dark:text-stone-400 mt-1"><strong>Hoạt động:</strong> ${item.activity}</p>
    </article>
  `).join('');

  const selfStudyHtml = APP_DATA.selfStudyPlan.map(item => `
    <article class="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
      <div class="flex items-center justify-between gap-2 mb-1">
        <h4 class="font-bold text-stone-900 dark:text-stone-100">${item.topic}</h4>
        <span class="badge badge-blue text-[11px]">${item.hours} giờ dự kiến</span>
      </div>
      <p class="text-xs text-stone-600 dark:text-stone-400">Sản phẩm: ${item.output}</p>
    </article>
  `).join('');

  const responsibilitiesHtml = APP_DATA.studentResponsibilities.map(item => `
    <li class="text-sm text-stone-700 dark:text-stone-300">${item}</li>
  `).join('');

  const referencesHtml = APP_DATA.references.map(item => `
    <li class="text-xs sm:text-sm text-stone-700 dark:text-stone-300">${item}</li>
  `).join('');

  const exercisesHtml = APP_DATA.sampleExercises.map(item => `
    <details class="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
      <summary class="font-bold text-stone-900 dark:text-stone-100 cursor-pointer">${item.title}</summary>
      <p class="text-sm text-stone-700 dark:text-stone-300 mt-2"><strong>Yêu cầu:</strong> ${item.prompt}</p>
      <p class="text-sm text-emerald-800 dark:text-emerald-300 mt-2"><strong>Gợi ý đáp án:</strong> ${item.answer}</p>
      <p class="text-xs text-stone-500 mt-2">Chuẩn đầu ra: ${item.clos}</p>
    </details>
  `).join('');

  container.innerHTML = `
    <div class="mb-5">
      <span class="badge badge-blue mb-1">Đề cương tham khảo</span>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">Đề cương chi tiết học phần</h2>
      <p class="text-sm text-stone-600 dark:text-stone-400">Mẫu tham khảo; cần đối chiếu mã học phần, số tín chỉ và quy định của cơ sở đào tạo.</p>
    </div>

    <!-- General Info Card -->
    <div class="content-card mb-5">
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
        <svg class="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Thông tin chung
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
        <div class="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800">
          <span class="text-stone-500">Tên học phần:</span>
          <p class="font-bold text-stone-800 dark:text-stone-200">${APP_DATA.generalInfo.courseName}</p>
        </div>
        <div class="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800">
          <span class="text-stone-500">Mã học phần:</span>
          <p class="font-bold text-stone-800 dark:text-stone-200">${APP_DATA.generalInfo.courseCode}</p>
        </div>
        <div class="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800">
          <span class="text-stone-500">Thời lượng và tín chỉ:</span>
          <p class="font-bold text-stone-800 dark:text-stone-200">${APP_DATA.generalInfo.credits}</p>
        </div>
        <div class="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800">
          <span class="text-stone-500">Đối tượng đào tạo:</span>
          <p class="font-bold text-stone-800 dark:text-stone-200">${APP_DATA.generalInfo.target}</p>
        </div>
        <div class="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800">
          <span class="text-stone-500">Đơn vị phụ trách:</span>
          <p class="font-bold text-stone-800 dark:text-stone-200">${APP_DATA.generalInfo.department}</p>
        </div>
        <div class="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800">
          <span class="text-stone-500">Giảng viên:</span>
          <p class="font-bold text-stone-800 dark:text-stone-200">${APP_DATA.generalInfo.instructor}</p>
        </div>
        <div class="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800">
          <span class="text-stone-500">Loại học phần:</span>
          <p class="font-bold text-stone-800 dark:text-stone-200">${APP_DATA.generalInfo.courseType}</p>
        </div>
        <div class="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800">
          <span class="text-stone-500">Học phần tiên quyết:</span>
          <p class="font-bold text-stone-800 dark:text-stone-200">${APP_DATA.generalInfo.prerequisite}</p>
        </div>
      </div>
    </div>

    <div class="content-card mb-5">
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">Mô tả học phần</h3>
      <p class="text-sm text-stone-700 dark:text-stone-300">${APP_DATA.generalInfo.description}</p>
    </div>

    <!-- CLOs Card -->
    <div class="content-card mb-5">
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
        <svg class="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Chuẩn đầu ra học phần (Course Learning Outcomes)
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${closHtml}
      </div>
    </div>

    <div class="content-card mb-5">
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">Phương pháp dạy và học</h3>
      <ul class="list-disc list-inside space-y-2">${methodsHtml}</ul>
    </div>

    <div class="content-card mb-5">
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">Kế hoạch dạy học: 10 buổi / 30 tiết</h3>
      <div class="space-y-3">${scheduleHtml}</div>
    </div>

    <div class="content-card mb-5">
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">Nhiệm vụ tự học dự kiến</h3>
      <p class="text-xs text-stone-500 mb-3">Phân bổ dưới đây là mẫu 60 giờ; cần điều chỉnh theo số tín chỉ và quy định của cơ sở đào tạo.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">${selfStudyHtml}</div>
    </div>

    <div class="content-card mb-5">
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">Nhiệm vụ người học</h3>
      <ul class="list-disc list-inside space-y-2">${responsibilitiesHtml}</ul>
    </div>

    <!-- Assessment Weights -->
    <div class="content-card mb-5">
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">Tỷ trọng và phương pháp đánh giá</h3>
      <div class="grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <span class="text-2xl sm:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">10%</span>
          <p class="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 mt-1">Chuyên cần</p>
          <span class="text-[11px] text-stone-500">Ý thức và bài tập</span>
        </div>
        <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
          <span class="text-2xl sm:text-3xl font-extrabold text-amber-800 dark:text-amber-400">30%</span>
          <p class="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 mt-1">Giữa kỳ</p>
          <span class="text-[11px] text-stone-500">Tự luận / Trắc nghiệm</span>
        </div>
        <div class="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
          <span class="text-2xl sm:text-3xl font-extrabold text-blue-800 dark:text-blue-400">60%</span>
          <p class="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 mt-1">Cuối kỳ</p>
          <span class="text-[11px] text-stone-500">Thi tổng hợp 90p</span>
        </div>
      </div>
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700 dark:text-stone-300">
        <p><strong>Giữa kỳ:</strong> bài viết 45 phút, tập trung chính tả và từ Hán Việt; có câu vận dụng theo ngữ cảnh.</p>
        <p><strong>Cuối kỳ:</strong> bài thực hành 90 phút, gồm nhận diện lỗi, giải thích, sửa câu/đoạn và chọn từ phù hợp.</p>
      </div>
      <div class="mt-4 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-xs text-stone-600 dark:text-stone-400">
        <strong>Rubric bài biên tập (10 điểm):</strong> nhận diện lỗi 3 điểm; giải thích căn cứ 3 điểm; sửa và đề xuất phương án 3 điểm; trình bày, chính tả 1 điểm.
      </div>
    </div>

    <div class="content-card mb-5">
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">Bài tập mẫu và đáp án gợi ý</h3>
      <p class="text-xs text-stone-500 mb-3">Mở từng mục để xem yêu cầu, đáp án và chuẩn đầu ra liên quan.</p>
      <div class="space-y-3">${exercisesHtml}</div>
    </div>

    <div class="content-card mb-5">
      <h3 class="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">Học liệu và tài liệu tham khảo</h3>
      <ol class="list-decimal list-inside space-y-2">${referencesHtml}</ol>
      <p class="text-xs text-stone-500 mt-3">Cần xác nhận ấn bản/tài liệu bắt buộc và phạm vi văn bản quy phạm theo yêu cầu của cơ sở đào tạo.</p>
    </div>

    <!-- Download / Print Action Button -->
    <div class="text-center pt-2">
      <button onclick="window.print()" class="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold shadow hover:opacity-90 inline-flex items-center gap-2 touch-target">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
        In / Xuất đề cương PDF
      </button>
    </div>
  `;
}

// 3. GIAO DIỆN TRA CỨU & SOÁT TỪ DỄ SAI
function renderDictionaryView(container) {
  container.innerHTML = `
    <div class="mb-5">
      <span class="badge badge-amber mb-1">Cẩm nang tra cứu</span>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">Tra cứu từ vựng và soát lỗi chính tả</h2>
      <p class="text-sm text-stone-600 dark:text-stone-400">Tìm kiếm nhanh các từ ngữ Hán Việt và chính tả thường bị nhầm lẫn</p>
      
      <!-- Search Input Box -->
      <div class="relative mt-4">
        <input type="text" id="dictSearchInput" placeholder="Nhập từ cần tra (VD: yếu điểm, bàng quan, súc tích...)" 
          class="w-full px-4 py-3 pl-11 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 touch-target shadow-sm">
        <svg class="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      </div>
    </div>

    <!-- Search Results / Cards Container -->
    <div id="dictCardsGrid" class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
      <!-- Generated via JS -->
    </div>
  `;

  renderFilteredDictionary('');

  const searchInput = document.getElementById('dictSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderFilteredDictionary(e.target.value);
    });
  }
}

function renderFilteredDictionary(query) {
  const grid = document.getElementById('dictCardsGrid');
  if (!grid) return;

  const normalized = query.toLowerCase().trim();
  const filtered = APP_DATA.quickDictionary.filter(item => 
    item.word.toLowerCase().includes(normalized) ||
    item.correct.toLowerCase().includes(normalized) ||
    item.wrong.toLowerCase().includes(normalized) ||
    item.note.toLowerCase().includes(normalized)
  );

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-stone-500">
        <p class="text-base font-semibold">Không tìm thấy từ ngữ phù hợp</p>
        <p class="text-xs mt-1">Hãy thử tìm các từ: <em>yếu điểm, cứu cánh, bàng quan, súc tích...</em></p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="content-card flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-base font-bold text-stone-900 dark:text-stone-100">${item.word}</h4>
          <span class="badge badge-green text-xs">Chuẩn</span>
        </div>
        <div class="space-y-1.5 text-xs sm:text-sm">
          <p class="text-emerald-700 dark:text-emerald-400 font-medium">
            <span class="text-stone-500">Đúng:</span> ${item.correct}
          </p>
          <p class="text-rose-600 dark:text-rose-400">
            <span class="text-stone-500">Hay nhầm thành:</span> ${item.wrong}
          </p>
        </div>
      </div>
      <div class="mt-3 pt-2.5 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
        <span class="font-semibold text-stone-700 dark:text-stone-300">💡 Giải thích:</span> ${item.note}
      </div>
    </div>
  `).join('');
}

// 4. PHÒNG LUYỆN TẬP: ngân hàng ngữ cảnh + mẫu hỏi, hoạt động hoàn toàn cục bộ.
function escapeQuizText(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function renderQuizView(container) {
  const selectOptions = (items, selected) => items.map(([value, title]) =>
    `<option value="${value}" ${String(selected) === value ? 'selected' : ''}>${title}</option>`).join('');
  container.innerHTML = `
    <div class="mb-5">
      <span class="badge badge-rose mb-2">Thực hành tương tác</span>
      <h2 class="text-2xl sm:text-3xl font-extrabold">Phòng luyện tập</h2>
      <p class="quiz-muted mt-2">Chọn nội dung muốn ôn, tạo một đề mới và học từ lời giải sau mỗi câu.</p>
    </div>
    <section class="content-card quiz-setup mb-5" aria-labelledby="quizSetupTitle">
      <div class="quiz-setup-heading">
        <div>
          <h3 id="quizSetupTitle" class="text-lg font-bold">Tạo lượt luyện tập</h3>
          <p class="quiz-muted text-sm mt-1">${quizPool.length} ngữ cảnh · 5 chủ đề · 3 mức độ</p>
        </div>
        <span class="badge badge-green">Mỗi lượt một đề mới</span>
      </div>
      <form id="quizSetupForm" onsubmit="startQuiz(event)">
        <div class="quiz-controls">
          <div class="quiz-control"><label for="quizTopic">Chủ đề</label>
            <select id="quizTopic" name="topic" onchange="updateQuizSettings()">
              ${selectOptions([['all', 'Tổng hợp 5 chủ đề'], ...QUIZ_BANK.topics.map(t => [t.id, t.title])], quizSettings.topic)}
            </select>
          </div>
          <div class="quiz-control"><label for="quizLevel">Mức độ</label>
            <select id="quizLevel" name="level" onchange="updateQuizSettings()">
              ${selectOptions([['all', 'Trộn các mức độ'], ...Object.entries(QUIZ_BANK.levels)], quizSettings.level)}
            </select>
          </div>
          <div class="quiz-control"><label for="quizCount">Số câu</label>
            <select id="quizCount" name="count" onchange="updateQuizSettings()">
              ${selectOptions(['10', '20', '50'].map(n => [n, `${n} câu`]), quizSettings.count)}
            </select>
          </div>
        </div>
        <p id="quizAvailability" class="quiz-availability text-sm" role="status" aria-live="polite"></p>
        <div class="quiz-setup-actions">
          <button id="quizStartButton" type="submit" class="quiz-primary"></button>
          <p class="quiz-muted text-xs">Câu hỏi và đáp án được trộn lại. Không lặp câu trong cùng lượt.</p>
        </div>
      </form>
    </section>
    <div id="quizSessionArea">
      ${quizSession ? renderQuizSession() : `
        <div class="quiz-welcome content-card">
          <span class="quiz-welcome-mark" aria-hidden="true">Aa</span>
          <h3 class="text-lg font-bold mt-3">Mỗi ngày một chút, dùng từ vững hơn</h3>
          <p class="quiz-muted text-sm mt-2">Bắt đầu với 10 câu tổng hợp hoặc chọn một chủ đề để luyện kĩ hơn.</p>
          <ol class="quiz-steps">
            <li><span>1</span>Chọn chủ đề và mức độ</li>
            <li><span>2</span>Trả lời từng câu theo ngữ cảnh</li>
            <li><span>3</span>Đọc lời giải và ôn lại câu sai</li>
          </ol>
        </div>`}
    </div>`;
  updateQuizAvailability();
}

window.updateQuizSettings = function() {
  quizSettings = {
    topic: document.getElementById('quizTopic').value,
    level: document.getElementById('quizLevel').value,
    count: Number(document.getElementById('quizCount').value)
  };
  updateQuizAvailability();
};

function updateQuizAvailability() {
  const available = QuizEngine.filter(quizPool, quizSettings).length;
  const count = Math.min(quizSettings.count, available);
  const message = document.getElementById('quizAvailability');
  const button = document.getElementById('quizStartButton');
  if (!message || !button) return;
  message.classList.toggle('quiz-notice', available < quizSettings.count);
  message.textContent = available === 0
    ? 'Chưa có câu hỏi cho bộ lọc này. Hãy chọn chủ đề hoặc mức độ khác.'
    : available < quizSettings.count
      ? `Bộ lọc này có ${available} câu. Lượt luyện tập sẽ dùng toàn bộ ${count} câu, không lặp để đủ ${quizSettings.count} câu.`
      : `Có ${available} câu phù hợp. Đề sẽ chọn ngẫu nhiên ${count} câu.`;
  button.disabled = count === 0;
  button.textContent = quizSession ? `Tạo đề mới · ${count} câu` : `Bắt đầu · ${count} câu`;
}

window.startQuiz = function(event) {
  if (event) event.preventDefault();
  updateQuizSettings();
  const session = QuizEngine.createSession(quizPool, quizSettings);
  if (!session.questions.length) return;
  quizSession = session;
  userAnswers = {};
  quizOnlyIncorrect = false;
  document.getElementById('quizSessionArea').innerHTML = renderQuizSession();
  updateQuizAvailability();
  document.getElementById('quizSessionTitle').focus({ preventScroll: true });
  document.getElementById('quizSessionArea').scrollIntoView({ behavior: 'instant', block: 'start' });
};

function renderQuizSession() {
  const { settings, questions } = quizSession;
  const topic = QUIZ_BANK.topics.find(t => t.id === settings.topic)?.title || 'Tổng hợp 5 chủ đề';
  const level = QUIZ_BANK.levels[settings.level] || 'Trộn các mức độ';
  return `
    <section aria-labelledby="quizSessionTitle">
      <div class="quiz-session-heading mb-3">
        <h3 id="quizSessionTitle" class="text-lg font-bold" tabindex="-1">Lượt luyện tập hiện tại</h3>
        <span class="quiz-muted text-sm">${topic} · ${level} · ${questions.length} câu</span>
      </div>
      ${questions.length < quizSession.requestedCount ? `<p class="quiz-notice text-sm mb-3">Đang luyện ${questions.length}/${quizSession.requestedCount} câu đã chọn vì bộ lọc chỉ có ${questions.length} câu khác nhau.</p>` : ''}
      <div id="quizProgressRegion" aria-live="polite" aria-atomic="true">${renderQuizProgress()}</div>
      <div id="quizReviewControls">${renderQuizReviewControls()}</div>
      <div id="quizQuestions">${questions.map((q, index) => renderQuizQuestion(q, index, questions.length)).join('')}</div>
    </section>`;
}

function renderQuizProgress() {
  const result = QuizEngine.score(quizSession, userAnswers);
  const progress = Math.round(result.answered / result.total * 100);
  return `
    <div class="quiz-progress content-card mb-4">
      <div class="quiz-session-heading">
        <div>
          <p class="quiz-muted text-xs">${result.completed ? 'Đã hoàn thành lượt luyện tập' : 'Tiến độ luyện tập'}</p>
          <p class="font-bold text-lg">${result.correct} câu đúng · ${result.incorrect} câu sai</p>
        </div>
        <span class="quiz-muted text-sm">Đã trả lời ${result.answered}/${result.total}</span>
      </div>
      <progress class="quiz-progress-bar" value="${result.answered}" max="${result.total}" aria-label="Tiến độ trả lời">${progress}%</progress>
      ${result.completed ? `<p class="quiz-muted text-sm mt-2">Kết quả: <strong>${result.correct}/${result.total} câu đúng (${Math.round(result.correct / result.total * 100)}%)</strong>. ${result.incorrect ? 'Đọc lại lời giải của các câu sai để củng cố kiến thức.' : 'Bạn đã trả lời đúng tất cả các câu!'}</p>` : ''}
    </div>`;
}

function renderQuizReviewControls() {
  const result = QuizEngine.score(quizSession, userAnswers);
  if (!result.completed) return '';
  return `<div class="quiz-review-actions mb-4">
    ${result.incorrect ? `<button id="quizReviewButton" type="button" class="quiz-secondary" aria-pressed="${quizOnlyIncorrect}" onclick="toggleQuizReview()">${quizOnlyIncorrect ? 'Xem tất cả câu hỏi' : `Ôn lại ${result.incorrect} câu sai`}</button>` : ''}
    <button type="button" class="quiz-secondary" onclick="resetQuiz()">Tạo đề khác cùng lựa chọn</button>
  </div>`;
}

function renderQuizQuestion(q, index, total) {
  const selected = userAnswers[q.id];
  const answered = selected !== undefined;
  const right = selected === q.correct;
  const hidden = quizOnlyIncorrect && right;
  const options = q.options.map((text, optionIndex) => {
    const state = answered ? ` answered${optionIndex === q.correct ? ' correct' : selected === optionIndex ? ' incorrect' : ''}` : '';
    return `<button type="button" class="quiz-opt quiz-answer${state}" aria-pressed="${selected === optionIndex}" ${answered ? 'disabled' : ''} onclick="handleQuizAnswer('${q.id}', ${optionIndex})">
      <span class="quiz-option-letter" aria-hidden="true">${String.fromCharCode(65 + optionIndex)}</span>
      <span>${escapeQuizText(text)}${answered && optionIndex === q.correct ? '<span class="quiz-answer-note"> ✓ Đáp án đúng</span>' : answered && selected === optionIndex ? '<span class="quiz-answer-note"> ✕ Bạn đã chọn</span>' : ''}</span>
    </button>`;
  }).join('');
  return `<article class="content-card quiz-question mb-4" id="quiz-card-${q.id}" ${hidden ? 'hidden' : ''} aria-labelledby="quiz-title-${q.id}">
    <div class="quiz-session-heading mb-3">
      <div class="quiz-question-badges"><span class="badge badge-amber">${q.topic}</span><span class="quiz-level">${QUIZ_BANK.levels[q.level]}</span></div>
      <span class="quiz-muted text-xs">Câu ${index + 1}/${total}</span>
    </div>
    <h4 id="quiz-title-${q.id}" class="font-bold text-base mb-3">${escapeQuizText(q.question)}</h4>
    <blockquote class="quiz-context">${escapeQuizText(q.context)}</blockquote>
    <div class="options-container">${options}</div>
    ${answered ? `<div id="quiz-feedback-${q.id}" class="quiz-feedback ${right ? 'quiz-feedback-correct' : 'quiz-feedback-incorrect'}" tabindex="-1">
      <p class="font-bold mb-1">${right ? '✓ Chính xác!' : '✕ Chưa chính xác.'}</p>
      ${!right ? `<p class="mb-1">Bạn chọn: <strong>${escapeQuizText(q.options[selected])}</strong></p>` : ''}
      <p class="mb-1">Đáp án đúng: <strong>${String.fromCharCode(65 + q.correct)}. ${escapeQuizText(q.options[q.correct])}</strong></p>
      <p>${escapeQuizText(q.explain)}</p>
    </div>` : ''}
  </article>`;
}

window.handleQuizAnswer = function(qId, optIdx) {
  const index = quizSession ? quizSession.questions.findIndex(q => q.id === qId) : -1;
  if (index < 0 || userAnswers[qId] !== undefined) return;
  const question = quizSession.questions[index];
  if (!Number.isInteger(optIdx) || optIdx < 0 || optIdx >= question.options.length) return;
  userAnswers[qId] = optIdx;
  // Chỉ cập nhật câu vừa trả lời để giữ nguyên vị trí cuộn trang.
  document.getElementById(`quiz-card-${qId}`).outerHTML = renderQuizQuestion(question, index, quizSession.questions.length);
  document.getElementById('quizProgressRegion').innerHTML = renderQuizProgress();
  document.getElementById('quizReviewControls').innerHTML = renderQuizReviewControls();
  document.getElementById(`quiz-feedback-${qId}`).focus({ preventScroll: true });
};

window.toggleQuizReview = function() {
  quizOnlyIncorrect = !quizOnlyIncorrect;
  document.getElementById('quizQuestions').innerHTML = quizSession.questions.map((q, i) => renderQuizQuestion(q, i, quizSession.questions.length)).join('');
  document.getElementById('quizReviewControls').innerHTML = renderQuizReviewControls();
  document.getElementById('quizReviewButton').focus({ preventScroll: true });
};

window.resetQuiz = function() {
  if (!quizSession) return;
  // Dùng lựa chọn của lượt hiện tại, kể cả khi bộ lọc trên form đã được sửa.
  quizSettings = { ...quizSession.settings };
  quizSession = QuizEngine.createSession(quizPool, quizSettings);
  userAnswers = {};
  quizOnlyIncorrect = false;
  renderCurrentTab();
  document.getElementById('quizSessionTitle').focus({ preventScroll: true });
  document.getElementById('quizSessionArea').scrollIntoView({ behavior: 'instant', block: 'start' });
};

function setupSearch() {
  // Global search or handlers
}
