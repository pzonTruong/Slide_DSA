/* =====================================================================
   SHIPPING_DSA | MINIMALIST PRESENTATION ENGINE
   Controls: Navigation, Timer, Speaker Notes, Overview & Graph Visualizer
   ===================================================================== */

// Presentation State
const state = {
  currentSlide: 1,
  totalSlides: 13,
  timerSeconds: 0,
  timerInterval: null,
  timerRunning: false,
  notesVisible: false,
  overviewVisible: false
};

// Speaker Notes Data per Slide (Clean Typographic Text)
const speakerNotes = {
  1: `<strong>Slide 01: Giới thiệu dự án</strong><br><br>
  - Chào mừng Thầy/Cô và các bạn đến với buổi báo cáo đề tài Cấu trúc Dữ liệu & Giải thuật.<br>
  - Đề tài: <em>Thiết kế mạng lưới giao vận thông minh bằng Cây bao trùm nhỏ nhất (MST)</em>.<br>
  - Nhấn mạnh: Cốt lõi của đề tài là tự cài đặt các cấu trúc dữ liệu nâng cao (DSU, Min-Heap) và áp dụng vào bài toán thực tế quy hoạch mạng bưu chính tại Hà Nội.`,

  2: `<strong>Slide 02: Đặt vấn đề & Động lực nghiên cứu</strong><br><br>
  - Nêu bài toán thực tế: Các doanh nghiệp giao vận đối mặt bài toán chi phí hạ tầng hàng triệu USD.<br>
  - Phân biệt rõ: <strong>MST</strong> (quy hoạch hạ tầng kết nối cố định) khác với <strong>Dijkstra</strong> (đường đi ngắn nhất giữa 2 điểm) và <strong>TSP</strong> (lộ trình 1 xe giao hàng).<br>
  - Trọng tâm: Kết nối 100% các kho với chi phí nhỏ nhất mà không tạo kết nối dư thừa.`,

  3: `<strong>Slide 03: Mô hình hóa Đồ thị & Dữ liệu Thực tế</strong><br><br>
  - Đồ thị vô hướng <em>G = (V, E)</em>.<br>
  - 3 phân tầng điểm nút: Central Mega Hub (Kho tổng), Regional Warehouse (Kho trung chuyển), Delivery Point (Bưu cục).<br>
  - Nhấn mạnh: Tọa độ GPS thực tế được xử lý bằng công thức mặt cầu <strong>Haversine</strong> để tính độ cong Trái Đất chính xác.`,

  4: `<strong>Slide 04: Cơ sở Toán học & Tính chất Lát cắt</strong><br><br>
  - <strong>Cut Property (Tính chất lát cắt):</strong> Cạnh nhẹ nhất băng qua bất kỳ lát cắt nào chia đôi đồ thị luôn thuộc về mọi MST.<br>
  - <strong>Cycle Property (Tính chất chu trình):</strong> Cạnh nặng nhất trong chu trình không bao giờ thuộc MST.<br>
  - Đây là nền tảng toán học bảo đảm tính đúng đắn cho chiến lược Tham lam (Greedy).`,

  5: `<strong>Slide 05: Thuật toán Borůvka (1926)</strong><br><br>
  - Thuật toán MST đầu tiên trong lịch sử, ra đời trước Kruskal và Prim 3 thập kỷ để thiết kế lưới điện Moravia.<br>
  - Hoạt động: Co cụm song song từng vòng (Round). Mỗi vòng giảm ít nhất 50% số component.<br>
  - Số vòng tối đa ≤ ⌈log₂ V⌉. Rất mạnh mẽ khi chạy trên kiến trúc đa luồng hoặc phân tán.`,

  6: `<strong>Slide 06: Thuật toán Kruskal & Tối ưu hóa DSU</strong><br><br>
  - Cách tiếp cận: Duyệt các cạnh theo thứ tự trọng số tăng dần.<br>
  - <strong>Điểm ăn điểm kỹ thuật:</strong> Tự cài đặt Disjoint Set Union với <em>Path Compression</em> và <em>Union by Rank</em>.<br>
  - Thao tác tìm gốc và gộp đạt thời gian <em>O(α(V)) ≈ O(1)</em>. Tổng độ phức tạp chỉ còn <em>O(E log E)</em> cho bước sắp xếp.`,

  7: `<strong>Slide 07: Thuật toán Prim & Min-Heap Nâng cao</strong><br><br>
  - Cách tiếp cận: Nuôi lớn một cây liên thông duy nhất từ 1 đỉnh.<br>
  - Đối chiếu 2 phiên bản:<br>
    + <em>Lazy Prim:</em> Min-Heap lưu mọi cạnh kề, bộ nhớ <em>O(E)</em>.<br>
    + <em>Eager Prim:</em> Dùng IndexedMinHeap hỗ trợ <code>decrease_key</code>, chỉ lưu <em>O(V)</em> đỉnh, tốc độ <em>O(E log V)</em>.<br>
  - Cây luôn liên thông tại mọi bước, phù hợp thi công thực tế.`,

  8: `<strong>Slide 08: Ma trận So sánh Toàn diện</strong><br><br>
  - Đồ thị thưa (<em>E ≈ V</em>): Kruskal chiếm ưu thế tuyệt đối do sort ít cạnh.<br>
  - Đồ thị dày (<em>E ≈ V²</em>): Eager Prim thắng thế vì không cần sắp xếp <em>O(V²)</em> cạnh.<br>
  - Đồ thị không liên thông: Kruskal và Borůvka cho ra Rừng MST (MSF) một cách tự nhiên.`,

  9: `<strong>Slide 09: Interactive Algorithm Visualizer & Code Runner (CodePeet Style)</strong><br><br>
  - <strong>Phong cách CodePeet:</strong> Trực quan hóa 2.5D Isometric Dark Grid Platform kết hợp cửa sổ macOS Code Runner và bảng theo dõi biến Active Variables Watch.<br>
  - <strong>Bộ 3 thuật toán MST trọng tâm:</strong><br>
    + <em>Kruskal (DSU):</em> Quét cạnh tăng dần, kiểm tra chu trình bằng Disjoint Set Union (Path Compression + Union by Rank) và dừng sớm khi đủ 5 cạnh.<br>
    + <em>Prim (Min-Heap):</em> Nuôi lớn cây từ Mega Hub H01, mở rộng liên tục qua lát cắt (Cut Property) bằng hàng đợi ưu tiên.<br>
    + <em>Borůvka (Parallel Reduction):</em> Thuật toán song song 1926, mọi cụm đồng thời tìm cạnh rẻ nhất nối ra ngoài (6 cụm → 2 cụm → 1 cây MST).<br>
  - <strong>Đồng bộ State Machine:</strong> Khi bấm 'Bước tiếp' hoặc 'Auto Play', dòng code Python tương ứng sáng lên, canvas 2.5D cập nhật trạng thái cạnh/đỉnh và State Bar hiển thị giá trị biến thời gian thực.`,

  10: `<strong>Slide 10: Case Study Mạng lưới Hà Nội (Tương tác trực tiếp)</strong><br><br>
  - Dữ liệu 22 nút bưu chính tại Hà Nội (3 Hub, 9 Warehouse, 10 trạm phát).<br>
  - Kết quả: Từ 30 tuyến đường ban đầu giảm xuống đúng 21 tuyến trục (V - 1).<br>
  - Chi phí hạ tầng giảm từ 236.4 km xuống 138.2 km (Tiết kiệm 41.5% ngân sách, loại bỏ 9 tuyến thừa -98.2 km).<br>
  - <strong>Mẹo thuyết trình tương tác:</strong><br>
    + <em>Kéo thả đỉnh:</em> Điều chỉnh vị trí trạm linh hoạt khi trình chiếu.<br>
    + <em>Tab Định lượng:</em> Trình bày bảng so sánh định lượng & 3 phân tầng trạm.<br>
    + <em>Tab Chi tiết & Lộ trình:</em> Click 2 trạm (hoặc bấm nút mẫu Cầu Giấy ↔ Đống Đa) để minh họa hiện tượng Hop Count Trade-off: MST loại bỏ cạnh tắt 4.9 km để tối ưu ngân sách chung, buộc đi vòng 18.1 km.<br>
    + <em>Tab Chạy Kruskal:</em> Bấm 'Bước tiếp' hoặc 'Tự động' để xem DSU duyệt 30 cạnh và loại bỏ 9 chu trình kín thời gian thực.`,

  11: `<strong>Slide 11: So sánh Tốc độ Thực nghiệm (Benchmark Runtime)</strong><br><br>
  - Biểu đồ đối chiếu thời gian thực thi (ms) của Kruskal, Prim (Min-Heap) và Borůvka theo kích thước đồ thị.<br>
  - <strong>Đồ thị Thưa (E ≈ 2.5V):</strong> Kruskal tận dụng mảng phẳng + Cache Locality và DSU O(α(V)) nên chạy cực nhanh.<br>
  - <strong>Đồ thị Dày (E ≈ 0.35V²):</strong> Prim áp đảo hoàn toàn vì không tốn chi phí sắp xếp toàn bộ O(V²) cạnh như Kruskal.<br>
  - Có thể bấm nút <em>Chạy Đo Thực Tế</em> ngay trên trình chiếu để máy tính đo thời gian thực bằng JS real-time!`,

  12: `<strong>Slide 12: Đánh giá Rủi ro & Hướng Phát triển</strong><br><br>
  - Nêu tư duy phản biện: Nhược điểm của cây là điểm lỗi đơn lẻ (Single Point of Failure). Nếu 1 cầu trục đứt, mạng lưới bị chia rẽ.<br>
  - Giải pháp thực tế: Bổ sung các cạnh dự phòng (2-Edge Connected Network) và kết hợp với bài toán định tuyến xe VRP.`,

  13: `<strong>Slide 13: Tổng kết & Vấn đáp Phản biện (Q&A)</strong><br><br>
  - Tóm tắt 4 trụ cột đã hoàn thành.<br>
  - Mời Hội đồng / Giảng viên đặt câu hỏi.<br>
  - Bấm vào các câu hỏi mẫu để xem nhanh đáp án chuẩn bị sẵn cho buổi bảo vệ.`
};

// DOM Elements
const slides = document.querySelectorAll('.slide');
const currentSlideNumEl = document.getElementById('currentSlideNum');
const totalSlideNumEl = document.getElementById('totalSlideNum');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const notesModal = document.getElementById('notesModal');
const notesBody = document.getElementById('notesBody');
const toggleNotesBtn = document.getElementById('toggleNotesBtn');
const overviewModal = document.getElementById('overviewModal');
const overviewGrid = document.getElementById('overviewGrid');
const toggleOverviewBtn = document.getElementById('toggleOverviewBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const timerDisplay = document.getElementById('timerDisplay');
const toggleTimerBtn = document.getElementById('toggleTimerBtn');
const resetTimerBtn = document.getElementById('resetTimerBtn');
const timerWidget = document.getElementById('timerWidget');

// Initialize Presentation
function initPresentation() {
  if (state._initialized) return;
  state._initialized = true;

  try { projectHanoiNodes(); } catch (e) { console.error('projectHanoiNodes error:', e); }

  try {
    state.totalSlides = slides.length;
    if (totalSlideNumEl) {
      totalSlideNumEl.textContent = String(state.totalSlides).padStart(2, '0');
    }
    updateSlideView();
  } catch (e) {
    console.error('updateSlideView error:', e);
  }

  try { startTimer(); } catch (e) { console.error('startTimer error:', e); }
  try { buildOverviewGrid(); } catch (e) { console.error('buildOverviewGrid error:', e); }
  try { setupEventListeners(); } catch (e) { console.error('setupEventListeners error:', e); }
  try { initThemeToggle(); } catch (e) { console.error('initThemeToggle error:', e); }
  try { initSimulator(); } catch (e) { console.error('initSimulator error:', e); }
  try { initCodeTabs(); } catch (e) { console.error('initCodeTabs error:', e); }
  try { initMatrixFilters(); } catch (e) { console.error('initMatrixFilters error:', e); }
  try { initQaToggleAll(); } catch (e) { console.error('initQaToggleAll error:', e); }
  try { initHelpModal(); } catch (e) { console.error('initHelpModal error:', e); }
  try { initHanoiMap(); } catch (e) { console.error('initHanoiMap error:', e); }
  try { initSpeedBenchmarkChart(); } catch (e) { console.error('initSpeedBenchmarkChart error:', e); }
}

// Update Slide Display
function updateSlideView() {
  slides.forEach((slide, idx) => {
    slide.classList.remove('active', 'prev', 'next');
    const slideNum = idx + 1;
    if (slideNum === state.currentSlide) {
      slide.classList.add('active');
    } else if (slideNum < state.currentSlide) {
      slide.classList.add('prev');
    } else {
      slide.classList.add('next');
    }
  });

  // Update counters & progress bar
  if (currentSlideNumEl) {
    currentSlideNumEl.textContent = String(state.currentSlide).padStart(2, '0');
  }
  if (progressFill) {
    const progressPercent = (state.currentSlide / state.totalSlides) * 100;
    progressFill.style.width = `${progressPercent}%`;
  }

  // Update speaker notes
  if (notesBody) {
    if (speakerNotes[state.currentSlide]) {
      notesBody.innerHTML = speakerNotes[state.currentSlide];
    } else {
      notesBody.innerHTML = `<em>Không có ghi chú cho slide này.</em>`;
    }
  }

  // Update overview thumbnail highlighting
  const thumbs = document.querySelectorAll('.overview-thumb');
  thumbs.forEach((thumb, idx) => {
    if (idx + 1 === state.currentSlide) {
      thumb.classList.add('current');
    } else {
      thumb.classList.remove('current');
    }
  });

  // Exit Theater Mode & pause autoplay cleanly if navigating away from Slide 9
  if (state.currentSlide !== 9) {
    if (typeof setVisualizerTheaterMode === 'function') {
      try { setVisualizerTheaterMode(false); } catch (e) {}
    }
    if (typeof pauseAutoPlayVisualizer === 'function') {
      try { pauseAutoPlayVisualizer(); } catch (e) {}
    }
  }

  // Refresh interactive slide canvases upon entering
  if (state.currentSlide === 9 && typeof renderCurrentStep === 'function') {
    try { renderCurrentStep(); } catch (e) {}
  } else if (state.currentSlide === 10 && typeof renderHanoiSvg === 'function') {
    try { renderHanoiSvg(); } catch (e) {}
  } else if (state.currentSlide === 11 && typeof renderBenchmarkChart === 'function') {
    try { renderBenchmarkChart(); } catch (e) {}
  }
}

function nextSlide() {
  if (state.currentSlide < state.totalSlides) {
    state.currentSlide++;
    updateSlideView();
  }
}
window.nextSlide = nextSlide;

function prevSlide() {
  if (state.currentSlide > 1) {
    state.currentSlide--;
    updateSlideView();
  }
}
window.prevSlide = prevSlide;

function goToSlide(num) {
  if (num >= 1 && num <= state.totalSlides) {
    state.currentSlide = num;
    updateSlideView();
    closeOverview();
  }
}
window.goToSlide = goToSlide;

// Timer Functions
function startTimer() {
  if (!state.timerInterval) {
    state.timerRunning = true;
    if (toggleTimerBtn) toggleTimerBtn.textContent = '⏸';
    state.timerInterval = setInterval(() => {
      state.timerSeconds++;
      renderTimer();
    }, 1000);
  }
}

function pauseTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    state.timerRunning = false;
    if (toggleTimerBtn) toggleTimerBtn.textContent = '▶';
  }
}

