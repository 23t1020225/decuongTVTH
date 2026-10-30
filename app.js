// Quản lý trạng thái và tương tác giao diện

let currentTab = 'chuyende';
let activeTopicIndex = 0;
let userAnswers = {};

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

// 4. GIAO DIỆN PHÒNG LUYỆN TẬP / TRẮC NGHIỆM
function renderQuizView(container) {
  const total = APP_DATA.quizQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;

  let questionsHtml = APP_DATA.quizQuestions.map((q, qIndex) => {
    const selectedOpt = userAnswers[q.id];
    const isAnswered = selectedOpt !== undefined;

    const optionsHtml = q.options.map((optText, optIdx) => {
      let optClass = 'quiz-opt p-3 rounded-xl text-xs sm:text-sm font-medium touch-target mb-2 flex items-start gap-2 bg-stone-50 dark:bg-stone-800/80';
      
      if (isAnswered) {
        optClass += ' answered';
        if (optIdx === q.correct) {
          optClass += ' correct';
        } else if (selectedOpt === optIdx) {
          optClass += ' incorrect';
        }
      }

      return `
        <button type="button" class="${optClass}" aria-pressed="${selectedOpt === optIdx}" ${isAnswered ? 'disabled' : ''} onclick="handleQuizAnswer(${q.id}, ${optIdx})">
          <span class="mt-0.5">${optText}</span>
        </button>
      `;
    }).join('');

    let explainBox = '';
    if (isAnswered) {
      const isRight = selectedOpt === q.correct;
      explainBox = `
        <div class="mt-3 p-3 rounded-lg text-xs sm:text-sm ${isRight ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 border border-rose-200 dark:border-rose-800'}">
          <p class="font-bold mb-1">${isRight ? '✓ Chính xác!' : '✕ Chưa chính xác!'}</p>
          <p>${q.explain}</p>
        </div>
      `;
    }

    return `
      <div class="content-card mb-4" id="quiz-card-${q.id}">
        <div class="flex items-center justify-between mb-2">
          <span class="badge badge-amber text-xs">${q.topic}</span>
          <span class="text-xs text-stone-500 font-medium">Câu ${qIndex + 1} / ${total}</span>
        </div>
        <h3 class="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mb-3">${q.question}</h3>
        <div class="options-container">
          ${optionsHtml}
        </div>
        ${explainBox}
      </div>
    `;
  }).join('');

  // Calculate score if completed
  let scoreBanner = '';
  if (answeredCount > 0) {
    let correctCount = 0;
    APP_DATA.quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correct) correctCount++;
    });
    const percentage = Math.round((correctCount / total) * 100);

    scoreBanner = `
      <div class="p-4 rounded-2xl bg-emerald-800 text-white mb-5 shadow-md flex items-center justify-between">
        <div>
          <span class="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Kết quả luyện tập</span>
          <h3 class="text-2xl font-extrabold mt-0.5">${correctCount} / ${total} câu đúng (${percentage}%)</h3>
          <p class="text-xs text-emerald-100 mt-1">Đã trả lời ${answeredCount}/${total} câu hỏi</p>
        </div>
        <button onclick="resetQuiz()" class="px-3.5 py-2 rounded-xl bg-white text-emerald-900 text-xs font-bold shadow hover:bg-emerald-50 touch-target">
          Làm lại
        </button>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="mb-4">
      <span class="badge badge-rose mb-1">Thực hành tương tác</span>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">Luyện tập và kiểm tra kiến thức</h2>
      <p class="text-xs text-stone-500 dark:text-stone-400 mt-1">Mỗi câu có một phương án đúng; một số lựa chọn sai chính tả được đưa vào có chủ ý để luyện nhận diện lỗi.</p>
      <p class="text-sm text-stone-600 dark:text-stone-400">Trả lời các câu hỏi để nhận phản hồi và giải thích tức thì</p>
    </div>

    ${scoreBanner}

    <div>
      ${questionsHtml}
    </div>
  `;
}

window.handleQuizAnswer = function(qId, optIdx) {
  if (userAnswers[qId] !== undefined) return; // Answered already
  userAnswers[qId] = optIdx;
  renderCurrentTab();
};

window.resetQuiz = function() {
  userAnswers = {};
  renderCurrentTab();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function setupSearch() {
  // Global search or handlers
}
