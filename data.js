// Dữ liệu chi tiết cho website Tiếng Việt Thực Hành

const APP_DATA = {
  generalInfo: {
    courseName: "Tiếng Việt thực hành",
    courseCode: "TVTH201 (mã tham khảo)",
    credits: "02 tín chỉ (mẫu: 30 tiết trên lớp; 18 lý thuyết + 12 thực hành/thảo luận; 60 giờ tự học dự kiến)",
    target: "Sinh viên cao đẳng, đại học và người làm việc với văn bản",
    department: "Cần bổ sung theo cơ sở đào tạo",
    instructor: "Cần bổ sung theo cơ sở đào tạo",
    courseType: "Bắt buộc/tự chọn: cần xác nhận",
    prerequisite: "Theo chương trình đào tạo của cơ sở",
    description: "Học phần rèn quy tắc chính tả, cách dùng từ Hán Việt, từ đồng nghĩa, từ trái nghĩa và từ đa nghĩa/đồng âm; người học vận dụng kiến thức để sửa câu, biên tập đoạn văn và giải thích lựa chọn ngôn ngữ."
  },

  clos: [
    { code: "CLO 1", bloom: "Mức 2 (Thông hiểu)", desc: "Trình bày, giải thích được quy tắc chính tả và đặc điểm của từ Hán Việt, từ đồng nghĩa, từ trái nghĩa, từ đa nghĩa và từ đồng âm." },
    { code: "CLO 2", bloom: "Mức 4 (Phân tích)", desc: "Phân tích được lỗi chính tả, lỗi dùng từ Hán Việt, sắc thái từ đồng nghĩa/trái nghĩa và quan hệ nghĩa trong ngữ cảnh." },
    { code: "CLO 3", bloom: "Mức 3 (Vận dụng)", desc: "Vận dụng kiến thức của cả 5 chuyên đề để chọn từ, sửa câu và viết đoạn văn phù hợp nghĩa, chính tả và phong cách." },
    { code: "CLO 4", bloom: "Mức 5 (Đánh giá)", desc: "Biên tập, giải thích và đánh giá phương án chỉnh sửa một văn bản ngắn theo tiêu chí chính tả, ngữ nghĩa, liên kết và phong cách." }
  ],

  teachingMethods: [
    "Giảng giải ngắn kết hợp ví dụ đối chiếu; ưu tiên người học tự nêu quy tắc từ dữ liệu ngôn ngữ.",
    "Luyện tập cá nhân và theo cặp: nhận diện, phân loại, tra từ điển, sửa lỗi và giải thích căn cứ.",
    "Thảo luận nhóm, phản biện lựa chọn từ theo ngữ cảnh và bình duyệt đoạn văn.",
    "Bài tập tích hợp: biên tập câu/đoạn văn có lỗi thuộc nhiều chuyên đề; nộp bản sửa kèm lý do."
  ],

  studentResponsibilities: [
    "Đọc trước tài liệu được giảng viên giao và chuẩn bị từ điển hoặc nguồn tra cứu đáng tin cậy.",
    "Tham gia hoạt động cá nhân/nhóm; nộp phiếu bài tập và sản phẩm tự học đúng hạn.",
    "Khi sửa văn bản, ghi vị trí lỗi, phương án sửa và căn cứ; không chỉ đánh dấu đúng/sai.",
    "Tuân thủ quy định chuyên cần, liêm chính học thuật và hình thức nộp bài của cơ sở đào tạo."
  ],

  references: [
    "Bùi Minh Toán, Lê A và Đỗ Hùng Việt (2012), Tiếng Việt thực hành, NXB Giáo dục, Hà Nội.",
    "Hoàng Phê (chủ biên, 2020), Từ điển tiếng Việt, Viện Ngôn ngữ học, NXB Đà Nẵng.",
    "Đào Duy Anh (2005), Hán Việt từ điển, NXB Văn hóa Thông tin.",
    "Nguyễn Đức Dân (2007), Từ vựng - Ngữ nghĩa tiếng Việt, NXB Giáo dục.",
    "Chính phủ (2020), Nghị định số 30/2020/NĐ-CP về công tác văn thư.",
    "Bộ Giáo dục và Đào tạo (2018), Quyết định số 1989/QĐ-BGDĐT về chính tả trong chương trình, sách giáo khoa giáo dục phổ thông; áp dụng đúng phạm vi văn bản."
  ],

  courseSchedule: [
    { session: 1, topic: "Chuyên đề 1: chính tả", content: "Phụ âm đầu; quy tắc phối hợp chữ cái; vần và âm cuối.", activity: "Làm phiếu chẩn đoán; phân biệt s/x, tr/ch, d/gi/r, l/n; tra từ điển khi không chắc.", clos: "CLO 1, CLO 2" },
    { session: 2, topic: "Chuyên đề 1: chính tả", content: "Thanh điệu; viết hoa; quy trình soát lỗi.", activity: "Sửa một đoạn văn ngắn, phân loại lỗi và giải thích từng cách sửa.", clos: "CLO 1, CLO 2, CLO 4" },
    { session: 3, topic: "Chuyên đề 2: từ Hán Việt", content: "Yếu tố Hán Việt; từ ghép đẳng lập/chính phụ; trật tự thành tố.", activity: "Tra nghĩa yếu tố; lập bảng cấu tạo và giải nghĩa từ trong ngữ cảnh.", clos: "CLO 1, CLO 2" },
    { session: 4, topic: "Chuyên đề 2: từ Hán Việt", content: "Yếu tố đồng âm; lỗi dùng từ; lựa chọn từ theo văn phong.", activity: "Phân tích ví dụ yếu điểm/điểm yếu, bàng quan/bàng quang; biên tập câu hành chính.", clos: "CLO 2, CLO 3, CLO 4" },
    { session: 5, topic: "Kiểm tra giữa kỳ và từ đồng nghĩa", content: "Kiểm tra 45 phút về chính tả, từ Hán Việt; khái niệm và phân loại từ đồng nghĩa.", activity: "Làm bài kiểm tra; chữa bài và phân tích một cặp từ gần nghĩa.", clos: "CLO 1, CLO 2" },
    { session: 6, topic: "Chuyên đề 3: từ đồng nghĩa", content: "Sắc thái, phong cách, khả năng kết hợp và lựa chọn từ theo ngữ cảnh.", activity: "Viết lại đoạn văn tránh lặp từ; giải thích vì sao từ thay thế phù hợp.", clos: "CLO 2, CLO 3, CLO 4" },
    { session: 7, topic: "Chuyên đề 4: từ trái nghĩa", content: "Trái nghĩa lưỡng phân, thang độ, định hướng/quan hệ; trục đối lập.", activity: "Phân loại cặp từ và xác định nét nghĩa chung làm cơ sở đối lập.", clos: "CLO 1, CLO 2, CLO 3" },
    { session: 8, topic: "Chuyên đề 4: từ trái nghĩa", content: "Giá trị tương phản; dùng từ trái nghĩa trong câu và đoạn lập luận.", activity: "Viết đoạn ngắn có cặp từ trái nghĩa; rà soát cặp đối lập gượng ép.", clos: "CLO 3, CLO 4" },
    { session: 9, topic: "Chuyên đề 5: từ đa nghĩa và đồng âm", content: "Nghĩa gốc/nghĩa chuyển; ẩn dụ, hoán dụ; tiêu chí phân biệt đồng âm.", activity: "Phân tích từ trong nhiều câu; đối chiếu cách tổ chức mục từ trong từ điển.", clos: "CLO 1, CLO 2, CLO 3" },
    { session: 10, topic: "Thực hành tích hợp", content: "Ôn tập 5 chuyên đề; biên tập câu, đoạn văn và văn bản ngắn.", activity: "Sửa văn bản 150–200 chữ, nộp bản trước/sau chỉnh sửa và bảng giải thích; tự đánh giá theo rubric.", clos: "CLO 2, CLO 3, CLO 4" }
  ],

  selfStudyPlan: [
    { topic: "Chính tả", hours: 12, output: "Bảng lỗi thường gặp theo nhóm âm/vần/thanh điệu và một đoạn văn đã sửa." },
    { topic: "Từ Hán Việt", hours: 12, output: "Bảng giải nghĩa 15 yếu tố/từ và phiếu sửa lỗi dùng từ trong ngữ cảnh." },
    { topic: "Từ đồng nghĩa", hours: 12, output: "Ba nhóm từ gần nghĩa, ghi sắc thái và một đoạn văn được viết lại." },
    { topic: "Từ trái nghĩa", hours: 12, output: "Bảng phân loại 10 cặp từ theo trục đối lập và một đoạn lập luận ngắn." },
    { topic: "Từ đa nghĩa và đồng âm", hours: 12, output: "Phân tích 10 ví dụ theo ngữ cảnh, có tra cứu từ điển và nêu căn cứ." }
  ],

  sampleExercises: [
    { title: "1. Chính tả: tìm và sửa lỗi", prompt: "Mỗi người cần giử thói quen viết súc tích, tránh sơ xuất khi soát bài.", answer: "Sửa 'giử' thành 'giữ' và 'sơ xuất' thành 'sơ suất'. 'Súc tích' viết đúng chính tả.", clos: "CLO 2, CLO 4" },
    { title: "2. Từ Hán Việt: chọn nghĩa theo ngữ cảnh", prompt: "Trong câu 'Điểm yếu của lập luận là dẫn chứng còn thiếu', cụm 'điểm yếu' chỉ điều gì? Hãy phân biệt với 'yếu điểm'.", answer: "'Điểm yếu' là chỗ hạn chế/nhược điểm. 'Yếu điểm' thường chỉ điểm quan trọng, then chốt; cần xét nghĩa và ngữ cảnh trước khi dùng.", clos: "CLO 1, CLO 2" },
    { title: "3. Từ đồng nghĩa: chọn từ phù hợp", prompt: "Điền 'yêu cầu' hoặc 'đòi hỏi': 'Thông báo ___ các lớp gửi danh sách trước 16 giờ ngày 15/11.' Giải thích lựa chọn.", answer: "'Yêu cầu' phù hợp với thông báo hành chính, sắc thái trung tính và rõ nhiệm vụ. 'Đòi hỏi' thường nhấn mạnh mức độ hoặc sức ép.", clos: "CLO 2, CLO 3" },
    { title: "4. Từ trái nghĩa: xác định kiểu đối lập", prompt: "Phân loại các cặp: nóng – lạnh; sống – chết; vào – ra.", answer: "Nóng – lạnh: trái nghĩa thang độ; sống – chết: lưỡng phân; vào – ra: trái nghĩa định hướng/quan hệ.", clos: "CLO 1, CLO 3" },
    { title: "5. Đa nghĩa và đồng âm: giải thích căn cứ", prompt: "So sánh 'chân người – chân bàn' với 'đường đi – đường ăn'.", answer: "'Chân' có các nghĩa liên hệ với nhau qua vị trí/chức năng nên là từ đa nghĩa. 'Đường' chỉ lối đi và chất tạo vị ngọt không có quan hệ nghĩa nên là các từ đồng âm.", clos: "CLO 1, CLO 2, CLO 3" }
  ],

  topics: [
    {
      id: "chinhta",
      title: "Chính tả tiếng Việt",
      badge: "Chuyên đề 1",
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>`,
      tagline: "Quy tắc ngữ âm, mẹo nhớ dấu thanh và chuẩn hóa văn bản",
      sections: [
        {
          heading: "1. Các cặp phụ âm đầu dễ lẫn lộn",
          content: `
            <div class="space-y-3">
                <p>Phát âm địa phương có thể khiến một số âm nghe gần nhau. Khi không chắc, cần dựa vào nghĩa của từ và tra từ điển, không chỉ dựa vào cách phát âm.</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div class="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
                  <span class="font-semibold text-emerald-700 dark:text-emerald-400">s / x:</span>
                  <p class="mt-1"><strong>s:</strong> sơ suất, sấm sét, siêng năng, sâu sắc, sáng sủa.</p>
                  <p><strong>x:</strong> xao xuyến, xinh xắn, xốc xếch, xóa bỏ, xơ xác, xao động.</p>
                </div>
                <div class="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
                  <span class="font-semibold text-emerald-700 dark:text-emerald-400">tr / ch:</span>
                  <p class="mt-1"><strong>tr:</strong> trung thực, tri thức, trông mong, trăn trở, truyền cảm.</p>
                  <p><strong>ch:</strong> chân thực, chỉ thị, chong chóng, che chở, chật chội.</p>
                </div>
                <div class="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
                  <span class="font-semibold text-emerald-700 dark:text-emerald-400">d / gi / r:</span>
                  <p class="mt-1"><strong>d:</strong> dành dụm, dỗ dành, dịu dàng, dồi dào, da diết.</p>
                  <p><strong>gi:</strong> giặt giũ, giẫm đạp, gìn giữ, giả dối, giao du.</p>
                  <p><strong>r:</strong> rành mạch, rạng rỡ, rõ ràng, rèn luyện, rộn ràng.</p>
                </div>
                <div class="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
                  <span class="font-semibold text-emerald-700 dark:text-emerald-400">l / n:</span>
                  <p class="mt-1"><strong>l:</strong> lắp ráp, lắng nghe, lo lắng.</p>
                  <p><strong>n:</strong> nặng nề, nấu nướng, năng nổ.</p>
                </div>
                <div class="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg border border-stone-200 dark:border-stone-700">
                  <span class="font-semibold text-emerald-700 dark:text-emerald-400">c / k / qu; g / gh; ng / ngh:</span>
                  <p class="mt-1">Trước <em>e, ê, i</em>, viết <strong>k, gh, ngh</strong> (VD: <em>kẻ, ghi nhớ, nghề nghiệp</em>); trước các nguyên âm khác thường viết <strong>c, g, ng</strong> (VD: <em>cá, gà, ngà</em>).</p>
                  <p><strong>Qu</strong> là tổ hợp riêng, viết liền trước âm chính (VD: <em>quanh co, quyết tâm</em>).</p>
                </div>
              </div>
            </div>
          `
        },
        {
          heading: "2. Vần và âm cuối dễ nhầm",
          content: `
            <div class="space-y-3 text-sm">
              <p>Một số vần nghe gần nhau trong phát âm địa phương. Hãy ghi nhớ từ trong ngữ cảnh, đối chiếu nghĩa và tra từ điển khi cần.</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700"><strong class="text-emerald-700 dark:text-emerald-400">an / ang</strong><p class="mt-1">bình an, than đá • cái thang, hàng ngang</p></div>
                <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700"><strong class="text-emerald-700 dark:text-emerald-400">at / ac</strong><p class="mt-1">mát mẻ, chật vật • bạc màu, lạc đường</p></div>
                <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700"><strong class="text-emerald-700 dark:text-emerald-400">iên / iêng</strong><p class="mt-1">bình yên, liên hệ • tiếng Việt, thiêng liêng</p></div>
                <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700"><strong class="text-emerald-700 dark:text-emerald-400">ươn / ương</strong><p class="mt-1">ươn hỏng, lươn đồng • hương thơm, đường đi</p></div>
              </div>
            </div>
          `
        },
        {
          heading: "3. Mẹo phân biệt dấu hỏi và dấu ngã",
          content: `
            <div class="space-y-4">
              <div class="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <h4 class="font-semibold text-emerald-900 dark:text-emerald-300">Quy tắc bổng – trầm trong từ láy</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-sm">
                  <div class="p-2.5 bg-white dark:bg-stone-800 rounded-lg border border-emerald-100 dark:border-stone-700">
                    <span class="font-bold text-amber-700 dark:text-amber-400">Nhóm bổng (ngang – sắc – hỏi):</span>
                    <ul class="list-disc list-inside mt-1 text-stone-700 dark:text-stone-300">
                      <li><em>sạch sẽ, xinh xắn, lỏng lẻo</em></li>
                      <li><em>thẳng thắn, mát mẻ, lấp lánh</em></li>
                    </ul>
                  </div>
                  <div class="p-2.5 bg-white dark:bg-stone-800 rounded-lg border border-emerald-100 dark:border-stone-700">
                    <span class="font-bold text-rose-700 dark:text-rose-400">Nhóm trầm (huyền – ngã – nặng):</span>
                    <ul class="list-disc list-inside mt-1 text-stone-700 dark:text-stone-300">
                      <li><em>vững vàng, rã rời, buồn bã</em></li>
                      <li><em>ngập ngừng, mỡ màng, vạm vỡ</em></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="p-3.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 text-sm">
                <span class="font-bold text-amber-900 dark:text-amber-300">Mẹo ghi nhớ từ Hán Việt:</span> Có thể dùng câu <em>"Mình Nên Chú Ý Sức Nặng"</em> để gợi nhớ một số từ quen thuộc; đây chỉ là mẹo học, không thể suy dấu thanh cho mọi từ theo phụ âm đầu.
                <p class="mt-1 text-stone-600 dark:text-stone-300">Ví dụ có dấu ngã: <em>mỹ thuật, nỗ lực, cưỡng chế, dĩ nhiên, ý nghĩ, xã hội, nghĩa vụ</em>. Khi chưa chắc, hãy tra từ điển.</p>
              </div>
            </div>
          `
        },
        {
          heading: "4. Quy chuẩn viết hoa theo Nghị định 30/2020/NĐ-CP",
          content: `
            <div class="space-y-2 text-sm text-stone-700 dark:text-stone-300">
              <p>• <strong>Tên cơ quan, tổ chức:</strong> Viết hoa chữ cái đầu của các từ, cụm từ chỉ loại hình cơ quan, chức năng nhiệm vụ. <br><span class="text-emerald-700 dark:text-emerald-400 font-medium">Đúng:</span> <em>Bộ Giáo dục và Đào tạo, Trường Đại học Sư phạm Hà Nội</em>.</p>
              <p>• <strong>Chức vụ lãnh đạo cấp cao:</strong> Viết hoa khi gắn với danh xưng tôn kính quy định: <em>Chủ tịch nước, Thủ tướng Chính phủ, Tổng Bí thư</em>.</p>
              <p>• <strong>Tên địa danh hành chính:</strong> Viết hoa âm tiết đầu: <em>thành phố Hà Nội, tỉnh Quảng Ninh, xã Tân Phong</em>.</p>
            </div>
          `
        }
      ]
    },

    {
      id: "hanviet",
      title: "Từ Hán Việt",
      badge: "Chuyên đề 2",
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>`,
      tagline: "Quy luật cấu tạo từ, giải mã yếu tố gốc Hán và tránh bẫy dùng từ",
      sections: [
        {
          heading: "1. Đặc điểm và quy luật cấu tạo",
          content: `
            <div class="space-y-3 text-sm">
              <p>Từ Hán Việt là một lớp từ có vai trò lớn trong tiếng Việt, thường gặp trong các lĩnh vực khoa học, hành chính, chính luận và văn hóa.</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
                  <span class="font-bold text-emerald-700 dark:text-emerald-400">Trật tự Nghịch (Phụ trước - Chính sau):</span>
                  <p class="text-xs text-stone-500 mt-0.5 mb-1.5">Đặc trưng cấu tạo ngữ pháp gốc Hán</p>
                  <ul class="list-disc list-inside space-y-1 text-stone-700 dark:text-stone-300">
                    <li><strong>Quốc kỳ:</strong> Quốc (phụ: nước) + Kỳ (chính: cờ) → Cờ của nước.</li>
                    <li><strong>Thiên mã:</strong> Thiên (trời) + Mã (ngựa) → Ngựa trời.</li>
                    <li><strong>Đại lộ:</strong> Đại (lớn) + Lộ (đường) → Con đường lớn.</li>
                    <li><strong>Tân binh:</strong> Tân (mới) + Binh (lính) → Lính mới.</li>
                  </ul>
                </div>
                <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
                  <span class="font-bold text-emerald-700 dark:text-emerald-400">Trật tự Thuận (Chính trước - Phụ sau):</span>
                  <p class="text-xs text-stone-500 mt-0.5 mb-1.5">Đã Việt hóa theo trật tự cú pháp tiếng Việt</p>
                  <ul class="list-disc list-inside space-y-1 text-stone-700 dark:text-stone-300">
                    <li><strong>Ái quốc:</strong> Ái (yêu) + Quốc (nước) → Yêu nước.</li>
                    <li><strong>Hội trường:</strong> Hội (họp) + Trường (sân, bãi, nơi) → Nơi hội họp.</li>
                    <li><strong>Phòng hộ:</strong> Phòng (ngăn chặn) + Hộ (bảo vệ).</li>
                  </ul>
                </div>
              </div>
            </div>
          `
        },
        {
          heading: "2. Những bẫy lỗi sai kinh điển khi dùng từ Hán Việt",
          content: `
            <div class="space-y-2.5 text-sm">
              <div class="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
                <span class="font-bold text-rose-800 dark:text-rose-300">1. Yếu điểm và điểm yếu</span>
                <p class="mt-1 text-stone-700 dark:text-stone-300"><strong>Yếu điểm:</strong> Yếu (quan trọng, mấu chốt) + Điểm → Điểm quan trọng nhất (như <em>yếu lược, trọng yếu</em>).<br>
                <strong>Điểm yếu:</strong> Nhược điểm, chỗ yếu kém. <br>
                <span class="text-rose-600 dark:text-rose-400 font-semibold">Sai:</span> "Anh ấy có nhiều yếu điểm cần khắc phục" → <span class="text-emerald-600 dark:text-emerald-400 font-semibold">Đúng:</span> "có nhiều điểm yếu".</p>
              </div>

              <div class="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
                <span class="font-bold text-rose-800 dark:text-rose-300">2. Cứu cánh và phao cứu sinh</span>
                <p class="mt-1 text-stone-700 dark:text-stone-300"><strong>Cứu cánh:</strong> Mục đích cuối cùng cần đạt tới. Trong cách dùng hiện nay, từ này cũng có thể được dùng với nghĩa phương tiện cứu vãn; cần xét từ điển và ngữ cảnh.<br>
                <span class="text-rose-600 dark:text-rose-400 font-semibold">Ví dụ cần biên tập theo nghĩa:</span> Nếu muốn nói "giải pháp cứu vãn", có thể viết rõ "phao cứu sinh / giải pháp cứu vãn".</p>
              </div>

              <div class="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
                <span class="font-bold text-rose-800 dark:text-rose-300">3. Bàng quan và bàng quang</span>
                <p class="mt-1 text-stone-700 dark:text-stone-300"><strong>Bàng quan:</strong> Bàng (bên cạnh) + Quan (nhìn) → Đứng bên cạnh nhìn, thờ ơ không can dự.<br>
                <strong>Bàng quang:</strong> Cơ quan giải phẫu chứa nước tiểu (bọng đái).</p>
              </div>

              <div class="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
                <span class="font-bold text-rose-800 dark:text-rose-300">4. Cụm từ có thể dư nghĩa (tùy dụng ý)</span>
                <p class="mt-1 text-stone-700 dark:text-stone-300">
                  • <em>thắng cảnh đẹp</em> (thắng cảnh vốn chỉ cảnh đẹp → có thể lược "đẹp" nếu không cần nhấn mạnh).<br>
                  • <em>cây cổ thụ nhiều năm</em> (có thể lược "nhiều năm" nếu không cần nhấn mạnh tuổi cây).<br>
                  • <em>tái bản lại</em> (trong nhiều trường hợp có thể lược "lại" vì "tái" đã mang ý nghĩa làm lại).
                </p>
              </div>
            </div>
          `
        }
      ]
    },

    {
      id: "dongnghia",
      title: "Từ đồng nghĩa",
      badge: "Chuyên đề 3",
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>`,
      tagline: "Phân biệt sắc thái biểu cảm, phong cách và cách dùng từ đắc địa",
      sections: [
        {
          heading: "1. Bản chất và phân loại",
          content: `
            <div class="space-y-3 text-sm">
              <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
                <h4 class="font-bold text-emerald-800 dark:text-emerald-300">A. Đồng nghĩa hoàn toàn (hiếm)</h4>
                <p class="mt-1 text-stone-600 dark:text-stone-300">Đồng nghĩa hoàn toàn có thể thay thế trong mọi ngữ cảnh, nhưng loại này hiếm. Nhiều cặp thường gọi là đồng nghĩa vẫn khác vùng miền, sắc thái hoặc khả năng kết hợp.</p>
                <p class="mt-1 font-semibold text-emerald-700 dark:text-emerald-400">Ví dụ gần nghĩa cần xét ngữ cảnh: xe lửa - tàu hỏa; quả - trái; bắp - ngô; máy bay - tàu bay.</p>
              </div>

              <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
                <h4 class="font-bold text-emerald-800 dark:text-emerald-300">B. Đồng nghĩa không hoàn toàn (Tương đối)</h4>
                <div class="space-y-2 mt-2">
                  <div>
                    <span class="font-semibold text-stone-900 dark:text-stone-100">• Khác nhau về sắc thái biểu cảm và thái độ:</span>
                    <p class="text-stone-600 dark:text-stone-300">Một số cách nói về cái chết khác nhau về sắc thái: <em>chết</em> (trung tính); <em>hi sinh</em> (gắn với sự cống hiến); <em>từ trần / tạ thế</em> (trang trọng, kính trọng); <em>ngủm</em> (khẩu ngữ, suồng sã).</p>
                  </div>
                  <div>
                    <span class="font-semibold text-stone-900 dark:text-stone-100">• Khác nhau về mức độ, cường độ:</span>
                    <p class="text-stone-600 dark:text-stone-300"><em>Yêu cầu</em> (thường trung tính, theo thẩm quyền) và <em>đòi hỏi</em> (nhấn mạnh yêu cầu, có thể mang sắc thái gay gắt hơn).</p>
                  </div>
                  <div>
                    <span class="font-semibold text-stone-900 dark:text-stone-100">• Khác nhau về phong cách chức năng:</span>
                    <p class="text-stone-600 dark:text-stone-300"><em>Mẹ</em> (từ phổ biến toàn dân); <em>u, bầm, má</em> (cách gọi theo vùng miền); <em>thân mẫu</em> (trang trọng, thường dùng trong nghi lễ).</p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          heading: "2. Chức năng tu từ và bẫy lỗi thường gặp",
          content: `
            <div class="space-y-2 text-sm text-stone-700 dark:text-stone-300">
              <p>• <strong>Tránh lặp từ vô ý thức:</strong> Sử dụng các biến thể đồng nghĩa linh hoạt để câu văn sinh động, mượt mà mà vẫn nhất quán chủ đề.</p>
              <p>• <strong>Bẫy dùng từ sai phong cách:</strong> Dùng từ ngữ khẩu ngữ hoặc suồng sã trong văn bản hành chính khoa học (Ví dụ dùng <em>"cho qua đời"</em> hoặc <em>"toi mạng"</em> thay vì <em>"từ trần / tử vong"</em>).</p>
            </div>
          `
        }
      ]
    },

    {
      id: "trainghia",
      title: "Từ trái nghĩa",
      badge: "Chuyên đề 4",
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
      tagline: "Trục đối lập ngữ nghĩa, tương phản tu từ và ứng dụng lập luận",
      sections: [
        {
          heading: "1. Cơ sở và phân loại từ trái nghĩa",
          content: `
            <div class="space-y-3 text-sm">
              <p>Hai từ chỉ được coi là trái nghĩa khi chúng <strong>cùng nằm trên một trục đối lập ngữ nghĩa</strong> (cùng một phạm trù nhận thức). Ví dụ: <em>dài</em> trái nghĩa với <em>ngắn</em> (trục kích thước), không thể đối lập <em>dài</em> với <em>nghèo</em>.</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
                  <span class="font-bold text-emerald-700 dark:text-emerald-400">Trái nghĩa Lưỡng phân (Loại trừ tuyệt đối):</span>
                  <p class="text-xs text-stone-500 mt-0.5 mb-1.5">Không có trạng thái trung gian, phủ định từ này là khẳng định từ kia.</p>
                  <p class="font-semibold text-stone-800 dark:text-stone-200">sống - chết; đúng - sai; đực - cái; chẵn - lẻ.</p>
                </div>
                <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
                  <span class="font-bold text-emerald-700 dark:text-emerald-400">Trái nghĩa Thang độ (Cực trị):</span>
                  <p class="text-xs text-stone-500 mt-0.5 mb-1.5">Có nhiều mức độ chuyển tiếp nằm ở giữa.</p>
                  <p class="font-semibold text-stone-800 dark:text-stone-200">nóng - lạnh (có ấm, mát); giàu - nghèo (có khá giả, đủ ăn); cao - thấp.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          heading: "2. Mối quan hệ giữa từ đa nghĩa và từ trái nghĩa",
          content: `
            <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 text-sm">
              <p class="text-stone-700 dark:text-stone-300">Một từ đa nghĩa khi tham gia vào các văn cảnh khác nhau sẽ xác lập những cặp trái nghĩa hoàn toàn khác nhau:</p>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-center">
                <div class="p-2 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-700">
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Nhạt (vị giác)</span>
                  <div class="text-xs text-stone-500 mt-1">Đối lập với:</div>
                  <strong class="text-sm">Mặn</strong>
                </div>
                <div class="p-2 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-700">
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Nhạt (màu sắc)</span>
                  <div class="text-xs text-stone-500 mt-1">Đối lập với:</div>
                  <strong class="text-sm">Đậm</strong>
                </div>
                <div class="p-2 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-700">
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">Nhạt (tình cảm)</span>
                  <div class="text-xs text-stone-500 mt-1">Đối lập với:</div>
                  <strong class="text-sm">Nồng thắm / Thắm</strong>
                </div>
              </div>
            </div>
          `
        }
      ]
    },

    {
      id: "danghia",
      title: "Từ đa nghĩa và từ đồng âm",
      badge: "Chuyên đề 5",
      icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
      tagline: "Cơ chế ẩn dụ, hoán dụ từ vựng và bảng đối chiếu",
      sections: [
        {
          heading: "1. Cơ chế chuyển nghĩa của từ đa nghĩa",
          content: `
            <div class="space-y-3 text-sm">
              <p>Một từ có một <strong>nghĩa gốc</strong> (nghĩa cơ sở xuất hiện trước) và một hoặc nhiều <strong>nghĩa chuyển</strong> (nghĩa phái sinh qua nhận thức).</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
                  <span class="font-bold text-emerald-700 dark:text-emerald-400">1. Chuyển nghĩa Ẩn dụ (Tương đồng):</span>
                  <p class="text-xs text-stone-500 mt-0.5 mb-1.5">Dựa trên nét giống nhau giữa hai đối tượng</p>
                  <ul class="list-disc list-inside space-y-1 text-stone-700 dark:text-stone-300">
                    <li><strong>Mũi:</strong> Mũi người → <em>mũi thuyền, mũi đất, mũi súng</em> (giống về hình dạng nhọn nhô ra trước).</li>
                    <li><strong>Chân:</strong> Chân người → <em>chân núi, chân tường, chân bàn</em> (giống về vị trí tiếp giáp mặt đất, nâng đỡ).</li>
                  </ul>
                </div>
                <div class="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
                  <span class="font-bold text-emerald-700 dark:text-emerald-400">2. Chuyển nghĩa Hoán dụ (Tiếp cận):</span>
                  <p class="text-xs text-stone-500 mt-0.5 mb-1.5">Dựa trên mối quan hệ gần gũi, đi liền trong thực tế</p>
                  <ul class="list-disc list-inside space-y-1 text-stone-700 dark:text-stone-300">
                    <li><strong>Miệng:</strong> Miệng người → <em>nhà có 5 miệng ăn</em> (bộ phận thay thế toàn thể).</li>
                    <li><strong>Lớp:</strong> Phòng học → <em>cả lớp vỗ tay</em> (vật chứa thay thế người bên trong).</li>
                  </ul>
                </div>
              </div>
            </div>
          `
        },
        {
          heading: "2. Bảng đối chiếu từ đa nghĩa và từ đồng âm",
          content: `
            <div class="overflow-x-auto text-sm">
              <table class="w-full border-collapse border border-stone-300 dark:border-stone-700">
                <thead>
                  <tr class="bg-stone-100 dark:bg-stone-800 text-left">
                    <th class="p-2.5 border border-stone-300 dark:border-stone-700">Tiêu chí</th>
                    <th class="p-2.5 border border-stone-300 dark:border-stone-700 text-emerald-800 dark:text-emerald-400">Từ đa nghĩa</th>
                    <th class="p-2.5 border border-stone-300 dark:border-stone-700 text-amber-800 dark:text-amber-400">Từ đồng âm</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-stone-200 dark:divide-stone-700">
                  <tr>
                    <td class="p-2.5 font-semibold">Bản chất từ vựng</td>
                    <td class="p-2.5"><strong>Cùng một từ</strong> mang nhiều nghĩa.</td>
                    <td class="p-2.5"><strong>Nhiều từ khác nhau</strong> tình cờ trùng âm thanh.</td>
                  </tr>
                  <tr>
                    <td class="p-2.5 font-semibold">Mối liên hệ ngữ nghĩa</td>
                    <td class="p-2.5 text-emerald-700 dark:text-emerald-400 font-medium">Có quan hệ về nghĩa (qua ẩn dụ, hoán dụ).</td>
                    <td class="p-2.5 text-rose-600 dark:text-rose-400 font-medium">Không có quan hệ về nghĩa.</td>
                  </tr>
                  <tr>
                    <td class="p-2.5 font-semibold">Ví dụ minh họa</td>
                    <td class="p-2.5"><em>Chân</em> (chân người, chân núi, chân kiềng).</td>
                    <td class="p-2.5"><em>đường</em> (lối đi) và <em>đường</em> (chất tạo vị ngọt).</td>
                  </tr>
                  <tr>
                    <td class="p-2.5 font-semibold">Cách ghi từ điển</td>
                    <td class="p-2.5">Gom chung 1 mục từ, đánh số thứ tự nghĩa (1, 2, 3...).</td>
                    <td class="p-2.5">Tách thành nhiều mục từ riêng biệt (I, II, III...).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `
        }
      ]
    }
  ],

  // Tra cứu & Kiểm tra tức thì
  quickDictionary: [
    { word: "Yếu điểm", correct: "Điểm mấu chốt, quan trọng nhất", wrong: "Điểm yếu, nhược điểm", note: "Yếu trong Hán Việt là trọng yếu. Nếu muốn nói về chỗ chưa tốt, hãy dùng từ 'điểm yếu' hoặc 'nhược điểm'." },
    { word: "Cứu cánh", correct: "Nghĩa gốc: mục đích cuối cùng; cách dùng tùy ngữ cảnh", wrong: "Mặc định hiểu là 'phao cứu sinh'", note: "Nghĩa gốc là mục đích cuối cùng. Một số cách dùng hiện nay mở rộng sang phương tiện cứu vãn; hãy chọn cách diễn đạt rõ theo ngữ cảnh." },
    { word: "Bàng quan", correct: "Đứng ngoài cuộc, thờ ơ nhìn xem", wrong: "Bàng quang", note: "Bàng quan viết với 'an'. 'Bàng quang' với 'ang' là bọng đái trong giải phẫu học." },
    { word: "Súc tích", correct: "Cô đọng, ngắn gọn mà giàu ý nghĩa", wrong: "Xúc tích", note: "Bắt đầu bằng chữ 's'. 'Xúc' chỉ cảm xúc hoặc tiếp xúc." },
    { word: "Dành dụm", correct: "Gom góp, để dành từng chút một", wrong: "Giành giụm / Rành rụm", note: "Bắt đầu bằng chữ 'd'. 'Giành' dùng trong tranh giành, giành giật." },
    { word: "Rành mạch", correct: "Rõ ràng, phân minh, mạch lạc", wrong: "Dành mạch / Giành mạch", note: "Phụ âm 'r'. Thể hiện sự minh bạch, rõ nét." },
    { word: "Chân thực", correct: "Đúng với sự thật khách quan", wrong: "Trân thực", note: "Viết bằng 'ch'. 'Trân' chỉ sự quý báu (trân trọng, trân châu)." },
    { word: "Vãn cảnh", correct: "Đến thăm, ngắm phong cảnh (thường dùng với chùa hoặc danh lam)", wrong: "Hiểu cụm từ đơn giản là 'ngắm cảnh lúc chiều tà'", note: "Trong ngữ cảnh tham quan, 'vãn cảnh' chỉ việc đến ngắm cảnh. Một số nguồn giải thích vãn/vãng khác nhau; khi chuẩn hóa văn bản, nên theo từ điển hoặc quy ước biên tập của đơn vị." },
    { word: "Thắng cảnh đẹp", correct: "Có thể lược 'đẹp' nếu không cần nhấn mạnh", wrong: "Mặc định kết luận đây là lỗi", note: "'Thắng cảnh' đã chỉ cảnh đẹp; thêm 'đẹp' có thể lặp nghĩa, nhưng đôi khi được dùng để nhấn mạnh." },
    { word: "Cây cổ thụ lâu năm", correct: "Có thể lược 'lâu năm' nếu không cần nhấn mạnh", wrong: "Mặc định kết luận cụm này sai", note: "'Cổ thụ' thường chỉ cây lớn, lâu năm; phần 'lâu năm' có thể lặp nghĩa nhưng đôi khi được dùng để nhấn mạnh." },
    { word: "Nghỉ ngơi", correct: "Nghỉ (dấu hỏi)", wrong: "Nghĩ ngơi", note: "Viết 'nghỉ' với dấu hỏi; phân biệt với 'nghĩ' (dấu ngã), như trong 'suy nghĩ'." },
    { word: "Vững vàng", correct: "Vững (Dấu ngã)", wrong: "Vửng vàng", note: "Từ láy quy tắc trầm: Vững (ngã) đi với vàng (huyền)." },
    { word: "Mỡ màng", correct: "Mỡ (Dấu ngã)", wrong: "Mở màng", note: "Quy tắc trầm: Mỡ (ngã) đi với màng (huyền)." },
    { word: "Sơ suất", correct: "Sơ suất (cả hai đều chữ s)", wrong: "Sơ xuất / Xơ suất", note: "Chỉ sự thiếu sót, sơ ý bất cẩn." },
    { word: "Xác suất", correct: "Xác (x) + suất (s)", wrong: "Sác xuất / Xác xuất", note: "Thuật ngữ toán học và thống kê chỉ khả năng xảy ra." }
  ]
};