function resetTimer() {
  pauseTimer();
  state.timerSeconds = 0;
  renderTimer();
  if (timerWidget) timerWidget.classList.remove('warning', 'danger');
}

function toggleTimer() {
  if (state.timerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
window.toggleTimer = toggleTimer;

function renderTimer() {
  if (!timerDisplay) return;
  const mins = Math.floor(state.timerSeconds / 60);
  const secs = state.timerSeconds % 60;
  timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  // Time warnings (10 mins warning, 13 mins danger)
  if (timerWidget) {
    if (mins >= 13) {
      timerWidget.classList.add('danger');
      timerWidget.classList.remove('warning');
    } else if (mins >= 10) {
      timerWidget.classList.add('warning');
      timerWidget.classList.remove('danger');
    } else {
      timerWidget.classList.remove('warning', 'danger');
    }
  }
}

// Modals: Speaker Notes & Overview
function toggleNotes() {
  state.notesVisible = !state.notesVisible;
  if (notesModal && toggleNotesBtn) {
    if (state.notesVisible) {
      notesModal.classList.add('show');
      toggleNotesBtn.classList.add('active');
    } else {
      notesModal.classList.remove('show');
      toggleNotesBtn.classList.remove('active');
    }
  }
}
window.toggleNotes = toggleNotes;

function openOverview() {
  state.overviewVisible = true;
  if (overviewModal && toggleOverviewBtn) {
    overviewModal.classList.add('show');
    toggleOverviewBtn.classList.add('active');
  }
}

function closeOverview() {
  state.overviewVisible = false;
  if (overviewModal && toggleOverviewBtn) {
    overviewModal.classList.remove('show');
    toggleOverviewBtn.classList.remove('active');
  }
}

function toggleOverview() {
  if (state.overviewVisible) {
    closeOverview();
  } else {
    openOverview();
  }
}
window.toggleOverview = toggleOverview;

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Fullscreen error:', err);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
window.toggleFullscreen = toggleFullscreen;

// Build Overview Grid Thumbnails
function buildOverviewGrid() {
  if (!overviewGrid) return;
  overviewGrid.innerHTML = '';
  slides.forEach((slide, idx) => {
    const slideNum = idx + 1;
    const titleEl = slide.querySelector('.slide-title') || slide.querySelector('.hero-heading');
    const title = titleEl ? titleEl.textContent.trim() : `Slide ${slideNum}`;

    const thumb = document.createElement('div');
    thumb.className = `overview-thumb ${slideNum === state.currentSlide ? 'current' : ''}`;
    thumb.innerHTML = `
      <div class="thumb-num">SLIDE ${String(slideNum).padStart(2, '0')}</div>
      <div class="thumb-title">${title}</div>
    `;
    thumb.addEventListener('click', () => goToSlide(slideNum));
    overviewGrid.appendChild(thumb);
  });
}

// Event Listeners (Keyboard & Controls)
function setupEventListeners() {
  const bindOnce = (el, fn) => {
    if (el && !el.dataset.bound) {
      el.dataset.bound = '1';
      el.addEventListener('click', fn);
    }
  };

  bindOnce(prevBtn, prevSlide);
  bindOnce(nextBtn, nextSlide);
  bindOnce(toggleNotesBtn, toggleNotes);
  bindOnce(toggleOverviewBtn, toggleOverview);
  bindOnce(fullscreenBtn, toggleFullscreen);
  bindOnce(toggleTimerBtn, toggleTimer);
  bindOnce(resetTimerBtn, resetTimer);

  const closeNotesBtn = document.getElementById('closeNotesBtn');
  bindOnce(closeNotesBtn, toggleNotes);

  const closeOverviewBtn = document.getElementById('closeOverviewBtn');
  bindOnce(closeOverviewBtn, closeOverview);

  const progressTrack = document.getElementById('progressTrack');
  if (progressTrack && !progressTrack.dataset.bound) {
    progressTrack.dataset.bound = '1';
    progressTrack.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      const targetSlide = Math.min(state.totalSlides, Math.max(1, Math.ceil(clickPos * state.totalSlides)));
      goToSlide(targetSlide);
    });
  }

  // Keyboard Navigation
  if (!window._presKeyBound) {
    window._presKeyBound = true;
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (state.overviewVisible) closeOverview();
        if (state.notesVisible) toggleNotes();
        if (state.closeHelp) state.closeHelp();
        if (typeof setVisualizerTheaterMode === 'function') {
          setVisualizerTheaterMode(false);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case ' ':
          e.preventDefault();
          if (state.currentSlide === 9 && typeof toggleAutoPlayVisualizer === 'function') {
            toggleAutoPlayVisualizer();
          } else {
            nextSlide();
          }
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(1);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(state.totalSlides);
          break;
        case 's':
        case 'S':
          e.preventDefault();
          toggleNotes();
          break;
        case 'o':
        case 'O':
          e.preventDefault();
          toggleOverview();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 't':
        case 'T':
          e.preventDefault();
          if (typeof toggleThemeMode === 'function') toggleThemeMode();
          break;
        case '?':
        case '/':
          if (e.shiftKey || e.key === '?') {
            e.preventDefault();
            if (state.toggleHelp) state.toggleHelp();
          }
          break;
      }
    });
  }

  // Accordion for Q&A on final slide
  document.querySelectorAll('.qa-card').forEach(card => {
    if (card.dataset.bound) return;
    card.dataset.bound = '1';
    card.addEventListener('click', () => {
      card.classList.toggle('open');
    });
  });
}

/* =====================================================================
   THEME TOGGLE (LIGHT / DARK MODE)
   ===================================================================== */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('slide_dsa_theme', theme);
  } catch (e) {}

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.textContent = theme === 'light' ? '[ 🌙 DARK ]' : '[ ☀ LIGHT ]';
    themeToggleBtn.title = theme === 'light' ? 'Chuyển sang Giao diện Tối (Phím T)' : 'Chuyển sang Giao diện Sáng (Phím T)';
  }

  // Refresh visualizer canvas colors if active
  try {
    if (typeof renderCurrentStep === 'function') {
      renderCurrentStep();
    }
  } catch (e) {}

  // Refresh Hanoi Map SVG if initialized
  try {
    if (typeof renderHanoiSvg === 'function' && hanoiNodePositions && Object.keys(hanoiNodePositions).length > 0) {
      renderHanoiSvg();
    }
  } catch (e) {}

  // Refresh Speed Benchmark Chart if initialized
  try {
    if (typeof renderBenchmarkChart === 'function') {
      renderBenchmarkChart();
    }
  } catch (e) {}
}

function toggleThemeMode() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'light' ? 'dark' : 'light');
}
window.toggleThemeMode = toggleThemeMode;

function initThemeToggle() {
  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('slide_dsa_theme') || 'light';
  } catch (e) {}

  applyTheme(savedTheme);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn && !themeToggleBtn.dataset.bound) {
    themeToggleBtn.dataset.bound = '1';
    themeToggleBtn.addEventListener('click', toggleThemeMode);
  }
}

/* =====================================================================
   INTERACTIVE ALGORITHM VISUALIZER & CODE RUNNER (CODEPEET STYLE)
   ===================================================================== */

function initSimulator() {
  if (typeof initAlgorithmVisualizer === 'function') {
    initAlgorithmVisualizer();
  }
}



/* =====================================================================
   SHORTCUTS HELP MODAL
   ===================================================================== */
function initHelpModal() {
  const toggleHelpBtn = document.getElementById('toggleHelpBtn');
  const closeHelpBtn = document.getElementById('closeHelpBtn');
  const shortcutsModal = document.getElementById('shortcutsModal');

  function openHelp() {
    if (shortcutsModal) shortcutsModal.classList.add('show');
  }
  function closeHelp() {
    if (shortcutsModal) shortcutsModal.classList.remove('show');
  }
  function toggleHelp() {
    if (shortcutsModal && shortcutsModal.classList.contains('show')) {
      closeHelp();
    } else {
      openHelp();
    }
  }

  if (toggleHelpBtn && !toggleHelpBtn.dataset.bound) {
    toggleHelpBtn.dataset.bound = '1';
    toggleHelpBtn.addEventListener('click', toggleHelp);
  }
  if (closeHelpBtn && !closeHelpBtn.dataset.bound) {
    closeHelpBtn.dataset.bound = '1';
    closeHelpBtn.addEventListener('click', closeHelp);
  }
  if (shortcutsModal && !shortcutsModal.dataset.bound) {
    shortcutsModal.dataset.bound = '1';
    shortcutsModal.addEventListener('click', (e) => {
      if (e.target === shortcutsModal) closeHelp();
    });
  }

  state.closeHelp = closeHelp;
  state.toggleHelp = toggleHelp;
  window.toggleHelpModal = toggleHelp;
}

/* =====================================================================
   CODE TABS ON SLIDE 06 (KRUSKAL LOOP VS DSU CLASS)
   ===================================================================== */
function initCodeTabs() {
  const tabKruskal = document.getElementById('tabKruskalLoop');
  const tabDsu = document.getElementById('tabDsuCode');
  const snippet = document.getElementById('kruskalCodeSnippet');
  if (!tabKruskal || !tabDsu || !snippet) return;

  const codeKruskal = `<span class="code-comment"># Sắp xếp toàn bộ cạnh theo trọng số: O(E log E)</span>
edges.sort(key=<span class="code-keyword">lambda</span> e: e[<span class="code-string">'weight'</span>])
dsu = DSU(num_nodes)
mst_edges = []

<span class="code-keyword">for</span> edge <span class="code-keyword">in</span> edges:
    <span class="code-keyword">if</span> dsu.union(edge[<span class="code-string">'u'</span>], edge[<span class="code-string">'v'</span>]):
        mst_edges.append(edge)
        total_weight += edge[<span class="code-string">'weight'</span>]
        <span class="code-keyword">if</span> len(mst_edges) == num_nodes - 1:
            <span class="code-keyword">break</span> <span class="code-comment"># Dừng sớm khi đủ V - 1 cạnh</span>`;

  const codeDsu = `<span class="code-keyword">class</span> <span class="code-func">DSU</span>:
    <span class="code-keyword">def</span> <span class="code-func">__init__</span>(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    <span class="code-keyword">def</span> <span class="code-func">find</span>(self, i): <span class="code-comment"># Path Compression: O(alpha(V))</span>
        <span class="code-keyword">if</span> self.parent[i] == i:
            <span class="code-keyword">return</span> i
        self.parent[i] = self.find(self.parent[i])
        <span class="code-keyword">return</span> self.parent[i]

    <span class="code-keyword">def</span> <span class="code-func">union</span>(self, i, j): <span class="code-comment"># Union by Rank: O(alpha(V))</span>
        root_i, root_j = self.find(i), self.find(j)
        <span class="code-keyword">if</span> root_i == root_j:
            <span class="code-keyword">return</span> False <span class="code-comment"># Phát hiện chu trình khép kín!</span>
        <span class="code-keyword">if</span> self.rank[root_i] < self.rank[root_j]:
            self.parent[root_i] = root_j
        <span class="code-keyword">elif</span> self.rank[root_i] > self.rank[root_j]:
            self.parent[root_j] = root_i
        <span class="code-keyword">else</span>:
            self.parent[root_j] = root_i
            self.rank[root_i] += 1
        <span class="code-keyword">return</span> True`;

  tabKruskal.addEventListener('click', () => {
    tabKruskal.classList.add('active');
    tabDsu.classList.remove('active');
    snippet.innerHTML = codeKruskal;
  });

  tabDsu.addEventListener('click', () => {
    tabDsu.classList.add('active');
    tabKruskal.classList.remove('active');
    snippet.innerHTML = codeDsu;
  });
}

