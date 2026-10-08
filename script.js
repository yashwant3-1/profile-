/**
 * YASHWANT — ECE Engineering Portfolio Scripts
 * Interactive Oscilloscope / Signal Lab, Code Copy, and Navigation Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Update Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Header Scrolled State
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 4. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 5. Copy Code Snippet
  const copyBtn = document.getElementById('copy-code-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const codeBlock = document.querySelector('.terminal-code code');
      if (!codeBlock) return;
      
      const codeText = codeBlock.innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        copyBtnText.textContent = 'Copied!';
        copyBtn.style.color = '#10b981';
        setTimeout(() => {
          copyBtnText.textContent = 'Copy';
          copyBtn.style.color = '';
        }, 2200);
      } catch (err) {
        console.error('Failed to copy code: ', err);
      }
    });
  }

  // 6. Interactive Oscilloscope & Signal Generator Canvas
  initOscilloscope();
});

/**
 * Oscilloscope Canvas Engine
 */
function initOscilloscope() {
  const canvas = document.getElementById('oscilloscope-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const freqSlider = document.getElementById('freq-slider');
  const ampSlider = document.getElementById('amp-slider');
  const freqValDisplay = document.getElementById('freq-val');
  const ampValDisplay = document.getElementById('amp-val');
  const freqReadout = document.getElementById('scope-freq-readout');
  const formulaDisplay = document.getElementById('formula-display');
  const modeButtons = document.querySelectorAll('.mode-btn');

  let carrierFreq = parseFloat(freqSlider ? freqSlider.value : 2.5);
  let amplitude = parseFloat(ampSlider ? ampSlider.value : 65);
  let mode = 'sine'; // 'sine' | 'am' | 'fm'
  let phase = 0;
  let animationId = null;

  // Responsive canvas resolution
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Control Listeners
  if (freqSlider) {
    freqSlider.addEventListener('input', (e) => {
      carrierFreq = parseFloat(e.target.value);
      if (freqValDisplay) freqValDisplay.textContent = `${carrierFreq.toFixed(1)} Hz`;
      if (freqReadout) freqReadout.textContent = `${(carrierFreq * 0.96).toFixed(2)} GHz (Scaled)`;
    });
  }

  if (ampSlider) {
    ampSlider.addEventListener('input', (e) => {
      amplitude = parseFloat(e.target.value);
      if (ampValDisplay) ampValDisplay.textContent = `${Math.round(amplitude)} V`;
    });
  }

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mode = btn.getAttribute('data-mode');

      if (formulaDisplay) {
        if (mode === 'sine') {
          formulaDisplay.textContent = 'y(t) = A · sin(2π f_c t + φ)';
        } else if (mode === 'am') {
          formulaDisplay.textContent = 's(t) = [A_c + A_m · sin(2π f_m t)] · sin(2π f_c t)';
        } else if (mode === 'fm') {
          formulaDisplay.textContent = 's(t) = A_c · cos(2π f_c t + β · sin(2π f_m t))';
        }
      }
    });
  });

  // Render Loop
  function render() {
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Draw Central Zero-Voltage Reference Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Main Waveform Trace
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 12;
    
    if (mode === 'sine') {
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = 'rgba(56, 189, 248, 0.7)';
    } else if (mode === 'am') {
      ctx.strokeStyle = '#fbbf24';
      ctx.shadowColor = 'rgba(251, 191, 36, 0.7)';
    } else {
      ctx.strokeStyle = '#34d399';
      ctx.shadowColor = 'rgba(52, 211, 153, 0.7)';
    }

    ctx.beginPath();

    const points = width;
    for (let x = 0; x < points; x += 2) {
      // Time representation across canvas width
      const t = (x / width) * 4 * Math.PI;
      let yOffset = 0;

      if (mode === 'sine') {
        yOffset = amplitude * Math.sin(t * carrierFreq + phase);
      } else if (mode === 'am') {
        // Amplitude Modulation: Carrier modulated by low frequency envelope
        const envelope = 1 + 0.55 * Math.sin(t * 0.4 + phase * 0.3);
        yOffset = (amplitude * 0.7) * envelope * Math.sin(t * carrierFreq * 1.5 + phase);
      } else if (mode === 'fm') {
        // Frequency Modulation: Instantaneous phase shifted
        const beta = 2.8; // Modulation index
        const modulatedPhase = t * (carrierFreq * 1.2) + beta * Math.sin(t * 0.5 + phase * 0.3);
        yOffset = (amplitude * 0.85) * Math.sin(modulatedPhase + phase);
      }

      const y = centerY - yOffset;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
    ctx.shadowBlur = 0; // Reset shadow

    // If AM mode, render subtle dashed envelope rails
    if (mode === 'am') {
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);

      // Upper envelope
      ctx.beginPath();
      for (let x = 0; x < points; x += 4) {
        const t = (x / width) * 4 * Math.PI;
        const env = (amplitude * 0.7) * (1 + 0.55 * Math.sin(t * 0.4 + phase * 0.3));
        const y = centerY - env;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Lower envelope
      ctx.beginPath();
      for (let x = 0; x < points; x += 4) {
        const t = (x / width) * 4 * Math.PI;
        const env = (amplitude * 0.7) * (1 + 0.55 * Math.sin(t * 0.4 + phase * 0.3));
        const y = centerY + env;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Advance phase according to speed
    phase += 0.045 * (carrierFreq * 0.7 + 0.3);

    animationId = requestAnimationFrame(render);
  }

  render();
}
