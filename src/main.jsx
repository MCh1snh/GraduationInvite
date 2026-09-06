import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  ExternalLink,
  Download,
  Camera,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import "./styles.css";

const CONFIG = {
  graduateName: "Mai Mạnh Chính",
  dateText: "Chủ Nhật, 27 tháng 9, 2026",
  dateShort: "27.09.2026",
  time: "13h:00 - 18h:00",

  venue: "Sân Toà C9 Đại học Bách Khoa Hà Nội",
  address:
    "Sân Toà C9 Đại học Bách Khoa Hà Nội, 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",

  mapUrl: "https://maps.app.goo.gl/L5oaBG1ozZUjZFUj7",

  // Ảnh địa điểm ở trang thông tin lễ tốt nghiệp
  heroImage: "/venue.jpg",

  // Ảnh thiệp mà khách có thể tải về
  invitationImage: "/thiep.png",

  timeline: [
    [
      "13h:00",
      "Bắt đầu buổi lễ",
      "Khoảnh khắc chính thức của ngày hôm nay",
    ],
    [
      "16h:00 - 18h:00",
      "Chụp ảnh lưu niệm",
      "Cùng nhau lưu lại thật nhiều kỷ niệm",
    ],
    [
      "18h:00",
      "Khép lại buổi lễ",
      "Hẹn gặp lại nhau trong những dịp thật vui ♡",
    ],
  ],
};

