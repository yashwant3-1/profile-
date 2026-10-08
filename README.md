# Yashwant — Minimalist ECE Engineering Portfolio

A clean, aesthetic, engineering-focused personal website designed specifically for **Electronics & Communication Engineering (ECE)** students with interests in **VLSI**, **Telecommunications**, and **Low-Level C Programming**.

Built with pure, static **HTML5, CSS3, and JavaScript** — 100% free and ready to host instantly on **GitHub Pages** without any build steps or node dependencies.

---

## ⚡ How to Host for FREE on GitHub Pages (In 3 Minutes)

### Method 1: Using GitHub Web Interface (Easiest & No Terminal Needed)

1. **Log in to GitHub**:
   Go to [github.com](https://github.com) and log into your account.

2. **Create a New Repository**:
   - Click the **`+`** icon in the top right corner and select **"New repository"**.
   - If you want the website at `https://yourusername.github.io/`:
     - Name the repository **`yourusername.github.io`** (replace `yourusername` with your exact GitHub username).
   - Or you can name it anything (e.g., `portfolio`), and the website will be at `https://yourusername.github.io/portfolio/`.
   - Make sure it is set to **Public**.
   - Click **"Create repository"**.

3. **Upload the Files**:
   - On your new repository page, click **"uploading an existing file"**.
   - Drag and drop the following files & folders from this directory:
     - `index.html`
     - `style.css`
     - `script.js`
     - The `assets/` folder (with `yashwant.jpg`, `vlsi_die.jpg`, and `telecom_signals.jpg`)
   - Click **"Commit changes"**.

4. **Enable GitHub Pages**:
   - In your repository, click **Settings** (top menu bar).
   - In the left sidebar, click **Pages** (under "Code and automation").
   - Under **Build and deployment > Source**, select **"Deploy from a branch"**.
   - Under **Branch**, select **`main`** (or `master`) and folder **`/(root)`**, then click **Save**.
   - Wait 1-2 minutes. GitHub will give you your live URL! (e.g., `https://yourusername.github.io`).

---

### Method 2: Using Git Command Line

If you have `git` installed on your computer:

```bash
# 1. Initialize git in this folder
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit of Yashwant ECE minimalist portfolio"

# 4. Link to your GitHub repo
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 5. Push to GitHub
git push -u origin main
```
Then go to **Repo Settings > Pages > Select main branch > Save**.

---

## 🛠️ How to Customize Your Details

Open `index.html` in any text editor (like VS Code or Notepad) and update:

1. **LinkedIn Link**:
   Search for `https://linkedin.com` in `index.html` and replace it with your direct profile URL (e.g. `https://linkedin.com/in/your-profile`).

2. **YouTube Link**:
   Search for `https://youtube.com` and replace it with your YouTube channel link (e.g. `https://youtube.com/@yourchannel`).

3. **GitHub Link**:
   Search for `https://github.com` and replace it with your GitHub profile link.

4. **Contact Email**:
   Search for `mailto:yashwant@example.com` and update it with your actual email address.

---

## 🎨 Features & Engineering Details

- **Minimalist Aesthetic**: High-contrast obsidian slate palette inspired by silicon dies and microelectronics spec-sheets.
- **Interactive Oscilloscope (Canvas)**: Real-time simulation of RF carrier waves, Amplitude Modulation (AM), and Frequency Modulation (FM).
- **Embedded C Code Playground**: Syntax-highlighted bit-masking register example with a 1-click clipboard copy button.
- **Microchip Die & RF Blueprints**: Clean high-precision technical imagery representing VLSI and Telecommunications.
- **Ultra Lightweight**: Pure native vanilla code, 0 external runtime dependencies, ultra-fast 100/100 Lighthouse performance score.
- **Responsive**: Fully optimized for mobile phones, tablets, laptops, and 4K displays.