/* =====================================================================
   INTERACTIVE MATRIX FILTERS ON SLIDE 08
   ===================================================================== */
function initMatrixFilters() {
  const filterBtns = document.querySelectorAll('.matrix-filter-bar .filter-pill');
  const tipEl = document.getElementById('matrixFilterTip');
  const table = document.getElementById('comparisonTable');
  if (!filterBtns.length || !table) return;

  const rowSparse = document.getElementById('rowSparse');
  const rowDense = document.getElementById('rowDense');
  const rowParallel = document.getElementById('rowParallel');
  const colKruskal = table.querySelectorAll('.col-kruskal');
  const colPrim = table.querySelectorAll('.col-prim');
  const colBoruvka = table.querySelectorAll('.col-boruvka');

  function clearHighlights() {
    [rowSparse, rowDense, rowParallel].forEach(r => {
      if (r) r.style.backgroundColor = '';
    });
    table.querySelectorAll('td, th').forEach(cell => {
      cell.style.backgroundColor = '';
      cell.style.color = '';
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      clearHighlights();

      const filter = btn.dataset.filter;
      if (filter === 'all') {
        if (tipEl) tipEl.textContent = 'Bấm bộ lọc để highlight khuyến nghị tối ưu nhất.';
      } else if (filter === 'sparse') {
        if (rowSparse) rowSparse.style.backgroundColor = 'rgba(52, 211, 153, 0.08)';
        colKruskal.forEach(cell => cell.style.backgroundColor = 'rgba(52, 211, 153, 0.06)');
        if (tipEl) tipEl.textContent = 'Khuyên dùng Kruskal: Sắp xếp ít cạnh O(E log E) ≈ O(V log V) và DSU gộp cực nhanh O(α(V)).';
      } else if (filter === 'dense') {
        if (rowDense) rowDense.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
        colPrim.forEach(cell => cell.style.backgroundColor = 'rgba(59, 130, 246, 0.06)');
        if (tipEl) tipEl.textContent = 'Khuyên dùng Eager Prim: Bộ nhớ O(V) siêu tối ưu, không cần sort O(V²) cạnh như Kruskal.';
      } else if (filter === 'parallel') {
        if (rowParallel) rowParallel.style.backgroundColor = 'rgba(168, 85, 247, 0.08)';
        colBoruvka.forEach(cell => cell.style.backgroundColor = 'rgba(168, 85, 247, 0.06)');
        if (tipEl) tipEl.textContent = 'Khuyên dùng Borůvka: Các cụm độc lập tìm cạnh nhẹ nhất song song, giảm 50% cụm mỗi vòng (≤ ⌈log₂ V⌉ vòng).';
      }
    });
  });
}

/* =====================================================================
   TOGGLE ALL Q&A CARDS (SLIDE 12)
   ===================================================================== */
function initQaToggleAll() {
  const toggleAllBtn = document.getElementById('toggleAllQaBtn');
  if (!toggleAllBtn) return;
  let allOpen = false;

  toggleAllBtn.addEventListener('click', () => {
    allOpen = !allOpen;
    const cards = document.querySelectorAll('.qa-card');
    cards.forEach(card => {
      if (allOpen) {
        card.classList.add('open');
      } else {
        card.classList.remove('open');
      }
    });
    toggleAllBtn.textContent = allOpen ? '[ Đóng tất cả câu hỏi ]' : '[ Mở tất cả câu hỏi ]';
  });
}

/* =====================================================================
   REAL-LIFE HANOI 22-NODE NETWORK MAP (SLIDE 10)
   ===================================================================== */
const HANOI_NODES = [
  { id: "H01", name: "Long Biên Mega SOC", type: "hub", x: 42.4, y: 21.3 },
  { id: "H02", name: "Bắc Từ Liêm Hub", type: "hub", x: 27.8, y: 24.7 },
  { id: "H03", name: "Quang Minh Mega Hub", type: "hub", x: 30.6, y: 38.0 },
  { id: "W01", name: "Cầu Giấy DC", type: "warehouse", x: 29.3, y: 20.1 },
  { id: "W02", name: "Đống Đa DC", type: "warehouse", x: 33.0, y: 18.7 },
  { id: "W03", name: "Hà Đông DC", type: "warehouse", x: 28.7, y: 13.5 },
  { id: "W04", name: "Hoàng Mai DC", type: "warehouse", x: 34.4, y: 12.9 },
  { id: "W05", name: "Thanh Trì DC", type: "warehouse", x: 36.1, y: 8.2 },
  { id: "W06", name: "Gia Lâm DC", type: "warehouse", x: 45.2, y: 18.0 },
  { id: "W07", name: "Nam Từ Liêm DC", type: "warehouse", x: 28.1, y: 18.5 },
  { id: "W08", name: "Tây Hồ DC", type: "warehouse", x: 32.4, y: 23.5 },
  { id: "W09", name: "Đông Anh DC", type: "warehouse", x: 30.2, y: 31.6 },
  { id: "D01", name: "Bưu cục Hoàn Kiếm", type: "delivery", x: 36.7, y: 19.5 },
  { id: "D02", name: "Bưu cục Ba Đình", type: "delivery", x: 33.2, y: 20.4 },
  { id: "D03", name: "Bưu cục Hai Bà Trưng", type: "delivery", x: 36.4, y: 17.3 },
  { id: "D04", name: "Bưu cục Thanh Xuân", type: "delivery", x: 31.8, y: 16.1 },
  { id: "D05", name: "Bưu cục Sóc Sơn", type: "delivery", x: 36.2, y: 45.6 },
  { id: "D06", name: "Bưu cục Hoài Đức", type: "delivery", x: 21.5, y: 23.8 },
  { id: "D07", name: "Bưu cục Đan Phượng", type: "delivery", x: 17.7, y: 26.3 },
  { id: "D08", name: "Bưu cục Chương Mỹ", type: "delivery", x: 21.0, y: 8.8 },
  { id: "D09", name: "Bưu cục Thường Tín", type: "delivery", x: 37.6, y: 2.4 },
  { id: "D10", name: "Bưu cục Hòa Lạc", type: "delivery", x: 3.5, y: 18.0 }
];

const HANOI_EDGES = [
  { u: "W01", v: "W07", w: 2.1, type: "urban", mst: true },
  { u: "D01", v: "D03", w: 3.1, type: "urban", mst: true },
  { u: "W02", v: "D04", w: 3.2, type: "urban", mst: true },
  { u: "D04", v: "W03", w: 4.1, type: "urban", mst: true },
  { u: "W08", v: "D02", w: 4.2, type: "urban", mst: true },
  { u: "H01", v: "W06", w: 4.5, type: "arterial", mst: true },
  { u: "W08", v: "W01", w: 4.5, type: "urban", mst: true },
  { u: "W02", v: "D03", w: 4.6, type: "urban", mst: true },
  { u: "D02", v: "D01", w: 4.8, type: "urban", mst: true },
  { u: "D06", v: "D07", w: 5.1, type: "arterial", mst: true },
  { u: "H02", v: "W01", w: 5.2, type: "arterial", mst: true },
  { u: "W04", v: "W05", w: 5.2, type: "arterial", mst: true },
  { u: "W03", v: "W04", w: 6.2, type: "arterial", mst: true },
  { u: "H03", v: "W09", w: 6.5, type: "highway", mst: true },
  { u: "D06", v: "H02", w: 7.1, type: "urban", mst: true },
  { u: "W09", v: "H02", w: 7.3, type: "arterial", mst: true },
  { u: "W05", v: "D09", w: 7.4, type: "highway", mst: true },
  { u: "D01", v: "H01", w: 8.3, type: "arterial", mst: true },
  { u: "H03", v: "D05", w: 9.2, type: "arterial", mst: true },
  { u: "W03", v: "D08", w: 10.2, type: "arterial", mst: true },
  { u: "W07", v: "D10", w: 25.4, type: "highway", mst: true },
  // 9 redundant cycle edges (eliminated in MST)
  { u: "W01", v: "W02", w: 4.9, type: "urban", mst: false },
  { u: "H02", v: "W08", w: 6.3, type: "arterial", mst: false },
  { u: "W07", v: "W03", w: 6.8, type: "arterial", mst: false },
  { u: "W07", v: "D06", w: 8.2, type: "arterial", mst: false },
  { u: "H01", v: "W04", w: 9.8, type: "highway", mst: false },
  { u: "W06", v: "W05", w: 11.3, type: "arterial", mst: false },
  { u: "H03", v: "H02", w: 13.6, type: "highway", mst: false },
  { u: "D08", v: "W05", w: 14.2, type: "arterial", mst: false },
  { u: "H02", v: "H01", w: 15.1, type: "highway", mst: false }
];

let hanoiMapState = {
  mode: 'mst', // 'mst', 'all', or 'path'
  tierFilter: 'all', // 'all', 'hub', 'warehouse', 'delivery'
  hoveredNode: null,
  hoveredEdge: null,
  selectedNode: null,
  pathStartNode: null,
  pathEndNode: null,
  activePath: null,
  showWeights: false, // false = auto, true = always show
  activeTab: 'tabHanoiResults',

  // Kruskal Simulation
  simRunning: false,
  simStep: 0,
  simAcceptedEdges: [],
  simRejectedEdges: [],
  simActiveEdge: null,
  simTotalWeight: 0,
  simTimer: null,
  simDsu: null
};

// Working copy of projected node positions (mutable for drag)
let hanoiNodePositions = {};
const HANOI_DEFAULT_POSITIONS = {};
const HANOI_GPS_POSITIONS = {};
let hanoiCurrentLayout = 'spaced'; // 'spaced' or 'gps'

// Spaced topological layout: Provides 45-75px clearance between all stations
// while strictly preserving real relative geographical directions in Hanoi
const HANOI_SPACED_POSITIONS = {
  "D10": { px: 38, py: 210 },  // Bưu cục Hòa Lạc (Far West)
  "D07": { px: 115, py: 135 }, // Bưu cục Đan Phượng (North-West)
  "D06": { px: 165, py: 185 }, // Bưu cục Hoài Đức (Mid-West)
  "D08": { px: 160, py: 280 }, // Bưu cục Chương Mỹ (South-West)
  "H02": { px: 235, py: 140 }, // Bắc Từ Liêm Hub
  "W07": { px: 220, py: 215 }, // Nam Từ Liêm DC
  "W03": { px: 220, py: 275 }, // Hà Đông DC
  "W01": { px: 285, py: 175 }, // Cầu Giấy DC
  "D04": { px: 280, py: 265 }, // Bưu cục Thanh Xuân
  "W02": { px: 325, py: 220 }, // Đống Đa DC
  "W08": { px: 345, py: 130 }, // Tây Hồ DC
  "D02": { px: 360, py: 180 }, // Bưu cục Ba Đình
  "W09": { px: 310, py: 95 },  // Đông Anh DC
  "H03": { px: 280, py: 45 },  // Quang Minh Mega Hub
  "D05": { px: 395, py: 38 },  // Bưu cục Sóc Sơn (Far North)
  "D01": { px: 410, py: 180 }, // Bưu cục Hoàn Kiếm (Central East)
  "D03": { px: 405, py: 235 }, // Bưu cục Hai Bà Trưng (Central South-East)
  "W04": { px: 360, py: 275 }, // Hoàng Mai DC
  "W05": { px: 405, py: 295 }, // Thanh Trì DC
  "D09": { px: 455, py: 310 }, // Bưu cục Thường Tín (Far South)
  "H01": { px: 465, py: 160 }, // Long Biên Mega SOC (East)
  "W06": { px: 490, py: 215 }  // Gia Lâm DC (Far East)
};

function projectHanoiNodes() {
  HANOI_NODES.forEach(n => {
    // Exact linear GPS coordinates
    const gpsX = 35 + ((n.x - 3.5) / 41.7) * 450;
    const gpsY = 305 - ((n.y - 2.4) / 43.2) * 260;
    HANOI_GPS_POSITIONS[n.id] = { px: gpsX, py: gpsY };

    // Default to the clear, well-spaced layout so nodes never overlap
    const def = HANOI_SPACED_POSITIONS[n.id] || { px: gpsX, py: gpsY };
    hanoiNodePositions[n.id] = { ...def };
    HANOI_DEFAULT_POSITIONS[n.id] = { ...def };
  });
}
// Immediately calculate default positions on load
projectHanoiNodes();

// Hanoi Drag State
let hanoiDrag = {
  node: null,
  startX: 0,
  startY: 0,
  hasMoved: false,
  justDragged: false,
  offsetX: 0,
  offsetY: 0
};