function App() {
  const [step, setStep] = useState(0);
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);

  const goNext = () => {
    setStep((currentStep) => Math.min(currentStep + 1, 3));
  };

  const resetInvitation = () => {
    setStep(0);
    setGuestName("");
  };

  const downloadInvitation = async () => {
    try {
      const response = await fetch(CONFIG.invitationImage);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "thiep.png";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Không thể tải thiệp:", error);

      // Fallback nếu trình duyệt chặn fetch
      const link = document.createElement("a");
      link.href = CONFIG.invitationImage;
      link.download = "thiep.png";
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <main className="app-shell">
      <div className="grain" />

      {/* =====================================================
          STEP 0 - TRANG NHẬP TÊN
      ====================================================== */}
      {step === 0 && (
        <section className="screen landing-screen">
          <div className="floating floating-one">✦</div>
          <div className="floating floating-two">♡</div>

          <div className="landing-card">
            <div className="eyebrow">A LITTLE INVITATION FOR YOU</div>

            <div className="cap">🎓</div>

            <p className="small-cursive">you are invited to</p>

            <h1>
              My
              <br />
              <em>Graduation</em>
            </h1>

            <div className="divider">
              <span>✦</span>
            </div>

            <p className="intro">
              Một ngày rất đặc biệt sắp đến.
              <br />
              Và tớ muốn cậu có mặt.
            </p>

            <div className="name-form">
              <label htmlFor="guest">
                Trước tiên, cho tớ biết tên cậu nhé
              </label>

              <input
                id="guest"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && guestName.trim()) {
                    goNext();
                  }
                }}
                placeholder="Tên của cậu..."
                autoComplete="name"
              />

              <button
                className="primary-btn"
                disabled={!guestName.trim()}
                onClick={goNext}
              >
                Mở thiệp
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          STEP 1 - TRANG THÔNG TIN LỄ TỐT NGHIỆP
      ====================================================== */}
      {step === 1 && (
        <section className="screen invitation-screen">
          <div className="top-note">
            FOR {guestName.toUpperCase()}
          </div>

          <div className="invitation-paper">
            <div className="paper-flower">✽</div>

            <div className="eyebrow">GRADUATION CEREMONY</div>

            <p className="small-cursive">
              Dear {guestName},
            </p>

            <h2>
              Tớ mời cậu
              <br />
              <em>đến dự lễ tốt nghiệp</em>
            </h2>

            <p className="body-copy">
              Sau một hành trình dài, cuối cùng ngày này cũng đến.
              Tớ rất vui nếu có cậu cùng chia sẻ khoảnh khắc đáng nhớ này.
            </p>

            <div className="info-grid">
              <div className="info-item">
                <CalendarDays size={21} />

                <div>
                  <span>NGÀY</span>
                  <strong>{CONFIG.dateText}</strong>
                </div>
              </div>

              <div className="info-item">
                <Clock3 size={21} />

                <div>
                  <span>THỜI GIAN</span>
                  <strong>{CONFIG.time}</strong>
                </div>
              </div>

              <div className="info-item full">
                <MapPin size={21} />

                <div>
                  <span>ĐỊA ĐIỂM</span>
                  <strong>{CONFIG.venue}</strong>
                  <small>{CONFIG.address}</small>
                </div>
              </div>
            </div>

            {/* ẢNH ĐỊA ĐIỂM */}
            <div className="venue-photo">
              <img
                src={CONFIG.heroImage}
                alt="Địa điểm tổ chức"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div className="photo-placeholder">
                Sơ đồ địa điểm
              </div>
            </div>

            {/* GOOGLE MAP */}
            <a
              className="map-link"
              href={CONFIG.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={16} />
              Xem chỉ đường
              <ExternalLink size={14} />
            </a>

            {/* TIMELINE */}
            <div className="timeline">
              <div className="section-label">THE DAY</div>

              {CONFIG.timeline.map(
                ([time, title, desc], index) => (
                  <div
                    className="timeline-row"
                    key={`${time}-${index}`}
                  >
                    <div className="timeline-time">
                      {time}
                    </div>

                    <div className="timeline-dot" />

                    <div>
                      <strong>{title}</strong>
                      <p>{desc}</p>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="signature">
              <span>See you there,</span>
              <strong>{CONFIG.graduateName}</strong>
            </div>

            <button
              className="primary-btn wide"
              onClick={goNext}
            >
              Đến tấm thiệp của cậu
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
          STEP 2 - TRANG HIỂN THỊ THIỆP ẢNH
      ====================================================== */}
      {step === 2 && (
        <section className="screen card-screen">
          <div className="card-download-wrapper">
            <div className="card-header">
              <Sparkles size={22} />

              <div className="eyebrow">
                A LITTLE GIFT FOR YOU
              </div>

              <h2>
                Tấm thiệp
                <br />
                <em>dành riêng cho {guestName}</em>
              </h2>

              <p>
                Đây là tấm thiệp dành tặng cậu ♡
                <br />
                Cậu có thể chụp màn hình hoặc tải về để lưu giữ nhé.
              </p>
            </div>

            {/* ẢNH THIỆP */}
            <div className="invitation-image-wrapper">
              <img
                src={CONFIG.invitationImage}
                alt={`Thiệp tốt nghiệp dành cho ${guestName}`}
                className="invitation-image"
              />
            </div>

            {/* HƯỚNG DẪN */}
            <div className="screenshot-note">
              <Camera size={20} />

              <div>
                <strong>
                  Hãy lưu lại tấm thiệp này nhé ♡
                </strong>

                <p>
                  Cậu có thể chụp màn hình tấm thiệp,
                  hoặc nhấn nút bên dưới để tải ảnh về máy.
                </p>
              </div>
            </div>

            {/* NÚT TẢI */}
            <button
              className="primary-btn wide download-btn"
              onClick={downloadInvitation}
            >
              <Download size={19} />
              Tải thiệp
            </button>

            <p className="download-hint">
              Ảnh sẽ được lưu với tên <strong>thiep.png</strong>
            </p>

            <button
              className="text-btn"
              onClick={resetInvitation}
            >
              <RotateCcw size={15} />
              Mở lại từ đầu
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
          STEP 3 - TRANG CẢM ƠN
      ====================================================== */}
      {step === 3 && (
        <section className="screen final-screen">
          <div className="confetti">✦　♡　✦</div>

          <div className="final-card">
            <div className="final-icon">🎓</div>

            <div className="eyebrow">THANK YOU ♡</div>

            <h2>
              Cảm ơn {guestName}!
              <br />
              <em>Hẹn gặp cậu nhé ♡</em>
            </h2>

            <p>
              Cảm ơn cậu đã ghé qua chiếc thiệp nhỏ này
              và dành chút thời gian cho ngày đặc biệt của tớ.
              <br />
              Hẹn gặp cậu trong ngày tốt nghiệp nhé! 📸
            </p>

            <div className="final-date">
              {CONFIG.dateShort} · {CONFIG.graduateName}
            </div>

            <button
              className="primary-btn wide"
              onClick={() => setStep(2)}
            >
              Xem lại tấm thiệp
              <ArrowRight size={18} />
            </button>

            <button
              className="text-btn"
              onClick={resetInvitation}
            >
              ← Mở lại từ đầu
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <App />
);