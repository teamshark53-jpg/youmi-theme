(function () {
  'use strict';

  /* ── Page Loader ── */
  window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
      setTimeout(() => loader.classList.add('loaded'), 800);
    }
  });

  /* ── Custom Cursor ── */
  const ring = document.getElementById('cursorRing');
  const dot  = document.getElementById('cursorDot');
  if (ring && dot) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    setInterval(() => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
    }, 12);
    document.querySelectorAll('a, button, .art-card, .faq-item').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width = '52px'; ring.style.height = '52px'; ring.style.borderColor = '#F5C842'; });
      el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; });
    });
  }

  /* ── Sticky Header shadow on scroll ── */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Mobile Nav Toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.classList.toggle('active', open);
      const spans = toggle.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
        spans[1].style.opacity = open ? '0' : '';
        spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
      }
    });
  }

  /* ── Reveal on Scroll (Intersection Observer) ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => obs.observe(el));
  }

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.hasAttribute('open');
      document.querySelectorAll('.faq-item[open]').forEach(o => o.removeAttribute('open'));
      if (!isOpen) item.setAttribute('open', '');
    });
  });

  /* ── PDF Modal ── */
  const modal     = document.getElementById('pdfModal');
  const pdfViewer = document.getElementById('pdfPagesWrap');
  if (modal && pdfViewer) {
    document.querySelectorAll('.art-card[data-style]').forEach(card => {
      card.addEventListener('click', () => {
        const title = card.dataset.title || card.querySelector('h4')?.textContent || '';
        const desc  = card.dataset.desc  || '';
        const pdfTitleEl = document.getElementById('pdfTitle');
        const pdfDescEl = document.getElementById('pdfDesc');
        if (pdfTitleEl) pdfTitleEl.textContent = title;
        if (pdfDescEl) pdfDescEl.textContent = desc;
        const placeholder = document.getElementById('pdfPlaceholder');
        if (placeholder) placeholder.style.display = 'flex';
        pdfViewer.style.display = 'none';
        modal.classList.add('open');
      });
    });
    modal.querySelector('.pdf-modal-backdrop')?.addEventListener('click', () => modal.classList.remove('open'));
    modal.querySelector('.pdf-modal-close')?.addEventListener('click', () => modal.classList.remove('open'));
    const pdfInput = document.getElementById('pdfPlaceholderInput');
    if (pdfInput) {
      pdfInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        const placeholder = document.getElementById('pdfPlaceholder');
        if (placeholder) placeholder.style.display = 'none';
        pdfViewer.style.display = 'flex';
        renderPDF(url);
      });
    }
  }

  /* ── PDF Render ── */
  function renderPDF(src) {
    const wrap = document.getElementById('pdfPagesWrap');
    const canvas = document.getElementById('pdfPages');
    if (!canvas) return;
    if (typeof pdfjsLib !== 'undefined') {
      pdfjsLib.getDocument(src).promise.then(pdf => {
        const totalPagesEl = document.getElementById('pdfTotalPages');
        if (totalPagesEl) totalPagesEl.textContent = pdf.numPages;
        let page = 1;
        function showPage(n) {
          pdf.getPage(n).then(p => {
            const vp = p.getViewport({ scale: 1.2 });
            const c = document.createElement('canvas');
            c.width = vp.width; c.height = vp.height;
            wrap.insertBefore(c, wrap.querySelector('.pdf-nav'));
            p.render({ canvasContext: c.getContext('2d'), viewport: vp });
            const pageNumEl = document.getElementById('pdfPageNum');
            if (pageNumEl) pageNumEl.textContent = n;
          });
        }
        showPage(page);
        const prevBtn = document.getElementById('pdfPrev');
        const nextBtn = document.getElementById('pdfNext');
        if (prevBtn) {
          prevBtn.onclick = () => { 
            if (page > 1) { 
              page--; 
              wrap.querySelectorAll('canvas').forEach(c => c.remove()); 
              showPage(page); 
            } 
          };
        }
        if (nextBtn) {
          nextBtn.onclick = () => { 
            if (page < pdf.numPages) { 
              page++; 
              wrap.querySelectorAll('canvas').forEach(c => c.remove()); 
              showPage(page); 
            } 
          };
        }
      });
    }
  }

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ── Video placeholder click ── */
  const videoPlaceholder = document.getElementById('heroVideo');
  if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
      const videoUrl = videoPlaceholder.dataset.videoUrl;
      if (videoUrl) {
        // Could open video in modal or navigate to video URL
        window.open(videoUrl, '_blank');
      }
    });
  }

})();