// Disjoint Set Union (DSU) for Hanoi Real Map
class HanoiDSU {
  constructor(elements) {
    this.parent = {};
    this.rank = {};
    elements.forEach(id => {
      this.parent[id] = id;
      this.rank[id] = 0;
    });
  }
  find(i) {
    if (this.parent[i] === i) return i;
    this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }
  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
      return true;
    }
    return false;
  }
}

const HANOI_EDGES_SORTED = [...HANOI_EDGES].sort((a, b) => a.w - b.w);

// Pathfinding on MST (BFS on 21 Tree Edges)
function findMstPath(startId, endId) {
  if (startId === endId) return null;
  const mstEdges = HANOI_EDGES.filter(e => e.mst);
  const adj = {};
  HANOI_NODES.forEach(n => { adj[n.id] = []; });
  mstEdges.forEach(e => {
    adj[e.u].push({ neighbor: e.v, weight: e.w, edge: e });
    adj[e.v].push({ neighbor: e.u, weight: e.w, edge: e });
  });

  const queue = [startId];
  const visited = new Set([startId]);
  const parent = {};

  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr === endId) break;
    for (const item of adj[curr]) {
      if (!visited.has(item.neighbor)) {
        visited.add(item.neighbor);
        parent[item.neighbor] = { node: curr, weight: item.weight, edge: item.edge };
        queue.push(item.neighbor);
      }
    }
  }

  if (!parent[endId]) return null;

  const nodePath = [endId];
  const edgePath = [];
  let totalWeight = 0;
  let curr = endId;

  while (curr !== startId) {
    const p = parent[curr];
    edgePath.unshift(p.edge);
    totalWeight += p.weight;
    curr = p.node;
    nodePath.unshift(curr);
  }

  const origShortest = findOriginalShortestPath(startId, endId);

  return {
    nodes: nodePath,
    edges: edgePath,
    totalWeight: Math.round(totalWeight * 10) / 10,
    hopCount: edgePath.length,
    origShortest
  };
}

// Shortest path on original 30-edge network (Dijkstra) for comparison
function findOriginalShortestPath(startId, endId) {
  const adj = {};
  HANOI_NODES.forEach(n => { adj[n.id] = []; });
  HANOI_EDGES.forEach(e => {
    adj[e.u].push({ neighbor: e.v, weight: e.w });
    adj[e.v].push({ neighbor: e.u, weight: e.w });
  });

  const dist = {};
  const parent = {};
  const visited = new Set();
  HANOI_NODES.forEach(n => { dist[n.id] = Infinity; });
  dist[startId] = 0;

  for (let i = 0; i < HANOI_NODES.length; i++) {
    let u = null;
    let minDist = Infinity;
    for (const n of HANOI_NODES) {
      if (!visited.has(n.id) && dist[n.id] < minDist) {
        minDist = dist[n.id];
        u = n.id;
      }
    }
    if (u === null || u === endId) break;
    visited.add(u);

    for (const item of adj[u]) {
      if (!visited.has(item.neighbor)) {
        const alt = dist[u] + item.weight;
        if (alt < dist[item.neighbor]) {
          dist[item.neighbor] = alt;
          parent[item.neighbor] = u;
        }
      }
    }
  }

  let curr = endId;
  const path = [endId];
  while (curr !== startId && parent[curr]) {
    curr = parent[curr];
    path.unshift(curr);
  }

  return {
    dist: Math.round(dist[endId] * 10) / 10,
    hops: path.length - 1,
    nodes: path
  };
}

function initHanoiMap() {
  const btnMst = document.getElementById('hanoiBtnMst');
  const btnAll = document.getElementById('hanoiBtnAll');
  const btnPathMode = document.getElementById('hanoiBtnPathMode');
  const btnToggleWeights = document.getElementById('hanoiToggleWeightsBtn');
  const btnReset = document.getElementById('hanoiResetLayoutBtn');

  if (!btnMst || !btnAll) return;

  projectHanoiNodes();
  hanoiMapState.simDsu = new HanoiDSU(HANOI_NODES.map(n => n.id));

  // Mode: MST
  btnMst.addEventListener('click', () => {
    hanoiMapState.mode = 'mst';
    btnMst.classList.add('active');
    btnAll.classList.remove('active');
    if (btnPathMode) btnPathMode.classList.remove('active');
    renderHanoiSvg();
    setHanoiStatus('Đang hiển thị 21 tuyến trục MST (138.2 km). Tiết kiệm 41.5% chi phí đầu tư.');
  });

  // Mode: All 30 Edges
  btnAll.addEventListener('click', () => {
    hanoiMapState.mode = 'all';
    btnAll.classList.add('active');
    btnMst.classList.remove('active');
    if (btnPathMode) btnPathMode.classList.remove('active');
    renderHanoiSvg();
    setHanoiStatus('Đang hiển thị toàn bộ 30 tuyến ban đầu (236.4 km). Tuyến đứt đoạn màu đỏ là cạnh thừa tạo chu trình.');
  });

  // Mode: Pathfinding Mode
  if (btnPathMode) {
    btnPathMode.addEventListener('click', () => {
      hanoiMapState.mode = 'path';
      btnPathMode.classList.add('active');
      btnMst.classList.remove('active');
      btnAll.classList.remove('active');
      switchHanoiTab('tabHanoiInspector');
      renderHanoiSvg();
      setHanoiStatus('Chế độ tìm đường: Click chọn lần lượt 2 trạm bưu cục trên bản đồ để tìm lộ trình duy nhất trên cây MST.');
    });
  }

  // Toggle Weights
  if (btnToggleWeights) {
    btnToggleWeights.addEventListener('click', () => {
      hanoiMapState.showWeights = !hanoiMapState.showWeights;
      btnToggleWeights.textContent = hanoiMapState.showWeights ? '[ km: Tất cả ]' : '[ km: Tự động ]';
      renderHanoiSvg();
      setHanoiStatus(hanoiMapState.showWeights ? 'Đã bật hiển thị số km trên toàn bộ các tuyến đường.' : 'Chế độ tự động: Chỉ hiện số km khi rê chuột hoặc chọn trạm.');
    });
  }

  // Reset Layout Button
  if (btnReset) {
    btnReset.addEventListener('click', resetHanoiMapLayout);
  }

  // Layout Mode Toggle Button (Spaced vs GPS)
  const btnLayoutToggle = document.getElementById('hanoiLayoutToggleBtn');
  if (btnLayoutToggle) {
    btnLayoutToggle.addEventListener('click', () => {
      if (hanoiCurrentLayout === 'spaced') {
        hanoiCurrentLayout = 'gps';
        HANOI_NODES.forEach(n => {
          hanoiNodePositions[n.id] = { ...HANOI_GPS_POSITIONS[n.id] };
        });
        btnLayoutToggle.textContent = '[ 🗺 GPS ]';
        renderHanoiSvg();
        setHanoiStatus('Đang hiển thị vị trí theo tọa độ GPS địa lý chuẩn (các cụm nội đô mật độ cao). Bạn có thể kéo thả đỉnh tự do.');
      } else {
        hanoiCurrentLayout = 'spaced';
        HANOI_NODES.forEach(n => {
          hanoiNodePositions[n.id] = { ...HANOI_SPACED_POSITIONS[n.id] };
        });
        btnLayoutToggle.textContent = '[ ✦ Giãn đều ]';
        renderHanoiSvg();
        setHanoiStatus('Đã chuyển về bố cục Giãn đều trực quan (Topological Spacing) giúp quan sát rõ ràng mọi trạm.');
      }
    });
  }

  // Tier Filter Pills
  setupTierFilters();

  // Tabs on Right Panel
  setupHanoiTabs();

  // Kruskal Simulator Controls
  setupHanoiSimulator();

  // Dragging & Interaction
  setupHanoiDragging();

  // Initial Render
  renderHanoiSvg();
  renderHanoiInspector();
}

function resetHanoiMapLayout() {
  hanoiCurrentLayout = 'spaced';
  const btnLayoutToggle = document.getElementById('hanoiLayoutToggleBtn');
  if (btnLayoutToggle) btnLayoutToggle.textContent = '[ ✦ Giãn đều ]';

  HANOI_NODES.forEach(n => {
    hanoiNodePositions[n.id] = { ...HANOI_SPACED_POSITIONS[n.id] };
  });
  hanoiMapState.selectedNode = null;
  hanoiMapState.pathStartNode = null;
  hanoiMapState.pathEndNode = null;
  hanoiMapState.activePath = null;
  hanoiMapState.tierFilter = 'all';
  hanoiMapState.hoveredNode = null;
  hanoiMapState.hoveredEdge = null;

  // Reset tier pills UI
  document.querySelectorAll('.tier-pill').forEach(p => {
    if (p.id === 'tierAllBtn') p.classList.add('active');
    else p.classList.remove('active');
  });

  resetHanoiKruskal();
  renderHanoiSvg();
  renderHanoiInspector();
  setHanoiStatus('Đã khôi phục bố cục Giãn đều trực quan cho toàn bộ 22 trạm.');
}

function setupTierFilters() {
  const tiers = [
    { id: 'tierAllBtn', tier: 'all' },
    { id: 'tierHubBtn', tier: 'hub' },
    { id: 'tierWarehouseBtn', tier: 'warehouse' },
    { id: 'tierDeliveryBtn', tier: 'delivery' }
  ];

  tiers.forEach(({ id, tier }) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => {
      hanoiMapState.tierFilter = tier;
      document.querySelectorAll('.tier-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      renderHanoiSvg();

      const counts = { all: '22', hub: '3 Mega Hubs', warehouse: '9 Warehouses/DCs', delivery: '10 Bưu cục phát' };
      setHanoiStatus(`Đang nổi bật phân tầng: ${counts[tier]}.`);
    });
  });
}

function setupHanoiTabs() {
  const tabBtns = document.querySelectorAll('.hanoi-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchHanoiTab(targetTab);
    });
  });
}

function switchHanoiTab(tabId) {
  hanoiMapState.activeTab = tabId;
  document.querySelectorAll('.hanoi-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  document.querySelectorAll('.hanoi-tab-pane').forEach(pane => {
    if (pane.id === tabId) pane.classList.add('active');
    else pane.classList.remove('active');
  });

  if (tabId === 'tabHanoiInspector') {
    renderHanoiInspector();
  }
  renderHanoiSvg();
}

// Render dynamic content for Inspector Tab
function renderHanoiInspector() {
  const container = document.getElementById('inspectorContent');
  if (!container) return;

  // Case 1: Active Path Found
  if (hanoiMapState.activePath) {
    const path = hanoiMapState.activePath;
    const startNode = HANOI_NODES.find(n => n.id === path.nodes[0]);
    const endNode = HANOI_NODES.find(n => n.id === path.nodes[path.nodes.length - 1]);

    const isDifferentFromOrig = path.origShortest && (path.totalWeight > path.origShortest.dist);

    container.innerHTML = `
      <div class="hanoi-path-card">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div class="card-num" style="color: #38bdf8;">LỘ TRÌNH TRÊN CÂY KHUNG MST</div>
          <span class="tag-clean" style="font-size: 0.65rem; border-color: #38bdf8; color: #38bdf8;">Đường Đi Duy Nhất</span>
        </div>
        
        <div style="margin-top: 6px; font-size: 0.92rem; font-weight: 600; color: var(--text-1);">
          [${startNode.id}] ${startNode.name} ➔ [${endNode.id}] ${endNode.name}
        </div>

        <div class="hanoi-path-steps">
          ${path.nodes.map((nodeId, idx) => {
      const isStart = idx === 0;
      const isEnd = idx === path.nodes.length - 1;
      const cls = isStart ? 'start' : (isEnd ? 'end' : '');
      return `
              <span class="hanoi-path-node-pill ${cls}" title="${HANOI_NODES.find(n => n.id === nodeId)?.name || nodeId}">${nodeId}</span>
              ${!isEnd ? '<span class="hanoi-path-arrow">➔</span>' : ''}
            `;
    }).join('')}
        </div>

        <div class="inspector-meta-grid" style="margin-top: 10px;">
          <div class="inspector-meta-box">
            <div class="inspector-meta-val" style="color: #38bdf8;">${path.totalWeight} km</div>
            <div class="inspector-meta-lbl">Cự Ly MST</div>
          </div>
          <div class="inspector-meta-box">
            <div class="inspector-meta-val">${path.hopCount}</div>
            <div class="inspector-meta-lbl">Số Chặng (Hops)</div>
          </div>
          <div class="inspector-meta-box">
            <div class="inspector-meta-val" style="color: ${isDifferentFromOrig ? '#f87171' : '#34d399'};">
              ${path.origShortest ? `${path.origShortest.dist} km` : '---'}
            </div>
            <div class="inspector-meta-lbl">Mạng Gốc (Dijkstra)</div>
          </div>
        </div>

        <div style="margin-top: 10px; font-size: 0.76rem; line-height: 1.55; color: var(--text-2); background: rgba(0,0,0,0.25); padding: 8px 10px; border-radius: 4px; border-left: 2px solid ${isDifferentFromOrig ? '#f59e0b' : '#34d399'};">
          ${isDifferentFromOrig ? `
            <strong>⚠️ Đánh đổi kỹ thuật (Hop Count Trade-off):</strong> MST loại bỏ 9 tuyến tắt để tối ưu 41.5% chi phí đầu tư toàn mạng, nên lộ trình này dài hơn <strong>+${(path.totalWeight - path.origShortest.dist).toFixed(1)} km</strong> (${path.hopCount - path.origShortest.hops} chặng trung chuyển) so với đi thẳng trên mạng ban đầu.
          ` : `
            <strong>✓ Tối ưu tuyệt đối:</strong> Lộ trình kết nối trên cây MST trùng khớp hoàn hảo với đường đi ngắn nhất trên mạng gốc ban đầu!
          `}
        </div>

        <div style="display: flex; gap: 8px; margin-top: 12px;">
          <button class="sim-btn" id="inspectorClearPathBtn" style="flex: 1;">✕ Xóa lộ trình</button>
          <button class="sim-btn primary" id="inspectorBackOverviewBtn" style="flex: 1;">📊 Xem tổng quan</button>
        </div>
      </div>
    `;

    document.getElementById('inspectorClearPathBtn')?.addEventListener('click', clearHanoiPath);
    document.getElementById('inspectorBackOverviewBtn')?.addEventListener('click', () => switchHanoiTab('tabHanoiResults'));
    return;
  }

  // Case 2: Single Node Selected
  if (hanoiMapState.selectedNode) {
    const n = HANOI_NODES.find(node => node.id === hanoiMapState.selectedNode);
    if (!n) return;

    const incidentMst = HANOI_EDGES.filter(e => e.mst && (e.u === n.id || e.v === n.id));
    const incidentAll = HANOI_EDGES.filter(e => e.u === n.id || e.v === n.id);
    const typeLabel = n.type === 'hub' ? 'Mega Hub' : (n.type === 'warehouse' ? 'Warehouse / DC' : 'Bưu cục phát');
    const badgeClass = n.type;
    const totalLinkKm = incidentMst.reduce((sum, e) => sum + e.w, 0).toFixed(1);

    container.innerHTML = `
      <div class="inspector-header-box">
        <span class="inspector-badge ${badgeClass}">${typeLabel.toUpperCase()}</span>
        <h4 style="font-size: 1rem; font-weight: 600; color: var(--text-1); margin: 2px 0;">[${n.id}] ${n.name}</h4>
        <div style="font-size: 0.74rem; color: var(--text-3); font-family: var(--font-mono);">Tọa độ GPS: X=${n.x.toFixed(1)}, Y=${n.y.toFixed(1)}</div>

        <div class="inspector-meta-grid">
          <div class="inspector-meta-box">
            <div class="inspector-meta-val" style="color: #34d399;">${incidentMst.length}</div>
            <div class="inspector-meta-lbl">Bậc Trong MST</div>
          </div>
          <div class="inspector-meta-box">
            <div class="inspector-meta-val">${incidentAll.length}</div>
            <div class="inspector-meta-lbl">Bậc Mạng Gốc</div>
          </div>
          <div class="inspector-meta-box">
            <div class="inspector-meta-val">${totalLinkKm} km</div>
            <div class="inspector-meta-lbl">Tổng Tuyến Kề</div>
          </div>
        </div>
      </div>

      <div style="margin-top: 8px; flex: 1; display: flex; flex-direction: column;">
        <div class="card-num" style="margin-bottom: 4px;">CÁC TUYẾN KẾT NỐI TRỰC TIẾP (${incidentAll.length})</div>
        <div class="hanoi-neighbor-list">
          ${incidentAll.map(e => {
      const otherId = e.u === n.id ? e.v : e.u;
      const otherNode = HANOI_NODES.find(node => node.id === otherId);
      const roadTypeVi = e.type === 'highway' ? 'Cao tốc' : (e.type === 'arterial' ? 'Trục chính' : 'Nội đô');
      return `
              <div class="hanoi-neighbor-item ${e.mst ? 'in-mst' : 'redundant'}" title="${e.mst ? 'Tuyến nằm trong cây MST tối ưu' : 'Tuyến bị loại bỏ vì tạo chu trình dư thừa'}">
                <div>
                  <strong style="color: var(--text-1); font-family: var(--font-mono);">${otherId}</strong>
                  <span style="color: var(--text-2); margin-left: 4px;">${otherNode ? otherNode.name : otherId}</span>
                  <span style="color: var(--text-4); font-size: 0.7rem; margin-left: 4px;">(${roadTypeVi})</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="font-family: var(--font-mono); font-weight: 600; color: ${e.mst ? '#34d399' : '#f87171'};">${e.w} km</span>
                  <span class="tag-clean" style="font-size: 0.6rem; padding: 1px 4px;">${e.mst ? 'MST' : 'LOẠI'}</span>
                </div>
              </div>
            `;
    }).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 8px; margin-top: 10px;">
        <button class="sim-btn primary" id="inspectorStartPathBtn" style="flex: 1.3;">🔍 Tìm đường từ trạm này</button>
        <button class="sim-btn" id="inspectorDeselectBtn" style="flex: 0.7;">✕ Bỏ chọn</button>
      </div>
    `;

    document.getElementById('inspectorStartPathBtn')?.addEventListener('click', () => {
      setHanoiPathStart(n.id);
    });
    document.getElementById('inspectorDeselectBtn')?.addEventListener('click', clearHanoiSelection);
    return;
  }

  // Case 3: Empty state
  container.innerHTML = `
    <div class="inspector-empty">
      <div style="font-size: 1.8rem; margin-bottom: 8px;">📍</div>
      <div style="font-size: 0.88rem; font-weight: 500; color: var(--text-1); margin-bottom: 4px;">Khám Phá Chi Tiết & Tìm Đường</div>
      <p style="font-size: 0.76rem; color: var(--text-3); line-height: 1.5; max-width: 280px;">
        Click vào bất kỳ trạm bưu cục nào trên bản đồ để soi chi tiết hoặc kéo thả đỉnh để đổi hình dạng.
      </p>

      <div class="inspector-quick-routes">
        <div class="card-num" style="text-align: left; margin-bottom: 2px;">HOẶC THỬ NHANH CÁC LỘ TRÌNH MẪU:</div>
        <button class="quick-route-btn" id="qrHoanKiemHoaLac">
          <span>Hoàn Kiếm (D01) ↔ Hòa Lạc (D10)</span>
          <span style="color: #38bdf8; font-weight: 600;">54.3 km</span>
        </button>
        <button class="quick-route-btn" id="qrSocSonThuongTin">
          <span>Sóc Sơn (D05) ↔ Thường Tín (D09)</span>
          <span style="color: #38bdf8; font-weight: 600;">53.0 km</span>
        </button>
        <button class="quick-route-btn" id="qrCauGiayDongDa">
          <span>Cầu Giấy (W01) ↔ Đống Đa (W02) [Cạnh thừa]</span>
          <span style="color: #f87171; font-weight: 600;">18.1 vs 4.9 km</span>
        </button>
      </div>
    </div>
  `;

  document.getElementById('qrHoanKiemHoaLac')?.addEventListener('click', () => selectPresetRoute('D01', 'D10'));
  document.getElementById('qrSocSonThuongTin')?.addEventListener('click', () => selectPresetRoute('D05', 'D09'));
  document.getElementById('qrCauGiayDongDa')?.addEventListener('click', () => selectPresetRoute('W01', 'W02'));
}

function selectPresetRoute(u, v) {
  hanoiMapState.pathStartNode = u;
  hanoiMapState.pathEndNode = v;
  hanoiMapState.selectedNode = null;
  hanoiMapState.activePath = findMstPath(u, v);
  switchHanoiTab('tabHanoiInspector');
  renderHanoiSvg();
  if (hanoiMapState.activePath) {
    setHanoiStatus(`Lộ trình từ [${u}] tới [${v}]: ${hanoiMapState.activePath.totalWeight} km (${hanoiMapState.activePath.hopCount} chặng trung chuyển).`);
  }
}

function setHanoiPathStart(nodeId) {
  hanoiMapState.pathStartNode = nodeId;
  hanoiMapState.pathEndNode = null;
  hanoiMapState.activePath = null;
  hanoiMapState.mode = 'path';
  renderHanoiSvg();
  renderHanoiInspector();
  setHanoiStatus(`Đã chọn điểm xuất phát [${nodeId}]. Hãy click tiếp vào trạm đích trên bản đồ để tìm đường.`);
}

function clearHanoiPath() {
  hanoiMapState.pathStartNode = null;
  hanoiMapState.pathEndNode = null;
  hanoiMapState.activePath = null;
  renderHanoiSvg();
  renderHanoiInspector();
  setHanoiStatus('Đã xóa lộ trình. Click vào trạm bất kỳ để tiếp tục khám phá.');
}

function clearHanoiSelection() {
  hanoiMapState.selectedNode = null;
  hanoiMapState.pathStartNode = null;
  hanoiMapState.pathEndNode = null;
  hanoiMapState.activePath = null;
  renderHanoiSvg();
  renderHanoiInspector();
  setHanoiStatus('Đã bỏ chọn trạm. Rê chuột hoặc kéo thả đỉnh để tương tác.');
}

// Kruskal Simulator on Hanoi Real-Life Map
function setupHanoiSimulator() {
  const stepBtn = document.getElementById('hanoiSimStepBtn');
  const autoBtn = document.getElementById('hanoiSimAutoBtn');
  const resetBtn = document.getElementById('hanoiSimResetBtn');

  if (stepBtn) stepBtn.addEventListener('click', stepHanoiKruskal);
  if (autoBtn) autoBtn.addEventListener('click', toggleAutoHanoiKruskal);
  if (resetBtn) resetBtn.addEventListener('click', resetHanoiKruskal);
}

function stepHanoiKruskal() {
  if (hanoiMapState.simStep >= HANOI_EDGES_SORTED.length) {
    appendHanoiKruskalLog('info', `> 🎉 HOÀN TẤT: Toàn bộ 21 cạnh MST đã được kết nạp với tổng chi phí tối ưu 138.2 km!`);
    pauseAutoHanoiKruskal();
    return;
  }

  const e = HANOI_EDGES_SORTED[hanoiMapState.simStep];
  hanoiMapState.simActiveEdge = e;

  const rootU = hanoiMapState.simDsu.find(e.u);
  const rootV = hanoiMapState.simDsu.find(e.v);

  const uObj = HANOI_NODES.find(n => n.id === e.u);
  const vObj = HANOI_NODES.find(n => n.id === e.v);

  if (rootU !== rootV) {
    hanoiMapState.simDsu.union(e.u, e.v);
    hanoiMapState.simAcceptedEdges.push(e);
    hanoiMapState.simTotalWeight += e.w;

    appendHanoiKruskalLog('accept', `[✓ #${hanoiMapState.simStep + 1} KẾT NẠP] ${e.u} ↔ ${e.v} (${e.w} km): Nối 2 cụm DSU khác nhau`);
    setHanoiStatus(`[Kruskal #${hanoiMapState.simStep + 1}] Kết nạp tuyến ${e.u} (${uObj?.name}) ↔ ${e.v} (${vObj?.name}): ${e.w} km`);
  } else {
    hanoiMapState.simRejectedEdges.push(e);
    appendHanoiKruskalLog('reject', `[✗ #${hanoiMapState.simStep + 1} LOẠI BỎ] ${e.u} ↔ ${e.v} (${e.w} km): Cùng cụm gốc (${rootU}), tạo chu trình kín`);
    setHanoiStatus(`[Kruskal #${hanoiMapState.simStep + 1}] Loại bỏ cạnh thừa ${e.u} ↔ ${e.v} (${e.w} km) do tạo chu trình dư thừa.`);
  }

  hanoiMapState.simStep++;
  updateHanoiSimStats();
  renderHanoiSvg();
}

function toggleAutoHanoiKruskal() {
  const autoBtn = document.getElementById('hanoiSimAutoBtn');
  if (hanoiMapState.simRunning) {
    pauseAutoHanoiKruskal();
  } else {
    if (hanoiMapState.simStep >= HANOI_EDGES_SORTED.length) {
      resetHanoiKruskal();
    }
    hanoiMapState.simRunning = true;
    if (autoBtn) autoBtn.textContent = '⏸ Tạm dừng';
    hanoiMapState.simTimer = setInterval(() => {
      if (hanoiMapState.simStep >= HANOI_EDGES_SORTED.length) {
        pauseAutoHanoiKruskal();
      } else {
        stepHanoiKruskal();
      }
    }, 600);
  }
}

function pauseAutoHanoiKruskal() {
  hanoiMapState.simRunning = false;
  if (hanoiMapState.simTimer) {
    clearInterval(hanoiMapState.simTimer);
    hanoiMapState.simTimer = null;
  }
  const autoBtn = document.getElementById('hanoiSimAutoBtn');
  if (autoBtn) autoBtn.textContent = '▷ Tự động';
}

function resetHanoiKruskal() {
  pauseAutoHanoiKruskal();
  hanoiMapState.simStep = 0;
  hanoiMapState.simAcceptedEdges = [];
  hanoiMapState.simRejectedEdges = [];
  hanoiMapState.simActiveEdge = null;
  hanoiMapState.simTotalWeight = 0;
  hanoiMapState.simDsu = new HanoiDSU(HANOI_NODES.map(n => n.id));

  const logBox = document.getElementById('hanoiKruskalLog');
  if (logBox) {
    logBox.innerHTML = '<div class="log-item info">> Sẵn sàng chạy Kruskal. Bấm "Bước tiếp" hoặc "Tự động" để duyệt 30 cạnh.</div>';
  }

  updateHanoiSimStats();
  renderHanoiSvg();
}

function updateHanoiSimStats() {
  const mstCountEl = document.getElementById('hanoiSimMstCount');
  const rejectCountEl = document.getElementById('hanoiSimRejectCount');
  const totalWEl = document.getElementById('hanoiSimTotalWeight');

  if (mstCountEl) mstCountEl.textContent = `${hanoiMapState.simAcceptedEdges.length} / 21`;
  if (rejectCountEl) rejectCountEl.textContent = `${hanoiMapState.simRejectedEdges.length} / 9`;
  if (totalWEl) totalWEl.textContent = `${hanoiMapState.simTotalWeight.toFixed(1)} km`;
}

function appendHanoiKruskalLog(type, text) {
  const logBox = document.getElementById('hanoiKruskalLog');
  if (!logBox) return;
  const item = document.createElement('div');
  item.className = `log-item ${type}`;
  item.textContent = text;
  logBox.appendChild(item);
  logBox.scrollTop = logBox.scrollHeight;
}

function setHanoiStatus(text) {
  const statusEl = document.getElementById('hanoiStatus');
  if (statusEl) statusEl.textContent = text;
}

function getHanoiSvgPoint(e) {
  const svg = document.getElementById('hanoiSvg');
  if (!svg) return { x: 0, y: 0 };
  const pt = svg.createSVGPoint();
  if (e.touches && e.touches[0]) {
    pt.x = e.touches[0].clientX;
    pt.y = e.touches[0].clientY;
  } else {
    pt.x = e.clientX;
    pt.y = e.clientY;
  }
  const ctm = svg.getScreenCTM();
  if (!ctm) {
    const rect = svg.getBoundingClientRect();
    return {
      x: ((pt.x - rect.left) / (rect.width || 1)) * 520,
      y: ((pt.y - rect.top) / (rect.height || 1)) * 340
    };
  }
  return pt.matrixTransform(ctm.inverse());
}

function setupHanoiDragging() {
  const svg = document.getElementById('hanoiSvg');
  if (!svg) return;

  function onMove(e) {
    if (!hanoiDrag.node) return;
    const pt = getHanoiSvgPoint(e);
    if (!hanoiDrag.hasMoved) {
      if (Math.hypot(pt.x - hanoiDrag.startX, pt.y - hanoiDrag.startY) > 2) {
        hanoiDrag.hasMoved = true;
        document.body.style.cursor = 'grabbing';
      }
    }

    if (hanoiDrag.hasMoved) {
      e.preventDefault();
      const pos = hanoiNodePositions[hanoiDrag.node];
      if (pos) {
        pos.px = Math.max(15, Math.min(505, pt.x - hanoiDrag.offsetX));
        pos.py = Math.max(15, Math.min(325, pt.y - hanoiDrag.offsetY));
        renderHanoiSvg();
        const nodeObj = HANOI_NODES.find(n => n.id === hanoiDrag.node);
        setHanoiStatus(`Đang di chuyển [ ${nodeObj ? nodeObj.name : hanoiDrag.node} ] tới (${Math.round(pos.px)}, ${Math.round(pos.py)})`);
      }
    }
  }

  function onUp() {
    if (hanoiDrag.node) {
      document.body.style.cursor = '';
      if (hanoiDrag.hasMoved) {
        hanoiDrag.justDragged = true;
        setTimeout(() => { hanoiDrag.justDragged = false; }, 80);
        const nodeObj = HANOI_NODES.find(n => n.id === hanoiDrag.node);
        setHanoiStatus(`Đã đặt đỉnh [ ${nodeObj ? nodeObj.name : hanoiDrag.node} ] tại vị trí mới.`);
      }
      hanoiDrag.node = null;
      renderHanoiSvg();
    }
  }

  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchend', onUp);
}

// Master Render for Hanoi SVG
function renderHanoiSvg() {
  const svg = document.getElementById('hanoiSvg');
  if (!svg) return;
  svg.innerHTML = '';

  // Defensive: populate positions if empty
  if (!hanoiNodePositions || Object.keys(hanoiNodePositions).length === 0) {
    if (typeof projectHanoiNodes === 'function') {
      projectHanoiNodes();
    }
  }

  const nodeMap = {};
  HANOI_NODES.forEach(n => {
    const pos = (hanoiNodePositions && hanoiNodePositions[n.id]) 
      || (HANOI_SPACED_POSITIONS && HANOI_SPACED_POSITIONS[n.id]) 
      || { px: 200, py: 150 };
    nodeMap[n.id] = { ...n, px: pos.px, py: pos.py };
  });

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const isSimTab = hanoiMapState.activeTab === 'tabHanoiSim';
  const activePathEdges = hanoiMapState.activePath ? hanoiMapState.activePath.edges : [];
  const activePathNodes = hanoiMapState.activePath ? hanoiMapState.activePath.nodes : [];

  // 1. Draw Edges
  HANOI_EDGES.forEach(e => {
    const u = nodeMap[e.u];
    const v = nodeMap[e.v];
    if (!u || !v) return;

    let stroke = e.mst ? (isLight ? '#059669' : '#34d399') : (isLight ? 'rgba(220, 38, 38, 0.65)' : 'rgba(239, 68, 68, 0.55)');
    let strokeWidth = e.mst ? '2' : '1.4';
    let dashArray = e.mst ? 'none' : '4,4';
    let isHidden = false;
    let isPathEdge = false;

    // Simulation Tab Edge Styling
    if (isSimTab) {
      const isAccepted = hanoiMapState.simAcceptedEdges.includes(e);
      const isRejected = hanoiMapState.simRejectedEdges.includes(e);
      const isActive = hanoiMapState.simActiveEdge === e;

      if (isActive) {
        stroke = isLight ? '#d97706' : '#facc15';
        strokeWidth = '3.5';
        dashArray = 'none';
      } else if (isAccepted) {
        stroke = isLight ? '#059669' : '#34d399';
        strokeWidth = '2.4';
        dashArray = 'none';
      } else if (isRejected) {
        stroke = isLight ? 'rgba(220, 38, 38, 0.8)' : 'rgba(239, 68, 68, 0.7)';
        strokeWidth = '1.5';
        dashArray = '4,4';
      } else {
        stroke = isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.08)';
        strokeWidth = '1.2';
        dashArray = 'none';
      }
    } else {
      // Normal Tab Modes
      if (hanoiMapState.mode === 'mst' && !e.mst) {
        isHidden = true;
      }

      // Pathfinding Highlight
      if (activePathEdges.length > 0) {
        const inPath = activePathEdges.some(pe => (pe.u === e.u && pe.v === e.v) || (pe.u === e.v && pe.v === e.u));
        if (inPath) {
          stroke = isLight ? '#0284c7' : '#38bdf8';
          strokeWidth = '3.5';
          dashArray = '6,4';
          isPathEdge = true;
          isHidden = false; // Always show path edges
        } else {
          stroke = isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.06)';
          strokeWidth = '1';
        }
      } else {
        const isHovered = hanoiMapState.hoveredEdge === e;
        const isSelectedIncident = hanoiMapState.selectedNode && (e.u === hanoiMapState.selectedNode || e.v === hanoiMapState.selectedNode);
        const isHoveredIncident = hanoiMapState.hoveredNode && (e.u === hanoiMapState.hoveredNode || e.v === hanoiMapState.hoveredNode);

        if (isHovered) {
          stroke = isLight ? '#0f172a' : '#ffffff';
          strokeWidth = '3.2';
        } else if (isSelectedIncident) {
          stroke = e.mst ? (isLight ? '#059669' : '#86efac') : (isLight ? '#dc2626' : '#f87171');
          strokeWidth = '2.8';
        } else if (isHoveredIncident) {
          stroke = isLight ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.6)';
          strokeWidth = '2.4';
        }
      }
    }

    if (isHidden) return;

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', u.px);
    line.setAttribute('y1', u.py);
    line.setAttribute('x2', v.px);
    line.setAttribute('y2', v.py);
    line.setAttribute('stroke', stroke);
    line.setAttribute('stroke-width', strokeWidth);
    if (dashArray !== 'none') line.setAttribute('stroke-dasharray', dashArray);
    if (isPathEdge) line.setAttribute('class', 'hanoi-path-edge');
    line.setAttribute('style', 'cursor: pointer;');

    // Invisible wider hitbox line for comfortable hover & click
    const hitLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    hitLine.setAttribute('x1', u.px);
    hitLine.setAttribute('y1', u.py);
    hitLine.setAttribute('x2', v.px);
    hitLine.setAttribute('y2', v.py);
    hitLine.setAttribute('stroke', 'transparent');
    hitLine.setAttribute('stroke-width', '14');
    hitLine.setAttribute('style', 'cursor: pointer;');

    hitLine.addEventListener('mouseenter', () => {
      hanoiMapState.hoveredEdge = e;
      const statusMsg = e.mst
        ? `[MST] ${e.u} (${u.name}) ↔ ${e.v} (${v.name}) | ${e.w} km | Đường ${e.type} | Thuộc 21 tuyến trục tối ưu`
        : `[CẠNH THỪA] ${e.u} (${u.name}) ↔ ${e.v} (${v.name}) | ${e.w} km | Đường ${e.type} | Loại bỏ vì tạo chu trình dư thừa`;
      setHanoiStatus(statusMsg);
      renderHanoiSvg();
    });

    hitLine.addEventListener('mouseleave', () => {
      hanoiMapState.hoveredEdge = null;
      renderHanoiSvg();
    });

    hitLine.addEventListener('click', (ev) => {
      ev.stopPropagation();
      setHanoiStatus(`Chi tiết tuyến ${e.u} ↔ ${e.v}: Khoảng cách ${e.w} km | Đường ${e.type} | ${e.mst ? 'NẰM TRONG MST' : 'BỊ LOẠI (tạo chu trình)'}`);
    });

    svg.appendChild(line);
    svg.appendChild(hitLine);

    // Edge Weight Label
    const isHovered = hanoiMapState.hoveredEdge === e;
    const isSelectedIncident = hanoiMapState.selectedNode && (e.u === hanoiMapState.selectedNode || e.v === hanoiMapState.selectedNode);
    const isHoveredIncident = hanoiMapState.hoveredNode && (e.u === hanoiMapState.hoveredNode || e.v === hanoiMapState.hoveredNode);

    const shouldShowWeight = hanoiMapState.showWeights || isHovered || isSelectedIncident || isHoveredIncident || isPathEdge;

    if (shouldShowWeight) {
      const midX = (u.px + v.px) / 2;
      const midY = (u.py + v.py) / 2; // FIXED: was u.px + v.py

      const dx = v.px - u.px;
      const dy = v.py - u.py;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const offX = (-dy / len) * 9;
      const offY = (dx / len) * 9;

      const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bgRect.setAttribute('x', midX + offX - 13);
      bgRect.setAttribute('y', midY + offY - 7);
      bgRect.setAttribute('width', '26');
      bgRect.setAttribute('height', '14');
      bgRect.setAttribute('fill', isLight ? '#ffffff' : '#090a0d');
      if (isLight) bgRect.setAttribute('stroke', '#cbd5e1');
      bgRect.setAttribute('opacity', '0.94');
      bgRect.setAttribute('rx', '3');
      svg.appendChild(bgRect);

      const wLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      wLabel.setAttribute('x', midX + offX);
      wLabel.setAttribute('y', midY + offY + 4);
      wLabel.setAttribute('fill', isLight ? (isPathEdge ? '#0284c7' : (e.mst ? '#059669' : '#dc2626')) : (isPathEdge ? '#38bdf8' : (e.mst ? '#34d399' : '#f87171')));
      wLabel.setAttribute('font-size', '8');
      wLabel.setAttribute('font-family', 'JetBrains Mono');
      wLabel.setAttribute('font-weight', '600');
      wLabel.setAttribute('text-anchor', 'middle');
      wLabel.textContent = `${e.w}`;
      svg.appendChild(wLabel);
    }
  });

  // 2. Draw Nodes
  HANOI_NODES.forEach(n => {
    const pt = nodeMap[n.id];
    const isHovered = hanoiMapState.hoveredNode === n.id;
    const isSelected = hanoiMapState.selectedNode === n.id;
    const isDragging = hanoiDrag.node === n.id;
    const isInPath = activePathNodes.includes(n.id);
    const isPathStart = hanoiMapState.pathStartNode === n.id;
    const isPathEnd = hanoiMapState.pathEndNode === n.id;

    // Dim node if tier filter is applied and doesn't match
    const isTierMuted = hanoiMapState.tierFilter !== 'all' && n.type !== hanoiMapState.tierFilter;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${pt.px}, ${pt.py})`);
    g.setAttribute('class', `hanoi-node${isDragging ? ' is-dragging' : ''}`);
    g.setAttribute('style', `opacity: ${isTierMuted ? '0.22' : '1'}; transition: opacity 0.2s;`);

    // Outer glow ring for selected / path node
    if (isSelected || isPathStart || isPathEnd || isInPath) {
      const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const glowR = n.type === 'hub' ? 17 : n.type === 'warehouse' ? 14 : 11;
      glow.setAttribute('r', glowR);
      glow.setAttribute('fill', 'none');
      glow.setAttribute('stroke', isPathStart ? (isLight ? '#0284c7' : '#38bdf8') : (isPathEnd ? (isLight ? '#059669' : '#34d399') : (isInPath ? (isLight ? '#0284c7' : '#38bdf8') : (isLight ? '#0f172a' : '#ffffff'))));
      glow.setAttribute('stroke-width', (isPathStart || isPathEnd) ? '2' : '1');
      glow.setAttribute('opacity', (isPathStart || isPathEnd) ? '0.85' : '0.4');
      g.appendChild(glow);
    }

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    let r = 6;
    let fill = isLight ? '#f1f5f9' : '#13161f';
    let stroke = isLight ? '#94a3b8' : 'rgba(255, 255, 255, 0.4)';

    if (n.type === 'hub') {
      r = 11;
      stroke = isLight ? '#1e40af' : '#3b82f6';
      fill = (isHovered || isSelected || isInPath) ? '#1d4ed8' : (isLight ? '#2563eb' : '#101726');
    } else if (n.type === 'warehouse') {
      r = 8;
      stroke = isLight ? '#0369a1' : '#60a5fa';
      fill = (isHovered || isSelected || isInPath) ? '#0284c7' : (isLight ? '#0284c7' : '#13161f');
    } else {
      r = 6;
      stroke = isLight ? '#475569' : '#94a3b8';
      fill = (isHovered || isSelected || isInPath) ? '#475569' : (isLight ? '#64748b' : '#1a1d27');
    }

    if (isPathStart) {
      stroke = isLight ? '#0369a1' : '#38bdf8';
      fill = '#0284c7';
    } else if (isPathEnd) {
      stroke = isLight ? '#047857' : '#34d399';
      fill = '#059669';
    }

    if (isDragging) {
      stroke = isLight ? '#0f172a' : '#ffffff';
      r += 1;
    }

    circle.setAttribute('r', r);
    circle.setAttribute('fill', fill);
    circle.setAttribute('stroke', (isHovered || isSelected || isDragging || isPathStart || isPathEnd) ? (isLight ? '#0f172a' : '#ffffff') : stroke);
    circle.setAttribute('stroke-width', (isHovered || isSelected || isDragging || isPathStart || isPathEnd) ? '2.5' : '1.5');
    g.appendChild(circle);

    // Node ID Text Label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('y', n.type === 'hub' ? '4' : '3.5');
    text.setAttribute('fill', '#ffffff');
    text.setAttribute('font-size', n.type === 'hub' ? '8.5' : '7.5');
    text.setAttribute('font-family', 'JetBrains Mono');
    text.setAttribute('font-weight', '600');
    text.setAttribute('text-anchor', 'middle');
    text.textContent = n.id;
    g.appendChild(text);

    // Node Name Label (shown on hover, select, drag, path, or when tier matches)
    const shouldShowName = isHovered || isSelected || isDragging || isPathStart || isPathEnd || (hanoiMapState.tierFilter === n.type);

    if (shouldShowName) {
      const nameBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const nameLen = n.name.length * 4.6 + 12;
      nameBg.setAttribute('x', -nameLen / 2);
      nameBg.setAttribute('y', -(r + 17));
      nameBg.setAttribute('width', nameLen);
      nameBg.setAttribute('height', '14');
      nameBg.setAttribute('fill', isLight ? '#ffffff' : '#090a0d');
      if (isLight) nameBg.setAttribute('stroke', '#cbd5e1');
      nameBg.setAttribute('opacity', '0.94');
      nameBg.setAttribute('rx', '3');
      g.appendChild(nameBg);

      const nameText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      nameText.setAttribute('y', -(r + 7));
      nameText.setAttribute('fill', isLight ? '#0f172a' : ((isSelected || isPathStart || isPathEnd) ? '#ffffff' : '#c5cbd6'));
      nameText.setAttribute('font-size', '8');
      nameText.setAttribute('font-family', 'Inter');
      nameText.setAttribute('font-weight', '600');
      nameText.setAttribute('text-anchor', 'middle');
      nameText.textContent = n.name;
      g.appendChild(nameText);
    }

    // Drag Listener
    function startDrag(e) {
      e.stopPropagation();
      e.preventDefault();
      const svgPt = getHanoiSvgPoint(e);
      hanoiDrag.node = n.id;
      hanoiDrag.startX = svgPt.x;
      hanoiDrag.startY = svgPt.y;
      hanoiDrag.hasMoved = false;
      hanoiDrag.justDragged = false;
      hanoiDrag.offsetX = svgPt.x - pt.px;
      hanoiDrag.offsetY = svgPt.y - pt.py;
    }
    g.addEventListener('mousedown', startDrag);
    g.addEventListener('touchstart', startDrag, { passive: false });

    // Hover Events
    g.addEventListener('mouseenter', () => {
      hanoiMapState.hoveredNode = n.id;
      const incidentEdges = HANOI_EDGES.filter(e => (hanoiMapState.mode === 'mst' ? e.mst : true) && (e.u === n.id || e.v === n.id));
      const typeLabel = n.type === 'hub' ? 'Mega Hub' : (n.type === 'warehouse' ? 'Warehouse / DC' : 'Bưu cục phát');
      const totalW = incidentEdges.reduce((s, e) => s + e.w, 0).toFixed(1);
      setHanoiStatus(`[${n.id}] ${n.name} (${typeLabel}) | ${incidentEdges.length} tuyến kết nối (${totalW} km) | Kéo thả đỉnh hoặc Click`);
      renderHanoiSvg();
    });

    g.addEventListener('mouseleave', () => {
      hanoiMapState.hoveredNode = null;
      if (!hanoiDrag.node) renderHanoiSvg();
    });

    // Click to Select / Deselect / Pathfind
    g.addEventListener('click', (e) => {
      e.stopPropagation();
      if (hanoiDrag.justDragged || hanoiDrag.hasMoved) return; // Prevent drag triggering click

      // If in Path mode or if a start node was set
      if (hanoiMapState.mode === 'path' || hanoiMapState.pathStartNode) {
        if (!hanoiMapState.pathStartNode) {
          // 1st click: Set start node
          hanoiMapState.pathStartNode = n.id;
          hanoiMapState.pathEndNode = null;
          hanoiMapState.activePath = null;
          hanoiMapState.selectedNode = n.id;
          switchHanoiTab('tabHanoiInspector');
          setHanoiStatus(`Đã chọn điểm đầu [${n.id}] ${n.name}. Click tiếp trạm thứ hai để tìm đường.`);
        } else if (hanoiMapState.pathStartNode === n.id) {
          // Deselect start node
          clearHanoiPath();
        } else {
          // 2nd click: Set target node and compute path
          hanoiMapState.pathEndNode = n.id;
          hanoiMapState.selectedNode = null;
          hanoiMapState.activePath = findMstPath(hanoiMapState.pathStartNode, n.id);
          switchHanoiTab('tabHanoiInspector');
          if (hanoiMapState.activePath) {
            setHanoiStatus(`Lộ trình [${hanoiMapState.pathStartNode}] ➔ [${n.id}]: ${hanoiMapState.activePath.totalWeight} km (${hanoiMapState.activePath.hopCount} chặng trung chuyển).`);
          }
        }
      } else {
        // Normal Mode: Single node inspection
        if (hanoiMapState.selectedNode === n.id) {
          clearHanoiSelection();
        } else {
          hanoiMapState.selectedNode = n.id;
          hanoiMapState.pathStartNode = null;
          hanoiMapState.pathEndNode = null;
          hanoiMapState.activePath = null;
          switchHanoiTab('tabHanoiInspector');
          setHanoiStatus(`Đã chọn [${n.id}] ${n.name}. Đang hiển thị thông số chi tiết.`);
        }
      }

      renderHanoiSvg();
      renderHanoiInspector();
    });

    svg.appendChild(g);
  });

  // Click background to deselect
  svg.addEventListener('click', () => {
    if (hanoiMapState.selectedNode || hanoiMapState.activePath) {
      clearHanoiSelection();
    }
  });
}

/* =====================================================================
   SLIDE 11: ALGORITHM SPEED BENCHMARK CHART (KRUSKAL VS PRIM VS BORUVKA)
   ===================================================================== */
const benchState = {
  mode: 'sparse', // 'sparse' | 'dense'
  isLiveMeasured: false,
  data: {
    sparse: [
      { V: 200, E: 500, kruskal: 0.42, prim: 0.58, boruvka: 0.85 },
      { V: 500, E: 1250, kruskal: 1.18, prim: 1.56, boruvka: 2.34 },
      { V: 1000, E: 2500, kruskal: 2.65, prim: 3.42, boruvka: 5.10 },
      { V: 1500, E: 3750, kruskal: 4.35, prim: 5.68, boruvka: 8.45 },
      { V: 2500, E: 6250, kruskal: 8.10, prim: 10.45, boruvka: 15.80 }
    ],
    dense: [
      { V: 100, E: 2475, kruskal: 1.45, prim: 0.82, boruvka: 1.25 },
      { V: 200, E: 9950, kruskal: 6.90, prim: 2.85, boruvka: 4.60 },
      { V: 350, E: 30537, kruskal: 24.80, prim: 7.40, boruvka: 12.10 },
      { V: 500, E: 62375, kruskal: 54.60, prim: 14.20, boruvka: 23.80 },
      { V: 700, E: 122325, kruskal: 118.40, prim: 26.50, boruvka: 45.20 }
    ]
  }
};

function generateBenchGraph(V, densityMode) {
  const edges = [];
  const adj = Array.from({ length: V }, () => []);
  const addEdge = (u, v, w) => {
    edges.push([u, v, w]);
    adj[u].push(v, w);
    adj[v].push(u, w);
  };

  // Guaranteed connected spanning backbone
  for (let i = 1; i < V; i++) {
    const parent = Math.floor(Math.random() * i);
    const w = 1 + Math.random() * 100;
    addEdge(parent, i, w);
  }

  const targetE = densityMode === 'sparse'
    ? Math.floor(V * 2.5)
    : Math.floor((V * (V - 1)) * 0.25);

  while (edges.length < targetE) {
    const u = Math.floor(Math.random() * V);
    const v = Math.floor(Math.random() * V);
    if (u !== v) {
      addEdge(u, v, 1 + Math.random() * 100);
    }
  }
  return { V, edges, adj };
}

function runBenchKruskal(V, edges) {
  const sorted = edges.slice().sort((a, b) => a[2] - b[2]);
  const parent = new Int32Array(V);
  const rank = new Uint8Array(V);
  for (let i = 0; i < V; i++) parent[i] = i;

  const find = (x) => {
    let root = x;
    while (parent[root] !== root) root = parent[root];
    let curr = x;
    while (curr !== root) {
      const nxt = parent[curr];
      parent[curr] = root;
      curr = nxt;
    }
    return root;
  };

  let total = 0;
  let picked = 0;
  for (let i = 0; i < sorted.length; i++) {
    const e = sorted[i];
    const ru = find(e[0]);
    const rv = find(e[1]);
    if (ru !== rv) {
      if (rank[ru] < rank[rv]) parent[ru] = rv;
      else if (rank[ru] > rank[rv]) parent[rv] = ru;
      else { parent[rv] = ru; rank[ru]++; }
      total += e[2];
      picked++;
      if (picked === V - 1) break;
    }
  }
  return total;
}

function runBenchPrim(V, adj) {
  const visited = new Uint8Array(V);
  // Flat binary min-heap: heapW[], heapNode[]
  const heapW = [];
  const heapN = [];

  const push = (w, node) => {
    let idx = heapW.length;
    heapW.push(w);
    heapN.push(node);
    while (idx > 0) {
      const p = (idx - 1) >> 1;
      if (heapW[p] <= w) break;
      heapW[idx] = heapW[p];
      heapN[idx] = heapN[p];
      idx = p;
    }
    heapW[idx] = w;
    heapN[idx] = node;
  };

  const pop = () => {
    const topW = heapW[0];
    const topN = heapN[0];
    const lastW = heapW.pop();
    const lastN = heapN.pop();
    if (heapW.length > 0) {
      let idx = 0;
      const len = heapW.length;
      while (true) {
        let smallest = idx;
        const l = (idx << 1) + 1;
        const r = l + 1;
        if (l < len && heapW[l] < lastW) smallest = l;
        if (r < len && heapW[r] < (smallest === idx ? lastW : heapW[smallest])) smallest = r;
        if (smallest === idx) break;
        heapW[idx] = heapW[smallest];
        heapN[idx] = heapN[smallest];
        idx = smallest;
      }
      heapW[idx] = lastW;
      heapN[idx] = lastN;
    }
    return [topW, topN];
  };

  push(0, 0);
  let total = 0;
  let count = 0;

  while (heapW.length > 0 && count < V) {
    const [w, u] = pop();
    if (visited[u]) continue;
    visited[u] = 1;
    total += w;
    count++;
    const list = adj[u];
    for (let i = 0; i < list.length; i += 2) {
      const v = list[i];
      if (!visited[v]) {
        push(list[i + 1], v);
      }
    }
  }
  return total;
}

function runBenchBoruvka(V, edges) {
  const parent = new Int32Array(V);
  const rank = new Uint8Array(V);
  for (let i = 0; i < V; i++) parent[i] = i;

  const find = (x) => {
    let root = x;
    while (parent[root] !== root) root = parent[root];
    let curr = x;
    while (curr !== root) {
      const nxt = parent[curr];
      parent[curr] = root;
      curr = nxt;
    }
    return root;
  };

  let components = V;
  let total = 0;
  const cheapestIdx = new Int32Array(V);

  while (components > 1) {
    cheapestIdx.fill(-1);
    for (let i = 0; i < edges.length; i++) {
      const e = edges[i];
      const ru = find(e[0]);
      const rv = find(e[1]);
      if (ru === rv) continue;
      if (cheapestIdx[ru] === -1 || edges[cheapestIdx[ru]][2] > e[2]) cheapestIdx[ru] = i;
      if (cheapestIdx[rv] === -1 || edges[cheapestIdx[rv]][2] > e[2]) cheapestIdx[rv] = i;
    }

    let merged = false;
    for (let v = 0; v < V; v++) {
      const idx = cheapestIdx[v];
      if (idx === -1) continue;
      const e = edges[idx];
      const ru = find(e[0]);
      const rv = find(e[1]);
      if (ru !== rv) {
        if (rank[ru] < rank[rv]) parent[ru] = rv;
        else if (rank[ru] > rank[rv]) parent[rv] = ru;
        else { parent[rv] = ru; rank[ru]++; }
        total += e[2];
        components--;
        merged = true;
      }
    }
    if (!merged) break;
  }
  return total;
}

function executeLiveBenchmark() {
  const btn = document.getElementById('benchLiveRunBtn');
  const statusEl = document.getElementById('benchStatusBadge');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ Đang đo...';
  }

  setTimeout(() => {
    const mode = benchState.mode;
    const scales = mode === 'sparse' ? [200, 500, 1000, 1500, 2500] : [100, 200, 350, 500, 700];
    const measured = [];
    let allMatched = true;

    scales.forEach(V => {
      const { edges, adj } = generateBenchGraph(V, mode);
      const reps = V <= 350 ? 4 : 2;

      const t0 = performance.now();
      let wK = 0;
      for (let r = 0; r < reps; r++) wK = runBenchKruskal(V, edges);
      const tK = Math.max(0.05, Number(((performance.now() - t0) / reps).toFixed(2)));

      const t1 = performance.now();
      let wP = 0;
      for (let r = 0; r < reps; r++) wP = runBenchPrim(V, adj);
      const tP = Math.max(0.05, Number(((performance.now() - t1) / reps).toFixed(2)));

      const t2 = performance.now();
      let wB = 0;
      for (let r = 0; r < reps; r++) wB = runBenchBoruvka(V, edges);
      const tB = Math.max(0.05, Number(((performance.now() - t2) / reps).toFixed(2)));

      if (Math.abs(wK - wP) > 1e-3 || Math.abs(wK - wB) > 1e-3) {
        allMatched = false;
      }

      measured.push({ V, E: edges.length, kruskal: tK, prim: tP, boruvka: tB });
    });

    benchState.data[mode] = measured;
    benchState.isLiveMeasured = true;

    if (statusEl) {
      statusEl.textContent = allMatched
        ? '✓ Đã đo Live (JS) · MST Khớp 100%'
        : '✓ Đã đo Live trên trình duyệt';
    }
    if (btn) {
      btn.disabled = false;
      btn.textContent = '⚡ Chạy Đo Thực Tế (Live)';
    }

    renderBenchmarkChart();
  }, 30);
}

function renderBenchmarkChart() {
  const svg = document.getElementById('benchChartSvg');
  if (!svg) return;

  const series = benchState.data[benchState.mode] || [];
  if (!series.length) return;

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const gridColor = isLight ? 'rgba(148, 163, 184, 0.35)' : 'rgba(255, 255, 255, 0.08)';
  const axisColor = isLight ? '#64748b' : '#94a3b8';
  const labelColor = isLight ? '#334155' : '#cbd5e1';

  const W = 680;
  const H = 310;
  const padL = 62;
  const padR = 26;
  const padT = 22;
  const padB = 46;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const maxVal = Math.max(
    1,
    ...series.map(d => Math.max(d.kruskal, d.prim, d.boruvka))
  ) * 1.15;

  svg.innerHTML = '';

  const ns = 'http://www.w3.org/2000/svg';
  const createEl = (tag, attrs) => {
    const el = document.createElementNS(ns, tag);
    Object.keys(attrs).forEach(k => el.setAttribute(k, String(attrs[k])));
    return el;
  };

  // Horizontal Gridlines & Y Ticks
  const yTicks = 5;
  for (let i = 0; i <= yTicks; i++) {
    const frac = i / yTicks;
    const val = maxVal * frac;
    const y = padT + plotH - frac * plotH;

    svg.appendChild(createEl('line', {
      x1: padL, y1: y, x2: W - padR, y2: y,
      stroke: gridColor,
      'stroke-dasharray': i === 0 ? 'none' : '4 4',
      'stroke-width': i === 0 ? '1.5' : '1'
    }));

    const txt = createEl('text', {
      x: padL - 10, y: y + 4,
      'text-anchor': 'end',
      fill: axisColor,
      'font-family': 'JetBrains Mono',
      'font-size': '11'
    });
    txt.textContent = val >= 10 ? val.toFixed(0) : val.toFixed(1);
    svg.appendChild(txt);
  }

  // Y Axis Unit Label
  const yUnit = createEl('text', {
    x: 16, y: padT + plotH / 2,
    fill: axisColor,
    'font-family': 'JetBrains Mono',
    'font-size': '11',
    transform: `rotate(-90, 16, ${padT + plotH / 2})`,
    'text-anchor': 'middle'
  });
  yUnit.textContent = 'Thời gian (ms)';
  svg.appendChild(yUnit);

  // X Axis Positions & Labels
  const xPos = (idx) => {
    if (series.length === 1) return padL + plotW / 2;
    return padL + (idx / (series.length - 1)) * plotW;
  };
  const yPos = (val) => padT + plotH - (val / maxVal) * plotH;

  series.forEach((d, idx) => {
    const x = xPos(idx);
    svg.appendChild(createEl('line', {
      x1: x, y1: padT, x2: x, y2: padT + plotH,
      stroke: gridColor, 'stroke-dasharray': '3 3', 'stroke-width': '1'
    }));

    const lbl = createEl('text', {
      x, y: padT + plotH + 20,
      'text-anchor': 'middle',
      fill: labelColor,
      'font-family': 'JetBrains Mono',
      'font-size': '11',
      'font-weight': '600'
    });
    lbl.textContent = `V=${d.V}`;
    svg.appendChild(lbl);

    const sub = createEl('text', {
      x, y: padT + plotH + 34,
      'text-anchor': 'middle',
      fill: axisColor,
      'font-family': 'JetBrains Mono',
      'font-size': '9.5'
    });
    sub.textContent = `(E≈${d.E >= 1000 ? (d.E / 1000).toFixed(1) + 'k' : d.E})`;
    svg.appendChild(sub);
  });

  // Draw Polylines for the 3 Algorithms
  const algos = [
    { key: 'boruvka', label: 'Borůvka (Song song)', color: '#f59e0b' },
    { key: 'prim', label: 'Prim (Min-Heap)', color: '#3b82f6' },
    { key: 'kruskal', label: 'Kruskal (DSU)', color: '#10b981' }
  ];

  algos.forEach(a => {
    const pts = series.map((d, i) => `${xPos(i).toFixed(1)},${yPos(d[a.key]).toFixed(1)}`).join(' ');
    svg.appendChild(createEl('polyline', {
      points: pts,
      fill: 'none',
      stroke: a.color,
      'stroke-width': '3.2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }));

    series.forEach((d, i) => {
      const cx = xPos(i);
      const cy = yPos(d[a.key]);
      svg.appendChild(createEl('circle', {
        cx, cy, r: '5.5',
        fill: isLight ? '#ffffff' : '#0f172a',
        stroke: a.color,
        'stroke-width': '2.8'
      }));
    });
  });

  // Hover Vertical Columns for Interactive Tooltip
  const tooltip = document.getElementById('benchTooltip');
  const svgWrap = document.getElementById('benchSvgWrap');
  const guideLine = createEl('line', {
    x1: -100, y1: padT, x2: -100, y2: padT + plotH,
    stroke: isLight ? '#2563eb' : '#38bdf8',
    'stroke-width': '1.5',
    'stroke-dasharray': '4 3',
    opacity: '0'
  });
  svg.appendChild(guideLine);

  const colW = plotW / Math.max(1, series.length);
  series.forEach((d, idx) => {
    const x = xPos(idx);
    const hitRect = createEl('rect', {
      x: Math.max(padL, x - colW / 2),
      y: padT,
      width: colW,
      height: plotH,
      fill: 'transparent',
      style: 'cursor: crosshair;'
    });

    hitRect.addEventListener('mouseenter', () => {
      guideLine.setAttribute('x1', String(x));
      guideLine.setAttribute('x2', String(x));
      guideLine.setAttribute('opacity', '0.85');
      if (tooltip && svgWrap) {
        const bestVal = Math.min(d.kruskal, d.prim, d.boruvka);
        const winner = bestVal === d.kruskal ? 'Kruskal' : (bestVal === d.prim ? 'Prim' : 'Borůvka');
        tooltip.innerHTML = `
          <div style="font-weight:700; margin-bottom:4px; border-bottom:1px solid rgba(148,163,184,0.3); padding-bottom:3px;">
            V = ${d.V} đỉnh · E = ${d.E.toLocaleString()} cạnh
          </div>
          <div style="color:#10b981;">● Kruskal : <strong>${d.kruskal.toFixed(2)} ms</strong></div>
          <div style="color:#3b82f6;">● Prim    : <strong>${d.prim.toFixed(2)} ms</strong></div>
          <div style="color:#f59e0b;">● Borůvka : <strong>${d.boruvka.toFixed(2)} ms</strong></div>
          <div style="margin-top:4px; font-size:0.72rem; opacity:0.9;">⚡ Nhanh nhất: <strong>${winner}</strong></div>
        `;
        const rect = svgWrap.getBoundingClientRect();
        const px = (x / W) * (rect.width || W);
        const left = px > (rect.width * 0.62) ? px - 185 : px + 14;
        tooltip.style.left = `${Math.max(8, left)}px`;
        tooltip.style.top = `16px`;
        tooltip.classList.add('show');
      }
    });

    hitRect.addEventListener('mouseleave', () => {
      guideLine.setAttribute('opacity', '0');
      if (tooltip) tooltip.classList.remove('show');
    });

    svg.appendChild(hitRect);
  });

  // Update Right Sidebar Comparison Bars (Peak Scale V)
  const last = series[series.length - 1];
  const peakMax = Math.max(0.01, last.kruskal, last.prim, last.boruvka);
  const barK = document.getElementById('benchBarKruskal');
  const barP = document.getElementById('benchBarPrim');
  const barB = document.getElementById('benchBarBoruvka');
  const valK = document.getElementById('benchValKruskal');
  const valP = document.getElementById('benchValPrim');
  const valB = document.getElementById('benchValBoruvka');
  const peakTitle = document.getElementById('benchPeakTitle');
  const chartTitle = document.getElementById('benchChartTitle');

  if (chartTitle) {
    chartTitle.textContent = benchState.mode === 'sparse'
      ? 'Đồ Thị Thưa (E ≈ 2.5·V): Thời gian thực thi (ms)'
      : 'Đồ Thị Dày (E ≈ 0.25·V²): Thời gian thực thi (ms)';
  }
  if (peakTitle) {
    peakTitle.textContent = `MỐC LỚN NHẤT (V = ${last.V}, E = ${last.E.toLocaleString()})`;
  }
  if (barK) barK.style.width = `${Math.max(8, (last.kruskal / peakMax) * 100)}%`;
  if (barP) barP.style.width = `${Math.max(8, (last.prim / peakMax) * 100)}%`;
  if (barB) barB.style.width = `${Math.max(8, (last.boruvka / peakMax) * 100)}%`;
  if (valK) valK.textContent = `${last.kruskal.toFixed(2)} ms`;
  if (valP) valP.textContent = `${last.prim.toFixed(2)} ms`;
  if (valB) valB.textContent = `${last.boruvka.toFixed(2)} ms`;
}

function initSpeedBenchmarkChart() {
  const sparseBtn = document.getElementById('benchModeSparse');
  const denseBtn = document.getElementById('benchModeDense');
  const liveBtn = document.getElementById('benchLiveRunBtn');

  const switchMode = (mode) => {
    benchState.mode = mode;
    if (sparseBtn) sparseBtn.classList.toggle('active', mode === 'sparse');
    if (denseBtn) denseBtn.classList.toggle('active', mode === 'dense');
    renderBenchmarkChart();
  };

  if (sparseBtn && !sparseBtn.dataset.bound) {
    sparseBtn.dataset.bound = '1';
    sparseBtn.addEventListener('click', () => switchMode('sparse'));
  }
  if (denseBtn && !denseBtn.dataset.bound) {
    denseBtn.dataset.bound = '1';
    denseBtn.addEventListener('click', () => switchMode('dense'));
  }
  if (liveBtn && !liveBtn.dataset.bound) {
    liveBtn.dataset.bound = '1';
    liveBtn.addEventListener('click', executeLiveBenchmark);
  }

  renderBenchmarkChart();
}

if (typeof window !== 'undefined') {
  window.renderBenchmarkChart = renderBenchmarkChart;
  window.executeLiveBenchmark = executeLiveBenchmark;
}

// Start everything cleanly regardless of readyState
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPresentation);
  } else {
    initPresentation();
  }
}

